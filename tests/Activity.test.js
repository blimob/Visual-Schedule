import { Activity } from '../src/Activity.js'

describe('Activity - Creation', () => {
  test('should create activity with valid data', () => {
    const activity = new Activity('School', '08:00', '14:00')
    
    expect(activity.name).toBe('School')
    expect(activity.startTime).toBe('08:00')
    expect(activity.endTime).toBe('14:00')
  })

  test('should throw error for empty name', () => {
    expect(() => {
      new Activity('', '08:00', '14:00')
    }).toThrow('Activity name must be a non-empty string')
  })

  test('should throw error for invalid time format', () => {
    expect(() => {
      new Activity('School', '8:00', '14:00')
    }).toThrow('Invalid start time format')
  })

  test('should throw error when end before start', () => {
    expect(() => {
      new Activity('School', '14:00', '08:00')
    }).toThrow('End time must be after start time')
  })
})

describe('Activity - Icon', () => {
  test('should set icon and return this', () => {
    const activity = new Activity('School', '08:00', '14:00')
    const result = activity.setIcon('📚')
    
    expect(activity.visual.icon).toBe('📚')
    expect(result).toBe(activity)
  })
})

describe('Activity - Duration', () => {
  test('should calculate duration in minutes', () => {
    const activity = new Activity('School', '08:00', '14:00')
    expect(activity.getDuration()).toBe(360)
  })

  test('should format duration with hours and minutes', () => {
    const activity = new Activity('School', '08:00', '14:30')
    expect(activity.getFormattedDuration()).toBe('6h 30min')
  })

  test('should format duration with only hours', () => {
    const activity = new Activity('School', '08:00', '14:00')
    expect(activity.getFormattedDuration()).toBe('6h')
  })

  test('should format duration with only minutes', () => {
    const activity = new Activity('Break', '08:00', '08:45')
    expect(activity.getFormattedDuration()).toBe('45min')
  })
})