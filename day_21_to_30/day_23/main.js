const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;

// filter and map the available voices so it only display those with English as their language
function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes('en'))
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// search through the voices array and find the corresponding
// SpeechSynthesisVoice object to set as the voice on the utterance
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}

// restart the speech with the new properties every time the voice, or rate or pitch altered
function toggle(startOver = true) {
  // cancel the current utterance
  speechSynthesis.cancel();
  if (startOver) {
    // start a new utterance
    speechSynthesis.speak(msg);
  }
}

// selector to gather the name and value of each of options (rate, pitch & message) and update the msg
function setOption() {
  msg[this.name] = this.value;
  toggle();
}

// listen for when the voiceschanged event fires on the speechSynthesis object
speechSynthesis.addEventListener('voiceschanged', populateVoices);
// listen for when a voice has been selected from the dropdown menu
voicesDropdown.addEventListener('change', setVoice);
// ability for the users to edit the options (rate, pitch & message)
options.forEach(option => option.addEventListener('change', setOption));
// hook the speak/stop buttons, eventListener first, and then call toggle
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
