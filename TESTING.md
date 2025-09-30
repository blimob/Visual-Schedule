# Test report - Visual Schedule Module

## Overview
This document describes the testning of the Visual Schedule module, whitch provides functionality for managing children's daily schedules. The module consists of three main classes: Activity, Child and DaySchedule, plus utility functions for weekday colors. 

## Test Strategy
Testing was performed usning manual test applications that verify each component individually and then test integration between all components. All tests were executed by running Node.js test files and observing console output. 

## Test Environment
* **Platform**: Node.js
* **Language**: JavaScript (ES6 modules)
* **Test Method**: Manual testning with automated test scripts
* **Date**: [Insert current date]

## Test Results

### Activity Class Test

| What was tested | How it was tested | Test result |
|-----------------|-------------------|-------------|
| Activity constructor with valid data | Created Activity with name="Breakfast", startTime="07:30", endTime="08:00" | PASS- Activity created successfully |
| Time format validation | Attempted to create Activity with invalid time="25:00" | PASS-Correctly threw error "End Time must be after start time" |
| End time before start time | Created Activity with `startTime`="12:00", `endTime`="11:00" | PASS-Correctly thre error "end time must be after start time" |
| `setIcon()` method | Created Activity and called setIcon("🍽️") | PASS-Icon set correctly, method returns Activity instance for chaining |
| `getDuration`| Created activity and called breakfast.getDuration() | Pass-duration (minutes): 45 |
| `getFormattedDuration` | Created activity and called breakfast.getFormattedDuration() | Formatted duration: 45min |

### Child Class Tests

| What was tested | How it was tested | Test result |
|-----------------|-------------------|-------------|
| Child constructor with valid data | Created Child with name="Anna",age=6 | PASS-Child created with unique ID |
| Name validation | Attempted to create Child with empty string name | PASS-Correctly thre error "Child name must be a non-empty string" |
| Age validation | Attempted to create Child with age=25(over limit) | PASS-Correctlry threw error "Child age must be number between 0-18" |
| `addActivity()` method | Added valid Activity instance to Child | PASS-Activity added, getActivityCount() returned correct count |
| Invalid activity rejection | Attempted to add string instead of Activity instance | PASS-Correctley threw error "Activity must be an instance of Activity class" |
| `removeActivity()` method | Added activity then removed it by reference | PASS-Activity removed, count decreased correctly |
| `findActivitiesByName()`method | Added activities and searched for partial name match | PASS-Found activities containing search term (case-insensitive) |
| `getActivitiesSorted` | Added activities with start and end time + name. | Pass-activities sorted by time. |
| `getTotalScheduledTime` | Added hours and minutes to get the total scheduledTime | Pass-TotalScheduledTime: 600 minutes (10h 0min) |

### DaySchedule Class Test

| What was tested | How it was tested | Test result |
|-----------------|-------------------|-------------|
| `DaySchedule` constructor | Created DaySchedule with default date and custom date | PASS-Schedule created with correct date |
| `addChild()` method | Added valid Child instance to schedule | PASS-Child added, returned child ID |
| Invalid child rejection | Attempted to add string instead of Child instance | PASS-Correctley threw error "Must be a Child instance" |
| `getChild()` method | Added child then retieved by ID | PASS-Returned correct child instance | 
| `getChildSchedule()` method | Added child with activities, retieved complete schedule | PASS-Returned object with child, activities and date |
| `removeChild()` method | Added child then removed by ID | PASS-Child removed, getChildren() count decteased |
| `hasChild()` method | Tested with existing and non-existing child IDs | PASS-Returned true for existing, false for non-existing |
| `getTotalActivities` | Total activities across all children | Pass-total activities across all children: 7 |
| `getChildrenSorted` | Children sorted by name | Pass-sorted alphabetically | 

### Weekday Colors Tests

| What was tested | How it was tested | Test result |
|-----------------|-------------------|-------------|
| `WEEKDAY_COLORS` constant | Verified all 7 days have assigned colors | PASS-All days 0-6 have valid hex color codes |
| `getColorForDate()` function | Tested with specific dates for each weekday | PASS-Returned correct colors for each day |
| Invalid date handling | Passed string instead of Date object | PASS-Correctly threw error "Must be a valid Date object" |
| Color format validation | Checked all colors follow #RRGGBB format | PASS-All colors ste valid 6-digit hex codes |

### Integration Test 

| What was tested | How it was tested | Test result |
|-----------------|-------------------|-------------|
| Complete workflow | Created schedule, added children, added activities, retrieved schedules | PASS-All components work together correctely |
| Cross-class functionality | Child activities accessible through DaySchedule | PASS-Schedule can access child's activities |
| Error propagation | Invalid operations at any level | PASS-Errors correctly thrown and handled |
| Real usage scenario | Simulated family schedule with multiple children and activities | PASS-Module handles realitic usage patterns |

### Summary

- **Total Tests**: 4
- **Passed**: 4
- **Failed**: 0
- **Known Issues**: None for now.

### Test coverage

All public methods of all classes have been tested, including:

- Constructor validation
- Method functionality
- Error handling
- Integration between classes
- Edge cases and invalid input

### Conclusion

The Visual Schedule module passes all tests and is ready for use by other programmers. All public interface methods work as documented, error handling is appropriate, and the classes integrate correctly to provide a complete scheduling solution for children’s daily activities. Each class has its own test app, and I primarily used `test-app.js` to confirm that all components interact with each other as intended.

The module demonstrates clean, maintainable code that follows established software engineering principles while providing useful functionality for building calendar applications.
