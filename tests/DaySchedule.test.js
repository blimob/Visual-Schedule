import { DaySchedule } from '../src/DaySchedule.js'
import { Child } from '../src/Child.js'
import { Activity } from '../src/Activity.js'

describe('DaySchedule - Creation', () => {
  test('should create schedule with date', () => {
    const testDate = new Date('2025-10-20')
    const schedule = new DaySchedule(testDate)
    
    expect(schedule.date).toEqual(testDate)
    expect(schedule.getChildren()).toHaveLength(0)
  })

  test('should create schedule with default date', () => {
    const schedule = new DaySchedule()
    expect(schedule.date).toBeInstanceOf(Date)
  })
})

describe('DaySchedule - Child Management', () => {
  let schedule
  let testDate

  beforeEach(() => {
    testDate = new Date('2025-10-20')
    schedule = new DaySchedule(testDate)
  })

  test('should add child and return ID', () => {
    const child = new Child('Emma', 6)
    const childId = schedule.addChild(child)
    
    expect(childId).toBe(child.id)
    expect(schedule.hasChild(childId)).toBe(true)
  })

  test('should throw error for non-Child object', () => {
    expect(() => {
      schedule.addChild({ name: 'Not a child' })
    }).toThrow('Must be a Child instance')
  })

  test('should get child by ID', () => {
    const child = new Child('Emma', 6)
    const childId = schedule.addChild(child)
    
    const retrieved = schedule.getChild(childId)
    
    expect(retrieved).toBe(child)
    expect(retrieved.name).toBe('Emma')
  })

  test('should return null for non-existent child', () => {
    const result = schedule.getChild('fake-id-12345')
    expect(result).toBeNull()
  })

  test('should get all children', () => {
    const child1 = new Child('Emma', 6)
    const child2 = new Child('Alex', 7)
    
    schedule.addChild(child1)
    schedule.addChild(child2)
    
    const children = schedule.getChildren()
    
    expect(children).toHaveLength(2)
    expect(children).toContain(child1)
    expect(children).toContain(child2)
  })

  test('should remove child successfully', () => {
    const child = new Child('Emma', 6)
    const childId = schedule.addChild(child)
    
    const result = schedule.removeChild(childId)
    
    expect(result).toBe(true)
    expect(schedule.hasChild(childId)).toBe(false)
    expect(schedule.getChildren()).toHaveLength(0)
  })

  test('should return false when removing non-existent child', () => {
    const result = schedule.removeChild('non-existent-id')
    expect(result).toBe(false)
  })

  test('should check if child exists', () => {
    const child = new Child('Emma', 6)
    const childId = schedule.addChild(child)
    
    expect(schedule.hasChild(childId)).toBe(true)
    expect(schedule.hasChild('fake-id')).toBe(false)
  })
})

describe('DaySchedule - Child Schedule', () => {
  let schedule
  let child

  beforeEach(() => {
    schedule = new DaySchedule(new Date('2025-10-20'))
    child = new Child('Emma', 6)
  })

  test('should get complete child schedule', () => {
    const activity = new Activity('School', '08:00', '14:00')
    child.addActivity(activity)
    
    const childId = schedule.addChild(child)
    const childSchedule = schedule.getChildSchedule(childId)
    
    expect(childSchedule).not.toBeNull()
    expect(childSchedule.child).toBe(child)
    expect(childSchedule.activities).toHaveLength(1)
    expect(childSchedule.activities[0]).toBe(activity)
    expect(childSchedule.date).toEqual(schedule.date)
  })

  test('should return null for non-existent child schedule', () => {
    const result = schedule.getChildSchedule('fake-id')
    expect(result).toBeNull()
  })

  test('child schedule should include all activities', () => {
    child.addActivity(new Activity('School', '08:00', '14:00'))
    child.addActivity(new Activity('Soccer', '17:00', '18:00'))
    child.addActivity(new Activity('Dinner', '18:30', '19:30'))
    
    const childId = schedule.addChild(child)
    const childSchedule = schedule.getChildSchedule(childId)
    
    expect(childSchedule.activities).toHaveLength(3)
  })
})

describe('DaySchedule - Statistics', () => {
  let schedule

  beforeEach(() => {
    schedule = new DaySchedule(new Date('2025-10-20'))
  })

  test('should count total activities across all children', () => {
    const child1 = new Child('Emma', 6)
    child1.addActivity(new Activity('School', '08:00', '14:00'))
    child1.addActivity(new Activity('Soccer', '17:00', '18:00'))
    
    const child2 = new Child('Alex', 7)
    child2.addActivity(new Activity('School', '08:30', '15:00'))
    
    schedule.addChild(child1)
    schedule.addChild(child2)
    
    expect(schedule.getTotalActivities()).toBe(3)
  })

  test('should return zero activities for empty schedule', () => {
    expect(schedule.getTotalActivities()).toBe(0)
  })

  test('should count activities after adding children', () => {
    const child = new Child('Emma', 6)
    child.addActivity(new Activity('Test', '10:00', '11:00'))
    
    expect(schedule.getTotalActivities()).toBe(0)
    
    schedule.addChild(child)
    
    expect(schedule.getTotalActivities()).toBe(1)
  })
})

describe('DaySchedule - Sorting', () => {
  let schedule

  beforeEach(() => {
    schedule = new DaySchedule(new Date('2025-10-20'))
  })

  test('should sort children alphabetically by name', () => {
    const zara = new Child('Zara', 5)
    const alex = new Child('Alex', 7)
    const ben = new Child('Ben', 8)
    
    schedule.addChild(zara)
    schedule.addChild(alex)
    schedule.addChild(ben)
    
    const sorted = schedule.getChildrenSorted()
    
    expect(sorted[0].name).toBe('Alex')
    expect(sorted[1].name).toBe('Ben')
    expect(sorted[2].name).toBe('Zara')
  })

  test('should handle single child', () => {
    const child = new Child('Emma', 6)
    schedule.addChild(child)
    
    const sorted = schedule.getChildrenSorted()
    
    expect(sorted).toHaveLength(1)
    expect(sorted[0].name).toBe('Emma')
  })

  test('should return empty array when no children', () => {
    const sorted = schedule.getChildrenSorted()
    expect(sorted).toEqual([])
  })

  test('should sort case-insensitively', () => {
    const emma = new Child('emma', 6)
    const Alex = new Child('Alex', 7)
    
    schedule.addChild(emma)
    schedule.addChild(Alex)
    
    const sorted = schedule.getChildrenSorted()
    
    expect(sorted[0].name).toBe('Alex')
    expect(sorted[1].name).toBe('emma')
  })
})