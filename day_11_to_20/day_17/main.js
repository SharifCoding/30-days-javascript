const bands = [
  'The Plot in You',
  'The Devil Wears Prada',
  'Pierce the Veil',
  'Norma Jean',
  'The Bled',
  'Say Anything',
  'The Midway State',
  'We Came as Romans',
  'Counterparts',
  'Oh, Sleeper',
  'A Skylit Drive',
  'Anywhere But Here',
  'An Old Dog'
];

// declare constant variable and define as new Regular Expression object
const namePrefixes = new RegExp('^(a |the |an )', 'i')

// declare constant variable and define as an arrow function which accepts a 'bandName' property
// and returns that provided argument after replacing values that match the previously defined
// regex pattern with an empty string and removing whitespace on either end
const stripPrefixes = (bandName) => bandName.replace(namePrefixes, '').trim()

// declare constant variable and define as the result of sorting through the
// 'bands' array depending on the band name excluding prefixes ('A', 'The', 'An')
const sortedBands = bands.sort((a, b) => stripPrefixes(a) > stripPrefixes(b) ? 1 : -1);

// select the #bands unordered list and update the inner html to
// be the values in the sortedBands array stored within list items.
document.querySelector("#bands").innerHTML =
  sortedBands
    .map(band => `<li>${band}</li>`)
    .join('')

console.log(sortedBands);
