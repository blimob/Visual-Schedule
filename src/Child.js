/**
 * Class representing a child in the system with activities and preferences.
 * Includes methods for managing activities and visual preferences.
 */
export class Child {

  /**
   * Creates a new Child instance with name, age, and visual preferences.
   * 
   * @param {string} name - The name of the child.
   * @param {number} age - The age of the child (0-18).
   * @param {object} visualPreferences - Optional visual preferences.
   */
  constructor (name, age, visualPreferences = {}) {
    if (!name || typeof name !== 'string') {
      throw new Error('Child name must be a non-empty string.')
    }
    if (age !== undefined && (typeof age !== 'number' || age < 0 || age > 18)) {
      throw new Error('Child age must be a number between 0 and 18.')
    }

    this.name = name.trim()
    this.age = age
    this.id = this.generateChildId()

    this.visualPreferences = {
      favoriteColor: visualPreferences.favoriteColor || 'null',
      iconStyle: visualPreferences.iconStyle || 'emoji',
      fontSize: visualPreferences.fontSize || 'medium',
      highContrast: visualPreferences.highContrast || false,
      simplifiedView: visualPreferences.simplifiedView || false
    }

    this.activities = []

    this.createAt = new Date()
    this.lastModified = new Date()
  }

  /**
   * Converts time string HH:MM to total minutes
   * 
   * @returns {boolean} True if time format is valid HH:MM
   * @param {string} timeStr - Time string to validate
   */
  generateChildId () {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 5)
    return `child_${timestamp}_${random}`
  }

  /**
   * Validates time format HH:MM
   * 
   * @param {string} timeStr - Time string to validate
   * @returns {boolean} True if time format is valid HH:MM
   */
  addActivity (activity) {
    if (!activity || typeof activity !== 'object') {
      throw new Error('Activity must be a valid object.')
    }
    if (!activity.name || !activity.startTime || !activity.endTime) {
      throw new Error('Activity must have name, startTime, and endTime properties')
    }

    const duplicate = this.activities.find(existing =>
      existing.name === activity.name &&
      existing.startTime === activity.startTime &&
      existing.endTime === activity.endTime
    )

    if (duplicate) {
      throw new Error('Activity already exists for this child.')
    }

    this.activities.push(activity)
    this.lastModified = new Date()
    return true
  }

  /**
   * Removes an activity from this child's schedule by reference or matching properties
   * 
   * @param {object} activityToRemove - The activity object to remove
   * @returns {boolean} True if an activity was removed
   */
  removeActivity (activityToRemove) {
    const initialLength = this.activities.length

    this.activities = this.activities.filter(activity => {
      if (activity === activityToRemove) {
        return false
      }
      if (activityToRemove.name && activityToRemove.startTime) {
        return !(activity.name === activityToRemove.name &&
                activity.startTime === activityToRemove.startTime)
      }
      return true
    })

    const wasRemoved = this.activities.length < initialLength
    if (wasRemoved) {
      this.lastModified = new Date()
    }

    return wasRemoved
  }

  /**
   * Gets all activities for this child
   */
  getActivities () {
    return [...this.activities] // Return copy to prevent external modification
  }

  /**
   * Gets activities for a specific time range
   */
  getActivitiesInRange (startTime, endTime) {
    if (!this.isValidTimeFormat(startTime) || !this.isValidTimeFormat(endTime)) {
      throw new Error('Invalid time format. Use HH:MM')
    }

    const startMinutes = this.timeToMinutes(startTime)
    const endMinutes = this.timeToMinutes(endTime)

    return this.activities.filter(activity => {
      const activityStart = this.timeToMinutes(activity.startTime)
      const activityEnd = this.timeToMinutes(activity.endTime)

      // Activity overlaps with requested range
      return activityStart < endMinutes && activityEnd > startMinutes
    })
  }

  /**
   * Finds activities by name (partial match)
   */
  findActivitiesByName (searchName) {
    if (!searchName || typeof searchName !== 'string') {
      return []
    }

    const searchTerm = searchName.toLowerCase()
    return this.activities.filter(activity =>
      activity.name.toLowerCase().includes(searchTerm)
    )
  }

  /**
   * Updates visual preferences for this child
   */
  updateVisualPreferences (newPreferences) {
    if (!newPreferences || typeof newPreferences !== 'object') {
      throw new Error('Visual preferences must be an object')
    }

    // Only update valid preference keys
    const validKeys = ['favoriteColor', 'iconStyle', 'fontSize', 'highContrast', 'simplifiedView']

    for (const [key, value] of Object.entries(newPreferences)) {
      if (validKeys.includes(key)) {
        this.visualPreferences[key] = value
      }
    }

    this.lastModified = new Date()
  }

  /**
   * Gets the child's preferred color or falls back to activity-based colors
   */
  getPreferredColorForActivity (activity) {
    // If child has a favorite color and simplified view is enabled, use that
    if (this.visualPreferences.simplifiedView && this.visualPreferences.favoriteColor) {
      return this.visualPreferences.favoriteColor
    }

    // Otherwise use the activity's default color
    return activity.visual ? activity.visual.color : '#FFFFFF'
  }

  /**
   * Counts total activities for this child
   */
  getActivityCount () {
    return this.activities.length
  }

  /**
   * Gets today's activities (requires activities to have date info)
   */
  getTodaysActivities () {
    const today = new Date().toDateString()
    return this.activities.filter(activity => {
      if (activity.date) {
        return new Date(activity.date).toDateString() === today
      }
      return false
    })
  }

  /**
   * Exports child data as JSON
   */
  toJSON () {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      visualPreferences: this.visualPreferences,
      activityCount: this.activities.length,
      createdAt: this.createdAt,
      lastModified: this.lastModified
    }
  }

  /**
   * Exports child with all activities as JSON
   */
  toJSONWithActivities () {
    return {
      ...this.toJSON(),
      activities: this.activities.map(activity =>
        activity.toJSON ? activity.toJSON() : activity
      )
    }
  }
}
