export class Activity {
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

  isValidTimeFormat (timeString) {
    if (!timeString || typeof timeString !== 'string') {
      return false
    }

    const timePattern = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/
    return timePattern.test(timeString)
  }

  timeToMinutes (timeString) {
    const [hours, minutes] = timeString.split(':').map(Number)
    return hours * 60 + minutes
  }

  calculateDuration () {
    const startMinutes = this.timeToMinutes(this.startTime)
    const endMinutes = this.timeToMinutes(this.endTime)
    return endMinutes - startMinutes
  }

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

  markCompleted () {
    this.isCompleted = true
    this.completedAt = new Date()
  }

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
