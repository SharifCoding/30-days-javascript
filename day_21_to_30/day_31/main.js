const celciusInput = document.querySelector('#celcius > input');
const fahrenheitInput = document.querySelector('#fahrenheit > input');
const kelvinInput = document.querySelector('#kelvin > input');

function roundNumber(number) {
  return Math.round(number * 100)/100;
}

function celciusToFahrenheitAndKelvin() {
  const celciusTemp = parseFloat(celciusInput.value);
  const fahrenheitTemp = (celciusTemp * (9/5)) + 32;
  const kelvinTemp = celciusTemp + 273.15;

  fahrenheitInput.value = roundNumber(fahrenheitTemp);
  kelvinInput.value = roundNumber(kelvinTemp);
  console.log('celcius > fahrenheit: ', fahrenheitTemp);
  console.log('celcius > kelvin: ', kelvinTemp);
};

function fahrenheitToCelciusAndKelvin() {
  const fahrenheitTemp = parseFloat(fahrenheitInput.value);
  const celciusTemp = (fahrenheitTemp - 32) * (5/9);
  const kelvinTemp = (fahrenheitTemp + 459.67) * 5/9;

  celciusInput.value = roundNumber(celciusTemp);
  kelvinInput.value = roundNumber(kelvinTemp);
  console.log('fahrenheit > celcius: ', celciusTemp);
  console.log('fahrenheit > kelvin: ', kelvinTemp);
};

function kelvinToCelciusAndFahrenheit() {
  const kelvinTemp = parseFloat(kelvinInput.value);
  const celciusTemp = kelvinTemp - 273.15;
  const fahrenheitTemp = 9/5 * (kelvinTemp - 273) + 32;

  celciusInput.value = roundNumber(celciusTemp);
  fahrenheitInput.value = roundNumber(fahrenheitTemp);
  console.log('kelvin > celcius: ', celciusTemp);
  console.log('kelvin > fahrenheit: ', fahrenheitTemp);
};

function app() {
  celciusInput.addEventListener('input', celciusToFahrenheitAndKelvin);
  fahrenheitInput.addEventListener('input', fahrenheitToCelciusAndKelvin);
  kelvinInput.addEventListener('input', kelvinToCelciusAndFahrenheit);
}

app();
