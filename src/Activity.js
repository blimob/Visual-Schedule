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
    this.visual = this.createDefaultVisualConfig()
    this.createdAt = new Date()
    this.isCompleted = false
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
   * Sets the visual pattern of the activity.
   * 
   * @param {string} pattern - Visual pattern ('solid', 'dotted', 'striped').
   * @return {Activity} - Returns this for method chaining.
   */
  setPattern(pattern) {
    this.visual.pattern = pattern
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
   * Creates default visual configuration.
   * 
   * @return {object} - Default visual configuration.
   */
  createDefaultVisualConfig() {
    return {
      icon: null,
      pattern: 'solid',
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
    return /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/.test(timeString)
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
   * Checks if this activity overlaps with another activity.
   * 
   * @param {Activity} otherActivity - Another Activity instance to check against.
   * @return {boolean} - True if there is an overlap, false otherwise.
   */
  overlapsWith(otherActivity) {
    if (!(otherActivity instanceof Activity)) {
      return false
    }
    const thisStart = this.timeToMinutes(this.startTime)
    const thisEnd = this.timeToMinutes(this.endTime)
    const otherStart = otherActivity.timeToMinutes(otherActivity.startTime)
    const otherEnd = otherActivity.timeToMinutes(otherActivity.endTime)

    return thisStart < otherEnd && otherStart < thisEnd
  }

  /**
   * Marks the activity as completed and sets the completion timestamp.
   */
  markCompleted() {
    this.isCompleted = true
    this.completedAt = new Date()
  }

  /**
   * Resets the activity to incomplete state.
   */
  markIncomplete() {
    this.isCompleted = false
    delete this.completedAt
  }

  /**
   * Updates the activity times.
   * 
   * @param {string} startTime - New start time.
   * @param {string} endTime - New end time.
   */
  updateTimes(startTime, endTime) {
    this.validateStartTime(startTime)
    this.validateEndTime(endTime, startTime)
    
    this.startTime = startTime
    this.endTime = endTime
  }


  /**
   * Converts the activity to a JSON representation.
   * 
   * @returns {object} - JSON representation of the activity.
   */
  toJSON() {
    const json = {
      name: this.name,
      startTime: this.startTime,
      endTime: this.endTime,
      visual: this.visual,
      isCompleted: this.isCompleted,
      createdAt: this.createdAt
    }
    
    if (this.completedAt) {
      json.completedAt = this.completedAt
    }
    
    return json
  }
}