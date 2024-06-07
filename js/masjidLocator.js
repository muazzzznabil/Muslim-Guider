let map;
let service;
let geocoder;
let currentPos;

async function initMap() {
  geocoder = new google.maps.Geocoder();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        map = new google.maps.Map(document.getElementById("map"), {
          center: currentPos,
          zoom: 13.1,
        });

        searchMosques(currentPos);
        displayCurrentLocation();
      },
      () => {
        handleLocationError(true, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
  }
}

function searchMosques(location) {
  const request = {
    location: location,
    radius: "5000", // 5km radius
    type: ["mosque"],
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

let markers = [];
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    results.sort((a, b) => b.rating - a.rating); // Sort results by rating in descending order
    const tableBody = document.querySelector("#mosqueTable tbody");
    tableBody.innerHTML = ""; // Clear previous results

    // Clear previous markers
    markers.forEach((marker) => marker.setMap(null));
    markers = [];

    let row;
    for (let i = 0; i < results.length; i++) {
      if (i % 4 === 0) {
        row = document.createElement("tr");
        tableBody.appendChild(row);
      }
      const cell = document.createElement("td");
      cell.appendChild(createMosqueCard(results[i]));
      row.appendChild(cell);

      // Create marker for each mosque
      const marker = new google.maps.Marker({
        position: results[i].geometry.location,
        map: map,
        title: results[i].name,
      });

      marker.addListener('click', () => {
        window.open(
          `https://www.google.com/maps/dir/?api=1&destination=${results[i].geometry.location.lat()},${results[i].geometry.location.lng()}`,
          "_blank"
        );
      });

      markers.push(marker);
    }
  }
}

function createMosqueCard(place) {
  const card = document.createElement("div");
  card.classList.add("mosque-card");
  card.addEventListener("click", () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${place.geometry.location.lat()},${place.geometry.location.lng()}`,
      "_blank"
    );
  });

  const image = document.createElement("img");
  image.src = place.photos ? place.photos[0].getUrl() : "images/imagePlaceholder.jpg";
  image.alt = place.name;

  const info = document.createElement("div");
  info.classList.add("mosque-info");

  const name = document.createElement("h3");
  name.textContent = place.name;

  const address = document.createElement("p");
  address.textContent = place.vicinity;

  const rating = document.createElement("p");
  rating.textContent = `Rating: ${place.rating}/5`;

  info.appendChild(name);
  info.appendChild(address);
  info.appendChild(rating);
  card.appendChild(image);
  card.appendChild(info);

  return card;
}

function displayCurrentLocation() {
  const container = document.querySelector(".containers");

  const currentLocationDiv = document.createElement("div");
  currentLocationDiv.classList.add("current-location");

  const locationTitle = document.createElement("h2");
  locationTitle.textContent = "Current Location";

  const locationCoords = document.createElement("p");
  locationCoords.textContent = `Latitude: ${currentPos.lat}, Longitude: ${currentPos.lng}`;

  geocoder.geocode({ location: currentPos }, (results, status) => {
    if (status === "OK") {
      const locationDetails = results[0].address_components;
      const city = locationDetails.find((comp) => comp.types.includes("locality"))?.long_name || "";
      const district = locationDetails.find((comp) => comp.types.includes("administrative_area_level_2"))?.long_name || "";

      const locationName = document.createElement("p");
      locationName.textContent = `City: ${city}`;
      currentLocationDiv.appendChild(locationName);
    }
  });

  currentLocationDiv.appendChild(locationTitle);
  currentLocationDiv.appendChild(locationCoords);

  container.insertBefore(currentLocationDiv, container.firstChild);
}

function handleSearch() {
  const address = document.getElementById("search").value;
  geocodeAddress(address);
}

function geocodeAddress(address) {
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      const location = results[0].geometry.location;
      map.setCenter(location);
      searchMosques(location);

      // Update current location display
      const currentLocationDiv = document.querySelector(".current-location");
      currentLocationDiv.innerHTML = ""; // Clear previous location info

      const locationTitle = document.createElement("h2");
      locationTitle.textContent = "Entered Location";

      const locationCoords = document.createElement("p");
      locationCoords.textContent = `Latitude: ${location.lat()}, Longitude: ${location.lng()}`;

      geocoder.geocode({ location: location }, (results, status) => {
        if (status === "OK") {
          const locationDetails = results[0].address_components;
          const city = locationDetails.find((comp) => comp.types.includes("locality"))?.long_name || "";
          const district = locationDetails.find((comp) => comp.types.includes("administrative_area_level_2"))?.long_name || "";

          const locationName = document.createElement("p");
          locationName.textContent = `City: ${city}`;
          currentLocationDiv.appendChild(locationName);
        }
      });

      currentLocationDiv.appendChild(locationTitle);
      currentLocationDiv.appendChild(locationCoords);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchButton").addEventListener("click", handleSearch);
  initMap();
});

function handleLocationError(browserHasGeolocation, pos) {
  alert(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
}
