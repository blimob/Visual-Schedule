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

* name (string): Name of the activity
* startTime (string): Start time in HH:MM format(24-hour)
* endTime (string): End time in HH:MM (24-hours)

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

