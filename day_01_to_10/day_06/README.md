# [JavaScript 30 Day Challenge](https://javascript30.com/)
![JavaScript30](./day06TypeAhead.png)

### Day 6 - Ajax Type Ahead
Filter through a JSON based on what is being typed.

This web page consist of an `input` HTML element in which the user can insert text, and an `unordered list` below that `input` which will display cities & states in US that contain the text inputted by the user with a highlight around the text that was matched. An `endpoint` points to a JSON data collection containing the data of cities & states in US.

A variable will contain an array and _fetch_ the data from the provided endpoint _pushing_ the return values into the array. An _event listener_ is attached to the `input` HTML element that will listen for the `keyup` event, and call a _event handler_ function that will be responsible for formatting the data and displaying it on the page. Within the body of the _event handler_ function will call another function that will be responsible for matching the inputted text and the values received from the endpoint.

#### fetch
In this case, fetch is used to retrieve data from a url leading to a JSON data source.
```js
fetch(endpoint).then(blob => blob.json());
```
This will return a promise, that can then be resolved to retrieve the data via `json()`, the following code will add the data to an array
```js
fetch(endpoint).then(blob => blob.json()).then(data => cities.push(...data));
```
**Note** Use of the `... spread` operator to push each data object into the array instead of it entirely (which would push the entire data source at index 0)

#### RegExp
In order to use a variable as your matched string, you need to create a RegExp.
```js
const regex = new RegExp(wordToMatch, 'gi');
```
This can then be used in `match()` methods for example
```js
return place.city.match(regex);
```

#### Other
Format the population so that it's separated by commas.
```js
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
```

#### JavaScript Code
```js
// Data returned from the endpoint in an array.
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

/* Modern browser APIs provided with an experimental fetch method that fetches resources and returns a Promise containing the response in a Response object. Method used to get data from the provided endpoint, convert the response to JSON, and then push the items into an array. */
const cities = [];
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

/* This function will accept two parameters; the inputted text and the array containing the data from the endpoint.
- Function will filter through the array, using a new instance of a Regular Expression object. This object will accept the inputted text as the pattern to match, and will have flags set to find all matches and to ignore text casing.
- Match the inputted text with the `city` or `state` properties of the objects contained within our array. */
function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex)
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/* In this function, a variable defined as the response from calling the findMatches function, passing in the value of the function context (the inputted text) and the variable containing the endpoint data as arguments. This variable now contains an array of items from our dataset that match the inputted text.
- In the body of the `map` method, two variables will target the `city` and `state` properties of each object in the array mapped over and replaced properties with the necessary HTML to highlight them.
- Return a template string containing two list items; one will display the city and state, and the other will display the population. The result of this `map` method will be an array of template strings that can join together to be one template string. */
function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="highlight">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="highlight">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// An event listener attached to the <input> HTML element which will listen for the 'keyup' event and call upon a function as the event handler that will be responsible for displaying the matched data.
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
```

#### Further Reading
- [Regular Expressions(RegExp)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) - Regular expressions are patterns used to match character combinations in strings.
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - Fetch API provides an interface for fetching resources (including across the network). 
- [match( )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) - Method retrieves the matches when matching a string against a regular expression.

[Return to top](#javascript-30-day-challenge)

[Return to 30 Day Challenge](../../README.md)
