import { Activity } from '../src/Activity.js'

let passedTests = 0
let totalTests = 0
const testResults = []

/**
 * Test helper function to run and document tests
 */
function runTest (testName, testFunction, expectedResult, testMethod = 'Automated code execution') {
  totalTests++
  console.log(`\nTest ${totalTests}: ${testName}`)

  try {
    const result = testFunction()
    const passed = (expectedResult === undefined) ? true : (result === expectedResult)

    if (passed) {
      console.log('✅ PASS')
      testResults.push({
        name: testName,
        method: testMethod,
        result: 'PASS',
        details: result !== undefined ? `Result: ${result}` : 'Executed without error'
      })
      passedTests++
    } else {
      console.log(`❌ FAIL - Expected: ${expectedResult}, Got: ${result}`)
      testResults.push({
        name: testName,
        method: testMethod,
        result: 'FAIL',
        details: `Expected: ${expectedResult}, Got: ${result}`
      })
    }
  } catch (error) {
    if (expectedResult === 'ERROR') {
      console.log(`✅ PASS - Expected error caught: ${error.message}`)
      testResults.push({
        name: testName,
        method: testMethod,
        result: 'PASS',
        details: `Expected error: ${error.message}`
      })
      passedTests++
    } else {
      console.log(`❌ ERROR - ${error.message}`)
      testResults.push({
        name: testName,
        method: testMethod,
        result: 'ERROR',
        details: error.message
      })
    }
  }
}

console.log('=== VISUAL SCHEDULE - AUTOMATED TEST SUITE ===')
console.log('Testing Activity class\n')

// === CONSTRUCTOR TESTS ===
console.log('📝 CONSTRUCTOR AND VALIDATION')

runTest(
  'Create valid activity',
  () => {
    const activity = new Activity('Breakfast', '08:00', '08:30')
    return activity.name === 'Breakfast' &&
           activity.startTime === '08:00' &&
           activity.endTime === '08:30'
  },
  true,
  'Create object and verify properties'
)

runTest(
  'Calculate duration correctly',
  () => {
    const activity = new Activity('Test', '08:00', '08:30')
    return activity.duration
  },
  30,
  'Check duration property'
)

runTest(
  'Trim activity name',
  () => {
    const activity = new Activity('  Test  ', '08:00', '08:30')
    return activity.name
  },
  'Test',
  'Create activity with whitespace in name'
)

// === ERROR HANDLING TESTS ===
console.log('\n🛡️ ERROR HANDLING')

runTest(
  'Empty activity name throws error',
  () => {
    new Activity('', '08:00', '08:30')
  },
  'ERROR',
  'Attempt to create activity with empty name'
)

runTest(
  'Null activity name throws error',
  () => {
    new Activity(null, '08:00', '08:30')
  },
  'ERROR',
  'Attempt to create activity with null name'
)

runTest(
  'Invalid start time throws error',
  () => {
    new Activity('Test', '25:00', '08:30')
  },
  'ERROR',
  'Attempt to create activity with time 25:00'
)

runTest(
  'Invalid end time throws error',
  () => {
    new Activity('Test', '08:00', '24:60')
  },
  'ERROR',
  'Attempt to create activity with time 24:60'
)

runTest(
  'Start time after end time throws error',
  () => {
    new Activity('Test', '10:00', '09:00')
  },
  'ERROR',
  'Start time 10:00, end time 09:00'
)

// === TIME HANDLING TESTS ===
console.log('\n⏰ TIME HANDLING')

runTest(
  'isValidTimeFormat - valid time',
  () => {
    const activity = new Activity('Test', '08:00', '08:30')
    return activity.isValidTimeFormat('14:30')
  },
  true,
  'Tested time 14:30'
)

runTest(
  'isValidTimeFormat - invalid time',
  () => {
    const activity = new Activity('Test', '08:00', '08:30')
    return activity.isValidTimeFormat('25:00')
  },
  false,
  'Tested time 25:00'
)

runTest(
  'timeToMinutes - conversion',
  () => {
    const activity = new Activity('Test', '08:00', '08:30')
    return activity.timeToMinutes('08:30')
  },
  510,
  'Converted 08:30 to minutes'
)

