import { Child } from '../src/Child.js'

/**
 * Minimal DaySchedule class - just manages children for a specific date.
 * Nothing more or less.
 */
export class DaySchedule {
  /**
   * Creates a schedule for a specific date.
   * 
   * @param {Date} date - The date for this schedule (default to today)
   */
  constructor(date = new Date()) {
    this.date = date
    this.children = new Map()
  }

  /**
   * Adds a child to the schedule.
   * 
   * @param {Child} child - The child to add.
   * @returns {string} The child's ID.
   */
  addChild(child) {
    if (!(child instanceof Child)) {
      throw new Error('Must be a Child instance.')
    }
    this.children.set(child.id, child)
    return child.id
  }

  /**
   * Get a child from the schedule.
   * 
   * @param {string} childId - The ID of the child to get.
   * @returns {Child|null} The child or null if not found.
   */
  getChild(childId) {
    return this.children.get(childId) || null
  }

  /**
   * Get all children in the schedule.
   * 
   * @returns {Child[]} Array of children.
   */
  getChildren() {
    return Array.from(this.children.values())
  }

  /**
   * Removes a child from the schedule.
   * 
   * @param {string} childId - The ID of the child to remove.
   * @returns {boolean} True if removed
   */
  removeChild(childId) {
    return this.children.delete(childId)
  }

  hasChild(childId) {
    return this.children.has(childId)
  }

}