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
| End time before start time | Created Activity with startTime="12:00", endTime="11:00" | PASS-Correctly thre error "end time must be after start time" |
| setIcon() method | Created Activity and called setIcon("🍽️") | PASS-Icon set correctly, method returns Activity instance for chaining |
| markCompleted() method | Created Activity and called markCompleted() | PASS-isCompleted set to true, completedAt timestamp added |
| overlapsWith() method | Created two overlapping activities and tested overlap detection | PASS-Correctly detected overlap between activities |

### Child Class Tests

