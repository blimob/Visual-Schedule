# Testing Documentation - Visual Schedule Module

## Testing Method

The module was tested using **Option 2: Automated test application** as specified in the lab requirements. A test application was created that automatically runs individual tests and observes their outcomes through code execution. The test results are documented below with clear pass/fail status for each test case.

The testing approach allows other developers to reproduce the tests by running the same test files with the same input data and comparing results.

## Test Environment

- **Language**: JavaScript (Node.js v23.11.0)
- **Test Framework**: Custom automated test suite
- **Test Files**: 
  - `test-app/test-app.js` - Comprehensive Activity class tests
  - `test-weekdays.js` - WeekdayColors functionality tests
- **Execution**: `npm start` and `node test-app/test-weekdays.js`

## Test Results

| What was tested | How it was tested | Test result |
|----------------|------------------|-------------|
| Create valid activity | Create Activity object and verify properties match input | PASS |
| Calculate duration correctly | Create 30-minute activity and check duration property equals 30 | PASS |
| Trim activity name | Create activity with whitespace in name and verify trimming | PASS |
| Empty activity name throws error | Attempt to create activity with empty name, expect error | PASS |
| Null activity name throws error | Attempt to create activity with null name, expect error | PASS |
| Invalid start time throws error | Attempt to create activity with time "25:00", expect error | PASS |
| Invalid end time throws error | Attempt to create activity with time "24:60", expect error | PASS |
| Start time after end time throws error | Create activity with start time 10:00 and end time 09:00 | PASS |
| isValidTimeFormat - valid time | Call isValidTimeFormat("14:30") and verify returns true | PASS |
| isValidTimeFormat - invalid time | Call isValidTimeFormat("25:00") and verify returns false | PASS |
| timeToMinutes conversion | Convert "08:30" to minutes and verify equals 510 | PASS |
| Automatic meal color | Create activity with name "breakfast" and verify color is #FF6347 | PASS |
| Automatic play color | Create activity with name "play outside" and verify color is #8BC34A | PASS |
| Automatic meal icon | Create activity with name "lunch" and verify icon is "🍽️" | PASS |
| Default color for unknown activity | Create activity with unknown name and verify default color #FFFFFF | PASS |
| Detect overlap | Create two overlapping activities and verify overlapsWith returns true | PASS |
| No overlap | Create two non-overlapping activities and verify overlapsWith returns false | PASS |
| Exactly adjacent activities | Create adjacent activities (08:00-08:30, 08:30-09:00) and verify no overlap | PASS |
| Mark activity as completed | Call markCompleted() and verify isCompleted property is true | PASS |
| Completed activity gets timestamp | Call markCompleted() and verify completedAt is Date object | PASS |
| Export activity as JSON | Call toJSON() and verify exported object contains correct properties | PASS |
| WeekdayColors - Monday color | Call getColorForDay('monday') and verify returns #8BC34A | PASS |
| WeekdayColors - Friday color | Call getColorForDay('friday') and verify returns #FFFF00 | PASS |
| WeekdayColors - Swedish support | Call getColorForDay('måndag') and verify returns #8BC34A | PASS |
| WeekdayColors - Date object support | Create Date object for Monday and verify correct color returned | PASS |
| WeekdayColors - Text contrast | Call getTextColorForDay('friday') and verify returns #000000 for yellow background | PASS |
| WeekdayColors - Invalid date error | Pass invalid date object and verify error is thrown | PASS |
| WeekdayColors - Color validation | Test isValidWeekdayColor() with valid and invalid colors | PASS |
| WeekdayColors - Find day by color | Call getDayByColor('#FFFF00') and verify returns 'friday' | PASS |

## Test Summary

- **Total tests executed**: 27
- **Passed tests**: 27
- **Failed tests**: 0
- **Success rate**: 100%

## Test Coverage

The automated tests cover:

### Activity Class
- Constructor validation and error handling
- Time format validation and conversion
- Duration calculation
- Visual properties (colors and icons)
- Overlap detection logic
- Status management (completion tracking)
- JSON export functionality

### WeekdayColors Class
- Basic color retrieval for all weekdays
- Multi-language support (English/Swedish)
- Date object integration
- Text contrast calculation
- Color validation methods
- Error handling for invalid inputs

### Integration Testing
- WeekdayColors integration with Activity visual system
- Automatic color assignment based on activity names
- Cross-class method compatibility

## Limitations

The current test suite focuses on the core Activity and WeekdayColors classes. Additional testing would be beneficial for:

- Child class functionality
- DaySchedule class integration
- ScheduleValidator class validation logic
- Error boundary testing with malformed data
- Performance testing with large datasets

## Test Reproducibility

To reproduce these tests:

1. Clone the repository
2. Install dependencies: `npm install`
3. Run Activity tests: `npm start`
4. Run WeekdayColors tests: `node test-app/test-weekdays.js`

All tests should pass with identical results on any system with Node.js support.