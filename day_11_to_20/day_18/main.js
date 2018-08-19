// Declare a constant and define as an ARRAY of all items with a 'data-key'
const timeNodes = Array.from(document.querySelectorAll('[data-time]'));

/** Declare a constant and define as the return value of mapping over each item in
 *  the array TWICE and reducing the result of those maps to a single numeric value. */
const seconds = timeNodes
  // Get the 'data-time' property
  .map(node => node.dataset.time)
  .map(timeCode => {

/** Declare constants minutes & seconds using array destructuring and define
 *  as the result of splitting the 'data-time' property a list item and parsing
 *  the returned two strings as float numbers. */
    const [mins, secs] = timeCode.split(':').map(parseFloat);
    // Return the total seconds
    return (mins * 60) + secs;
  })
  // Add up all the seconds
  .reduce((total, vidSeconds) => total + vidSeconds);

/** Calculate hours by dividing total seconds by 3600 (seconds in a minute (60)
 *  multiplied by minutes in an hour (60)) and round the value DOWN before returning */
// Variable used to hold calculated remaining seconds
let secondsLeft = seconds;
// Calculate remaining hours
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;
// Calculate remaining minutes
const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;
// Log 'em out!
document.querySelector('#totalTime').innerHTML = hours + " hours " + mins + " minutes and " + secondsLeft + " seconds";
console.log(`Total video time: ${hours} hours, ${mins} minutes, and ${secondsLeft} seconds`)
