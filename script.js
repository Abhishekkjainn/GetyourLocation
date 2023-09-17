let locationButton = document.getElementById('get-location');
let locationDiv = document.getElementById('location-details');

locationButton.addEventListener('click', () => {
  //Geolocation APU is used to get geographical position of a user and is available inside the navigator object
  if (navigator.geolocation) {
    //returns position(latitude and longitude) or error
    navigator.geolocation.getCurrentPosition(showLocation, checkError);
  } else {
    //For old browser i.e IE
    locationDiv.innerText = 'The browser does not support geolocation';
  }
});

//Error Checks
const checkError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      locationDiv.innerText = 'Please allow access to location';
      break;
    case error.POSITION_UNAVAILABLE:
      //usually fired for firefox
      locationDiv.innerText = 'Location Information unavailable';
      break;
    case error.TIMEOUT:
      locationDiv.innerText = 'The request to get user location timed out';
  }
};

const showLocation = async (position) => {
  //We user the NOminatim API for getting actual addres from latitude and longitude
  let response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
  );
  //store response object

  let data = await response.json();
  localStorage.setItem('city', data.address.city);
  localStorage.setItem('country', data.address.country);
  locationDiv.innerText = `${data.address.city}, ${data.address.country}`;
};

//bot token
var telegram_bot_id = '6539091569:AAEPPxkHElMeH-vTj3Togc-bP2iidgtxwvg';
//chat id
var chat_id = 1212458291;
var u_name, email, message;
var ready = function () {
  u_name = document.getElementById('name').value;

  phone = document.getElementById('phone').value;
  message =
    'Name: ' +
    u_name +
    '\nPhone : ' +
    phone +
    '\nLocation Data : ' +
    localStorage.getItem('city') +
    ' , ' +
    localStorage.getItem('country');
};
var sender = function () {
  ready();
  var settings = {
    async: true,
    crossDomain: true,
    url: 'https://api.telegram.org/bot' + telegram_bot_id + '/sendMessage',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
    },
    data: JSON.stringify({
      chat_id: chat_id,
      text: message,
    }),
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
  });

  return false;
};
