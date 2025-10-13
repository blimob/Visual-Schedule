import { getColorForDate, WEEKDAY_COLORS } from '../src/weekdayColors.js'

describe('Color System - WEEKDAY_COLORS', () => {
  test('should have exactly 7 colors', () => {
    expect(Object.keys(WEEKDAY_COLORS)).toHaveLength(7)
  })

  test('should have color for Sunday (0)', () => {
    expect(WEEKDAY_COLORS[0]).toBe('#FF6347')
  })

  test('should have color for Monday (1)', () => {
    expect(WEEKDAY_COLORS[1]).toBe('#8BC34A')
  })

  test('should have color for Tuesday (2)', () => {
    expect(WEEKDAY_COLORS[2]).toBe('#87CEEB')
  })

  test('should have color for Wednesday (3)', () => {
    expect(WEEKDAY_COLORS[3]).toBe('#FFFFFF')
  })

  test('should have color for Thursday (4)', () => {
    expect(WEEKDAY_COLORS[4]).toBe('#8B4513')
  })

  test('should have color for Friday (5)', () => {
    expect(WEEKDAY_COLORS[5]).toBe('#FFFF00')
  })

  test('should have color for Saturday (6)', () => {
    expect(WEEKDAY_COLORS[6]).toBe('#FFB6C1')
  })

  test('all colors should be valid hex codes', () => {
    const hexRegex = /^#[0-9A-F]{6}$/i
    
    Object.values(WEEKDAY_COLORS).forEach(color => {
      expect(color).toMatch(hexRegex)
    })
  })
})

describe('Color System - getColorForDate()', () => {
  test('should return correct color for Sunday', () => {
    const sunday = new Date('2025-10-19') // Sunday
    expect(getColorForDate(sunday)).toBe('#FF6347')
  })

  test('should return correct color for Monday', () => {
    const monday = new Date('2025-10-20') // Monday
    expect(getColorForDate(monday)).toBe('#8BC34A')
  })

  test('should return correct color for Tuesday', () => {
    const tuesday = new Date('2025-10-21') // Tuesday
    expect(getColorForDate(tuesday)).toBe('#87CEEB')
  })

  test('should return correct color for Wednesday', () => {
    const wednesday = new Date('2025-10-22') // Wednesday
    expect(getColorForDate(wednesday)).toBe('#FFFFFF')
  })

  test('should return correct color for Thursday', () => {
    const thursday = new Date('2025-10-23') // Thursday
    expect(getColorForDate(thursday)).toBe('#8B4513')
  })

  test('should return correct color for Friday', () => {
    const friday = new Date('2025-10-24') // Friday
    expect(getColorForDate(friday)).toBe('#FFFF00')
  })

  test('should return correct color for Saturday', () => {
    const saturday = new Date('2025-10-25') // Saturday
    expect(getColorForDate(saturday)).toBe('#FFB6C1')
  })

  test('should throw error for invalid date object', () => {
    expect(() => {
      getColorForDate('not a date')
    }).toThrow('Must be a valid Date object')
  })

  test('should throw error for null', () => {
    expect(() => {
      getColorForDate(null)
    }).toThrow('Must be a valid Date object')
  })

  test('should throw error for undefined', () => {
    expect(() => {
      getColorForDate(undefined)
    }).toThrow('Must be a valid Date object')
  })

  test('should work with different years', () => {
    const monday2024 = new Date('2024-01-01') // Monday
    const monday2025 = new Date('2025-01-06') // Monday
    
    expect(getColorForDate(monday2024)).toBe('#8BC34A')
    expect(getColorForDate(monday2025)).toBe('#8BC34A')
  })

  test('should return default gray for invalid weekday', () => {
    // This tests the fallback, though it shouldn't happen with valid Date objects
    const mockDate = {
      getDay: () => 999 // Invalid day
    }
    
    // Since we validate Date instance, this would throw
    // But if somehow an invalid day got through, it should return gray
    expect(() => {
      getColorForDate(mockDate)
    }).toThrow('Must be a valid Date object')
  })
})

describe('Color System - Edge Cases', () => {
  test('should handle leap year dates', () => {
    const leapDay = new Date('2024-02-29') // Thursday in 2024
    expect(getColorForDate(leapDay)).toBe('#8B4513')
  })

  test('should handle year transitions', () => {
    const newYearsEve = new Date('2024-12-31') // Tuesday
    const newYearsDay = new Date('2025-01-01') // Wednesday
    
    expect(getColorForDate(newYearsEve)).toBe('#87CEEB')
    expect(getColorForDate(newYearsDay)).toBe('#FFFFFF')
  })

  test('should handle dates in the past', () => {
    const past = new Date('2000-01-01') // Saturday
    expect(getColorForDate(past)).toBe('#FFB6C1')
  })
})