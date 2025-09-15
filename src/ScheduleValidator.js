/**
 * ScheduleValidator - Validates schedules and detects conflicts between activities
 * Handles time validation, overlap detection, and schedule integrity checks
 */
export class ScheduleValidator {
  constructor () {
    // Validation rules configuration
    this.validationRules = {
      maxDailyHours: 16,
      minActivityDuration: 5,
      maxActivityDuration: 480,
      allowedTimeGap: 0,
      businessHoursStart: '06:00',
      businessHoursEnd: '22:00'
    }

    // Common validation patterns
    this.timePattern = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/
    this.conflicts = []
  }

  /**
   * Validates time format (HH:MM)
   */
  isValidTimeFormat (timeString) {
    if (!timeString || typeof timeString !== 'string') {
      return false
    }
    return this.timePattern.test(timeString)
  }

  /**
   * Converts time string to minutes
   */
  timeToMinutes (timeString) {
    const [hours, minutes] = timeString.split(':').map(Number)
    return hours * 60 + minutes
  }

  /**
   * Converts minutes to time string
   */
  minutesToTime (minutes) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
  }

  /**
   * Validates a single activity for basic requirements
   */
  validateActivity (activity) {
    const errors = []

    if (!activity) {
      errors.push('Activity cannot be null or undefined')
      return { isValid: false, errors }
    }

    // Check required properties
    if (!activity.name || typeof activity.name !== 'string') {
      errors.push('Activity must have a valid name')
    }

    if (!activity.startTime || !this.isValidTimeFormat(activity.startTime)) {
      errors.push('Activity must have a valid start time (HH:MM format)')
    }

    if (!activity.endTime || !this.isValidTimeFormat(activity.endTime)) {
      errors.push('Activity must have a valid end time (HH:MM format)')
    }

    // Time logic validation
    if (activity.startTime && activity.endTime &&
        this.isValidTimeFormat(activity.startTime) &&
        this.isValidTimeFormat(activity.endTime)) {
      const startMinutes = this.timeToMinutes(activity.startTime)
      const endMinutes = this.timeToMinutes(activity.endTime)
      const duration = endMinutes - startMinutes

      if (duration <= 0) {
        errors.push('End time must be after start time')
      }

      if (duration < this.validationRules.minActivityDuration) {
        errors.push(`Activity duration must be at least ${this.validationRules.minActivityDuration} minutes`)
      }

      if (duration > this.validationRules.maxActivityDuration) {
        errors.push(`Activity duration cannot exceed ${this.validationRules.maxActivityDuration} minutes`)
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  /**
   * Validates an entire schedule (array of activities)
   */
  validateSchedule (activities) {
    const results = {
      isValid: true,
      activityErrors: [],
      conflicts: [],
      warnings: []
    }

    if (!Array.isArray(activities)) {
      results.isValid = false
      results.activityErrors.push('Schedule must be an array of activities')
      return results
    }

    // Validate each activity individually
    for (let i = 0; i < activities.length; i++) {
      const validation = this.validateActivity(activities[i])
      if (!validation.isValid) {
        results.isValid = false
        results.activityErrors.push({
          index: i,
          activity: activities[i],
          errors: validation.errors
        })
      }
    }

    // Check for conflicts between activities
    const conflicts = this.findConflicts(activities)
    if (conflicts.length > 0) {
      results.conflicts = conflicts
      if (conflicts.some(conflict => conflict.severity === 'error')) {
        results.isValid = false
      }
    }

    // Check for schedule warnings
    const warnings = this.checkScheduleWarnings(activities)
    results.warnings = warnings

    return results
  }

  /**
   * Finds time conflicts between activities
   */
  findConflicts (activities) {
    const conflicts = []
    const validActivities = activities.filter(activity =>
      activity && activity.startTime && activity.endTime
    )

    for (let i = 0; i < validActivities.length; i++) {
      for (let j = i + 1; j < validActivities.length; j++) {
        const activity1 = validActivities[i]
        const activity2 = validActivities[j]

        const overlap = this.checkTimeOverlap(activity1, activity2)
        if (overlap.hasOverlap) {
          conflicts.push({
            type: 'time_overlap',
            severity: overlap.severity,
            activity1,
            activity2,
            overlapMinutes: overlap.overlapMinutes,
            description: `"${activity1.name}" and "${activity2.name}" overlap by ${overlap.overlapMinutes} minutes`
          })
        }
      }
    }

    return conflicts
  }

  /**
   * Checks for time overlap between two activities
   */
  checkTimeOverlap (activity1, activity2) {
    const start1 = this.timeToMinutes(activity1.startTime)
    const end1 = this.timeToMinutes(activity1.endTime)
    const start2 = this.timeToMinutes(activity2.startTime)
    const end2 = this.timeToMinutes(activity2.endTime)

    const overlapStart = Math.max(start1, start2)
    const overlapEnd = Math.min(end1, end2)
    const overlapMinutes = Math.max(0, overlapEnd - overlapStart)

    const hasOverlap = overlapMinutes > 0

    // Determine severity based on overlap amount
    let severity = 'info'
    if (hasOverlap) {
      if (overlapMinutes >= 30) {
        severity = 'error' // Major conflict
      } else if (overlapMinutes >= 10) {
        severity = 'warning' // Minor conflict
      } else {
        severity = 'info' // Slight overlap, might be acceptable
      }
    }

    return {
      hasOverlap,
      overlapMinutes,
      severity,
      overlapStart: this.minutesToTime(overlapStart),
      overlapEnd: this.minutesToTime(overlapEnd)
    }
  }

  /**
   * Checks for schedule warnings (not errors, but potential issues)
   */
  checkScheduleWarnings (activities) {
    const warnings = []

    if (activities.length === 0) {
      warnings.push('Schedule is empty - no activities planned')
      return warnings
    }

    // Calculate total scheduled time
    let totalMinutes = 0
    const validActivities = activities.filter(activity =>
      activity && activity.startTime && activity.endTime
    )

    for (const activity of validActivities) {
      const duration = this.timeToMinutes(activity.endTime) - this.timeToMinutes(activity.startTime)
      totalMinutes += duration
    }

    const totalHours = totalMinutes / 60
    if (totalHours > this.validationRules.maxDailyHours) {
      warnings.push(`Schedule exceeds recommended daily hours (${totalHours.toFixed(1)} > ${this.validationRules.maxDailyHours})`)
    }

    // Check for activities outside business hours
    for (const activity of validActivities) {
      const startMinutes = this.timeToMinutes(activity.startTime)
      const businessStart = this.timeToMinutes(this.validationRules.businessHoursStart)
      const businessEnd = this.timeToMinutes(this.validationRules.businessHoursEnd)

      if (startMinutes < businessStart || startMinutes > businessEnd) {
        warnings.push(`"${activity.name}" is scheduled outside typical hours (${activity.startTime})`)
      }
    }

    // Check for very short gaps between activities
    const sortedActivities = validActivities.sort((a, b) =>
      this.timeToMinutes(a.startTime) - this.timeToMinutes(b.startTime)
    )

    for (let i = 0; i < sortedActivities.length - 1; i++) {
      const current = sortedActivities[i]
      const next = sortedActivities[i + 1]

      const currentEnd = this.timeToMinutes(current.endTime)
      const nextStart = this.timeToMinutes(next.startTime)
      const gap = nextStart - currentEnd

      if (gap < 5 && gap >= 0) {
        warnings.push(`Very short gap (${gap} minutes) between "${current.name}" and "${next.name}"`)
      }
    }

    return warnings
  }

  /**
   * Updates validation rules
   */
  updateValidationRules (newRules) {
    if (newRules && typeof newRules === 'object') {
      this.validationRules = { ...this.validationRules, ...newRules }
    }
  }

  /**
   * Gets current validation configuration
   */
  getValidationRules () {
    return { ...this.validationRules }
  }
}
