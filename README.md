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

```bash
javascript 

import { Activity } from './src/Activity.js'
import { Child } from './src/Child.js'
import { DaySchedule } './src/DaySchedule.js'
import { getColorForDate } './src/weekdayColors.js'

// Create a child
const Leon = new Child('Leon', 6)

// Create activities
const breakfast = new Activity('Breakfast', '07:30', '08:00').setIcon('🥐')
const school = new Activity('School', '08.30', '15:00').setIcon('📚')
const play = new Activity('Play time', '15:30', '17:00').setIcon('⚽')

// Add activities to child
