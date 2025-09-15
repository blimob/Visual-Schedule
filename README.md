# Visual Schedule

A JavaScript module for creating visual daily schedules with support for children's profiles, weekday color standards, and schedule validation.

## Features

- **Visual Activities**: Create activities with automatic color and icon assignment
- **Child Profiles**: Manage child profiles with visual preferences
- **Weekday Colors**: Consistent color scheme for different weekdays
- **Schedule Validation**: Detect conflicts and validate schedule integrity
- **Daily Schedule Management**: Coordinate activities, children, and visual elements

## Installation

```bash
npm install visual-schedule
```

## Quick Start

```javascript
import { Activity, Child, DaySchedule, WeekdayColors } from 'visual-schedule'

// Create a child profile
const child = new Child('Anna', 6)

// Create activities with automatic visual styling
const breakfast = new Activity('Breakfast', '08:00', '08:30')
const playTime = new Activity('Play outside', '10:00', '11:00')

// Create a daily schedule
const schedule = new DaySchedule()
const childId = schedule.addChild(child)

// Add activities to the child's schedule
schedule.addActivity(childId, breakfast)
schedule.addActivity(childId, playTime)

// Get visual schedule with weekday colors
const weekdayColors = new WeekdayColors()
const visualSchedule = schedule.getVisualSchedule(childId)
```

## API Documentation

### Activity Class

Create individual schedule activities with automatic visual styling.

```javascript
const activity = new Activity(name, startTime, endTime, visualConfig)
```

**Parameters:**
- `name` (string): Activity name
- `startTime` (string): Start time in HH:MM format
- `endTime` (string): End time in HH:MM format
- `visualConfig` (object, optional): Visual configuration options

**Methods:**
- `overlapsWith(otherActivity)`: Check if activities overlap
- `markCompleted()`: Mark activity as completed
- `toJSON()`: Export activity data

### Child Class

Manage child profiles with visual preferences and activity collections.

```javascript
const child = new Child(name, age, visualPreferences)
```

**Parameters:**
- `name` (string): Child's name
- `age` (number): Child's age (0-18)
- `visualPreferences` (object, optional): Visual preference settings

**Methods:**
- `addActivity(activity)`: Add activity to child's collection
- `removeActivity(activity)`: Remove activity from child's collection
- `getActivityCount()`: Get total number of activities
- `updateVisualPreferences(preferences)`: Update visual settings

### DaySchedule Class

Coordinate daily schedules for multiple children.

```javascript
const schedule = new DaySchedule(date, weekdayColors, validator)
```

**Methods:**
- `addChild(child)`: Register a child for schedule management
- `addActivity(childId, activity)`: Add activity to child's schedule
- `getChildSchedule(childId)`: Get complete schedule for a child
- `getVisualSchedule(childId)`: Get schedule with visual styling applied
- `validateSchedule()`: Validate entire day schedule

### WeekdayColors Class

Manage consistent color schemes for weekdays.

```javascript
const weekdayColors = new WeekdayColors()
```

**Methods:**
- `getColorForDay(day)`: Get color for specific weekday
- `getColorForDate(date)`: Get color based on Date object
- `getTextColorForDay(day)`: Get appropriate text color for contrast
- `isValidWeekdayColor(color)`: Validate if color is a weekday color

### ScheduleValidator Class

Validate schedules and detect conflicts between activities.

```javascript
const validator = new ScheduleValidator()
```

**Methods:**
- `validateActivity(activity)`: Validate single activity
- `validateSchedule(activities)`: Validate array of activities
- `findConflicts(activities)`: Find time conflicts between activities
- `checkTimeOverlap(activity1, activity2)`: Check overlap between two activities

## Color Standards

The module uses a standardized color scheme for weekdays:

- **Monday**: #8BC34A (Light Green)
- **Tuesday**: #87CEEB (Light Blue)
- **Wednesday**: #FFFFFF (White)
- **Thursday**: #D2691E (Brown/Orange)
- **Friday**: #FFFF00 (Yellow)
- **Saturday**: #FFB6C1 (Light Pink)
- **Sunday**: #FF6347 (Red/Orange)

## Activity Types

Activities are automatically assigned colors and icons based on their names:

- **Meals**: Red colors with dining icons (breakfast, lunch, dinner)
- **Play**: Green colors with game icons (play, game, activity)
- **Rest**: Pink colors with sleep icons (rest, sleep, nap)
- **Learning**: Yellow colors with book icons (homework, school, study)
- **Hygiene**: Blue colors with water icons (wash, shower, brush)

## Examples

### Creating a Weekly Schedule

```javascript
import { DaySchedule, Child, Activity, WeekdayColors } from 'visual-schedule'

const weekdayColors = new WeekdayColors()
const child = new Child('Emma', 7, { favoriteColor: '#FF69B4' })

// Create Monday schedule
const mondaySchedule = new DaySchedule(new Date('2025-09-22'), weekdayColors)
const childId = mondaySchedule.addChild(child)

const activities = [
  new Activity('Morning routine', '07:00', '08:00'),
  new Activity('School', '08:30', '15:00'),
  new Activity('Homework', '16:00', '17:00'),
  new Activity('Play time', '17:00', '18:00')
]

activities.forEach(activity => {
  mondaySchedule.addActivity(childId, activity)
})
```

### Validating Schedule Conflicts

```javascript
import { ScheduleValidator, Activity } from 'visual-schedule'

const validator = new ScheduleValidator()

const activities = [
  new Activity('Math class', '09:00', '10:00'),
  new Activity('Reading time', '09:30', '10:30') // Overlaps with math
]

const validation = validator.validateSchedule(activities)
if (!validation.isValid) {
  console.log('Conflicts found:', validation.conflicts)
}
```

## Testing

Run the test suite:

```bash
npm test
```

Run all class tests:

```bash
npm run test:all
```

## Development

### Project Structure

```
visual-schedule/
├── src/                    # Source code
│   ├── Activity.js        # Activity class
│   ├── Child.js           # Child profile class
│   ├── DaySchedule.js     # Daily schedule management
│   ├── WeekdayColors.js   # Weekday color standards
│   ├── ScheduleValidator.js # Schedule validation
│   └── index.js           # Public API exports
├── test-app/              # Test applications
├── docs/                  # Generated documentation
├── TESTING.md            # Test documentation
├── REFLECTION.md         # Code quality analysis
└── README.md             # This file
```

### Building

The module uses ES6 modules and requires no build step for modern environments.

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## Browser Support

- Modern browsers with ES6 module support
- Node.js 14+

## License

MIT License - see LICENSE file for details.

## Author

Blinera Moberg <bm222mr@student.lnu.se>

## Repository

https://github.com/blimob/Visual-Schedule

## Version

1.0.0