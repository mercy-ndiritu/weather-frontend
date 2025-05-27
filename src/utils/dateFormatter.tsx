// Date formatting utilities for the weather dashboard

/**
 * Format a timestamp to a readable time string
 * @param {number} timestamp - Unix timestamp in seconds
 * @param {boolean} is24Hour - Whether to use 24-hour format
 * @returns {string} Formatted time string
 */
export const formatTime = (timestamp, is24Hour = false) => {
  try {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: !is24Hour
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'N/A';
  }
};

/**
 * Format a timestamp to get day name and date
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {object} Object with day and date strings
 */
export const formatForecastDate = (timestamp) => {
  try {
    const date = new Date(timestamp * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return { day, date: dateStr };
  } catch (error) {
    console.error('Error formatting forecast date:', error);
    return { day: 'N/A', date: 'N/A' };
  }
};

/**
 * Get the current date in a readable format
 * @returns {string} Current date string
 */
export const getCurrentDate = () => {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Get the current time in a readable format
 * @param {boolean} is24Hour - Whether to use 24-hour format
 * @returns {string} Current time string
 */
export const getCurrentTime = (is24Hour = false) => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: !is24Hour
  });
};

/**
 * Check if a date is today
 * @param {Date|number} date - Date object or timestamp
 * @returns {boolean} True if the date is today
 */
export const isToday = (date) => {
  try {
    const today = new Date();
    const checkDate = typeof date === 'number' ? new Date(date * 1000) : date;
    
    return today.toDateString() === checkDate.toDateString();
  } catch (error) {
    console.error('Error checking if date is today:', error);
    return false;
  }
};

/**
 * Check if a date is tomorrow
 * @param {Date|number} date - Date object or timestamp
 * @returns {boolean} True if the date is tomorrow
 */
export const isTomorrow = (date) => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const checkDate = typeof date === 'number' ? new Date(date * 1000) : date;
    
    return tomorrow.toDateString() === checkDate.toDateString();
  } catch (error) {
    console.error('Error checking if date is tomorrow:', error);
    return false;
  }
};

/**
 * Get relative day name (Today, Tomorrow, or day name)
 * @param {Date|number} date - Date object or timestamp
 * @returns {string} Relative day name
 */
export const getRelativeDayName = (date) => {
  try {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    
    const checkDate = typeof date === 'number' ? new Date(date * 1000) : date;
    return checkDate.toLocaleDateString('en-US', { weekday: 'short' });
  } catch (error) {
    console.error('Error getting relative day name:', error);
    return 'N/A';
  }
};

/**
 * Format a date range string
 * @param {Date|number} startDate - Start date
 * @param {Date|number} endDate - End date
 * @returns {string} Formatted date range
 */
export const formatDateRange = (startDate, endDate) => {
  try {
    const start = typeof startDate === 'number' ? new Date(startDate * 1000) : startDate;
    const end = typeof endDate === 'number' ? new Date(endDate * 1000) : endDate;
    
    const startStr = start.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    const endStr = end.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    
    return `${startStr} - ${endStr}`;
  } catch (error) {
    console.error('Error formatting date range:', error);
    return 'N/A';
  }
};

/**
 * Get time ago string (e.g., "2 hours ago")
 * @param {Date|number} date - Date object or timestamp
 * @returns {string} Time ago string
 */
export const getTimeAgo = (date) => {
  try {
    const now = new Date();
    const checkDate = typeof date === 'number' ? new Date(date * 1000) : date;
    const diffMs = now - checkDate;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMins > 0) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    return 'Just now';
  } catch (error) {
    console.error('Error getting time ago:', error);
    return 'N/A';
  }
};

/**
 * Format timestamp for display in weather cards
 * @param {number} timestamp - Unix timestamp in seconds
 * @param {string} format - Format type ('time', 'date', 'datetime')
 * @returns {string} Formatted timestamp
 */
export const formatWeatherTimestamp = (timestamp, format = 'time') => {
  try {
    const date = new Date(timestamp * 1000);
    
    switch (format) {
      case 'time':
        return formatTime(timestamp);
      case 'date':
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        });
      case 'datetime':
        return date.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      default:
        return formatTime(timestamp);
    }
  } catch (error) {
    console.error('Error formatting weather timestamp:', error);
    return 'N/A';
  }
};