export class Activity {
  constructor(name, startTime, endTime, visualConfig = {}) {

    if (!name || typeof name !== 'string') {
      throw new Error('Activity name must be a non-empty string.')
    }
    if (!this.isValidTimeFormat(startTime)) {
      throw new Error('Invalid start time format. Use HH:HH')
    }
    if (!this.isValidTimeFormat(endTime)) {
      throw new Error('Invalid end time format. Use HH:HH')
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

  isValidTimeFormat(timeString) {
    if (!timeString || typeof timeString !== 'string') {
      return false
    }
  }
}