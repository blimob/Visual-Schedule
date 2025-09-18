import { Activity } from '../src/Activity.js'

// Test cases for Activity class

const activity = new Activity('Painting', '10:00', '11:30')

// Fluent interface med method chaining  
const styledActivity = new Activity('Important Meeting', '14:00', '15:00')
  .setIcon('💼')
  .setPattern('striped')

console.log('Duration:', activity.duration, 'minutes')
console.log('Styled activity:', styledActivity.visual)