# Visual Schedule Module
A simple, clean JavaScript module for managing children's daily visual schedules. It's designed for developers building calendar applications, family organizers, or educational scheduling tools.

### Features
* **Activity management**: Create and manage individual activities with time validateion. 
* **Child profiles**: Organize activitiea by child with age-appropriate structure.
* **Daily scheduling**: Coordinate multiple children's schedules for specific dates.
* **Visual customization**: Add icons and visual elements to activities.
* **Time validation**: Automatiz validation of time formats and logical constraints.
* **Weekday colors**: Built-in color coding for different days of the week.  

### Installation

```bash
# Clone the repository
git clone https://github.com/blimob/Visual-Schedule.git

# Navigate to project directory
cd visual-schedule

# The module uses ES6 modules - no build step required
```

### Quick start

```javascript
import { Activity } from './src/Activity.js'
import { Child } from './src/Child.js'
import { DaySchedule } from './src/DaySchedule.js'
import { getColorForDate } from './src/weekdayColors.js'

// Create a child
const emma = new Child('Emma', 6)

// Create activities
const breakfast = new Activity('Breakfast', '07:30', '08:00').setIcon('🥐')
const school = new Activity('School', '08:30', '15:00').setIcon('📚')
const play = new Activity('Play time', '15:30', '17:00').setIcon('⚽')

// Add activities to child
emma.addActivity(breakfast)
emma.addActivity(school)
emma.addActivity(play)

// Create daily schedule
const today = new DaySchedule()
today.addChild(emma)

// Get child's schedule
const schedule = today.getChildSchedule(emma.id)
console.log(`${schedule.child.name} has ${schedule.activities.length} activities`)

// Get day color
const dayColor = getColorForDate(new Date())
console.log(`Today's color: ${dayColor}`)
```

## API Reference
### Activity Class

Represents a single scheduled activity.

#### Constructor

```javascript
new Activity(name, startTime, endTime)
```

* `name` (string): Name of the activity
* `startTime` (string): Start time in HH:MM format(24-hour)
* `endTime` (string): End time in HH:MM (24-hours)

#### Method

* `setIcon(icon)`: Set visual icon for the activity. Returns this for chaining.

### Child class
Manages a child's collection of activities.

#### Constructor

```javascript
new Child(name, age)
```
* `name` (string): Child's name
* `age` (number): Child's age (0-18)

#### Method

* `addActivity(activity)`: Add an Activity instance to the child's schedule
* `removeActivity(activity)`: Remove an activity from the childäs schedule
* `getActivities()`: Get array of all activities.
* `findActivitiesByName(searchName)`: Search activities by name (partial match)
* `getActivityCount()`: Get total number of activities

### DaySchedule class

Manages which children are scheduled for a specific date. 

#### Constructor

```javascript
new DaySchedule(date)
```
* `date` (Date): Date for the schedule (defaults to today)

* `addChild(child)`: Add a Child instance to the schedule
* `removeChild(childId)`: Remove a child from the schedule
* `getChild(childId)`: Get a specific child by ID
* `getChildren()`: Get array of all children
* `getChildSchedule(childId)`: Get complete schedule for a child
* `hasChild(childId)`: Check if child exists in schedule

### Weekday Colors

Simple utilities for day-based color coding.

```javascript
import { WEEKDAY_COLORS, getColorForDate } from './src/weekdayColors.js'

// Get color for specific date
const color = getColorForDate(new Date())

// Access colors directly
const mondayColor = WEEKDAY_COLORS[1] // #8BC34A
```

## Examples

### Search and Filter

```javascript
const child = new Child('Sarah', 7)

child.addActivity(new Activity('Math class', '09:00', '10:00'))
child.addActivity(new Activity('Art class', '10:00', '11:00'))
child.addActivity(new Activity('Math homework', '15:00', '16:00'))

// Find all math-related activities
const mathActivities = child.findActivitiesByName('math')
console.log(`Found ${mathActivities.length} math activities`)
```

## Error Handling

The module provides clear error messages for invalid input:

```javascript
// Invalid time format
try {
  new Activity('Bad time', '25:00', '26:00')
} catch (error) {
  console.log(error.message) // "Invalid start time format. Use HH:MM"
}

// Invalid child data
try {
  new Child('', 5)
} catch (error) {
  console.log(error.message) // "Child name must be a non-empty string."
}

// Invalid activity type
try {
  child.addActivity("Not an Activity object")
} catch (error) {
  console.log(error.message) // "Activity must be an instance of Activity class."
}
```

## Design Philosophy

This module follows Clean Code principles:

* **Single Responsibility**: Each class has one focused purpose
* **YAGNI**: Only includes features actually needed for scheduling
* **Simple API**: Intuitive method names and clear documentation
* **No Dependencies**: Pure JavaScript with no external libraries

## Browser Compatibility

* ES6 Modules support required
* Modern browsers (Chrome 61+, Firefox 60+, Safari 10.1+)
* Node.js 12+

## Testing

Run the test suite:

```bash
# Run all tests
node test-app/test-dayschedule.js
node test-app/test-weekdaycolor.js
```

See [TESTNING.md](TESTNING.md) for detailed test documentation.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow existing code style and Clean Code principles
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

Built as part of Clean Code coursework focusing on maintainable, well-documented JavaScript modules.