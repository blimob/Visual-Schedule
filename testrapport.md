# Testrapport - Visual Schedule Module

## Testmetod
📋 TEST RESULTS FOR REPORT:
| What was tested | How it was tested | Test result |
|----------------|------------------|-------------|
| Create valid activity | Create object and verify properties | PASS |
| Calculate duration correctly | Check duration property | PASS |
| Trim activity name | Create activity with whitespace in name | PASS |
| Empty activity name throws error | Attempt to create activity with empty name | PASS |
| Null activity name throws error | Attempt to create activity with null name | PASS |
| Invalid start time throws error | Attempt to create activity with time 25:00 | PASS |
| Invalid end time throws error | Attempt to create activity with time 24:60 | PASS |
| Start time after end time throws error | Start time 10:00, end time 09:00 | PASS |
| isValidTimeFormat - valid time | Tested time 14:30 | PASS |
| isValidTimeFormat - invalid time | Tested time 25:00 | PASS |
| timeToMinutes - conversion | Converted 08:30 to minutes | PASS |
| Automatic meal color | Created activity with name 'breakfast' | PASS |
| Automatic play color | Created activity with name 'play outside' | PASS |
| Automatic meal icon | Created activity with name 'lunch' | PASS |
| Default color for unknown activity | Created activity with unknown name | FAIL |
| Detect overlap | Activities 08:00-08:30 and 08:15-08:45 | ERROR |
| No overlap | Activities 08:00-08:30 and 09:00-09:30 | ERROR |
| Exactly adjacent activities | Activities 08:00-08:30 and 08:30-09:00 | ERROR |
| Mark activity as completed | Called markCompleted() and checked isCompleted | ERROR |
| Completed activity gets timestamp | Verified completedAt is Date object | ERROR |
| Export activity as JSON | Called toJSON() and verified content | PASS |