export class WeekdayColors {
  constructor () {
    this.WeekdayColors = {
      monday: '#8BC34A',
      tuesday: '#87CEEB',
      wednesday: '#FFFFFF',
      thursday: '#D2691E',
      friday: '#FFFF00',
      saturday: '#FFB6C1',
      sunday: '#FF6347'
    }

    this.swedishWeekdays = {
      måndag: 'monday',
      tisdag: 'tuesday',
      onsdag: 'wednesday',
      torsdag: 'thursday',
      fredag: 'friday',
      lördag: 'saturday',
      söndag: 'sunday'
    }

    this.dayNumbers = {
      0: 'sunday',
      1: 'monday',
      2: 'tuesday',
      3: 'wednesday',
      4: 'thursday',
      5: 'friday',
      6: 'saturday'
    }
  }

  getColorForDay (day) {
    if (typeof day === 'number') {
      // Convert day number to weekday name
      day = this.dayNumbers[day]
    } else if (typeof day === 'string') {
      // Normalize input
      day = day.toLowerCase().trim()

      // Check if it's Swedish and convert to English
      if (this.swedishWeekdays[day]) {
        day = this.swedishWeekdays[day]
      }
    }

    return this.WeekdayColors[day] || '#95A5A6' // Gray fallback
  }

  /**
   * Gets color based on Date object
   */
  getColorForDate (date) {
    if (!(date instanceof Date)) {
      throw new Error('Invalid date object')
    }

    const dayNumber = date.getDay()
    return this.getColorForDay(dayNumber)
  }

  /**
   * Gets all weekday colors as object
   */
  getAllWeekdayColors () {
    return { ...this.WeekdayColors }
  }

  /**
   * Checks if a color matches any weekday
   */
  isValidWeekdayColor (color) {
    if (!color || typeof color !== 'string') {
      return false
    }

    return Object.values(this.WeekdayColors).includes(color.toUpperCase())
  }

  /**
   * Finds which weekday has a specific color
   */
  getDayByColor (color) {
    if (!color || typeof color !== 'string') {
      return null
    }

    const normalizedColor = color.toUpperCase()

    for (const [day, dayColor] of Object.entries(this.WeekdayColors)) {
      if (dayColor.toUpperCase() === normalizedColor) {
        return day
      }
    }
    return null
  }

  /**
   * Gets appropriate text color for contrast against weekday background
   */
  getTextColorForDay (day) {
    const backgroundColor = this.getColorForDay(day)

    // Light backgrounds need dark text
    if (backgroundColor === '#FFFFFF' || backgroundColor === '#FFFF00') {
      return '#000000' // Black text
    }

    // All other colors get white text
    return '#FFFFFF' // White text
  }

  /**
   * Gets weekday colors in order from Monday to Sunday
   */
  getWeekdayColorsInOrder () {
    const orderedDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

    return orderedDays.map(day => ({
      day,
      color: this.WeekdayColors[day],
      textColor: this.getTextColorForDay(day)
    }))
  }

  /**
   * Validates if input represents a valid weekday
   */
  isValidWeekday (day) {
    if (typeof day === 'number') {
      return day >= 0 && day <= 6
    }

    if (typeof day === 'string') {
      const normalizedDay = day.toLowerCase().trim()
      return Object.prototype.hasOwnProperty.call(this.weekdayColors, normalizedDay) ||
       Object.prototype.hasOwnProperty.call(this.swedishWeekdays, normalizedDay)
    }

    return false
  }

  /**
   * Gets next weekday in sequence
   */
  getNextWeekday (currentDay) {
    if (!this.isValidWeekday(currentDay)) {
      throw new Error('Invalid weekday provided')
    }

    let dayIndex

    if (typeof currentDay === 'number') {
      dayIndex = currentDay
    } else {
      const normalizedDay = currentDay.toLowerCase().trim()
      const englishDay = this.swedishWeekdays[normalizedDay] || normalizedDay

      // Find the day index
      dayIndex = Object.keys(this.dayNumbers).find(key =>
        this.dayNumbers[key] === englishDay
      )
      dayIndex = parseInt(dayIndex)
    }

    const nextDayIndex = (dayIndex + 1) % 7
    return this.dayNumbers[nextDayIndex]
  }

  /**
   * Gets previous weekday in sequence
   */
  getPreviousWeekday (currentDay) {
    if (!this.isValidWeekday(currentDay)) {
      throw new Error('Invalid weekday provided')
    }

    let dayIndex

    if (typeof currentDay === 'number') {
      dayIndex = currentDay
    } else {
      const normalizedDay = currentDay.toLowerCase().trim()
      const englishDay = this.swedishWeekdays[normalizedDay] || normalizedDay

      dayIndex = Object.keys(this.dayNumbers).find(key =>
        this.dayNumbers[key] === englishDay
      )
      dayIndex = parseInt(dayIndex)
    }

    const prevDayIndex = (dayIndex - 1 + 7) % 7
    return this.dayNumbers[prevDayIndex]
  }

  /**
   * Exports color scheme as CSS custom properties
   */
  toCSSCustomProperties () {
    let cssOutput = ':root {\n'

    for (const [day, color] of Object.entries(this.WeekdayColors)) {
      cssOutput += `  --weekday-${day}: ${color};\n`
      cssOutput += `  --weekday-${day}-text: ${this.getTextColorForDay(day)};\n`
    }

    cssOutput += '}'
    return cssOutput
  }

  /**
   * Exports weekday colors as JSON
   */
  toJSON () {
    return {
      weekdayColors: this.getAllWeekdayColors(),
      supportedLanguages: ['english', 'swedish'],
      lastUpdated: new Date().toISOString()
    }
  }
}
