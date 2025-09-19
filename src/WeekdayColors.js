export const WEEKDAY_COLORS = {
  0: '#FF6347', // Sunday - Red
  1: '#8BC34A', // Monday - Green
  2: '#87CEEB', // Tuesday - Blue
  3: '#FFFFFF', // Wednesday - White
  4: '#8B4513', // Thursday - Brown
  5: '#FFFF00', // Friday - Yellow
  6: '#FFB6C1', // Saturday - Pink
}

/**
 * Gets color for a specific date
 * 
 * @param {Date} date - The date object
 * @returns {string} - The color associated with the day of the week
 */
export function getColorForDate(date) {
  if(!(date instanceof Date)) {
    throw new Error('Must be a valid Date object')
  }
  return WEEKDAY_COLORS[date.getDay()] || '#95A5A6' // Default to gray if not found
}