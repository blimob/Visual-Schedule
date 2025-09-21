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