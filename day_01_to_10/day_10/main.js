const checkBoxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let lastChecked;

function handleCheck(event) {
  // Check if they had the shift key down
  // AND check that they are checking it
  let inBetween = false;
  if (event.shiftKey && this.checked) {
    // go ahead and do what we please
    // loop over every single checkbox
    checkBoxes.forEach(checkBox => {
      console.log(checkBox);
      if (checkBox === this || checkBox === lastChecked) {
        inBetween = !inBetween;
        console.log('Starting to check them inbetween!');
      }
      if (inBetween) {
        checkBox.checked = true;
      }
    });
  }
  lastChecked = this;
}

checkBoxes.forEach(checkBox => checkBox.addEventListener('click', handleCheck));
