// event listeners select the arrow in the compass & the 'km/h' speed
// both of these need to update based on the users location and speed
const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

// use watchPosition() because we want multiple updates (not just the one location)
navigator.geolocation.watchPosition((data) => {
  console.log(data);
  // if we have the users speed then update the speed shown
  speed.textContent = data.coords.speed;
  // rotate the arrow based on the datas heading
  arrow.style.transform = `rotate(${data.coords.heading}deg)`;
// log an error if the user doesn't allow access to their location
}, (err) => {
  console.error(err);
  alert('ENABLE GEOLOCATION!!!');
});
