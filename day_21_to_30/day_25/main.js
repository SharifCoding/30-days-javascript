const divs = document.querySelectorAll('div');
const button = document.querySelector('button');

function logText(event) {
  console.log(this.classList.value);
  // event.stopPropagation(); // stop bubbling!
  // console.log(this);
}

divs.forEach(div => div.addEventListener('click', logText, {
  capture: false,
  once: true
}));

button.addEventListener('click', () => {
  console.log('button.addEventListener > Click!!!');
}, {
  once: true
});
