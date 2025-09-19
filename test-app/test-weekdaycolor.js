import { WEEKDAY_COLORS, getColorForDate } from '../src/weekdayColors.js'

console.log('=== WEEKDAY COLORS TEST ===\n')

// Test 1: Check all weekday colors exist
console.log('📅 Test 1: All weekday colors')
const expectedDays = [0, 1, 2, 3, 4, 5, 6]
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

expectedDays.forEach(dayNumber => {
  const color = WEEKDAY_COLORS[dayNumber]
  const dayName = dayNames[dayNumber]
  console.log(`${dayNumber} (${dayName}): ${color}`)
})
console.log()

// Test 2: Test getColorForDate function with specific dates
console.log('🎯 Test 2: getColorForDate function')
try {
  // Create specific dates for each day of the week
  const testDates = [
    new Date('2025-01-05'), // Sunday
    new Date('2025-01-06'), // Monday
    new Date('2025-01-07'), // Tuesday
    new Date('2025-01-08'), // Wednesday
    new Date('2025-01-09'), // Thursday
    new Date('2025-01-10'), // Friday
    new Date('2025-01-11')  // Saturday
  ]

  testDates.forEach((date, index) => {
    const color = getColorForDate(date)
    const dayName = dayNames[date.getDay()]
    const expected = WEEKDAY_COLORS[date.getDay()]
    const match = color === expected ? '✅' : '❌'
    
    console.log(`${date.toDateString()} (${dayName}): ${color} ${match}`)
  })
  
} catch (error) {
  console.log('❌ Error:', error.message)
}
console.log()

// Test 3: Test invalid date (should fail)
console.log('🚫 Test 3: Invalid date (should fail)')
try {
  const color = getColorForDate("not a date")
  console.log('❌ This should have failed!')
} catch (error) {
  console.log('✅ Correct error:', error.message)
}
console.log()

// Test 4: Test with today's date
console.log('📊 Test 4: Today\'s color')
try {
  const today = new Date()
  const todayColor = getColorForDate(today)
  const todayName = dayNames[today.getDay()]
  
  console.log(`Today is ${today.toDateString()} (${todayName})`)
  console.log(`Today's color: ${todayColor}`)
  
} catch (error) {
  console.log('❌ Error:', error.message)
}
console.log()

// Test 5: Verify brown color for Thursday
console.log('🤎 Test 5: Verify Thursday is brown')
const thursdayColor = WEEKDAY_COLORS[4]
console.log(`Thursday color: ${thursdayColor}`)

// Check if it's a brownish color (should start with #8B or be a brown hex)
if (thursdayColor.toLowerCase() === '#8b4513') {
  console.log('✅ Thursday is saddle brown')
} else if (thursdayColor.toLowerCase() === '#d2691e') {
  console.log('⚠️  Thursday is chocolate/orange-brown')
} else {
  console.log(`ℹ️  Thursday is: ${thursdayColor}`)
}
console.log()

// Test 6: Color format validation
console.log('🎨 Test 6: Color format validation')
let allValidFormat = true

for (const [day, color] of Object.entries(WEEKDAY_COLORS)) {
  const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(color)
  if (!isValidHex) {
    console.log(`❌ Invalid hex format for day ${day}: ${color}`)
    allValidFormat = false
  }
}

if (allValidFormat) {
  console.log('✅ All colors have valid hex format (#RRGGBB)')
} else {
  console.log('❌ Some colors have invalid format')
}