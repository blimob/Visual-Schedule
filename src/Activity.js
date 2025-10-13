/**
 * Activity Class for Child's Daily Schedule
 * Manages activities with time, visual attributes, and status indicators.
 */
export class Activity {
  /**
   * Creates an Activity instance.
   * 
   * @param {string} name - Name of the activity.
   * @param {string} startTime - Start time in HH:MM format (24-hour).
   * @param {string} endTime - End time in HH:MM format (24-hour).
   */
  constructor(name, startTime, endTime) {
    this.validateActivityName(name)
    this.validateStartTime(startTime)
    this.validateEndTime(endTime, startTime)

    this.name = name
    this.startTime = startTime
    this.endTime = endTime
    this.visual = { icon: null }
  }

  /**
   * Sets a visual icon for the activity.
   * 
   * @param {string} icon - Visual icon (emoji or text).
   * @return {Activity} - Returns this for method chaining.
   */
  setIcon(icon) {
    this.visual.icon = icon
    return this
  }

  /**
   * Validates activity name.
   * 
   * @param {string} name - Name to validate.
   */
  validateActivityName(name) {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('Activity name must be a non-empty string.')
    }
  }

  /**
   * Validates start time.
   * 
   * @param {string} startTime - Start time to validate.
   */
  validateStartTime(startTime) {
    if (!this.isValidTimeFormat(startTime)) {
      throw new Error('Invalid start time format. Use HH:MM')
    }
  }

  /**
   * Validates end time.
   * 
   * @param {string} endTime - End time to validate.
   * @param {string} startTime - Start time to compare against.
   */
  validateEndTime(endTime, startTime) {
    if (!this.isValidTimeFormat(endTime)) {
      throw new Error('Invalid end time format. Use HH:MM')
    }
    if (this.timeToMinutes(endTime) <= this.timeToMinutes(startTime)) {
      throw new Error('End time must be after start time.')
    }
  }

  /**
   * Validates time format HH:MM (24-hour).
   * 
   * @param {string} timeString - Time string to validate.
   * @return {boolean} - True if valid, false otherwise.
   */
  isValidTimeFormat(timeString) {
    if (!timeString || typeof timeString !== 'string') return false
    return /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(timeString)
  }

  /**
   * Converts HH:MM time string to total minutes.
   * 
   * @param {string} timeString - Time string to convert.
   * @return {number} - Total minutes.
   */
  timeToMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number)
    return hours * 60 + minutes
  }

  /**
   * Gets the duration of the activity in minutes.
   * 
   * @return {number} - Duration in minutes.
   */
  getDuration() {
    return this.timeToMinutes(this.endTime) - this.timeToMinutes(this.startTime)
  }

  /**
   * Gets the formatted duration as "Xh Ym".
   * 
   * @return {string} - Formatted duration.
   */
  getFormattedDuration() {
    const min = this.getDuration()
    const hours = Math.floor(min / 60)
    const minutes = min % 60
    return hours && minutes ? `${hours}h ${minutes}min` : hours ? `${hours}h` : `${minutes}min`
  }
}