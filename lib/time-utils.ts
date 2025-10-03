/**
 * Format response time in a human-readable way
 * @param ms - Time in milliseconds
 * @returns Formatted time string
 */
export function formatResponseTime(ms: number): string {
  if (ms < 1000) {
    // Less than 1 second - show milliseconds
    return `${Math.round(ms)}ms`;
  } else if (ms < 60000) {
    // Less than 1 minute - show seconds with 1 decimal place
    return `${(ms / 1000).toFixed(1)}s`;
  } else {
    // 1 minute or more - show minutes and seconds
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  }
}

/**
 * Get response time color class based on performance
 * @param ms - Time in milliseconds
 * @returns Tailwind CSS color class
 */
export function getResponseTimeColor(ms: number): string {
  if (ms < 300) {
    return 'text-green-600'; // Excellent
  } else if (ms < 800) {
    return 'text-yellow-600'; // Good
  } else if (ms < 2000) {
    return 'text-orange-600'; // Fair
  } else {
    return 'text-red-600'; // Poor
  }
}

/**
 * Get response time status text
 * @param ms - Time in milliseconds
 * @returns Status text in Greek
 */
export function getResponseTimeStatus(ms: number): string {
  if (ms < 300) {
    return 'Εξαιρετική';
  } else if (ms < 800) {
    return 'Καλή';
  } else if (ms < 2000) {
    return 'Μέτρια';
  } else {
    return 'Αργή';
  }
}
