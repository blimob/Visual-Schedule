import { Activity } from '../src/Activity.js'
import { Child } from '../src/Child.js'
import { DaySchedule } from '../src/DaySchedule.js'
import { WeekdayColors } from '../src/weekdayColors.js'
import { ScheduleValidator } from '../src/ScheduleValidator.js'

let passedTests = 0
let totalTests = 0
const testResults = []

function runTest (testName, testFunction, expectedResult, testMethod = 'Automated code execution') {
  totalTests++
  console.log(`\nTest ${totalTests}: ${testName}`)

  try {
    const result = testFunction()
    const passed = (expectedResult === undefined) ? true : (result === expectedResult)

    if (passed) {
      console.log('✅ PASS')
      testResults.push({ name: testName, method: testMethod, result: 'PASS' })
      passedTests++
    } else {
      console.log(`❌ FAIL - Expected: ${expectedResult}, Got: ${result}`)
      testResults.push({ name: testName, method: testMethod, result: 'FAIL' })
    }
  } catch (error) {
    if (expectedResult === 'ERROR') {
      console.log(`✅ PASS - Expected error caught: ${error.message}`)
      testResults.push({ name: testName, method: testMethod, result: 'PASS' })
      passedTests++
    } else {
      console.log(`❌ ERROR - ${error.message}`)
      testResults.push({ name: testName, method: testMethod, result: 'ERROR' })
    }
  }
}

console.log('=== COMPLETE VISUAL SCHEDULE TEST SUITE ===')
console.log('Testing all classes\n')

// === ACTIVITY TESTS ===
console.log('📝 ACTIVITY CLASS TESTS')

runTest(
  'Activity - Create valid activity',
  () => {
    const activity = new Activity('Breakfast', '08:00', '08:30')
    return activity.name === 'Breakfast' && activity.duration === 30
  },
  true
)

runTest(
  'Activity - Detect overlap',
  () => {
    const activity1 = new Activity('Test1', '08:00', '08:30')
    const activity2 = new Activity('Test2', '08:15', '08:45')
    return activity1.overlapsWith(activity2)
  },
  true
)

runTest(
  'Activity - Mark completed',
  () => {
    const activity = new Activity('Test', '08:00', '08:30')
    activity.markCompleted()
    return activity.isCompleted
  },
  true
)

// === CHILD TESTS ===
console.log('\n👶 CHILD CLASS TESTS')

runTest(
  'Child - Create valid child',
  () => {
    const child = new Child('Anna', 6)
    return child.name === 'Anna' && child.age === 6
  },
  true
)

runTest(
  'Child - Invalid age throws error',
  () => {
    new Child('Test', 25)
  },
  'ERROR'
)

runTest(
  'Child - Add activity to child',
  () => {
    const child = new Child('Test', 6)
    const activity = { name: 'Breakfast', startTime: '08:00', endTime: '08:30' }
    return child.addActivity(activity)
  },
  true
)

runTest(
  'Child - Remove activity from child',
  () => {
    const child = new Child('Test', 6)
    const activity = { name: 'Breakfast', startTime: '08:00', endTime: '08:30' }
    child.addActivity(activity)
    return child.removeActivity(activity)
  },
  true
)

runTest(
  'Child - Get activity count',
  () => {
    const child = new Child('Test', 6)
    const activity = { name: 'Breakfast', startTime: '08:00', endTime: '08:30' }
    child.addActivity(activity)
    return child.getActivityCount()
  },
  1
)

runTest(
  'Child - Update visual preferences',
  () => {
    const child = new Child('Test', 6)
    child.updateVisualPreferences({ favoriteColor: '#FF0000' })
    return child.visualPreferences.favoriteColor
  },
  '#FF0000'
)

// === WEEKDAY COLORS TESTS ===
console.log('\n🌈 WEEKDAY COLORS CLASS TESTS')

runTest(
  'WeekdayColors - Get Monday color',
  () => {
    const weekdays = new WeekdayColors()
    return weekdays.getColorForDay('monday')
  },
  '#8BC34A'
)

runTest(
  'WeekdayColors - Swedish support',
  () => {
    const weekdays = new WeekdayColors()
    return weekdays.getColorForDay('måndag')
  },
  '#8BC34A'
)

runTest(
  'WeekdayColors - Date support',
  () => {
    const weekdays = new WeekdayColors()
    const monday = new Date('2024-01-01')
    return weekdays.getColorForDate(monday)
  },
  '#8BC34A'
)

runTest(
  'WeekdayColors - Text contrast',
  () => {
    const weekdays = new WeekdayColors()
    return weekdays.getTextColorForDay('friday')
  },
  '#000000'
)

runTest(
  'WeekdayColors - Color validation',
  () => {
    const weekdays = new WeekdayColors()
    return weekdays.isValidWeekdayColor('#8BC34A')
  },
  true
)

// === SCHEDULE VALIDATOR TESTS ===
console.log('\n🛡️ SCHEDULE VALIDATOR CLASS TESTS')

runTest(
  'ScheduleValidator - Validate valid activity',
  () => {
    const validator = new ScheduleValidator()
    const activity = new Activity('Test', '08:00', '08:30')
    const result = validator.validateActivity(activity)
    return result.isValid
  },
  true
)

