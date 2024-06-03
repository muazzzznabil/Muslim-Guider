// const getLatitude = () => {
//   const status = document.querySelector(".latitude");

//   const success = (position) => {
//     console.log(position);
//     const lat = position.coords.latitude;
//     status.textContent = `Latitude: ${lat}°`;
//   };
//   const error = () => {
//     status.textContent("Unable to retrieve your location");
//   };
//   navigator.geolocation.getCurrentPosition(success, error);
// };
// const getLongitude = () => {
//   const status = document.querySelector(".longitude");

//   const success = (position) => {
//     console.log(position);
//     const long = position.coords.longitude;
//     status.textContent = `Longitude: ${long}°`;
//   };
//   const error = () => {
//     status.textContent("Unable to retrieve your location");
//   };
//   navigator.geolocation.getCurrentPosition(success, error);
// };

// document.querySelector(".findCoords").addEventListener("click", findLocation);

// function getQiblaDirectionManual() {
//   event.preventDefault();
//   var lat = document.getElementById("latitude").value;
//   var lng = document.getElementById("longitude").value;

//   var url = "https://api.aladhan.com/v1/qibla/" + lat + "/" + lng;
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       document.getElementById("qibla-direction").innerHTML =
//         "Qibla direction: " + data.data.direction;
//     });
// }
// function getQiblaDirectionAuto() {
//   event.preventDefault();

//   var lat = getLatitude();
//   var lng = getLongitude();

//   var url = "https://api.aladhan.com/v1/qibla/" + lat + "/" + lng;
//   console.log(lat + " " + lng);

//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       document.getElementById("qibla-direction").innerHTML =
//         "Qibla direction: " + data.data.direction;
//       console.log(data);
//     });
// }

// Uncomment above  code if you want to use it
// Above is for testing purpose{:


function getQiblaDirectionManually() {
  event.preventDefault();
  var lat = document.getElementById("latitude").value;
  var lng = document.getElementById("longitude").value;

  var url = "https://api.aladhan.com/v1/qibla/" + lat + "/" + lng;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("qibla-direction").innerHTML =
        "Qibla direction: " + data.data.direction;
    });
}

function getQiblaDirectionAuto() {
  const statusLat = document.querySelector(".latitude");
  const statusLng = document.querySelector(".longitude");

  event.preventDefault();

  const success = (position) => {
    console.log(position);
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    statusLat.textContent = `Latitude: ${lat}°`;
    statusLng.textContent = `Latitude: ${lng}°`;
    var url = "https://api.aladhan.com/v1/qibla/" + lat + "/" + lng;
    console.log(lat + "And " + lng);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("qibla-direction").innerHTML =
          "Qibla direction: " + data.data.direction;
        console.log(data.data.direction);
      });
  };
  const error = () => {
    statusLat.textContent("Unable to retrieve your location");
  };
  navigator.geolocation.getCurrentPosition(success, error);
}
