const hero = document.querySelector('.hero'),
      text = hero.querySelector('h1'),
      walk = 500;

const shadow = (event) => {
  // get the width & height properties of the 'hero' div
  const { offsetWidth: width, offsetHeight: height } = hero;
  // get the distance of the mouse from the event's target node in X and Y coordinates
  let { offsetX: x, offsetY: y } = event;

  // if the element that the mouse is hovering over is different than the event's target element
  if (event.currentTarget !== event.target) {
    // increment the x & y coordinates by the distance between the element and the event's target
    // element on the x & y axis
    x += event.target.offsetLeft;
    y += event.target.offsetTop;
  }
  // calculate the stretch distance for the element's shadow on the x & y axis
  const xWalk = Math.round((x / width * walk) - (walk / 2)),
  yWalk = Math.round((y / height * walk) - (walk / 2));

  // update the 'textShadow' style property of the h1 element
  text.style.textShadow = `
  ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
  ${-xWalk}px ${yWalk}px 0 rgba(0,255,255,0.7),
  ${yWalk}px ${-xWalk}px 0 rgba(0,255,0,0.7),
  ${-yWalk}px ${-xWalk}px 0 rgba(0,0,255,0.7)
  `;
}
// attach an event listener to the `hero` div element
// that will call upon a provided event handler on the 'mousemove' event
hero.addEventListener('mousemove', shadow);
