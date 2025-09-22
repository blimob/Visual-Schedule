# Reflection - Visual Schedule Module

## Naming (Clean Code Chapter 2 )

### Table of identifiers in the public interface

| Name | Explanation | Reflection and clean code rules |
| --- | --- | --- |
| Activity | Class name for the main class representing an activity | Use intention-Revealing Names: The name clearly shows this is an activity in a schedule. Class Names: Noun that describes what the object represents. Avoid Disinformation: The name is not misleading and doesn't suggest functionality other than what the class provides.
| addActivity(activity) | Method name for adding an activity to a child's schedule | Method Names: Verb that describes what the method does. Use intention-Revealing Names: The name clearly shows that something is being added. Function Arguments: The argument name **activity** metches the method's purpose and is self-explanatory. |
| startTimer | Property name for when an activity begins | Use Intentation-Revealing Names: The name directley shows what the property contains. Avoid Mental Mapping: Reader doesn't need translate startTime to something else. Use Searchable Names: The name is easy to search for in code. |
| getChildSchedule(childId) | Method name for retrieving a child's complete schedule | Methode NAmes_ Verb that describes what the method returns. Use Intention-Revealing NAmes: The name shows both what is retrieved (schedule) and for whom (child). Make Meaningful Distinctions: Clearly differs from getChild() by spcifying that the complete schedule is returned. |
| isCompleted | Boolean property indicating is finished | Use Intention-Revealing NAme: The name directly shows what the value represents. Avoid Disinformation: The is prefix clearly signals this is a boolean. Dos't Be Cute: Straight to the point without unnecessary words. |

### Chapter 2 reflection

In chapter 2 the importence of code reading like prose, and that names should reveal their intentations without comments. What I have tried to do in my library is that I have strived to follow these principles, thought there are areas for improvement. 

I have ben using intention-revealing names in my code. The class names **Activity**, **child** and **daySchedule** clearley describe what each class represents without requiring the reader to guess. Method names lika **addActivity()** and **getChildSchedule()** follow the verb-noun pattern that Clean Code recommends. 

I have also been caraeful to avoid disinformation. For example, I use **isCompleted** instead of just **completed** to clearly signal that it's a boolean, which follows programming conventions that reaaders expect. 

An area where I could improve is with searchable names. Some shorter names like **id** could be more specific like **childId** or **activityId** to be easier to seartch for in larger codebases. 

## Functions (Chapter 3)

### Table of the longest methods

| Method name | Lines | Reflection |
|-------------|-------|------------|
| constructor(name, startTime, endTime) (Activity) | 8 | Do one thing: The constructor only does one thing-creates and validates an activity. Function arguments: Has three arguments which Clean Code advises against, but is necessary for the activity's core data. Common triadic form: Arguments are related and logically grouped (name, start, end). Difficult to split without losing coherence. 
| 