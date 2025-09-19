import { Activity } from '../src/Activity.js'
import { Child } from '../src/Child.js'

console.log('=== COMPLETE CHILD CLASS TEST ===\n')

// Test 1: Create child
console.log('👶 Test 1: Create child')
try {
  const anna = new Child('Anna', 6)
  console.log('✅ Child created:')
  console.log('   Name:', anna.name)
  console.log('   Age:', anna.age)
  console.log('   ID:', anna.id)
  console.log('   Activities:', anna.getActivityCount())
} catch (error) {
  console.log('❌ Error:', error.message)
}
console.log()

// Test 2: Validation - invalid name
console.log('🚫 Test 2: Invalid name (should fail)')
try {
  const badChild = new Child('', 8)
  console.log('❌ This should have failed!')
} catch (error) {
  console.log('✅ Correct error:', error.message)
}
console.log()

// Test 3: Validation - invalid age  
console.log('🚫 Test 3: Too old age (should fail)')
try {
  const oldChild = new Child('Adult', 25)
  console.log('❌ This should have failed!')
} catch (error) {
  console.log('✅ Correct error:', error.message)
}
console.log()

// Test 4: Add activities
console.log('📚 Test 4: Add activities')
try {
  const erik = new Child('Erik', 8)
  
  const breakfast = new Activity('Breakfast', '07:30', '08:00').setIcon('🥞')
  const school = new Activity('School', '08:30', '15:00').setIcon('📚')
  const play = new Activity('Play time', '15:30', '17:00').setIcon('⚽')
  
  console.log('Adding activities...')
  erik.addActivity(breakfast)
  erik.addActivity(school)
  erik.addActivity(play)
  
  console.log('✅ Activities added:')
  console.log('   Count:', erik.getActivityCount())
  
  const activities = erik.getActivities()
  activities.forEach((activity, index) => {
    const display = activity.visual.icon 
      ? `${activity.visual.icon} ${activity.name}` 
      : activity.name
    console.log(`   ${index + 1}. ${display} (${activity.startTime}-${activity.endTime})`)
  })
  
} catch (error) {
  console.log('❌ Error:', error.message)
}
console.log()

// Test 5: Wrong activity type
console.log('🚫 Test 5: Wrong activity type (should fail)')
try {
  const child = new Child('Test', 10)
  child.addActivity("Not an Activity")  // String instead of Activity
  console.log('❌ This should have failed!')
} catch (error) {
  console.log('✅ Correct error:', error.message)
}
console.log()

// Test 6: Remove activity
console.log('🗑️ Test 6: Remove activity')
try {
  const child = new Child('Lisa', 7)
  
  const activity1 = new Activity('Lunch', '12:00', '13:00')
  const activity2 = new Activity('Rest', '13:00', '14:00')
  
  child.addActivity(activity1)
  child.addActivity(activity2)
  console.log('Before removal:', child.getActivityCount(), 'activities')
  
  const removed = child.removeActivity(activity1)
  console.log('Activity removed:', removed)
  console.log('After removal:', child.getActivityCount(), 'activities')
  
  const remaining = child.getActivities()
  console.log('Remaining:', remaining[0].name)
  
} catch (error) {
  console.log('❌ Error:', error.message)
}
console.log()

// Test 7: Search activities
console.log('🔍 Test 7: Search activities')
try {
  const child = new Child('Oscar', 9)
  
  child.addActivity(new Activity('Mathematics', '09:00', '10:00'))
  child.addActivity(new Activity('English', '10:00', '11:00'))
  child.addActivity(new Activity('Math lesson', '14:00', '15:00'))
  
  console.log('All activities:', child.getActivityCount())
  
  const mathActivities = child.findActivitiesByName('math')
  console.log('Found "math":', mathActivities.length, 'activities')
  mathActivities.forEach(activity => {
    console.log('   -', activity.name)
  })
  
  const noMatch = child.findActivitiesByName('physics')
  console.log('Found "physics":', noMatch.length, 'activities')
  
} catch (error) {
  console.log('❌ Error:', error.message)
}
console.log()

// Test 8: JSON export
console.log('📄 Test 8: JSON export')
try {
  const child = new Child('Emma', 5)
  
  child.addActivity(new Activity('Breakfast', '08:00', '09:00').setIcon('🥐'))
  child.addActivity(new Activity('Play', '10:00', '11:00').setIcon('🎮'))
  
  console.log('Simple JSON:')
  const json = child.toJSON()
  console.log(JSON.stringify(json, null, 2))
  
  console.log('\nJSON with activities:')
  const fullJson = child.toJSONWithActivities()
  console.log('Activities in JSON:', fullJson.activities.length)
  console.log('First activity:', fullJson.activities[0].name)
  
} catch (error) {
  console.log('❌ Error:', error.message)
}
console.log()

// Test 9: Edge cases
console.log('⚠️ Test 9: Edge cases')
try {
  console.log('Child without age:')
  const noAge = new Child('Unknown age')
  console.log('✅ Name:', noAge.name, 'Age:', noAge.age)
  
  console.log('\nEmpty search:')
  noAge.addActivity(new Activity('Test', '10:00', '11:00'))
  const emptySearch = noAge.findActivitiesByName('')
  console.log('✅ Empty search returned:', emptySearch.length, 'activities')
  
  console.log('\nRemove non-existent activity:')
  const nonExistent = new Activity('Does not exist', '12:00', '13:00')
  const wasRemoved = noAge.removeActivity(nonExistent)
  console.log('✅ Removal of non-existent:', wasRemoved)
  
} catch (error) {
  console.log('❌ Error:', error.message)
}
