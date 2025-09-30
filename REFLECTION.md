# Reflection - Visual Schedule Module

## Naming (Clean Code Chapter 2 )

### Table of identifiers in the public interface

| Name | Explanation | Reflection and clean code rules |
| --- | --- | --- |
| `Activity` | Class name for the main class representing an activity | Use intention-Revealing Names: The name clearly shows this is an activity in a schedule. Class Names: Noun that describes what the object represents. Avoid Disinformation: The name is not misleading and doesn't suggest functionality other than what the class provides.
| `addActivity(activity)` | Method name for adding an activity to a child's schedule | Method Names: Verb that describes what the method does. Use intention-Revealing Names: The name clearly shows that something is being added. Function Arguments: The argument name **activity** metches the method's purpose and is self-explanatory. |
| `startTimer` | Property name for when an activity begins | Use Intentation-Revealing Names: The name directley shows what the property contains. Avoid Mental Mapping: Reader doesn't need translate startTime to something else. Use Searchable Names: The name is easy to search for in code. |
| `getChildSchedule(childId)` | Method name for retrieving a child's complete schedule | Methode names: Verb that describes what the method returns. Use Intention-Revealing names: The name shows both what is retrieved (schedule) and for whom (child). **Make Meaningful Distinctions**: Clearly differs from `getChild()` by spcifying that the complete schedule is returned. |
| `isCompleted` | Boolean property indicating is finished | Use Intention-Revealing NAme: The name directly shows what the value represents. Avoid Disinformation: The is prefix clearly signals this is a boolean. Dos't Be Cute: Straight to the point without unnecessary words. |

### Chapter 2 reflection

In chapter 2 the importence of code reading like prose, and that names should reveal their intentations without comments. What I have tried to do in my library is that I have strived to follow these principles, thought there are areas for improvement. 

I have ben using intention-revealing names in my code. The class names **Activity**, **child** and **daySchedule** clearley describe what each class represents without requiring the reader to guess. Method names lika **addActivity()** and **getChildSchedule()** follow the verb-noun pattern that Clean Code recommends. 

I have also been caraeful to avoid disinformation. For example, I use **isCompleted** instead of just **completed** to clearly signal that it's a boolean, which follows programming conventions that reaaders expect. 

An area where I could improve is with searchable names. Some shorter names like **id** could be more specific like **childId** or **activityId** to be easier to seartch for in larger codebases. 

## Functions (Chapter 3)

### Table of the longest methods

| Method name | Lines | Reflection |
|-------------|-------|------------|
| `constructor(name, startTime, endTime) (Activity)` | 8 | **Do one thing**: The constructor only does one thing-creates and validates an activity. **Function arguments**: Has three arguments which Clean Code advises against, but is necessary for the activity's core data. **Common triadic form**: Arguments are related and logically grouped (`name, start, end`). Difficult to split without losing coherence. 
| `validateEndTime(endTime, startTime)(Activity)` | 8 | **Do one thing**: Only validates end time logic and relationship to start time. **Function arguments**: Dyadic function-could potentially be improved by making it a method that alreaady has access to `startTime`. **Small**: Method is focused on a single validation concern. **Descriptive names**: Name clearly describes what the method validates. |
| `getChildSchedule(childId)(DaySchedule)` | 9 | **Do one thing**: Retrieves and formates a child's schedule. **Function arguments**: Monadic function which is good. **Command query separation**: This is a query function that dosen't modify state. **Return meaningful values**: Returns structured object with child activities. and date information. |
| `addActivity(activity)(Child)` | 6 | **Do one thing**: The method only adds an activity to the child's list after validation. **Function arguments**: Monadic function which is ideal according to Clean Code. **Have no side effects**: The method only modifies the child's activity list, no hidden side effects. **Error handling**: Uses exceptions for invalid input rather that return codes. |

### Chapter 3 reflection

Chapter 3's emphasis on small, focused functions has been valuable in creating maintainable code. After simplifying my Activity class, I can see how removing unnecessary methods improved the overall design.

Most of my functions follow the "do one thing" principle well. The constructor is inherently complex because it must validate multiple inputs, but I extracted validation into separate methods to keep each focused on a single concern.

I'm satisfied with my adherence to meaningful function arguments. Most of my methods are monadic, which Clean Code identifies as ideal. The few dyadic functions like `validateEndTime(endTime, startTime)` have a logical relationship between arguments, though I could potentially improve this by restructuring the validation approach.

The principle of "small" functions proved beneficial during refactoring. When I removed methods like markCompleted(), updateTimes(), and toJSON(), the class became much clearer. These methods added complexity without solving real problems for a children's calendar.

One area where I applied Clean Code successfully was avoiding flag arguments and keeping methods focused. The `overlapsWith()` method does exactly one thing - checks for time overlap - without additional behavior based on parameters.

The validation methods demonstrate both strengths and potential improvements in my approach. While they're focused and descriptive, the dyadic nature of `validateEndTime()` suggests there might be a better structural approach to validation that could make these methods more cohesive.

### Overall Code Quality Reflection
Working with Clean Code principles while building this Visual Schedule module taught me the critical importance of questioning every line of code. The most valuable lesson was learning to delete code, not just write it.

Initially, I over-engineered the solution with complex validation classes, enterprise-level features, and unnecessary abstractions. The breakthrough came when I applied YAGNI (You Aren't Gonna Need It) ruthlessly. Removing the ScheduleValidator class, simplifying WeekdayColors to a simple object, and stripping the Activity class to its essentials dramatically improved the codebase. It ended up that I took to much from the code that I needed to add things back. Not becouse the code was faulty but because the minimum requirement needed to be met. Added back `getDuration()`, `getFormattedDuration()`, `getActivitiesSorted()`, `getTotalScheduledTime()`, `getTotalActivities()` and `getChildrenSorted()`.

The Single Responsibility Principle proved essential for maintainability. Each class now has a clear, focused purpose: Activity represents a single scheduled item, Child manages a collection of activities, and DaySchedule coordinates which children are scheduled for a specific date. This separation made testing straightforward and the code self-documenting.

Chapter 2's naming guidelines significantly impacted code readability. Moving from technical names like validateActivityInput() to intention-revealing names like validateActivityName() made the code's purpose immediately clear. The emphasis on avoiding mental mapping helped me choose names that don't require translation in the reader's mind.
This type of coding and thinking made everything easier to understand the big picture with Clean code and how I want to code in the future.

However, some Clean Code rules felt rigid when applied strictly. The preference for monadic functions, while generally beneficial, sometimes led to awkward parameter passing when dyadic functions would be more natural and readable.

I have learned a lot about removing unnecessary ode and naming variables in a way that makes the code easier to understand and maintain later on. Reading the book clean code helped me understand the bigger picture, as did attending the lectures.

