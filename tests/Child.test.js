import { Child } from '../src/Child.js'
import { Activity } from '../src/Activity.js'

describe('Child - Creation', () => {
  test('should create child with valid data', () => {
    const child = new Child('Emma', 6)
    
    expect(child.name).toBe('Emma')
    expect(child.age).toBe(6)
    expect(child.activities).toEqual([])
  })

  test('should generate unique ID', () => {
    const child1 = new Child('Emma', 6)
    const child2 = new Child('Alex', 7)
    
    expect(child1.id).not.toBe(child2.id)
    expect(child1.id).toMatch(/^child_\d+_[a-z0-9]{3}$/)
  })

  test('should throw error for empty name', () => {
    expect(() => {
      new Child('', 6)
    }).toThrow('Child name must be a non-empty string')
  })

  test('should throw error for invalid age', () => {
    expect(() => new Child('Test', -1))
      .toThrow('Child age must be number between 0-18')
    
    expect(() => new Child('Test', 19))
      .toThrow('Child age must be number between 0-18')
  })
})

describe('Child - Activity Management', () => {
  let child

  beforeEach(() => {
    child = new Child('Emma', 6)
  })

  test('should add activity', () => {
    const activity = new Activity('School', '08:00', '14:00')
    const result = child.addActivity(activity)
    
    expect(result).toBe(true)
    expect(child.getActivityCount()).toBe(1)
  })

  test('should throw error for non-Activity', () => {
    expect(() => {
      child.addActivity({ name: 'Not an activity' })
    }).toThrow('Activity must be an instance of Activity class')
  })

  test('should remove activity', () => {
    const activity = new Activity('School', '08:00', '14:00')
    child.addActivity(activity)
    
    const result = child.removeActivity(activity)
    
    expect(result).toBe(true)
    expect(child.getActivityCount()).toBe(0)
  })

  test('should find activities by name', () => {
    child.addActivity(new Activity('School', '08:00', '14:00'))
    child.addActivity(new Activity('Soccer', '17:00', '18:00'))
    
    const results = child.findActivitiesByName('school')
    
    expect(results).toHaveLength(1)
    expect(results[0].name).toBe('School')
  })

  test('should sort activities by time', () => {
    child.addActivity(new Activity('Lunch', '12:00', '13:00'))
    child.addActivity(new Activity('Breakfast', '07:00', '08:00'))
    child.addActivity(new Activity('Dinner', '18:00', '19:00'))
    
    const sorted = child.getActivitiesSorted()
    
    expect(sorted[0].name).toBe('Breakfast')
    expect(sorted[1].name).toBe('Lunch')
    expect(sorted[2].name).toBe('Dinner')
  })

  test('should calculate total scheduled time', () => {
    child.addActivity(new Activity('School', '08:00', '14:00'))
    child.addActivity(new Activity('Soccer', '17:00', '18:30'))
    
    expect(child.getTotalScheduledTime()).toBe(450)
  })
})