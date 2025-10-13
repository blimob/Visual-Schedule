import { Activity } from '../src/Activity.js'

describe('Activity - Creation', () => {
  test('should create activity with valid data', () => {
    const activity = new Activity('School', '08:00', '14:00')
    expect(activity.name).toBe('School')
  })
  
  test('should throw error for empty name', () => {
    expect(() => new Activity('', '08:00', '14:00'))
      .toThrow('Activity name must be a non-empty string')
  })
})

describe('Activity - Icon', () => {
  test('should set icon', () => {
    const activity = new Activity('School', '08:00', '14:00')
    activity.setIcon('🏫')
    expect(activity.visual.icon).toBe('🏫')
  })
})

describe('Activity - Duration', () => {
  test('should calculate duration', () => {
    const activity = new Activity('School', '08:00', '14:00')
    expect(activity.getDuration()).toBe(360)
  })
})
