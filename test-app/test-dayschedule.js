import { Activity } from '../src/Activity.js'
import { Child } from '../src/Child.js'
import { DaySchedule } from '../src/DaySchedule.js'

console.log('=== DAYSCHEDULE TEST ===\n')

// Test 1: Create DaySchedule
console.log('📅 Test 1: Create DaySchedule')
try {
  const schedule = new DaySchedule()
  console.log('✅ Schedule created for:', schedule.date.toDateString())
  
  const customDate = new DaySchedule(new Date('2025-12-25'))
  console.log('✅ Custom date schedule:', customDate.date.toDateString())
} catch (error) {
  console.log('❌ Error:', error.message)
}
console.log()

// Test 2: Add children
console.log('👶 Test 2: Add children')
try {
  const schedule = new DaySchedule()
  
  const anna = new Child('Anna', 6)
  const erik = new Child('Erik', 8)
  
  const annaId = schedule.addChild(anna)
  const erikId = schedule.addChild(erik)
  
  console.log('✅ Added Anna with ID:', annaId)
  console.log('✅ Added Erik with ID:', erikId)
  console.log('Total children:', schedule.getChildren().length)
  
} catch (error) {
  console.log('❌ Error:', error.message)
}
console.log()

// Test 4: Get child
console.log('🔍 Test 3: Get child')
try {
  const schedule = new DaySchedule()
  const lisa = new Child('Lisa', 7)
  
  const lisaId = schedule.addChild(lisa)
  const retrievedChild = schedule.getChild(lisaId)
  
  console.log('✅ Retrieved child:', retrievedChild.name, 'age', retrievedChild.age)
  
  const nonExistent = schedule.getChild('fake-id')
  console.log('✅ Non-existent child:', nonExistent)
  
} catch (error) {
  console.log('❌ Error:', error.message)
}
console.log()


console.log('📚 Test 4: Child manages own activities')
try {
  const schedule = new DaySchedule()
  const oscar = new Child('Oscar', 9)
  
  schedule.addChild(oscar)
  

  oscar.addActivity(new Activity('Breakfast', '08:00', '09:00').setIcon('🥐'))
  oscar.addActivity(new Activity('School', '09:00', '15:00').setIcon('📚'))
  oscar.addActivity(new Activity('Play', '15:30', '17:00').setIcon('⚽'))
  
  const child = schedule.getChild(oscar.id)
  console.log('✅ Activities for', child.name + ':')
  
  child.getActivities().forEach((activity, index) => {
    const display = activity.visual.icon 
      ? `${activity.visual.icon} ${activity.name}` 
      : activity.name
    console.log(`   ${index + 1}. ${display} (${activity.startTime}-${activity.endTime})`)
  })
  
} catch (error) {
  console.log('❌ Error:', error.message)
}
console.log()

// Test 6: Multiple children with activities
console.log('👨‍👩‍👧‍👦 Test 5: Multiple children with activities')
try {
  const schedule = new DaySchedule()
  
  const anna = new Child('Anna', 6)
  const erik = new Child('Erik', 8)
  const lisa = new Child('Lisa', 7)
  
  schedule.addChild(anna)
  schedule.addChild(erik)
  schedule.addChild(lisa)
  
  // Each child gets different activities
  anna.addActivity(new Activity('Drawing', '10:00', '11:00').setIcon('🎨'))
  anna.addActivity(new Activity('Nap', '14:00', '15:00').setIcon('😴'))
  
  erik.addActivity(new Activity('Math homework', '16:00', '17:00').setIcon('📊'))
  erik.addActivity(new Activity('Soccer', '17:00', '18:00').setIcon('⚽'))
  
  lisa.addActivity(new Activity('Piano lesson', '15:00', '16:00').setIcon('🎹'))
  
  console.log('✅ Schedule for all children:')
  schedule.getChildren().forEach(child => {
    console.log(`\n${child.name} (${child.age} years):`)
    child.getActivities().forEach(activity => {
      const display = activity.visual.icon 
        ? `${activity.visual.icon} ${activity.name}` 
        : activity.name
      console.log(`  - ${display} (${activity.startTime}-${activity.endTime})`)
    })
  })
  
} catch (error) {
  console.log('❌ Error:', error.message)
}
console.log()

// Test 7: Remove child
console.log('🗑️ Test 6: Remove child')
try {
  const schedule = new DaySchedule()
  
  const child1 = new Child('Remove Me', 5)
  const child2 = new Child('Keep Me', 6)
  
  const id1 = schedule.addChild(child1)
  const id2 = schedule.addChild(child2)
  
  console.log('Before removal:', schedule.getChildren().length, 'children')
  
  const removed = schedule.removeChild(id1)
  console.log('Child removed:', removed)
  console.log('After removal:', schedule.getChildren().length, 'children')
  
  const remaining = schedule.getChildren()[0]
  console.log('Remaining child:', remaining.name)
  
} catch (error) {
  console.log('❌ Error:', error.message)
}
console.log()
