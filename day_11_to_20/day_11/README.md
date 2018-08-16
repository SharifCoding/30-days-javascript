# [JavaScript 30 Day Challenge](https://javascript30.com/)
![JavaScript30](./day11VideoPlayer.png)

### Day 11 - Custom HTML5 Video Player
Customize the HTML5 Video Player with more advanced features.

When the HTML page is loaded in a browser, it displays a video player with controls for playing/pausing the video, scrolling through the video progress, skipping/rewinding, changing the volume, and adjusting the playback speed.

#### Get Our Elements
Declaring _constants_ and defining them as references to the HTML elements we want to add functionality to: the player, the video, the current video progress & progress bar, the play/pause button, the skip & rewind buttons, and the volume & playback speed sliders.
```js
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
```

#### Play and Pause
To assess whether or not the video is paused, the following property can be assessed
```js
// returns a boolean
video.paused;
```
To play and pause the video you can call `play` and `pause` methods on the video object, like so
```js
// original
if (video.paused) {
    video.play();
  } else {
    vidoe.pause();
  }
// alternative
const method = video.paused ? 'play' : 'pause';
video[method]();
```
To move along a video you can change its `currentTime` property
```js
video.currentTime += 10;
```
Attach four _event listeners_ to the variable referencing the `viewer` class (the video):
- 'click' event listener which will call upon the playback/pause toggle function as the _event handler_
- 'play' event listener which will call upon the function which updates the play/pause symbol
- 'pause' event listener which will call upon the same function as the 'play' event listener
- 'timeupdate' event listener which will call upon the function that updates the progress bar
```js
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
```
We now have a video that a user can click on to play/pause the video, a play/pause _icon_ that will update in respect to whether the video is playing or is paused, and a progress bar that will reflect the current video position.

#### Video Progression Bar
To allow the user to _manually_ change the video position by dragging the progress bar or clicking on a point in the progress bar, need to keep track of whether the user has their mouse button clicked. If the user isn't pressing a mouse button down, they're just hovering over the progress bar and don't need to make any changes.

##### offsetWidth
In this example, we had to assess how far along the cursor was for a horizontal range element, `offsetWidth` gives the length of the element, whereas `offsetX` gives the amount the cursor is along the x axis (of the element). Code shown below
```js
const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
```

##### timeupdate
This is a useful event that is fired when the video is playing, in this case it allowed the progress bar to fill up in time with the video
```js
video.addEventListener('timeupdate', handleProgress);
```

Attached four _event listeners_ to the variable referencing the _current video progress_:
- 'mousedown' event listener which will change the value of the variable containing the `boolean` value to `true`
- 'mouseup' event listener which will change that value back to `false`
- 'mousemove' event listener which will _call the function responsible for changing the video position __IF__ the variable holding the `boolean` value is `true`_
- 'click' event listener which will _always_ call that same function

```js
// original
progress.addEventListener('mousemove', (event) => {
  if(mousedown) {
    srub()
  } 
});
// alternative
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) => mousedown && scrub(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
```

#### Skip and Rewind buttons
Iterate through the variable referencing the skip/rewind buttons and attach an _event listener_ to each button for the 'click' event, and define an _event handler_ function that will increment the `currentTime` property of the video based on the _numerical value associated with the `data-skip` property of that button_.
```js
// original
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}
skipButtons.forEach(button => button.addEventListener('click', skip));
// alternative code
skipButtons.forEach(button => {
  button.addEventListener(
    'click', () => video.currentTime += parseFloat(button.dataset.skip)) 
})
```
#### Toggle Volume and Playback
Iterate through the variable referencing the volume & playback speed sliders and attach two _event listeners_: 
- a 'change' event listener that will update the _property value of the video element corresponding with the 'name' property of the slider_ to reflect the _'value' property of the slider_
- and a 'mousemove' event listener that will do the same.
```js
// original
function handleRangeUpdate() {
  video[this.name] = this.value;
}
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
// alternative
ranges.forEach(range => {
range.addEventListener('change', () => video[range.name] = range.value)
range.addEventListener('mousemove', () => video[range.name] = range.value)
})
```

#### Further Reading
- [timeupdate](https://developer.mozilla.org/en-US/docs/Web/Events/timeupdate) - Event is fired when the time indicated by the `currentTime` attribute has been updated.
- [currentTime](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime) - Gives the current playback time in seconds.
- [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) - Support basic media-related capabilities that are common to audio and video.
- [Creating a cross-browser video player](https://developer.mozilla.org/en-US/docs/Web/Apps/Fundamentals/Audio_and_video_delivery/cross_browser_video_player) - Design a video player using standard HTML controls, and JavaScript.

[Return to top](#javascript-30-day-challenge)

[Return to 30 Day Challenge](../README.md)
