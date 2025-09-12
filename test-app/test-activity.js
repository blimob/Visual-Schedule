import { Activity } from '../src/Activity.js';

let passedTests = 0
let totalTests = 0
const results = []

function runTest(testName, testFunction, expectedResult) {
  totalTests++
  try {
    const result = testFunction()
    if (result === expectedResult) {
      console.log(`✅ PASS: ${testName}`)
      results.push({ test: testName, method: 'Automated', result: 'PASS' })
      passedTests++
    } else {
      console.log(`❌ FAIL: ${testName} - Expected: ${expectedResult}, Got: ${result}`)
      results.push({ test: testName, method: 'Automated', result: 'FAIL' })
    }
  } catch (error) {
    console.log(`❌ ERROR: ${testName} - ${error.message}`)
    results.push({ test: testName, method: 'Automated', result: 'ERROR' })
  }
}

// Tester här...
runTest("Create valid activity", () => {
  const activity = new Activity("Frukost", "08:00", "08:30")
  return activity.name === "Breakfast"
}, true)

// Slutrapport
console.log(`\nTests passed: ${passedTests}/${totalTests}`)