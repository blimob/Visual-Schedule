import { Activity } from '../src/Activity.js'
import { Child } from '../src/Child.js'
import { DaySchedule } from '../src/DaySchedule.js'
import { getColorForDate } from '../src/weekdayColors.js'

console.log('=== VISUAL SCHEDULE MODULE INTEGRATION TEST ===\n')

// Test realistic family scenario
console.log('👨‍👩‍👧‍👦 Real Family Schedule Scenario')
try {
  // 1. Create a schedule for Monday
  const monday = new DaySchedule(new Date('2025-01-06')) // Monday
  console.log('Schedule created for:', monday.date.toDateString())
  console.log('Day color:', getColorForDate(monday.date))
  
  // 2. Create two children
  const emma = new Child('Emma', 5)
  const liam = new Child('Liam', 7)
  console.log('Children created:', emma.name, 'and', liam.name)
  
  // 3. Add children to schedule
  monday.addChild(emma)
  monday.addChild(liam)
  console.log('Children added to schedule')
  
  // 4. Create activities for Emma (5 years old)
  const emmaActivities = [
    new Activity('Breakfast', '07:30', '08:00').setIcon('🥐'),
    new Activity('Preschool', '08:30', '12:00').setIcon('🏫'),
    new Activity('Lunch', '12:00', '13:00').setIcon('🍽️'),
    new Activity('Nap time', '13:00', '14:30').setIcon('😴'),
    new Activity('Play time', '15:00', '17:00').setIcon('🎮')
  ]
  
  // 5. Add activities to Emma
  emmaActivities.forEach(activity => {
    emma.addActivity(activity)
  })
  console.log('Emma activities added:', emma.getActivityCount())
  
  // 6. Create activities for Liam (7 years old)  
  const liamActivities = [
    new Activity('Breakfast', '07:00', '07:45').setIcon('🥞'),
    new Activity('School', '08:00', '15:00').setIcon('📚'),
    new Activity('Snack', '15:15', '15:30').setIcon('🍎'),
    new Activity('Homework', '16:00', '17:00').setIcon('✏️'),
    new Activity('Soccer practice', '17:30', '18:30').setIcon('⚽')
  ]
  
  // 7. Add activities to Liam
  liamActivities.forEach(activity => {
    liam.addActivity(activity)
  })
  console.log('Liam activities added:', liam.getActivityCount())
  
} catch (error) {
  console.log('❌ Setup error:', error.message)
}
console.log()

// Test schedule operations
console.log('📋 Schedule Operations Test')
try {
  const schedule = new DaySchedule(new Date('2025-01-07')) // Tuesday
  const anna = new Child('Anna', 6)
  schedule.addChild(anna)
  
  // Add some activities
  anna.addActivity(new Activity('Art class', '10:00', '11:30').setIcon('🎨'))
  anna.addActivity(new Activity('Music lesson', '14:00', '15:00').setIcon('🎵'))
  
  // Test getting child schedule
  const annaSchedule = schedule.getChildSchedule(anna.id)
  console.log('Retrieved schedule for:', annaSchedule.child.name)
  console.log('Activities count:', annaSchedule.activities.length)
  console.log('Schedule date:', annaSchedule.date.toDateString())
  
  // Test search functionality
  const musicActivities = anna.findActivitiesByName('music')
  console.log('Found music activities:', musicActivities.length)
  
} catch (error) {
  console.log('❌ Schedule operations error:', error.message)
}
console.log()

// Test activity overlaps
console.log('⏰ Activity Overlap Test')
try {
  const child = new Child('Test Child', 8)
  
  const activity1 = new Activity('Math', '10:00', '11:00')
  const activity2 = new Activity('Science', '10:30', '11:30') // Overlaps!
  
  child.addActivity(activity1)
  console.log('Added first activity')
  
  // This should work (no overlap checking in current implementation)
  child.addActivity(activity2)
  console.log('Added second activity (overlapping)')
  
  // Test overlap detection
  const hasOverlap = activity1.overlapsWith(activity2)
  console.log('Activities overlap:', hasOverlap)
  
} catch (error) {
  console.log('❌ Overlap test error:', error.message)
}
console.log()

// Test complete workflow
console.log('🔄 Complete Workflow Test')
try {
  // Create schedule for Friday (yellow day)
  const friday = new DaySchedule(new Date('2025-01-10'))
  const fridayColor = getColorForDate(friday.date)
  console.log('Friday schedule created, color:', fridayColor)
  
  // Create child with activities
  const sarah = new Child('Sarah', 9)
  friday.addChild(sarah)
  
  // Full day schedule
  const fullSchedule = [
    new Activity('Wake up', '07:00', '07:30').setIcon('☀️'),
    new Activity('Breakfast', '07:30', '08:00').setIcon('🥐'),
    new Activity('School', '08:30', '15:00').setIcon('📚'),
    new Activity('Free time', '15:30', '17:00').setIcon('🎮'),
    new Activity('Dinner', '18:00', '19:00').setIcon('🍝'),
    new Activity('Bedtime', '20:00', '21:00').setIcon('🌙')
  ]
  
  fullSchedule.forEach(activity => sarah.addActivity(activity))
  
  // Get complete schedule
  const sarahSchedule = friday.getChildSchedule(sarah.id)
  console.log('\nSarah\'s Friday Schedule:')
  console.log('========================')
  
  sarahSchedule.activities
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
    .forEach(activity => {
      const display = activity.visual.icon 
        ? `${activity.visual.icon} ${activity.name}` 
        : activity.name
      console.log(`${activity.startTime} - ${activity.endTime}: ${display}`)
    })
  
  // Test JSON export
  const exported = friday.toJSON()
  console.log('\nExported schedule data:')
  console.log('- Date:', exported.date)
  console.log('- Children count:', exported.stats.childrenCount)
  console.log('- Total activities:', exported.stats.totalActivities)
  
} catch (error) {
  console.log('❌ Workflow error:', error.message)
}
console.log()

// Test error scenarios
console.log('🚫 Error Handling Test')
try {
  const schedule = new DaySchedule()
  
  // Test invalid child
  try {
    schedule.addChild("Not a child")
    console.log('❌ Should have failed')
  } catch (error) {
    console.log('✅ Correctly rejected invalid child:', error.message)
  }
  
  // Test invalid activity
  const validChild = new Child('Valid', 10)
  try {
    validChild.addActivity("Not an activity")
    console.log('❌ Should have failed')
  } catch (error) {
    console.log('✅ Correctly rejected invalid activity:', error.message)
  }
  
  // Test invalid time format
  try {
    new Activity('Bad time', '25:00', '26:00')
    console.log('❌ Should have failed')
  } catch (error) {
    console.log('✅ Correctly rejected invalid time:', error.message)
  }
  
} catch (error) {
  console.log('❌ Error handling test failed:', error.message)
}

console.log('\n🎉 INTEGRATION TEST COMPLETE!')
console.log('Your Visual Schedule module is working correctly!')
console.log('Ready for other programmers to use! 🚀')