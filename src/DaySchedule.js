export class DaySchedule {
  constructor (date = null, weekdayColors = null, validator = null) {
    this.date = date || new Date()
    this.weekdayColors = weekdayColors
    this.validator = validator

    this.children = new Map()
    this.scheduleData = new Map()
    this.metadata = {
      createdAt: new Date(),
      lastModified: new Date(),
      version: '1.0.0'
    }
  }

  /**
   * Registers a child for schedule management
   */
  addChild (child) {
    if (!child || !child.id) {
      throw new Error('Child must be a valid object with an id')
    }

    this.children.set(child.id, child)
    this.scheduleData.set(child.id, [])
    this.metadata.lastModified = new Date()

    return child.id
  }

  /**
   * Removes a child from schedule management
   */
  removeChild (childId) {
    if (!childId) {
      throw new Error('Child ID is required')
    }

    const wasRemoved = this.children.delete(childId)
    this.scheduleData.delete(childId)

    if (wasRemoved) {
      this.metadata.lastModified = new Date()
    }

    return wasRemoved
  }

  /**
   * Adds an activity to a child's schedule
   */
  addActivity (childId, activity) {
    if (!this.children.has(childId)) {
      throw new Error('Child not found in schedule')
    }

    if (!activity) {
      throw new Error('Activity is required')
    }

    // Validate activity if validator is available
    if (this.validator) {
      const validation = this.validator.validateActivity(activity)
      if (!validation.isValid) {
        throw new Error(`Activity validation failed: ${validation.errors.join(', ')}`)
      }
    }

    // Get child's current activities
    const childActivities = this.scheduleData.get(childId)

    // Check for conflicts if validator is available
    if (this.validator && childActivities.length > 0) {
      const allActivities = [...childActivities, activity]
      const conflicts = this.validator.findConflicts(allActivities)
      const majorConflicts = conflicts.filter(c => c.severity === 'error')

      if (majorConflicts.length > 0) {
        throw new Error(`Schedule conflict: ${majorConflicts[0].description}`)
      }
    }

    // Add activity to child's schedule
    childActivities.push(activity)
    this.metadata.lastModified = new Date()

    return true
  }

  /**
   * Removes an activity from a child's schedule
   */
  removeActivity (childId, activityToRemove) {
    if (!this.children.has(childId)) {
      throw new Error('Child not found in schedule')
    }

    const childActivities = this.scheduleData.get(childId)
    const initialLength = childActivities.length

    // Remove by reference or by matching properties
    const filteredActivities = childActivities.filter(activity => {
      if (activity === activityToRemove) {
        return false
      }
      if (activityToRemove.name && activityToRemove.startTime) {
        return !(activity.name === activityToRemove.name &&
                activity.startTime === activityToRemove.startTime)
      }
      return true
    })

    this.scheduleData.set(childId, filteredActivities)

    const wasRemoved = filteredActivities.length < initialLength
    if (wasRemoved) {
      this.metadata.lastModified = new Date()
    }

    return wasRemoved
  }

  /**
   * Gets all activities for a specific child
   */
  getChildSchedule (childId) {
    if (!this.children.has(childId)) {
      return null
    }

    return {
      child: this.children.get(childId),
      activities: [...this.scheduleData.get(childId)],
      date: this.date
    }
  }

  /**
   * Gets activities for a child in a specific time range
   */
  getActivitiesInRange (childId, startTime, endTime) {
    if (!this.children.has(childId)) {
      return []
    }

    // Use Child's existing method to avoid duplication
    const child = this.children.get(childId)
    if (child.getActivitiesInRange) {
      return child.getActivitiesInRange(startTime, endTime)
    }

    // Fallback if Child doesn't have the method
    const activities = this.scheduleData.get(childId)
    return activities.filter(activity => {
      if (!activity.timeToMinutes) return false

      const activityStart = activity.timeToMinutes(activity.startTime)
      const activityEnd = activity.timeToMinutes(activity.endTime)
      const rangeStart = activity.timeToMinutes(startTime)
      const rangeEnd = activity.timeToMinutes(endTime)

      return activityStart < rangeEnd && activityEnd > rangeStart
    })
  }

  /**
   * Gets complete schedule for all children
   */
  getCompleteSchedule () {
    const schedule = {}

    for (const [childId, child] of this.children) {
      schedule[childId] = {
        child,
        activities: [...this.scheduleData.get(childId)],
        activityCount: this.scheduleData.get(childId).length
      }
    }

    return {
      date: this.date,
      children: schedule,
      metadata: this.metadata
    }
  }

  /**
   * Validates entire day schedule
   */
  validateSchedule () {
    if (!this.validator) {
      throw new Error('Validator not available for schedule validation')
    }

    const results = {
      isValid: true,
      childResults: {},
      overallConflicts: []
    }

    // Validate each child's schedule
    for (const [childId, activities] of this.scheduleData) {
      const childValidation = this.validator.validateSchedule(activities)
      results.childResults[childId] = childValidation

      if (!childValidation.isValid) {
        results.isValid = false
      }
    }

    return results
  }

  /**
   * Gets schedule with weekday colors applied
   */
  getVisualSchedule (childId) {
    const childSchedule = this.getChildSchedule(childId)
    if (!childSchedule) {
      return null
    }

    const child = childSchedule.child
    const activities = childSchedule.activities

    // Apply weekday color if available
    let dayColor = null
    if (this.weekdayColors) {
      dayColor = this.weekdayColors.getColorForDate(this.date)
    }

    // Apply visual preferences from child and weekday colors
    const visualActivities = activities.map(activity => {
      let finalColor = activity.visual ? activity.visual.color : '#FFFFFF'

      // Override with child's preferred color if simplified view is enabled
      if (child.visualPreferences && child.visualPreferences.simplifiedView &&
          child.visualPreferences.favoriteColor) {
        finalColor = child.visualPreferences.favoriteColor
      }

      return {
        ...activity,
        visual: {
          ...activity.visual,
          color: finalColor,
          dayColor
        }
      }
    })

    return {
      child,
      activities: visualActivities,
      date: this.date,
      dayColor
    }
  }

  /**
   * Gets schedule statistics
   */
  getScheduleStats () {
    const stats = {
      totalChildren: this.children.size,
      totalActivities: 0,
      averageActivitiesPerChild: 0,
      busyChildren: 0,
      date: this.date
    }

    let totalActivities = 0
    for (const activities of this.scheduleData.values()) {
      totalActivities += activities.length
      if (activities.length >= 5) {
        stats.busyChildren++
      }
    }

    stats.totalActivities = totalActivities
    stats.averageActivitiesPerChild = this.children.size > 0
      ? Math.round((totalActivities / this.children.size) * 10) / 10
      : 0

    return stats
  }

  /**
   * Exports schedule for a specific child
   */
  exportChildSchedule (childId) {
    const childSchedule = this.getChildSchedule(childId)
    if (!childSchedule) {
      return null
    }

    return {
      child: childSchedule.child.toJSON ? childSchedule.child.toJSON() : childSchedule.child,
      activities: childSchedule.activities.map(activity =>
        activity.toJSON ? activity.toJSON() : activity
      ),
      date: this.date.toISOString(),
      exportedAt: new Date().toISOString()
    }
  }

  /**
   * Exports complete day schedule
   */
  exportCompleteSchedule () {
    const schedule = {}

    for (const childId of this.children.keys()) {
      schedule[childId] = this.exportChildSchedule(childId)
    }

    return {
      date: this.date.toISOString(),
      schedules: schedule,
      metadata: this.metadata,
      stats: this.getScheduleStats(),
      exportedAt: new Date().toISOString()
    }
  }

  /**
   * Updates the schedule date
   */
  updateDate (newDate) {
    if (!(newDate instanceof Date)) {
      throw new Error('Date must be a valid Date object')
    }

    this.date = newDate
    this.metadata.lastModified = new Date()
  }

  /**
   * Gets all registered children
   */
  getChildren () {
    return Array.from(this.children.values())
  }

  /**
   * Checks if a child exists in the schedule
   */
  hasChild (childId) {
    return this.children.has(childId)
  }
}
