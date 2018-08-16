/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
function togglePlay() {
  // only video 'paused' property is avaiable
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  // use 'this' since its bound to video
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  // change on the DOM element
  toggle.textContent = icon;
}

function skip() {
  // HTML attributes are string values, so we parse the value into a `float`
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  // 'name' refers to 'volume' and 'playbackRate'
  // 'value' refers to min and max for 'volume' and 'playbackRate'
  video[this.name] = this.value;
}

function handleProgress() {
  // video contain properties 'currentTime' and 'duration'
  const percent = (video.currentTime / video.duration) * 100;
  // variable linked to css 'flexBasis'
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(event) {
  // 'offsetX' where the mouse was clicked, 'offsetWidth' length of progress bar
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  // progression bar updated to new value
  video.currentTime = scrubTime;
}

/* Hook up the video event listeners */

// click on video screen to start/stop
video.addEventListener('click', togglePlay);
// switch between play/pause icon
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
// fires when the `currentTime` attribute has been updated
video.addEventListener('timeupdate', handleProgress);

/* Hook up the buttons event listeners */

// click on play button to start/stop
toggle.addEventListener('click', togglePlay);
// listen for all DOM element 'data-skip', < 10s and > 25s
skipButtons.forEach(button => button.addEventListener('click', skip));
// listen for all DOM element 'player-slider', volume and playback rate
// listen on each change (update clickdown) and mouse movement (update realtime)
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

/* Hook up scrub event listeners */

// default mousedown set to false
let mousedown = false;
// listen for a click on the video progress bar
progress.addEventListener('click', scrub);
// checks if variable 'mousedown' is true before calling function 'scrub(event)'
progress.addEventListener('mousemove', (event) => mousedown && scrub(event));
// listen if 'mousedown' is true
progress.addEventListener('mousedown', () => mousedown = true);
// listen if 'mousedown' is false
progress.addEventListener('mouseup', () => mousedown = false);
