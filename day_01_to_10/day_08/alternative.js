// Store logic inside an anonymous function to avoid polluting global namespace
(() => {
// Declare & define variable reference to canvas HTMLElement
const myCanvas = document.querySelector('#draw');
myCanvas.width = window.innerWidth;   // Width matches the available window width
myCanvas.height = window.innerHeight; // Height matches the available window height

// Declare & define variable reference to the CONTEXT of the canvas (what's in it)
const ctx = myCanvas.getContext('2d');
ctx.lineJoin = 'round'; // Intersecting/connected lines will have a smooth join
ctx.lineCap = 'round';  // End of line will be smooth

// Declare & define variable reference for current & last mouse location
const mouse = { x: 0, y: 0 }, last_mouse = { ...mouse};

// Declare & define variables to change line hue & line width
let hue = 0, increaseLineWidth = true;

// mousedown event handler function
const quickDraw = () => {
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // Set hue, saturation, & luminosity
  ctx.beginPath();                            // Begin or reset current path
  ctx.moveTo(last_mouse.x, last_mouse.y);     // Starting point of path
  ctx.lineTo(mouse.x, mouse.y);               // Ending point of path
  ctx.closePath(); // Create path starting from moveTo and ending at lineTo
  ctx.stroke();    // Draw the defined path on the canvas

  // Ternary operator to reset/increase hue value
  hue >= 360 ? 0 : hue++;

  // Ternary operator to increase/decrease line width
  increaseLineWidth ? ctx.lineWidth++ : ctx.lineWidth--;

  // Width of line increases or decreases, staying within a value of 1-100.
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) increaseLineWidth = !increaseLineWidth;
}

// mousemove Event Handler function
const setMouseLocation = (e) => {
  // Update values based on previous & current mouse locations using array destructuring
  [last_mouse.x, last_mouse.y, mouse.x, mouse.y] = [mouse.x, mouse.y, e.offsetX, e.offsetY];
}

// An object with key/value pairs corresponding with the name of the action
// and the function we want to for that action
const quick = {
  add: () => myCanvas.addEventListener('mousemove', quickDraw),
  rem: () => myCanvas.removeEventListener('mousemove', quickDraw)
}

// Array of event + eventHandler objects to iterate over and use
// as arguments for adding event listeners to myCanvas
const evs = [
  {e: 'mousemove', h: setMouseLocation},
  {e: 'mousedown', h: quick.add},
  {e: 'mouseup', h: quick.rem},
  {e: 'mouseout', h: quick.rem}
];

// Attach event listeners
evs.forEach(({e, h}) => { myCanvas.addEventListener(e, h); });
})(); // Immediately invoke anonymous function