// === VISUAL FUNCTIONALITY ===
console.log('\n🎨 VISUAL FUNCTIONALITY')

runTest(
  'Automatic meal color',
  () => {
    const activity = new Activity('breakfast', '08:00', '08:30')
    return activity.visual.color
  },
  '#FF6347',
  "Created activity with name 'breakfast'"
)

runTest(
  'Automatic play color',
  () => {
    const activity = new Activity('play outside', '10:00', '11:00')
    return activity.visual.color
  },
  '#8BC34A',
  "Created activity with name 'play outside'"
)

runTest(
  'Automatic meal icon',
  () => {
    const activity = new Activity('lunch', '12:00', '12:30')
    return activity.visual.icon
  },
  '🍽️',
  "Created activity with name 'lunch'"
)

runTest(
  'Default color for unknown activity',
  () => {
    const activity = new Activity('unknown activity', '10:00', '11:00')
    return activity.visual.color
  },
  '#FFFFFF',
  'Created activity with unknown name'
)

// === OVERLAP DETECTION ===
console.log('\n🔄 OVERLAP DETECTION')

runTest(
  'Detect overlap',
  () => {
    const activity1 = new Activity('Test1', '08:00', '08:30')
    const activity2 = new Activity('Test2', '08:15', '08:45')
    return activity1.overlapsWith(activity2)
  },
  true,
  'Activities 08:00-08:30 and 08:15-08:45'
)

runTest(
  'No overlap',
  () => {
    const activity1 = new Activity('Test1', '08:00', '08:30')
    const activity2 = new Activity('Test2', '09:00', '09:30')
    return activity1.overlapsWith(activity2)
  },
  false,
  'Activities 08:00-08:30 and 09:00-09:30'
)

runTest(
  'Exactly adjacent activities',
  () => {
    const activity1 = new Activity('Test1', '08:00', '08:30')
    const activity2 = new Activity('Test2', '08:30', '09:00')
    return activity1.overlapsWith(activity2)
  },
  false,
  'Activities 08:00-08:30 and 08:30-09:00'
)

// === STATUS MANAGEMENT ===
console.log('\n✅ STATUS MANAGEMENT')

runTest(
  'Mark activity as completed',
  () => {
    const activity = new Activity('Test', '08:00', '08:30')
    activity.markCompleted()
    return activity.isCompleted
  },
  true,
  'Called markCompleted() and checked isCompleted'
)

runTest(
  'Completed activity gets timestamp',
  () => {
    const activity = new Activity('Test', '08:00', '08:30')
    activity.markCompleted()
    return activity.completedAt instanceof Date
  },
  true,
  'Verified completedAt is Date object'
)

// === JSON EXPORT ===
console.log('\n📤 JSON EXPORT')

runTest(
  'Export activity as JSON',
  () => {
    const activity = new Activity('Test', '08:00', '08:30')
    const json = activity.toJSON()
    return json.name === 'Test' &&
           json.startTime === '08:00' &&
           json.duration === 30
  },
  true,
  'Called toJSON() and verified content'
)

// === TEST SUMMARY ===
console.log('\n' + '='.repeat(50))
console.log('📊 TEST SUMMARY')
console.log('='.repeat(50))
console.log(`Total tests: ${totalTests}`)
console.log(`Passed tests: ${passedTests}`)
console.log(`Failed tests: ${totalTests - passedTests}`)
console.log(`Success rate: ${Math.round((passedTests / totalTests) * 100)}%`)

if (passedTests === totalTests) {
  console.log('\n🎉 ALL TESTS PASSED!')
} else {
  console.log('\n⚠️  Some tests failed - check code')
}

// === EXPORT TEST RESULTS ===
console.log('\n📋 TEST RESULTS FOR REPORT:')
console.log('| What was tested | How it was tested | Test result |')
console.log('|----------------|------------------|-------------|')
testResults.forEach(test => {
  console.log(`| ${test.name} | ${test.method} | ${test.result} |`)
})

export { testResults, passedTests, totalTests }
