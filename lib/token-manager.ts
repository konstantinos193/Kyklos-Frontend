import { getApiUrl } from './api-url';

interface TokenInfo {
  token: string;
  expiresAt: number;
  type: 'admin' | 'student';
}

/**
 * Token Manager - Handles token storage, retrieval, and refresh
 */
class TokenManager {
  private static readonly ADMIN_TOKEN_KEY = 'adminToken';
  private static readonly ADMIN_INFO_KEY = 'adminInfo';
  private static readonly STUDENT_TOKEN_KEY = 'studentToken';
  private static readonly STUDENT_DATA_KEY = 'student';
  
  // Refresh tokens when they're within 1 hour of expiring (for 24h tokens)
  // or 12 hours (for 7d tokens)
  private static readonly REFRESH_THRESHOLD_ADMIN = 60 * 60 * 1000; // 1 hour
  private static readonly REFRESH_THRESHOLD_STUDENT = 12 * 60 * 60 * 1000; // 12 hours

  /**
   * Decode JWT token to get expiration time
   */
  private static decodeToken(token: string): { exp?: number; iat?: number } | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /**
   * Get token expiration time
   */
  private static getTokenExpiration(token: string): number | null {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return null;
    }
    // exp is in seconds, convert to milliseconds
    return decoded.exp * 1000;
  }

  /**
   * Check if token needs refresh
   */
  private static needsRefresh(token: string, type: 'admin' | 'student'): boolean {
    const expiration = this.getTokenExpiration(token);
    if (!expiration) {
      return false; // Can't determine, don't refresh
    }

    const threshold = type === 'admin' 
      ? this.REFRESH_THRESHOLD_ADMIN 
      : this.REFRESH_THRESHOLD_STUDENT;
    
    const timeUntilExpiration = expiration - Date.now();
    return timeUntilExpiration < threshold;
  }

  /**
   * Store admin token
   */
  static setAdminToken(token: string, adminInfo: any, rememberMe: boolean = true): void {
    if (rememberMe) {
      localStorage.setItem(this.ADMIN_TOKEN_KEY, token);
      localStorage.setItem(this.ADMIN_INFO_KEY, JSON.stringify(adminInfo));
      localStorage.setItem('adminLoggedIn', 'true');
    } else {
      sessionStorage.setItem(this.ADMIN_TOKEN_KEY, token);
      sessionStorage.setItem(this.ADMIN_INFO_KEY, JSON.stringify(adminInfo));
      sessionStorage.setItem('adminLoggedIn', 'true');
    }
    // Always store in sessionStorage as well for API client compatibility
    sessionStorage.setItem(this.ADMIN_TOKEN_KEY, token);
    sessionStorage.setItem(this.ADMIN_INFO_KEY, JSON.stringify(adminInfo));
  }

  /**
   * Get admin token
   */
  static getAdminToken(): string | null {
    return localStorage.getItem(this.ADMIN_TOKEN_KEY) || sessionStorage.getItem(this.ADMIN_TOKEN_KEY);
  }

  /**
   * Store student token
   */
  static setStudentToken(token: string, studentData: any): void {
    localStorage.setItem(this.STUDENT_TOKEN_KEY, token);
    localStorage.setItem(this.STUDENT_DATA_KEY, JSON.stringify(studentData));
  }

  /**
   * Get student token
   */
  static getStudentToken(): string | null {
    return localStorage.getItem(this.STUDENT_TOKEN_KEY) || sessionStorage.getItem(this.STUDENT_TOKEN_KEY);
  }

  /**
   * Clear admin tokens
   */
  static clearAdminTokens(): void {
    localStorage.removeItem(this.ADMIN_TOKEN_KEY);
    localStorage.removeItem(this.ADMIN_INFO_KEY);
    localStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem(this.ADMIN_TOKEN_KEY);
    sessionStorage.removeItem(this.ADMIN_INFO_KEY);
    sessionStorage.removeItem('adminLoggedIn');
  }

  /**
   * Clear student tokens
   */
  static clearStudentTokens(): void {
    localStorage.removeItem(this.STUDENT_TOKEN_KEY);
    localStorage.removeItem(this.STUDENT_DATA_KEY);
    sessionStorage.removeItem(this.STUDENT_TOKEN_KEY);
    sessionStorage.removeItem(this.STUDENT_DATA_KEY);
  }

  /**
   * Refresh admin token
   */
  static async refreshAdminToken(): Promise<string | null> {
    const token = this.getAdminToken();
    if (!token) {
      return null;
    }

    try {
      const response = await fetch(`${getApiUrl()}/api/admin/auth/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // If refresh fails, clear tokens
        this.clearAdminTokens();
        return null;
      }

      const data = await response.json();
      if (data.success && data.token) {
        // Get existing admin info to preserve it
        const adminInfoStr = localStorage.getItem(this.ADMIN_INFO_KEY) || sessionStorage.getItem(this.ADMIN_INFO_KEY);
        const adminInfo = adminInfoStr ? JSON.parse(adminInfoStr) : data.admin;
        
        // Update admin info with new data if available
        if (data.admin) {
          Object.assign(adminInfo, data.admin);
        }

        // Store new token
        const rememberMe = !!localStorage.getItem(this.ADMIN_TOKEN_KEY);
        this.setAdminToken(data.token, adminInfo, rememberMe);
        
        return data.token;
      }
    } catch (error) {
      console.error('Error refreshing admin token:', error);
      // Don't clear tokens on network error - might be temporary
    }

    return null;
  }

  /**
   * Refresh student token
   */
  static async refreshStudentToken(): Promise<string | null> {
    const token = this.getStudentToken();
    if (!token) {
      return null;
    }

    try {
      const response = await fetch(`${getApiUrl()}/api/auth/student-refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // If refresh fails, clear tokens
        this.clearStudentTokens();
        return null;
      }

      const data = await response.json();
      if (data.success && data.token) {
        // Store new token and student data
        this.setStudentToken(data.token, data.student);
        return data.token;
      }
    } catch (error) {
      console.error('Error refreshing student token:', error);
      // Don't clear tokens on network error - might be temporary
    }

    return null;
  }

  /**
   * Check and refresh token if needed (for admin)
   */
  static async checkAndRefreshAdminToken(): Promise<string | null> {
    const token = this.getAdminToken();
    if (!token) {
      return null;
    }

    if (this.needsRefresh(token, 'admin')) {
      return await this.refreshAdminToken();
    }

    return token;
  }

  /**
   * Check and refresh token if needed (for student)
   */
  static async checkAndRefreshStudentToken(): Promise<string | null> {
    const token = this.getStudentToken();
    if (!token) {
      return null;
    }

    if (this.needsRefresh(token, 'student')) {
      return await this.refreshStudentToken();
    }

    return token;
  }

  /**
   * Verify admin token is still valid (with retry on network error)
   */
  static async verifyAdminToken(retries: number = 2): Promise<boolean> {
    const token = this.getAdminToken();
    if (!token) {
      return false;
    }

    for (let i = 0; i <= retries; i++) {
      try {
        const response = await fetch(`${getApiUrl()}/api/admin/auth/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          return true;
        }

        // If 401, try to refresh token once
        if (response.status === 401 && i === 0) {
          const newToken = await this.refreshAdminToken();
          if (newToken) {
            // Retry with new token
            continue;
          }
        }

        // If still failing after refresh attempt, return false
        if (response.status === 401) {
          return false;
        }

        // For other errors, retry if we have retries left
        if (i < retries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
          continue;
        }
      } catch (error) {
        // Network error - retry if we have retries left
        if (i < retries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
          continue;
        }
        // On final retry failure, don't clear tokens - might be network issue
        console.error('Network error verifying admin token:', error);
        return true; // Assume token is valid if we can't verify due to network
      }
    }

    return false;
  }

  /**
   * Verify student token is still valid (with retry on network error)
   */
  static async verifyStudentToken(retries: number = 2): Promise<boolean> {
    const token = this.getStudentToken();
    if (!token) {
      return false;
    }

    for (let i = 0; i <= retries; i++) {
      try {
        const response = await fetch(`${getApiUrl()}/api/auth/student-verify`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          return true;
        }

        // If 401, try to refresh token once
        if (response.status === 401 && i === 0) {
          const newToken = await this.refreshStudentToken();
          if (newToken) {
            // Retry with new token
            continue;
          }
        }

        // If still failing after refresh attempt, return false
        if (response.status === 401) {
          return false;
        }

        // For other errors, retry if we have retries left
        if (i < retries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
          continue;
        }
      } catch (error) {
        // Network error - retry if we have retries left
        if (i < retries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
          continue;
        }
        // On final retry failure, don't clear tokens - might be network issue
        console.error('Network error verifying student token:', error);
        return true; // Assume token is valid if we can't verify due to network
      }
    }

    return false;
  }
}

export default TokenManager;

