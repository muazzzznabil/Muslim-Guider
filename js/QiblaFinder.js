const getLatitude = () => {
  return new Promise((resolve, reject) => {
    const status = document.querySelector(".latitude");

    const success = (position) => {
      console.log(position);
      const lat = position.coords.latitude;
      status.textContent = `Latitude: ${lat}°`;
      resolve(lat);
    };

    const error = () => {
      status.textContent = "Unable to retrieve your location";
      reject(new Error("Unable to retrieve your location"));
    };

    navigator.geolocation.getCurrentPosition(success, error);
  });
};

const getLongitude = () => {
  return new Promise((resolve, reject) => {
    const status = document.querySelector(".longitude");

    const success = (position) => {
      console.log(position);
      const long = position.coords.longitude;
      status.textContent = `Longitude: ${long}°`;
      resolve(long);
    };

    const error = () => {
      status.textContent = "Unable to retrieve your location";
      reject(new Error("Unable to retrieve your location"));
    };

    navigator.geolocation.getCurrentPosition(success, error);
  });
};

// Method to get Qibla Direction Manually :
function getQiblaDirectionManually() {
  event.preventDefault();
  var lat = document.getElementById("latitude").value;
  var lng = document.getElementById("longitude").value;

  var url = "https://api.aladhan.com/v1/qibla/" + lat + "/" + lng;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("qibla-direction").innerHTML =
        data.data.direction;
    });
}

// Method to get Qibla Direction Automatically :
function getQiblaDirectionAuto() {
  const statusLat = document.querySelector(".latitude");
  const statusLng = document.querySelector(".longitude");
  const errorMessage = document.querySelector(".errorMessage");

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
          data.data.direction;
        console.log(data.data.direction);
        console.log(data);
      });
  };
  const error = () => {
    errorMessage.textContent("Unable to retrieve your location");
  };
  navigator.geolocation.getCurrentPosition(success, error);
}

async function initMap() {
  try {
    const lat = await getLatitude();
    const lng = await getLongitude();
    const location = { lat: lat, lng: lng };

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 18, // Increase the zoom level for a closer view
      center: location,
    });

    // Marker for user's location
    const userMarker = new google.maps.Marker({
      position: location,
      map: map,
      title: "Your Location",
    });

    // Coordinates for the Kaaba
    const kaabaLocation = { lat: 21.4225, lng: 39.8262 };

    // Marker for the Kaaba
    const kaabaMarker = new google.maps.Marker({
      position: kaabaLocation,
      map: map,
      title: "Kaaba",
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Change the icon if desired
      },
    });

    // Optionally, you can draw a line between the user's location and the Kaaba
    const line = new google.maps.Polyline({
      path: [location, kaabaLocation],
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    line.setMap(map);
  } catch (error) {
    console.error(error);
  }
}
