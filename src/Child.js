import { Activity } from '../src/Activity.js'

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
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
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
   * Removes an activity from this child's schedule
   * 
   * @param {object} activityToRemove - The activity object to remove
   * @returns {boolean} True if an activity was removed
   */
  removeActivity (activityToRemove) {
    const initialLength = this.activities.length

    this.activities = this.activities.filter(activity => 
      activity !== activityToRemove
    )
    return this.activities.length < initialLength
  }

  /**
   * Gets all activities for this child
   */
  getActivities () {
    return [...this.activities] // Return copy to prevent external modification
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
   * Counts total activities for this child
   */
  getActivityCount () {
    return this.activities.length
  }

  /**
   * Gets activities sorted by start time.
   * 
   * @returns {Activity[]} Activities sorted by start time 
   */
  getActivitiesSorted() {
    return [...this.activities].sort((a,b) =>
    a.startTime.localeCompare(b.startTime)
    )
  }

  /**
   * Calculates total scheduled time for all activities in minutes.
   * 
   * @returns {number} Total scheduled time in minutes
   */
  getTotalScheduledTime() {
    return this.activities.reduce((total, activity) => 
      total + activity.getDuration(), 0
    )
  }
}
