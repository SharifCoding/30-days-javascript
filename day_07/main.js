// Array Cardio Day 2

// Data for exercise 1
const people = [
  { name: 'Wes', year: 1988 },
  { name: 'Kait', year: 1986 },
  { name: 'Irv', year: 1970 },
  { name: 'Lux', year: 2015 },
];
// Data for exercise 2
const comments = [
  { text: 'Love this!', id: 523423 },
  { text: 'Super good', id: 823423 },
  { text: 'You are the best', id: 2039842 },
  { text: 'Ramen is my fav food ever', id: 123523 },
  { text: 'Nice Nice Nice!', id: 542328 }
];

// Some and Every Checks
console.table(people);
// Array.prototype.some()
// is at least one person 19?
const isAdult = people.some(person => ((new Date()).getFullYear()) - person.year >= 19);
console.info('Array.prototype.some() - is at least one person 19?');
console.log({isAdult});
// Array.prototype.every()
// is everyone 19?
const allAdults = people.every(person => ((new Date()).getFullYear()) - person.year >= 19);
console.info('Array.prototype.every() - is everyone 19?');
console.log({allAdults});

// Find Check
console.table(comments);
// Array.prototype.find()
// find the comment with the ID of 823423
const comment = comments.find(comment => comment.id === 823423);
console.info('Array.prototype.find() - find the comment with the ID of 823423');
console.log(comment);

// FindIndex and Delete Checks
// Array.prototype.findIndex()
// find the index with this ID
const index = comments.findIndex(comment => comment.id === 823423);
console.info('Array.prototype.findIndex() - find the index with this ID');
console.log(index);
// Array.prototype.splice()
// delete the comment with the ID of 823423
const newComments = [
  ...comments.slice(0, index),
  ...comments.slice(index + 1)
];
console.info('Array.prototype.splice() - delete the comment with this ID');
console.table(newComments);