runTest(
  'ScheduleValidator - Detect activity conflicts',
  () => {
    const validator = new ScheduleValidator()
    const activity1 = new Activity('Test1', '08:00', '08:30')
    const activity2 = new Activity('Test2', '08:15', '08:45')
    const conflicts = validator.findConflicts([activity1, activity2])
    return conflicts.length > 0
  },
  true
)

runTest(
  'ScheduleValidator - Validate empty schedule',
  () => {
    const validator = new ScheduleValidator()
    const result = validator.validateSchedule([])
    return result.isValid
  },
  true
)

runTest(
  'ScheduleValidator - Check overlap severity',
  () => {
    const validator = new ScheduleValidator()
    const activity1 = new Activity('Test1', '08:00', '08:30')
    const activity2 = new Activity('Test2', '08:15', '08:45')
    const overlap = validator.checkTimeOverlap(activity1, activity2)
    return overlap.hasOverlap
  },
  true
)

// === DAY SCHEDULE TESTS ===
console.log('\n📅 DAY SCHEDULE CLASS TESTS')

runTest(
  'DaySchedule - Create schedule',
  () => {
    const schedule = new DaySchedule()
    return schedule.date instanceof Date
  },
  true
)

runTest(
  'DaySchedule - Add child to schedule',
  () => {
    const schedule = new DaySchedule()
    const child = new Child('Test', 6)
    const childId = schedule.addChild(child)
    return schedule.hasChild(childId)
  },
  true
)

runTest(
  'DaySchedule - Add activity to child',
  () => {
    const schedule = new DaySchedule()
    const child = new Child('Test', 6)
    const childId = schedule.addChild(child)
    const activity = new Activity('Breakfast', '08:00', '08:30')
    return schedule.addActivity(childId, activity)
  },
  true
)

runTest(
  'DaySchedule - Get child schedule',
  () => {
    const schedule = new DaySchedule()
    const child = new Child('Test', 6)
    const childId = schedule.addChild(child)
    const childSchedule = schedule.getChildSchedule(childId)
    return childSchedule !== null && childSchedule.child.name === 'Test'
  },
  true
)

runTest(
  'DaySchedule - Remove child from schedule',
  () => {
    const schedule = new DaySchedule()
    const child = new Child('Test', 6)
    const childId = schedule.addChild(child)
    return schedule.removeChild(childId)
  },
  true
)

runTest(
  'DaySchedule - Get schedule statistics',
  () => {
    const schedule = new DaySchedule()
    const child = new Child('Test', 6)
    const childId = schedule.addChild(child)
    const activity = new Activity('Breakfast', '08:00', '08:30')
    schedule.addActivity(childId, activity)
    const stats = schedule.getScheduleStats()
    return stats.totalChildren === 1 && stats.totalActivities === 1
  },
  true
)

runTest(
  'DaySchedule - Export child schedule',
  () => {
    const schedule = new DaySchedule()
    const child = new Child('Test', 6)
    const childId = schedule.addChild(child)
    const exported = schedule.exportChildSchedule(childId)
    return exported !== null && exported.child.name === 'Test'
  },
  true
)

// === INTEGRATION TESTS ===
console.log('\n🔗 INTEGRATION TESTS')

runTest(
  'Integration - Schedule with weekday colors',
  () => {
    const weekdayColors = new WeekdayColors()
    const schedule = new DaySchedule(new Date(), weekdayColors)
    const child = new Child('Test', 6)
    const childId = schedule.addChild(child)
    const activity = new Activity('Breakfast', '08:00', '08:30')
    schedule.addActivity(childId, activity)
    const visualSchedule = schedule.getVisualSchedule(childId)
    return visualSchedule !== null && visualSchedule.dayColor !== null
  },
  true
)

runTest(
  'Integration - Schedule with validation',
  () => {
    const validator = new ScheduleValidator()
    const schedule = new DaySchedule(new Date(), null, validator)
    const child = new Child('Test', 6)
    const childId = schedule.addChild(child)
    const activity = new Activity('Breakfast', '08:00', '08:30')
    return schedule.addActivity(childId, activity)
  },
  true
)

// === TEST SUMMARY ===
console.log('\n' + '='.repeat(60))
console.log('📊 COMPLETE TEST SUMMARY')
console.log('='.repeat(60))
console.log(`Total tests: ${totalTests}`)
console.log(`Passed tests: ${passedTests}`)
console.log(`Failed tests: ${totalTests - passedTests}`)
console.log(`Success rate: ${Math.round((passedTests / totalTests) * 100)}%`)

if (passedTests === totalTests) {
  console.log('\n🎉 ALL CLASSES TESTED SUCCESSFULLY!')
} else {
  console.log('\n⚠️ Some tests failed - check implementation')
}

console.log('\n📋 COMPLETE TEST RESULTS:')
console.log('| Test Name | Result |')
console.log('|-----------|--------|')
testResults.forEach(test => {
  console.log(`| ${test.name} | ${test.result} |`)
})

export { testResults, passedTests, totalTests }
