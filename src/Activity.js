/**
 * Activity Class for Child's Daily Schedule
 * Manages activities with time, visual attributes, and status indicators.
 */
export class Activity {
  /**
   * Creates an Activity instance.
   * 
   * @param {string} name - Name of the activity (e.g., "Breakfast", "Playtime").
   * @param {string} startTime - Start time in HH:MM format (24-hour).
   * @param {string} endTime - End time in HH:MM format (24-hour).
   * @param {object} visualConfig - Optional visual configuration.
   * @param {string} visualConfig.color - Color code for the activity (e.g., "#FF5733").
   * @param {string} visualConfig.icon - Icon representing the activity (e.g., "🍽️").
   */
  constructor (name, startTime, endTime, visualConfig = {}) {
    if (!name || typeof name !== 'string') {
      throw new Error('Activity name must be a non-empty string.')
    }
    if (!this.isValidTimeFormat(startTime)) {
      throw new Error('Invalid start time format. Use HH:MM')
    }
    if (!this.isValidTimeFormat(endTime)) {
      throw new Error('Invalid end time format. Use HH:MM')
    }
    if (this.timeToMinutes(startTime) >= this.timeToMinutes(endTime)) {
      throw new Error('Start time must be before end time.')
    }

    this.name = name.trim()
    this.startTime = startTime
    this.endTime = endTime
    this.duration = this.calculateDuration()

    this.visual = {
      color: visualConfig.color || this.getDefaultColor(name),
      icon: visualConfig.icon || this.getDefaultIcon(name),
      pattern: visualConfig.pattern || 'solid',
      priority: visualConfig.priority || 'normal'
    }

    this.createdAt = new Date()
    this.isCompleted = false
  }

  /**
   * Validates time format HH:MM (24-hour).
   * 
   * @param {string} timeString - Time string to validate.
   * @return {boolean} - True if valid, false otherwise.
   */
  isValidTimeFormat (timeString) {
    if (!timeString) return false 
    return /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/.test(timeString)
  }

  /**
   * Converts HH:MM time string to total minutes.
   */
  timeToMinutes (timeString) {
    const [hours, minutes] = timeString.split(':').map(Number)
    return hours * 60 + minutes
  }

  /**
   * Calculates duration in minutes between start and end times.
   */
  calculateDuration () {
    const startMinutes = this.timeToMinutes(this.startTime)
    const endMinutes = this.timeToMinutes(this.endTime)
    return endMinutes - startMinutes
  }

  /**
   * Gets a default color based on activity name.
   * 
   * @param {string} activityName - Name of the activity.
   * @return {string} - Hex color code. 
   */
  getDefaultColor (activityName) {
    const name = activityName.toLowerCase()

    if (name.includes('breakfast') || name.includes('lunch') || name.includes('dinner') || name.includes('snack')) {
      return '#FF6347'
    }
    if (name.includes('play') || name.includes('game') || name.includes('playing')) {
      return '#8BC34A'
    }
    if (name.includes('rest') || name.includes('sleep') || name.includes('slumber') || name.includes('nap')) {
      return '#FFB6C1'
    }
    if (name.includes('homework') || name.includes('reading') || name.includes('school') || name.includes('study')) {
      return '#FFFF00'
    }
    if (name.includes('wash') || name.includes('shower') || name.includes('brush') || name.includes('hygiene')) {
      return '#87CEEB'
    }
    return '#FFFFFF'
  }

  /**
   * Gets a default icon based on activity name.
   * 
   * @param {string} activityName - Name of the activity.
   * @return {string} - Emoji icon.
   */
  getDefaultIcon (activityName) {
    const name = activityName.toLowerCase()

    if (name.includes('breakfast') || name.includes('lunch') || name.includes('dinner')) {
      return '🍽️'
    }
    if (name.includes('play') || name.includes('game')) {
      return '🎮'
    }
    if (name.includes('rest') || name.includes('sleep')) {
      return '😴'
    }
    if (name.includes('homework') || name.includes('school')) {
      return '📚'
    }
    if (name.includes('shower') || name.includes('wash')) {
      return ('🛁')
    }
    return '⭐'
  }

  /**
   * Checks if this activity overlaps with another activity.
   * 
   * @param {Activity} otherActivity - Another Activity instance to check against.
   * @return {boolean} - True if there is an overlap, false otherwise.
   */
  overlapsWith (otherActivity) {
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
  markCompleted () {
    this.isCompleted = true
    this.completedAt = new Date()
  }

  /**
   * Converts the activity to a JSON representation.
   * 
   * @returns {object} - JSON representation of the activity.
   */
  toJSON () {
    return {
      name: this.name,
      startTime: this.startTime,
      endTime: this.endTime,
      duration: this.duration,
      visual: this.visual,
      isCompleted: this.isCompleted,
      createdAt: this.createdAt
    }
  }
}
