let currentPos;
let map;
let geocoder;

const getLatitude = () => {
  return new Promise((resolve, reject) => {
    const status = document.querySelector(".latitude");

    const success = (position) => {
      const lat = position.coords.latitude;
      status.textContent = `Latitude: ${lat}°`;
      resolve(lat);
    };

    const error = () => {
      const errorMessage = "Unable to retrieve your location";
      status.textContent = errorMessage;
      reject(new Error(errorMessage));
    };

    navigator.geolocation.getCurrentPosition(success, error);
  });
};

const getLongitude = () => {
  return new Promise((resolve, reject) => {
    const status = document.querySelector(".longitude");

    const success = (position) => {
      const long = position.coords.longitude;
      status.textContent = `Longitude: ${long}°`;
      resolve(long);
    };

    const error = () => {
      const errorMessage = "Unable to retrieve your location";
      status.textContent = errorMessage;
      reject(new Error(errorMessage));
    };

    navigator.geolocation.getCurrentPosition(success, error);
  });
};

function handleSearchBar() {
  const address = document.getElementById("search").value;
  geocodeAddress(address);
}
async function handleSearchButton() {
  const lat = await getLatitude();
  const lng = await getLongitude();
  initMap(lat, lng);
  getQiblaDirectionAuto(lng, lat);
  console.log(
    "Latitude: " +
      (await getLatitude()) +
      " Longitude: " +
      (await getLongitude())
  );
}

async function initMap(lat, lng) {
  geocoder = new google.maps.Geocoder();

  console.log(lat + " and " + lng);

  try {
    const location = { lat: lat, lng: lng };

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15, // Increase the zoom level for a closer view
      center: location,
    });

    // Marker for user's
    const userMarker = new google.maps.Marker({
      position: location,
      map: map,
      title: "Your Location",
    });

    // Coordinates for the Kaaba
    const kaabaLocation = { lat: 21.4225, lng: 39.8262 };
    const distance = calculateDistance(location, kaabaLocation);

    // Update the UI element with the distance
    document.getElementById("qibla-distance").textContent = `${distance.toFixed(
      2
    )} km`;

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

function geocodeAddress(address) {
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      const location = results[0].geometry.location;
      const latitude = location.lat();
      const longitude = location.lng();

      initMap(latitude, longitude);
      getQiblaDirectionAuto(longitude, latitude);

      console.log(`Latitude: ${latitude}, and Longitude: ${longitude}`);
    } else {
      alert("The Location could not be found : " + status);
    }
  });
}

function calculateDistance(userLocation, kaabaLocation) {
  const p1Lat = (userLocation.lat * Math.PI) / 180;
  const p2Lat = (kaabaLocation.lat * Math.PI) / 180;
  const dLat = p2Lat - p1Lat;
  const dLon = ((kaabaLocation.lng - userLocation.lng) * Math.PI) / 180;

  const R = 6371e3; // Earth's radius in kilometers

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(p1Lat) * Math.cos(p2Lat) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function getQiblaDirectionAuto(longitude, latitude) {
  const statusLat = document.querySelector(".latitude");
  const statusLng = document.querySelector(".longitude");
  const errorMessage = document.querySelector(".errorMessage");

  const success = (position) => {
    console.log(position);

    statusLat.textContent = `Latitudes: ${latitude}°`;
    statusLng.textContent = `Longitude: ${longitude}°`;
    var url = "https://api.aladhan.com/v1/qibla/" + latitude + "/" + longitude;
    console.log(latitude + " Qibla  " + longitude);

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
