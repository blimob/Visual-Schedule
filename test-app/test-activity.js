import { Activity } from '../src/Activity.js'

console.log('=== ACTIVITY DISPLAY TEST ===\n')


console.log('🎨 Test 1: Activity with icon')
const painting = new Activity('Painting', '10:00', '11:30')
  .setIcon('🎨')

const displayText1 = `${painting.visual.icon} ${painting.name}`
console.log('Display text:', displayText1)
console.log('Time:', `${painting.startTime} - ${painting.endTime}`)
console.log()


console.log('📚 Test 2: Multiple activities with icons')
const activities = [
  new Activity('Breakfast', '07:00', '08:00').setIcon('🥞'),
  new Activity('School', '08:30', '15:00').setIcon('📚'),
  new Activity('Play time', '15:30', '16:30').setIcon('🎮'),
  new Activity('Dinner', '18:00', '19:00').setIcon('🍽️'),
  new Activity('Bath', '19:30', '20:00').setIcon('🛁')
]

activities.forEach(activity => {
  const display = activity.visual.icon 
    ? `${activity.visual.icon} ${activity.name}` 
    : activity.name
  console.log(`${activity.startTime}-${activity.endTime}: ${display}`)
})
console.log()

console.log('📝 Test 3: Activity without icon')
const homework = new Activity('Homework', '16:00', '17:00')
const displayText3 = homework.visual.icon 
  ? `${homework.visual.icon} ${homework.name}` 
  : `📋 ${homework.name}`

console.log('Display text:', displayText3)
console.log()

console.log('🗓️ Test 4: Complete daily schedule')
const schedule = [
  new Activity('Wake up', '07:00', '07:30').setIcon('☀️'),
  new Activity('Breakfast', '07:30', '08:00').setIcon('🥐'),
  new Activity('Get ready', '08:00', '08:30').setIcon('👕'),
  new Activity('School', '08:30', '15:00').setIcon('🏫'),
  new Activity('Snack', '15:00', '15:30').setIcon('🍎'),
  new Activity('Play', '15:30', '17:00').setIcon('⚽'),
  new Activity('Homework', '17:00', '18:00').setIcon('✏️'),
  new Activity('Dinner', '18:00', '19:00').setIcon('🍝'),
  new Activity('Family time', '19:00', '20:00').setIcon('👨‍👩‍👧‍👦'),
  new Activity('Bedtime', '20:00', '21:00').setIcon('🌙')
]

console.log('DAILY SCHEDULE:')
console.log('===============')
schedule.forEach(activity => {
  const timeRange = `${activity.startTime}-${activity.endTime}`
  const displayName = `${activity.visual.icon} ${activity.name}`
  console.log(`${timeRange.padEnd(11)} | ${displayName}`)
})
