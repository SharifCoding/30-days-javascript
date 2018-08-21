// compatibility with Google Chrome and Monzilla Firefox
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// instantiate the speech recognition interface
const recognition = new SpeechRecognition();
// view the text as we are speaking
recognition.interimResults = true;
// we speak The Queens English here, my good man
recognition.lang = 'en-GB';

// print stream of input coming in to the screen
// for each `pause` in speech we want to create a new paragraph element
let paragraph = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(paragraph);

// fired when the speech recognition service returns a result
// an event listener convert the results into an Array
recognition.addEventListener('result', event => {
// get what was heard
const transcript = Array.from(event.results)
  .map(result => result[0])
  .map(result => result.transcript)
  .join('');
  console.log(event.results);
  const poopScript = transcript.replace(/poop|poo|dump/gi, '💩');
  paragraph.textContent = poopScript;

  // create a new <p> for each pause in speech
  if (event.results[0].isFinal) {
    // write to the body
    paragraph = document.createElement('p');
    words.appendChild(paragraph);
  }
});
// event handler to restart 'recognition.start' when it stops 'end'
recognition.addEventListener('end', recognition.start);
// kick off the Speech to Text recognition process
recognition.start();
