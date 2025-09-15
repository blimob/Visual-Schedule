import { WeekdayColors } from '../src/weekdayColors.js'

console.log('=== WEEKDAY COLORS TEST ===')

const weekdays = new WeekdayColors()

// Test basic color retrieval
console.log('\n📅 Basic weekday colors:')
console.log('Monday:', weekdays.getColorForDay('monday'))
console.log('Tuesday:', weekdays.getColorForDay('tuesday'))
console.log('Wednesday:', weekdays.getColorForDay('wednesday'))
console.log('Thursday:', weekdays.getColorForDay('thursday'))
console.log('Friday:', weekdays.getColorForDay('friday'))
console.log('Saturday:', weekdays.getColorForDay('saturday'))
console.log('Sunday:', weekdays.getColorForDay('sunday'))

// Test Swedish support
console.log('\n🇸🇪 Swedish weekday support:')
console.log('Måndag:', weekdays.getColorForDay('måndag'))
console.log('Fredag:', weekdays.getColorForDay('fredag'))
console.log('Söndag:', weekdays.getColorForDay('söndag'))

// Test date object support
console.log('\n📆 Date object support:')
const monday = new Date('2024-01-01')
const friday = new Date('2024-01-05')
console.log('Jan 1, 2024 (Monday):', weekdays.getColorForDate(monday))
console.log('Jan 5, 2024 (Friday):', weekdays.getColorForDate(friday))

// Test text color contrast
console.log('\n🎨 Text color contrast:')
console.log('Yellow background needs:', weekdays.getTextColorForDay('friday'))
console.log('White background needs:', weekdays.getTextColorForDay('wednesday'))
console.log('Green background needs:', weekdays.getTextColorForDay('monday'))

// Test all weekdays in order
console.log('\n📋 All weekdays with colors and text:')
const allColors = weekdays.getWeekdayColorsInOrder()
allColors.forEach(day => {
  console.log(`${day.day.toUpperCase()}: ${day.color} (text: ${day.textColor})`)
})

// Test error handling
console.log('\n🛡️ Error handling:')
try {
  const invalidDate = weekdays.getColorForDate('not a date')
} catch (error) {
  console.log('Invalid date error caught:', error.message)
}

// Test color validation
console.log('\n✅ Color validation:')
console.log('Is #8BC34A valid weekday color?', weekdays.isValidWeekdayColor('#8BC34A'))
console.log('Is #000000 valid weekday color?', weekdays.isValidWeekdayColor('#000000'))

// Test find day by color
console.log('\n🔍 Find day by color:')
console.log('Which day has #FFFF00?', weekdays.getDayByColor('#FFFF00'))
console.log('Which day has #FF6347?', weekdays.getDayByColor('#FF6347'))

console.log('\n✨ WeekdayColors test completed!')
