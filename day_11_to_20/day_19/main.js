const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// this function will use the `Navigator` and `mediaDevices` web APIs to ask permission to access the user's webcam and, upon success, will set the source object of the `video` element as the `localMediaStream`.
function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
      // video.src = window.URL.createObjectURL(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error(`camera access denied`, err);
    });
}

// this function will display video feed onto hyml page
function paintToCanvas() {
  // define `video` element's width and height
  const width = video.videoWidth;
  const height = video.videoHeight;
  // update the `canvas` width and height to reflect those values
  canvas.width = width;
  canvas.height = height;
  // return the _interval ID_ of a `setInterval()` function call, and within the body of that function call, draw the current `video` element on to the `canvas.`
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.8;
    pixels = greenScreen(pixels);
    // put them back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

// this function will take photo and play the `audio` element on the HTML page
function takePhoto() {
  // play the audio element on the HTML page
  snap.currentTime = 0;
  snap.play();
  // take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  // a link which targets a _data URI_ representation of a still image taken from the canvas
  // places that link into the front of the empty `div` element
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);
}

// filter functions
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}
function greenScreen(pixels) {
  const levels = {};
  // iterate through a NodeList of all `input` elements within the div with class `rgb` and 
  // set a key in the `levels` object as a given input's `name` property, and set the value to be the given input's `value`
  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });
  // update the values of the pixels in the image so that we remove all RGB values that are within the range
  // defined by the user and return the given argument
  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}

// get video permission and display on screen
getVideo();
// an event listener to the `video` HTML element that will call the
// `paintToCanvas` function on the 'canplay' event
video.addEventListener('canplay', paintToCanvas);
