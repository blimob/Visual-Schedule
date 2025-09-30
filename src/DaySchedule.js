import { Child } from '../src/Child.js'

/**
 * Minimal DaySchedule class - just manages children for a specific date.
 * Nothing more, nothing less.
 */
export class DaySchedule {
  /**
   * Creates a schedule for a specific date.
   * 
   * @param {Date} date - The date for this schedule (defaults to today).
   */
  constructor(date = new Date()) {
    this.date = date
    this.children = new Map()
  }

  /**
   * Adds a child to the schedule.
   * 
   * @param {Child} child - Child to add.
   * @returns {string} The child's ID.
   */
  addChild(child) {
    if (!(child instanceof Child)) {
      throw new Error('Must be a Child instance')
    }
    this.children.set(child.id, child)
    return child.id
  }

  /**
   * Gets a child from the schedule.
   * 
   * @param {string} childId - ID of the child.
   * @returns {Child|null} The child or null if not found.
   */
  getChild(childId) {
    return this.children.get(childId) || null
  }

  /**
   * Gets all children in the schedule.
   * 
   * @returns {Child[]} Array of all children.
   */
  getChildren() {
    return Array.from(this.children.values())
  }

  /**
   * Removes a child from the schedule.
   * 
   * @param {string} childId - ID of child to remove.
   * @returns {boolean} True if removed.
   */
  removeChild(childId) {
    return this.children.delete(childId)
  }

  /**
   * Gets a child's complete schedule for this day.
   * 
   * @param {string} childId - ID of the child.
   * @returns {object|null} Schedule object or null if child not found.
   */
  getChildSchedule(childId) {
    const child = this.children.get(childId)
    if (!child) {
      return null
    }
    
    return {
      child: child,
      activities: child.getActivities(),
      date: this.date
    }
  }

  /**
   * Checks if a child exists in the schedule.
   * 
   * @param {string} childId - ID to check.
   * @returns {boolean} True if child exists.
   */
  hasChild(childId) {
    return this.children.has(childId)
  }

  /**
   * Counts total activities across all children.
   * 
   * @returns {number} Total activity count.
   */
  getTotalActivities() {
    return this.getChildren().reduce((total, child) => 
    total + child.getActivityCount(), 0
    )
  }

  /**
   * Gets children sorted by name.
   * 
   * @returns {Child[]} Sorted array of children.
   */
  getChildrenSorted() {
    return this.getChildren().sort((a, b) => 
    a.name.localeCompare(b.name))
  }
}
