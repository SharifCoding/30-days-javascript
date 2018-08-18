const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
// an array generated from parsing through the items currently in localStorage
// or if there is nothing in localStorage, an empty array.
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
  // prevent the default behavior of the event
  e.preventDefault();
  // `const` define as the value of the `input` element
  const text = (this.querySelector('[name=item]')).value;
  // `const` as an object with the properties 'text' (set to the `input` value)
  // and 'done' (set to the `boolean` value false)
  const item = {
    text,
    done: false
  };
// push the `item` object into the `items` array & store the `items` array in localStorage
items.push(item);
populateList(items, itemsList);
// values saved in localStorage are associated with a `key` and can only be
// String values so we'll convert the `items` array into a JSON string
localStorage.setItem('items', JSON.stringify(items));
// reset the form
this.reset();
}

// function for generating the necessary HTML to display each item in the `items` array
// as a list item with a clickable checkbox
function populateList(plates = [], platesList) {
  // update the 'itemsList' HTML to contain each item stored in the `items` array
  platesList.innerHTML = plates.map((plate, i) => {
    return `
    <li>
      <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
      <label for="item${i}">${plate.text}</label>
    </li>
    `;
  }).join('');
}

// if the target of the event contains the text 'input' toggle the `done` value of
// correct object in the `items` array and update the localStorage to reflect that change
function toggleDone(event) {
  // skip this unless it's an input
  if (!event.target.matches('input')) return;
  const el = event.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

// listen for the 'submit' event and call upon an event handler 'addItem'
addItems.addEventListener('submit', addItem);
// 'done' property of each item element is updated
// so the status of the checkbox carries across page reloads
itemsList.addEventListener('click', toggleDone);
// push an item object into the `items` array as soon the app loads
populateList(items, itemsList);
