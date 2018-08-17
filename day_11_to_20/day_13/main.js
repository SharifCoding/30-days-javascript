// returns a function, that, as long as it continues to be invoked, will not be triggered
// the function will be called after it stops being called for N milliseconds
// if immediate is passed, trigger the function on the leading edge, instead of the trailing
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide() {
  sliderImages.forEach(sliderImage => {
    // half way through the image
    // current scroll location in relation to the midway point of the image
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
    // bottom of the image
    // bottom of the image in relation to the entire page
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    // boolean value to decide if user has scrolled past the midway point of an image
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    // boolean value to decide if the user has scrolled the image out of view
    const isNotScrolledPast = window.scrollY < imageBottom;
    // if the user has scrolled to a point where they are past the midway point of an image
    // and the image is still in view, attach the 'active' class to the image, otherwise remove it
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

// attach event listener to the window object and listen for the 'scroll' event
window.addEventListener('scroll', debounce(checkSlide));
