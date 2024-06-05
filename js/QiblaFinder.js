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
    statusLng.textContent = `Longitude: ${lng}°`;
    var url = "https://api.aladhan.com/v1/qibla/" + lat + "/" + lng;
    console.log(lat + "And " + lng);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let direction = data.data.direction;
        let directionRounded = Math.round(direction * 10) / 10;

        document.getElementById("qibla-direction").innerHTML =
          directionRounded + "°";
        console.log(data.data.direction);
        console.log(directionRounded);
      });
  };
  const error = () => {
    errorMessage.textContent = "Unable to retrieve your location";
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

    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    let markers = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  } catch (error) {
    console.error(error);
  }
}
