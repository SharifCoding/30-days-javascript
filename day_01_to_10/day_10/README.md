# [JavaScript 30 Day Challenge](https://javascript30.com/)
![JavaScript30](./day10Checkboxes.png)

### Day 10 - Hold Shift to Check Multiple Checkboxes
Select multiple checkboxes in succession by pressing the Shift key.

An HTML page that displays a collection of `input` HTML elements of type `checkbox`, each followed by a `p` HTML element that will have it's text contents striked through when an input is checked. Also allow to select multiple items while holding down the shift key.

#### HTML
Number each `input` element by giving them an `id` property, starting at 0.
```html
<input type="checkbox" id="0">
...
<input type="checkbox" id="1">
...
<input type="checkbox" id="2">
```

#### JavaScript
Declare & define a `const` variable as a reference to every `input` element
that is a child of the `inbox` class.  
```js
const checkBoxes = document.querySelectorAll('.inbox input[type="checkbox"]');
```
Declare a `let` variable that will be defined later as the _last `input` that was selected_.  
```js
let lastChecked;
```
Iterate through the _NodeList_ and add an _event listener_ to each element that will
call upon a _event handler_ function on a click event.
```js
// The name of the function to be used as the event handler is your choice.
checkBoxes.forEach(
// In this example, the event handler function is called 'multiChecker'.
checkBox => checkBox.addEventListener('click', multiChecker)
);
```
Declare the _event handler_ function and allow it accept one parameter, the event:
```js
// Check if the `let` variable has been defined & the `shift` key was pressed.
if (lastSelected && e.shiftKey) {
// Set the `checked` property to be the `checked` property of the last `input` that was selected.
this.checked = lastSelected.checked;
}
```
Two `let` variables will be used to _slice_ away all the `input` elements that aren't between the _last
selected `input`_.
```js
// Declare multiple variables in one go by separating them with commas.
let startIdx, endIdx;
```
If the `ID` property is greater than the `ID` property of the last selected `input`, set the first `let` variable as the `ID` property of the _last selected `input` and set the second `let variable` as the `ID` property of the `input` that is the function context_. Otherwise, flip 'em!
```js
// Using a ternary operator & destructuring assignment
this.id > lastSelected.id ? [startIdx, endIdx] = [lastSelected.id, this.id] : [startIdx, endIdx] = [this.id, lastSelected.id];

// Using standard conditional operators
if (this.id > lastSelected.id) {
  startIdx = lastSelected.id;
  endIdx = this.id;
} else {
  startIdx = this.id;
  endIdx = lastSelected.id;
}
```
Declare a `const` variable & define it as an array created from the NodeList that only contains the `input` elements **between** the _function context_ and the _last selected `input`_.
```js
/** In order to remove all the 'input' elements aside from the ones in between
* the function context and the last selected input, we'll use the `slice`
* method. `slice` takes two arguments: the index that we want to slice our
* array from, and the index where we want to cut off this new sliced portion.
* I incremented the first argument by 1 because the input element associated
* with the original value of startIdx has already been accounted for (it's either
* 'this` or 'lastSelected', and we only want the inputs between those two).
**/
const middleInputs = Array.from(checkBoxes).slice(parseInt(startIdx) + 1, endIdx);
```
Iterate through the newly created array of elements and set the `checked` property of each element to match the `checked` property of the _function context_.
```js
// By setting the 'checked' property to match the function context, we're
// able to allow users to check OR uncheck multiple items from the list. WOOOO!
middleInputs.forEach(checkbox => checkbox.checked = this.checked);
```
After the conditional statement, define `lastSelected` as the _function context_ so that when this _event handler_ is called again on a NEW `input` element, we can use `lastSelected`'s ID property to figure out what inputs are between the two that need to be checked/unchecked.
```js
if (lastSelected && e.shiftKey){
  /* Body of conditional statement */
}
// After the conditional statement
lastSelected = this;
```

#### Further Reading
- [KeyboardEvent.shiftKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/shiftKey) - Read-only property indicates if the shift key was pressed (true) or (false) when the event occurred.
- [addEventListener( )](https://www.w3schools.com/js/js_htmldom_eventlistener.asp) - Attaches an event handler to the specified element.
- [Understanding the 'this' Keyword in JavaScript](https://medium.com/quick-code/understanding-the-this-keyword-in-javascript-cb76d4c7c5e8) - How the value of `this` is assigned.
- [Array.prototype.forEach( )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) - Executes a provided function once for each array element.

[Return to top](#javascript-30-day-challenge)

[Return to 30 Day Challenge](../README.md)
