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
  constructor (date = new Date()) {
    this.date = date
    this.children = new Map()
  }

  /**
   * Adds a child to the schedule.
   * 
   * @param {Child} child - The child to add.
   * @returns {string} The child's ID.
   */
  addChild (child) {
    
  }
}