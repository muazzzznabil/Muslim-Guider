function getQiblaDirection(event) {
    event.preventDefault();
    var lat = document.getElementById("latitude").value;
    var lng = document.getElementById("longitude").value;

    var url = 'https://api.aladhan.com/v1/qibla/' + lat + '/' + lng;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("qibla-direction").innerHTML = "Qibla direction: " + data.data.direction;
        });
}