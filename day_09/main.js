const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];

/*
In Chrome dev tools, go to the 'elements' tab and right-click the
'p' HTML tag. Select 'break on > attribute modifications`. This places
a break point in the console debugger if any attribute for the
targeted element is changed. If we click on the 'p' tag (which will
trigger the makeGreen() function), the color attribute is changed,
at which point the browser will PAUSE the program and highlight 
the line of code which triggered the break point.

To remove the break point, navigate back to the 'elements' tag,
right click the 'p' tag, and uncheck the 'break on > attribute removal'
option.
*/
function makeGreen() {
  const p = document.querySelector('p');
  p.style.color = '#BADA55';
  p.style.fontSize = '50px';
}

// Regular
console.log('hello');

// Interpolated - Dynamically update the string value logged out using %s
let testInterpolation = '💩';
console.info('console.log(\'Testing interpolation: %s <-- This should be poop!\', testInterpolation)');
console.log('Testing interpolation: %s <-- This should be poop!', testInterpolation);

// Interpolation using ES6 template strings
console.info('console.log(`Testing ES6 interpolation: ${testInterpolation} <-- This should be poop!`);');
console.log(`Testing ES6 interpolation: ${testInterpolation} <-- This should be poop!`);

// Styled - Apply styling to a log event using %c
console.info('console.log(\'%c Styling stuff maybe?', 'font-size:1.2em; color: blue;\');');
console.log('%c Styling stuff maybe?', 'font-size:1.2em; color: blue;');

// Warnings - Displays a log event preceded with a caution sign
console.info('console.warn(`WARNING: You\'re displaying a warning! You winner!`);');
console.warn(`WARNING: You're displaying a warning! You winner!`);

// Error - Displays a log event highlighted in red with an 'x'
console.info('console.error(\'This is an error display!\');');
console.error('This is an error display!');

// Info - Displays a log event preceded by an 'i'
console.info('console.info(\'Display relevant information to this log!\');');
console.info('Display relevant information to this log!');

// Testing - A very basic assert statement which accepts two arguments:
//           the expression we want to evaluate the truthiness of, and
//           a message to display if the assertion fails.
const p = document.querySelector('p');
console.info('console.assert(p.classList.contains(\'expected-class-name\'), \'NOPE!\');');
console.assert(p.classList.contains('expected-class-name'), 'NOPE!');

// Clearing - Clear all previously outputted console events
// console.clear();

// Viewing DOM Elements
console.info('Viewing DOM Elements');
console.log(p);   // Standard console log event
console.dir(p)    // Logs out an interactive list of properties for a given object

// Groupings - Log out related information in a collapsible group
console.info('Log out related information in a collapsible group');
dogs.forEach(dog => {
  console.groupCollapsed(`${dog.name}`);
  console.log(`Dog name: ${dog.name}`);
  console.log(`${dog.name}'s age: ${dog.age} yrs old`);
  console.log(`${dog.name} age (dog years): ${dog.age * 7}`);
  console.groupEnd(`${dog.name}`);
})

// Count - Log out a given statement followed by a colon + the amount of times
// this particular statement has already been logged
console.info('Count - Log out a given statement followed by a colon + the amount of times');
console.count('WEEWOO');
console.count('Woo!')
console.count('Wee?')
console.count('Woo!')
console.count('Wee?')
console.count('WEEWOO');
console.count('WEEWOO');
console.count('Wee?')
console.count('Wee?')

// Time - Logs out the time taken to perform a given action
console.info('Time - Logs out the time taken to perform a given action');
console.time('Fetch data timer'); // Label for timer
fetch('https://api.github.com/users/SharifCoding')
.then(data => data.json())
.then(data => {
  console.timeEnd('Fetch data timer');
  console.log(data);
});

// Table - Log out array/object data in a table format
console.info('Table - Log out array/object data in a table format');
console.table(dogs);
// Provide properties to be displayed in the table as an array of string values 
// corresponding with property names
console.table(dogs, ["age"]);
