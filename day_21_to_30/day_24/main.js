// select the navbar from the DOM
const nav = document.querySelector('#main');
// calculate the navbar location on page load
let topOfNav = nav.offsetTop;

// function that will run on every scroll event
function fixNav() {
  // add a new class to the body if the window is scrolled at or below the top of the navbar
  if (window.scrollY >= topOfNav) {
    // add an offset to the body content
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    // add an offset to the body content
    document.body.style.paddingTop = 0;
    document.body.classList.remove('fixed-nav');
  }
}

window.addEventListener('scroll', fixNav);
