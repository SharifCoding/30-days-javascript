# [JavaScript 30 Day Challenge](https://javascript30.com/)
![JavaScript30](./day18TallyTimesReduce.png)

### Day 18 - Tally String times with Reduce
Add up timestamps with reduce.

The HTML document contains an _unordered list_ with multiple _list items_, each with a `data-time` which reflect a time in minutes and seconds. A function is created to take all of these times and calculate the total in hours, minutes, and seconds.

#### data selector
If you give attributes a data element in the form `data-x` you can extract these via attribute selection, this is shown below.
```js
// Option 1. Using the spread operator to convert the NodeList into an array
const timeNodes = [...document.querySelectorAll('[data-time]')]

// Option 2. Converting the NodeList into an array using the `Array.from()` methods
const timeNodes = Array.from(document.querySelectorAll('[data-time]'));
```
Accessing the values for this can be done via `timeNodes.dataset.time`

#### parseFloat and reduce
Numbers are extracted from HTML elements in this project, but they are stored as strings. Using this method you can convert them to their natural 'type'. This will allow math functions to be applied to them.
```js
const [minutes, seconds] = timeCode.split(':').map(parseFloat);
```
In this case, the method has been applied through `map`.

Once the _return value_ of mapping over each item in the array (twice, one for minute, another for second) done, the _reduce_  method is used to tally the result of those maps to a single integer value.
```js
...
.map(timeValue => {
  const [minutes, seconds] = timeValue.split(':').map(parseFloat)
  return minutes * 60 + seconds // Return the total seconds
})
// Add up all the seconds
.reduce((runningTotal, seconds) => runningTotal + seconds)
```

#### Further Reading
- [Array.prototype.map( )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Map) - Creates a new array with the results of calling a provided function on every element in the calling array.
- [Array.prototype.reduce( )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) - Applies a function against an accumulator and each element in the array to reduce it to a single value.
- [Remainder operator (%)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder_%28%29) - Returns the remainder left over when one operand is divided by a second operand.

[Return to top](#javascript-30-day-challenge)

[Return to 30 Day Challenge](../../README.md)
