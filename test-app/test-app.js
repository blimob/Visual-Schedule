import { Activity } from '../src/Activity.js'
import { Child } from '../src/Child.js'
import { DaySchedule } from '../src/DaySchedule.js'
import { getColorForDate } from '../src/weekdayColors.js'

console.log('=== MODULE INTEGRATION TESTS ===\n')

console.log('📊 Test 1: Activity duration methods')
try {
  const activity = new Activity('School', '08:00', '14:00').setIcon('📚')
  console.log(`Duration: ${activity.getDuration()} minutes`)
  console.log(`Formatted: ${activity.getFormattedDuration()}`)
  console.log('Pass\n')
} catch (error) {
  console.log('Fail:', error.message, '\n')
}

console.log('👶 Test 2: Child activity sorting')
try {
  const child = new Child('Emma', 6)
  child.addActivity(new Activity('Lunch', '12:00', '13:00'))
  child.addActivity(new Activity('Breakfast', '07:30', '08:00'))
  
  const sorted = child.getActivitiesSorted()
  console.log('Activities sorted by time:')
  sorted.forEach(a => console.log(`  ${a.startTime}: ${a.name}`))
  console.log('Pass\n')
} catch (error) {
  console.log('Fail:', error.message, '\n')
}

console.log('📅 Test 3: DaySchedule total activities')
try {
  const schedule = new DaySchedule(new Date('2025-01-06'))
  
  const child1 = new Child('Alex', 7)
  child1.addActivity(new Activity('School', '08:00', '15:00'))
  child1.addActivity(new Activity('Soccer', '17:00', '18:00'))
  
  const child2 = new Child('Ben', 8)
  child2.addActivity(new Activity('School', '08:30', '15:00'))
  
  schedule.addChild(child1)
  schedule.addChild(child2)
  
  console.log(`Total activities: ${schedule.getTotalActivities()}`)
  console.log(`Children: ${schedule.getChildrenSorted().map(c => c.name).join(', ')}`)
  console.log('Pass\n')
} catch (error) {
  console.log('Fail:', error.message, '\n')
}

console.log('Test 4: Weekday color system')
try {
  const monday = new Date('2025-01-13')
  const color = getColorForDate(monday)
  console.log(`Monday color: ${color}`)
  console.log('Pass\n')
} catch (error) {
  console.log('Fail:', error.message, '\n')
}

console.log('Test 5: Family schedule workflow')
try {
  const schedule = new DaySchedule(new Date('2025-01-13'))
  const child = new Child('Sarah', 8)
  
  child.addActivity(new Activity('School', '08:00', '15:00').setIcon('📚'))
  child.addActivity(new Activity('Piano', '16:00', '17:00').setIcon('🎹'))
  
  schedule.addChild(child)
  
  const totalTime = child.getTotalScheduledTime()
  console.log(`${child.name}: ${Math.floor(totalTime/60)}h ${totalTime%60}m scheduled`)
  console.log(`Day color: ${getColorForDate(schedule.date)}`)
  console.log('Pass\n')
} catch (error) {
  console.log('Fail:', error.message, '\n')
}