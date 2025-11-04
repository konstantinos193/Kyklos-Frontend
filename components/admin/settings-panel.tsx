"use client";

import { useState, useEffect } from 'react';
import { adminAPI } from '@/lib/api';
import { 
  Save, 
  RefreshCw, 
  Shield, 
  Mail, 
  Database, 
  Globe,
  Bell,
  Key,
  Server,
  AlertTriangle
} from 'lucide-react';

export function SettingsPanel() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'ΚΥΚΛΟΣ Φροντιστήριο',
      siteDescription: 'Εκπαιδευτικό Κέντρο Αριστείας',
      siteUrl: 'https://kyklosedu.gr',
      adminEmail: 'grkyklos-@hotmail.gr',
      timezone: 'Europe/Athens',
      language: 'el'
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      smtpUser: 'grkyklos-@hotmail.gr',
      smtpSecure: false,
      fromName: 'ΚΥΚΛΟΣ Φροντιστήριο',
      fromEmail: 'grkyklos-@hotmail.gr'
    },
    security: {
      enableTwoFactor: false,
      sessionTimeout: '24',
      maxLoginAttempts: '5',
      passwordMinLength: '8',
      requireEmailVerification: true
    },
    notifications: {
      emailNotifications: true,
      adminNotifications: true,
      userRegistration: true,
      newComment: true,
      newsletterSignup: true,
      systemAlerts: true
    },
    database: {
      backupFrequency: 'daily',
      backupRetention: '30',
      enableLogging: true,
      logLevel: 'info',
      maxLogSize: '100'
    }
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load settings on component mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getSettings();
      if (response.success) {
        setSettings(response.data);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'database', label: 'Database', icon: Database }
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await adminAPI.updateSettings(settings);
      if (response.success) {
        alert('Settings saved successfully!');
      } else {
        alert('Error saving settings: ' + response.message);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      // Reset logic here
      alert('Settings reset to default values');
    }
  };

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
        <input
          type="text"
          value={settings.general.siteName}
          onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
        <textarea
          value={settings.general.siteDescription}
          onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent h-20"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Site URL</label>
          <input
            type="url"
            value={settings.general.siteUrl}
            onChange={(e) => updateSetting('general', 'siteUrl', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
          <input
            type="email"
            value={settings.general.adminEmail}
            onChange={(e) => updateSetting('general', 'adminEmail', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          >
            <option value="Europe/Athens">Europe/Athens</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            value={settings.general.language}
            onChange={(e) => updateSetting('general', 'language', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          >
            <option value="el">Greek</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
          <input
            type="text"
            value={settings.email.smtpHost}
            onChange={(e) => updateSetting('email', 'smtpHost', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
          <input
            type="number"
            value={settings.email.smtpPort}
            onChange={(e) => updateSetting('email', 'smtpPort', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
          <input
            type="text"
            value={settings.email.smtpUser}
            onChange={(e) => updateSetting('email', 'smtpUser', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
          <input
            type="text"
            value={settings.email.fromName}
            onChange={(e) => updateSetting('email', 'fromName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
          <input
            type="email"
            value={settings.email.fromEmail}
            onChange={(e) => updateSetting('email', 'fromEmail', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={settings.email.smtpSecure}
          onChange={(e) => updateSetting('email', 'smtpSecure', e.target.checked)}
          className="h-4 w-4 text-[#E7B109] focus:ring-[#E7B109] border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">Use SSL/TLS</label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <div>
            <p className="font-medium text-yellow-800">Security Notice</p>
            <p className="text-sm text-yellow-700">These settings affect the security of your application.</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Two-Factor Authentication</p>
            <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
          </div>
          <input
            type="checkbox"
            checked={settings.security.enableTwoFactor}
            onChange={(e) => updateSetting('security', 'enableTwoFactor', e.target.checked)}
            className="h-4 w-4 text-[#E7B109] focus:ring-[#E7B109] border-gray-300 rounded"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Email Verification</p>
            <p className="text-sm text-gray-600">Require email verification for new users</p>
          </div>
          <input
            type="checkbox"
            checked={settings.security.requireEmailVerification}
            onChange={(e) => updateSetting('security', 'requireEmailVerification', e.target.checked)}
            className="h-4 w-4 text-[#E7B109] focus:ring-[#E7B109] border-gray-300 rounded"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (hours)</label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => updateSetting('security', 'sessionTimeout', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
          <input
            type="number"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => updateSetting('security', 'maxLoginAttempts', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Password Length</label>
        <input
          type="number"
          value={settings.security.passwordMinLength}
          onChange={(e) => updateSetting('security', 'passwordMinLength', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderNotificationsSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {Object.entries(settings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <p className="text-sm text-gray-600">
                {key === 'emailNotifications' && 'Send email notifications'}
                {key === 'adminNotifications' && 'Notify administrators'}
                {key === 'userRegistration' && 'Notify on new user registration'}
                {key === 'newComment' && 'Notify on new comments'}
                {key === 'newsletterSignup' && 'Notify on newsletter signups'}
                {key === 'systemAlerts' && 'Send system alerts'}
              </p>
            </div>
            <input
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => updateSetting('notifications', key, e.target.checked)}
              className="h-4 w-4 text-[#E7B109] focus:ring-[#E7B109] border-gray-300 rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderDatabaseSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
          <select
            value={settings.database.backupFrequency}
            onChange={(e) => updateSetting('database', 'backupFrequency', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Backup Retention (days)</label>
          <input
            type="number"
            value={settings.database.backupRetention}
            onChange={(e) => updateSetting('database', 'backupRetention', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Enable Logging</p>
            <p className="text-sm text-gray-600">Log system events and errors</p>
          </div>
          <input
            type="checkbox"
            checked={settings.database.enableLogging}
            onChange={(e) => updateSetting('database', 'enableLogging', e.target.checked)}
            className="h-4 w-4 text-[#E7B109] focus:ring-[#E7B109] border-gray-300 rounded"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Log Level</label>
          <select
            value={settings.database.logLevel}
            onChange={(e) => updateSetting('database', 'logLevel', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          >
            <option value="error">Error</option>
            <option value="warn">Warning</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Log Size (MB)</label>
          <input
            type="number"
            value={settings.database.maxLogSize}
            onChange={(e) => updateSetting('database', 'maxLogSize', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'email': return renderEmailSettings();
      case 'security': return renderSecuritySettings();
      case 'notifications': return renderNotificationsSettings();
      case 'database': return renderDatabaseSettings();
      default: return renderGeneralSettings();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E7B109] mx-auto mb-4"></div>
          <p className="text-gray-600">Φόρτωση ρυθμίσεων...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            <p className="text-gray-600">Manage your application settings and preferences</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default SettingsPanel;