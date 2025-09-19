import { Activity } from "./Activity"

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
  constructor (name, age) {
    this.validateChildName(name)
    this.validateChildAge(age)

    this.name = name
    this.age = age
    this.id = this.generateChildId()
    this.activities = []
  }

  /**
   * Validates child name.
   * 
   * @param {string} name - Name to validate.
   */
  validateChildName (name) {
    if (!name || typeof name !== 'string') {
      throw new Error('Child name must be a non-empty string.')
    }
  }

  /**
   * Validates child age.
   * 
   * @param {number} age - Age to validate.
   */
  validateChildAge (age) {
    if (age !== undefined && (typeof age !== 'number' || age < 0 || age > 18)) {
      throw new Error('Child age must be number between 0-18.')
    }
  }

/**
 * Generates a unique child ID based on timestamp and random string.
 * 
 * @return {string} Unique child ID.
 */
  generateChildId () {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 5)
    return `child_${timestamp}_${random}`
  }

  /**
   * Add Activity to this child's schedule 
   * 
   * @param {Activity} activity - The activity to add
   * @returns {boolean} True if added successfully
   */
  addActivity (activity) {
    if (!(activity instanceof Activity)) {
      throw new Error('Activity must be an instance of Activity class.')
    }
    this.activities.push(activity)
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
