import { Activity } from '../src/Activity.js'
import { Child } from '../src/Child.js'
import { DaySchedule } from '../src/DaySchedule.js'
import { getColorForDate } from '../src/weekdayColors.js'

console.log('=== COMPLETE MODULE TEST ===\n')

// Test Activity new methods
console.log('📊 Test 1: Activity duration methods')
try {
  const breakfast = new Activity('Breakfast', '07:30', '08:15').setIcon('🥐')
  
  console.log(`Activity: ${breakfast.name}`)
  console.log(`Duration (minutes): ${breakfast.getDuration()}`)
  console.log(`Formatted duration: ${breakfast.getFormattedDuration()}`)
  
  const longActivity = new Activity('School', '08:30', '15:00').setIcon('📚')
  console.log(`\nLong activity: ${longActivity.name}`)
  console.log(`Duration: ${longActivity.getDuration()} minutes`)
  console.log(`Formatted: ${longActivity.getFormattedDuration()}`)
  
} catch (error) {
  console.log('Error:', error.message)
}
console.log()

// Test Child new methods
console.log('👶 Test 2: Child sorting and time calculation')
try {
  const emma = new Child('Emma', 6)
  
  // Add activities in random order
  emma.addActivity(new Activity('Lunch', '12:00', '13:00').setIcon('🍽️'))
  emma.addActivity(new Activity('Breakfast', '07:30', '08:00').setIcon('🥐'))
  emma.addActivity(new Activity('Play', '15:00', '17:00').setIcon('⚽'))
  emma.addActivity(new Activity('School', '08:30', '15:00').setIcon('📚'))
  
  console.log('Activities added in random order')
  console.log('Total activities:', emma.getActivityCount())
  
  // Test sorted activities
  console.log('\nActivities sorted by time:')
  const sorted = emma.getActivitiesSorted()
  sorted.forEach(activity => {
    const display = activity.visual.icon 
      ? `${activity.visual.icon} ${activity.name}` 
      : activity.name
    console.log(`  ${activity.startTime}-${activity.endTime}: ${display}`)
  })
  
  // Test total scheduled time
  const totalMinutes = emma.getTotalScheduledTime()
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  console.log(`\nTotal scheduled time: ${totalMinutes} minutes (${hours}h ${minutes}m)`)
  
} catch (error) {
  console.log('Error:', error.message)
}
console.log()

// Test DaySchedule new methods
console.log('📅 Test 3: DaySchedule statistics and sorting')
try {
  const schedule = new DaySchedule(new Date('2025-01-06'))
  
  // Create multiple children
  const child1 = new Child('Zara', 5)
  const child2 = new Child('Alex', 7)
  const child3 = new Child('Ben', 8)
  
  // Add activities to each child
  child1.addActivity(new Activity('Play', '10:00', '11:00'))
  child1.addActivity(new Activity('Lunch', '12:00', '13:00'))
  
  child2.addActivity(new Activity('School', '08:00', '15:00'))
  child2.addActivity(new Activity('Homework', '16:00', '17:00'))
  child2.addActivity(new Activity('Soccer', '17:30', '18:30'))
  
  child3.addActivity(new Activity('Breakfast', '07:00', '08:00'))
  child3.addActivity(new Activity('School', '08:30', '15:00'))
  
  // Add children to schedule
  schedule.addChild(child1)
  schedule.addChild(child2)
  schedule.addChild(child3)
  
  console.log(`Schedule date: ${schedule.date.toDateString()}`)
  console.log(`Total children: ${schedule.getChildren().length}`)
  
  // Test total activities across all children
  const totalActivities = schedule.getTotalActivities()
  console.log(`Total activities across all children: ${totalActivities}`)
  
  // Test children sorted by name
  console.log('\nChildren sorted alphabetically:')
  const sortedChildren = schedule.getChildrenSorted()
  sortedChildren.forEach(child => {
    console.log(`  ${child.name} (${child.age} years) - ${child.getActivityCount()} activities`)
  })
  
} catch (error) {
  console.log('Error:', error.message)
}
console.log()

// Test realistic family scenario
console.log('Test 4: Complete family schedule')
try {
  const monday = new DaySchedule(new Date('2025-01-13'))
  const dayColor = getColorForDate(monday.date)
  
  console.log(`Schedule for: ${monday.date.toDateString()}`)
  console.log(`Day color: ${dayColor}`)
  
  // Create family members
  const mom = new Child('Mom', 35)
  const dad = new Child('Dad', 37)
  const kid1 = new Child('Sarah', 8)
  const kid2 = new Child('Lucas', 5)
  
  // Mom's schedule
  mom.addActivity(new Activity('Morning routine', '06:00', '07:00').setIcon('☀️'))
  mom.addActivity(new Activity('Work', '09:00', '17:00').setIcon('💼'))
  mom.addActivity(new Activity('Grocery shopping', '17:30', '18:30').setIcon('🛒'))
  
  // Dad's schedule
  dad.addActivity(new Activity('Gym', '06:00', '07:00').setIcon('🏋️'))
  dad.addActivity(new Activity('Work', '08:00', '16:00').setIcon('💼'))
  dad.addActivity(new Activity('Cook dinner', '18:30', '19:30').setIcon('🍳'))
  
  // Kids' schedules
  kid1.addActivity(new Activity('School', '08:00', '15:00').setIcon('📚'))
  kid1.addActivity(new Activity('Piano lesson', '16:00', '17:00').setIcon('🎹'))
  
  kid2.addActivity(new Activity('Preschool', '08:30', '12:00').setIcon('🏫'))
  kid2.addActivity(new Activity('Nap', '13:00', '14:30').setIcon('😴'))
  
  // Add to schedule
  monday.addChild(mom)
  monday.addChild(dad)
  monday.addChild(kid1)
  monday.addChild(kid2)
  
  console.log('\nFamily Schedule Overview:')
  console.log('='.repeat(50))
  
  const familyMembers = monday.getChildrenSorted()
  familyMembers.forEach(member => {
    const totalTime = member.getTotalScheduledTime()
    const hours = Math.floor(totalTime / 60)
    const minutes = totalTime % 60
    
    console.log(`\n${member.name} (${member.age} years)`)
    console.log(`Total scheduled: ${hours}h ${minutes}m`)
    console.log('Activities:')
    
    member.getActivitiesSorted().forEach(activity => {
      const display = activity.visual.icon 
        ? `${activity.visual.icon} ${activity.name}` 
        : activity.name
      console.log(`  ${activity.startTime}-${activity.endTime}: ${display} (${activity.getFormattedDuration()})`)
    })
  })
  
  console.log('\n' + '='.repeat(50))
  console.log(`Total family activities: ${monday.getTotalActivities()}`)
  
} catch (error) {
  console.log('Error:', error.message)
}

console.log('\n✅ ALL TESTS COMPLETE!')
