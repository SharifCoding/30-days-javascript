// start with strings, numbers and booleans
let age = 100;
let age2 = age;
console.log('These are two identical ages: age = ', age,' age2 = ', age2);
age = 200;
console.log('These are two different ages that started out identical: age = ', age,' age2 = ', age2);

// Let's say we have an array
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
// and we want to make a copy of it.
const team = players;
console.log('These are two identical arrays:');
console.log(players, team);
console.info('But changing the second one also changes the first :(');
console.info('However, using slice, concat, spread, or Array.from eliminates the problem');

// You might think we can just do something like this:
// team[3] = 'Lux';
// however what happens when we update that array?
// now here is the problem - we have edited the original array too!
// Why? It's because that is an array reference, not an array copy. They both point to the same array!
// So, how do we fix this? We take a copy instead!
//slice with no params returns a copy of the array
const team2 = players.slice();
// one way
// or create a new array and concat the old one in
const team3 = [].concat(players);
// or use the new ES6 Spread
const team4 = [...players];
const team5 = Array.from(players);
team5[3] = 'Lux';
console.log('Now two different arrays:');
console.log(players, team5);
// now when we update it, the original one isn't changed
// The same thing goes for objects, let's say we have a person object

// with Objects
const person = {
  name: "Wes Bos",
  age: 30
};
console.info('> const person = { name: "Wes Bos",age: 30 };');
// and think we make a copy:
const captain = person;
captain.number = 99;
console.info('Now original object matching with modified object:');
console.log(person, captain);
// how do we take a copy instead?
const cap2 = Object.assign({}, person, {number: 99, age: 30});
console.info('Copying an object is also tricky. But we can use Object.assign to create a 1 level deep copy.');
console.info('Now original object no longer matching with modified object:');
console.log(person, cap2);
// We will hopefully soon see the object ...spread
// const cap3 = {...person};
// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.
const wes = {
  name: 'Wes',
  age: 30,
  social: {
    twitter: '@wesbos',
    facebook: 'wesbos.developer'
  }
};
// console.clear();
// This is a 2 level deep object
console.log(wes);

const dev = Object.assign({}, wes);

// cheaper way
const dev2 = JSON.parse(JSON.stringify(wes));
dev2.name = "Andrei";
dev2.age = 28;
console.info('Using JSON.stringify on the object and then JSON.parse results in a copied object that can be modified across all levels:');
console.log(dev2);
