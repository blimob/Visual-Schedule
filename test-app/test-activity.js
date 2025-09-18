import { Activity } from '../src/Activity.js'

// Test cases for Activity class

// ✅ Rätt sätt:
const activity = new Activity('Painting', '10:00', '11:30')

// ✅ Method chaining (fluent interface)
const styledActivity = new Activity('Important Meeting', '14:00', '15:00')
  .setIcon('💼')
  .setPriority('high')  // Du missade denna!
  .setPattern('striped')

console.log('Styled activity:', styledActivity.visual)