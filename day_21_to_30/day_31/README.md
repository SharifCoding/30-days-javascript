# [JavaScript 30 Day Challenge](https://javascript30.com/)
![JavaScript30](./tempConvert.gif)

### Bonus - Temperature Converter
Build a simple and neat temperature converter with HTML CSS and Javascript, converting temperatures to and from celsius, fahrenheit, and kelvin.
- Celsius (C) to Fahrenheit
- Celsius (C) to Kelvin
- Fahrenheit (F) to Celsius
- Fahrenheit (F) to Kelvin
- Kelvin (K) to Celsius
- Kelvin (K) to Fahrenheit

Created a function which takes one argument: celsius (a number), calculates the equivalent value in fahrenheit and kelvin, and returns the fahrenheit and kelvin value. Additional function created to convert from fahrenheit and kelvin as well.

The formula for converting celsius to fahrenheit is: `fahrenheit = celsius × (9⁄5) + 32`.
The reverse of that is: `celsius = (fahrenheit - 32) × (5⁄9)`.

#### Refactor Main Function
```js
// previous code
celciusInput.addEventListener('input', function() {
  const celciusTemp = parseFloat(celciusInput.value);
  const fahrenheitTemp = (celciusTemp * (9/5)) + 32;
  const kelvinTemp = celciusTemp + 273.15;

  fahrenheitInput.value = fahrenheitTemp;
  kelvinInput.value = kelvinTemp;
});

// refactored code
function celciusToFahrenheitAndKelvin() {
  const celciusTemp = parseFloat(celciusInput.value);
  const fahrenheitTemp = (celciusTemp * (9/5)) + 32;
  const kelvinTemp = celciusTemp + 273.15;

  fahrenheitInput.value = fahrenheitTemp;
  kelvinInput.value = kelvinTemp;
};

celciusInput.addEventListener('input', celciusToFahrenheitAndKelvin);
```

#### Group Event Handler
```js
// before
celciusInput.addEventListener('input', celciusToFahrenheitAndKelvin);
fahrenheitInput.addEventListener('input', fahrenheitToCelciusAndKelvin);
kelvinInput.addEventListener('input', kelvinToCelciusAndFahrenheit);

// after
function app() {
  celciusInput.addEventListener('input', celciusToFahrenheitAndKelvin);
  fahrenheitInput.addEventListener('input', fahrenheitToCelciusAndKelvin);
  kelvinInput.addEventListener('input', kelvinToCelciusAndFahrenheit);
}

app();
```

#### Round Numbers
```js
function roundNumber(number) {
  return Math.round(number * 100)/100;
}
// 3.1415926535 > number
// 314.15926535 > number * 100
// 314.00 > Math.round(number * 100)
// 3.14 > Math.round(number * 100)/100
```

#### Further Reading
- [Math.round( )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round) - Returns the value of a number rounded to the nearest integer.
- [Conversion of Temperature](https://www.mathsisfun.com/temperature-conversion.html) - Detailed examplanation of temperature conversion between celcius and fahrenheit.
- [JavaScript to convert Fahrenheit to Celsius](http://www.tutorialsmade.com/javascript-to-convert-fahrenheit-to-celsius/) - Learn to find Celsius from Fahrenheit using pure JavaScript.

[Return to top](#javascript-30-day-challenge)

[Return to 30 Day Challenge](../../README.md)
