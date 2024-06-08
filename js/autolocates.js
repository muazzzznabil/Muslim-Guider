var http = new XMLHttpRequest();
var result = document.querySelector("#result");

document.querySelector("#share").addEventListener("click", () => {
  findMyCoordinates();
});

function findMyCoordinates() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var bdcAPI =
          "https://api-bdc.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}";
        getAPI(bdcAPI);
      },
      (err) => {
        alert(err.message);
      }
    );
  } else {
    alert("Geolocatuin is not supported by your browser");
  }
}

function getAPI(bdcAPI) {
  http.open("GET", bdcAPI);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      var countryName = response.countryName || "Country not found";
      var city = response.city || "City not found";
      var locality = response.locality || "Locality not found";

      city = city.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      result.innerHTML = `${countryName}, ${city}, ${locality}`;

      // Call getZone to get the zone based on city
      var zone = getZone(city);
      console.log(" var zone = getZone(city) : " + zone);
      // Use the zone in subsequent logic (if needed)
      getPrayerTimesAuto(zone); // Pass the zone to getPrayerTimes
    }
  };
}

function getPrayerTimesAuto(area) {
  try {

    console.log("parameter parse : ");

    if (!area) {
      document.getElementById("prayerTimes").textContent =
        "Location not supported for prayer times.";
      console.log("parameter parse : " + this.area);
      console.log("parameter parse : ");

      return;
    } else {
      fetch(`https://api.waktusolat.app/v2/solat/${area}`)
        .then((response) => response.json())
        .then((data) => {
          var prayerTimes = data.prayers[0];
          var prayerTimesDiv = document.getElementById("prayerTimes");

          var fajr = new Date(prayerTimes.fajr * 1000).toLocaleTimeString();
          var dhuhr = new Date(prayerTimes.dhuhr * 1000).toLocaleTimeString();
          var asr = new Date(prayerTimes.asr * 1000).toLocaleTimeString();
          var maghrib = new Date(
            prayerTimes.maghrib * 1000
          ).toLocaleTimeString();
          var isha = new Date(prayerTimes.isha * 1000).toLocaleTimeString();

          prayerTimesDiv.innerHTML = `
                    <div class="resultPray">
                        <div class="prayer-time">
                            <span class="prayer-name">Fajr:</span> 
                            <span class="prayer-value">${fajr}</span>
                        </div>
                        <div class="prayer-time">
                            <span class="prayer-name">Dhuhr:</span> 
                            <span class="prayer-value">${dhuhr}</span>
                        </div>
                        <div class="prayer-time">
                            <span class="prayer-name">Asr:</span> 
                            <span class="prayer-value">${asr}</span>
                        </div>
                        <div class="prayer-time">
                            <span class="prayer-name">Maghrib:</span> 
                            <span class="prayer-value">${maghrib}</span>
                        </div>
                        <div class="prayer-time">
                            <span class="prayer-name">Isha:</span> 
                            <span class="prayer-value">${isha}</span>
                        </div>
                        </div>
                    `;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          document.getElementById("prayerTimes").textContent =
            "Error fetching prayer times.";
        });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("prayerTimes").textContent =
      "Error fetching prayer times.";
  }
}

function getZone(city) {
  var zone = "";

  // Johor
  if (["Pulau Aur", "Pulau Pemanggil"].includes(city)) {
    zone = "JHR01";
  } else if (
    ["Johor Bahru", "Kota Tinggi", "Mersing", "Kulai"].includes(city)
  ) {
    zone = "JHR02";
  } else if (["Kluang", "Pontian"].includes(city)) {
    zone = "JHR03";
  } else if (
    ["Batu Pahat", "Muar", "Segamat", "Gemas Johor", "Tangkak"].includes(city)
  ) {
    zone = "JHR04";
  }

  // Kedah
  else if (["Kota Setar", "Kubang Pasu", "Pokok Sena"].includes(city)) {
    zone = "KDH01";
  } else if (["Kuala Muda", "Yan", "Pendang"].includes(city)) {
    zone = "KDH02";
  } else if (["Padang Terap", "Sik"].includes(city)) {
    zone = "KDH03";
  } else if (["Baling"].includes(city)) {
    zone = "KDH04";
  } else if (["Bandar Baharu", "Kulim"].includes(city)) {
    zone = "KDH05";
  } else if (["Langkawi"].includes(city)) {
    zone = "KDH06";
  } else if (["Puncak Gunung Jerai"].includes(city)) {
    zone = "KDH07";
  }

  // Kelantan
  else if (
    [
      "Bachok",
      "Kota Bharu",
      "Machang",
      "Pasir Mas",
      "Pasir Puteh",
      "Tanah Merah",
      "Tumpat",
      "Kuala Krai",
      "Mukim Chiku",
    ].includes(city)
  ) {
    zone = "KTN01";
  } else if (
    [
      "Gua Musang(Daerah Galas Dan Bertam)",
      "Jel",
      "Jajahan Kecil Lojing",
    ].includes(city)
  ) {
    zone = "KTN02";
  }

  // Melaka
  else if (["Melaka Tengah", "Alor Gajah", "Jasin"].includes(city)) {
    zone = "MLK01";
  }

  // Negeri Sembilan
  else if (["Tampin", "Jempol"].includes(city)) {
    zone = "NGS01";
  } else if (["Jelebu", "Kuala Pilah", "Rembau"].includes(city)) {
    zone = "NGS02";
  } else if (["Port Dickson", "Seremban"].includes(city)) {
    zone = "NGS03";
  }

  // Pahang
  else if (["Pulau Tioman"].includes(city)) {
    zone = "PHG01";
  } else if (["Kuantan", "Pekan", "Rompin", "Muadzam Shah"].includes(city)) {
    zone = "PHG02";
  } else if (
    ["Jerantut", "Temerloh", "Maran", "Bera", "Chenor", "Jengka"].includes(city)
  ) {
    zone = "PHG03";
  } else if (["Bentong", "Lipis", "Raub"].includes(city)) {
    zone = "PHG04";
  } else if (["Genting Sempah", "Janda Baik", "Bukit Tinggi"].includes(city)) {
    zone = "PHG05";
  } else if (
    ["Cameron Highlands", "Genting Highlands", "Bukit Fraser"].includes(city)
  ) {
    zone = "PHG06";
  }

  // Perak
  else if (["Tapah", "Slim River", "Tanjung Malim"].includes(city)) {
    zone = "PRK01";
  } else if (
    ["Kuala Kangsar", "Sg.Siput", "Ipoh", "Batu Gajah", "Kampar"].includes(city)
  ) {
    zone = "PRK02";
  } else if (["Lenggong", "Pengkalan Hulu", "Grik"].includes(city)) {
    zone = "PRK03";
  } else if (["Temengor", "Belum"].includes(city)) {
    zone = "PRK04";
  } else if (
    [
      "Kg Gajah",
      "Teluk Intan",
      "Bagan Datuk",
      "Seri Iskandar",
      "Beruas",
      "Parit",
      "Lumut",
      "Sitiawan",
      "Pulau Pangkor",
    ].includes(city)
  ) {
    zone = "PRK05";
  } else if (
    ["Selama", "Taiping", "Bagan Serai", "Parit Buntar"].includes(city)
  ) {
    zone = "PRK06";
  } else if (["Bukit Larut"].includes(city)) {
    zone = "PRK07";
  }

  // Perlis
  else if (
    [
      "Kangar",
      "Arau",
      "Kaki Bukit",
      "Kuala Perlis",
      "Padang Besar",
      "Simpang Empat",
    ].includes(city)
  ) {
    zone = "PLS01";
  }

  // Pulau Pinang
  else if (
    [
      "Barat Daya",
      "Seberang Perai Selatan",
      "Seberang Perai Tengah",
      "Seberang Perai Utara",
      "Timur Laut",
    ].includes(city)
  ) {
    zone = "PNG01";
  }

  // Sabah
  else if (
    [
      "Bahagian Sandakan (Timur)",
      "Bukit Garam",
      "Semawang",
      "Temanggong",
      "Tambisan",
      "Bandar Sandakan",
      "Sukau",
    ].includes(city)
  ) {
    zone = "SBH01";
  } else if (
    [
      "Beluran",
      "Telupid",
      "Pinangah",
      "Terusan",
      "Kuamut",
      "Bahagian Sandakan (Barat)",
    ].includes(city)
  ) {
    zone = "SBH02";
  } else if (
    [
      "Lahad Datu",
      "Silabukan",
      "Kunak",
      "Tungku",
      "Bahagian Tawau (Timur)",
    ].includes(city)
  ) {
    zone = "SBH03";
  } else if (
    [
      "Tawau",
      "Balong",
      "Merotai",
      "Kalabakan",
      "Bahagian Tawau (Barat)",
    ].includes(city)
  ) {
    zone = "SBH04";
  } else if (["Semporna"].includes(city)) {
    zone = "SBH05";
  } else if (["Kudat", "Kota Marudu", "Pitas", "Pulau Banggi"].includes(city)) {
    zone = "SBH06";
  } else if (["Gunung Kinabalu"].includes(city)) {
    zone = "SBH07";
  } else if (
    [
      "Papar",
      "Ranau",
      "Kota Belud",
      "Tuaran",
      "Penampang",
      "Kota Kinabalu",
      "Putatan",
      "Bahagian Pantai Barat",
    ].includes(city)
  ) {
    zone = "SBH08";
  } else if (
    ["Pensiangan", "Keningau", "Tenom", "Nabawan", "Sook"].includes(city)
  ) {
    zone = "SBH09";
  } else if (
    [
      "Sipitang",
      "Long Pa Sia",
      "Beaufort",
      "Kuala Penyu",
      "Weston",
      "Menumbok",
      "Sindumin",
      "Membakut",
    ].includes(city)
  ) {
    zone = "SBH10";
  }

  // Sarawak
  else if (["Limbang", "Sundar", "Trusan", "Lawas"].includes(city)) {
    zone = "SWK01";
  } else if (["Miri", "Niah", "Bekenu", "Sibuti", "Marudi"].includes(city)) {
    zone = "SWK02";
  } else if (["Bintulu", "Tatau", "Sebauh"].includes(city)) {
    zone = "SWK03";
  } else if (["Kapit", "Belaga", "Song"].includes(city)) {
    zone = "SWK04";
  } else if (["Sibu", "Kanowit", "Selangau"].includes(city)) {
    zone = "SWK05";
  } else if (["Sarikei", "Julau", "Bintangor", "Pakan"].includes(city)) {
    zone = "SWK06";
  } else if (["Mukah", "Dalat", "Oya", "Igan", "Matu", "Daro"].includes(city)) {
    zone = "SWK07";
  } else if (
    [
      "Sri Aman",
      "Lubok Antu",
      "Engkilili",
      "Betong",
      "Saratok",
      "Roban",
      "Debak",
      "Spaoh",
      "Pusa",
      "Maludam",
      "Kabong",
    ].includes(city)
  ) {
    zone = "SWK08";
  } else if (
    [
      "Kuching",
      "Bau",
      "Lundu",
      "Samarahan",
      "Simunjan",
      "Serian",
      "Sebuyau",
      "Meludam",
    ].includes(city)
  ) {
    zone = "SWK09";
  }

  // Selangor
  else if (
    [
      "Gombak",
      "Petaling",
      "Sepang",
      "Hulu Langat",
      "Hulu Selangor",
      "Shah Alam",
    ].includes(city)
  ) {
    zone = "SGR01";
  } else if (
    ["Klang", "Kuala Langat", "Kuala Selangor", "Sabak Bernam"].includes(city)
  ) {
    zone = "SGR02";
  } else if (["Bukit Fraser", "Genting Highlands"].includes(city)) {
    zone = "SGR03";
  }

  // Terengganu
  else if (["Kuala Terengganu", "Marang", "Kuala Nerus"].includes(city)) {
    zone = "TRG01";
  } else if (["Besut", "Setiu"].includes(city)) {
    zone = "TRG02";
  } else if (["Hulu Terengganu"].includes(city)) {
    zone = "TRG03";
  } else if (["Dungun", "Kemaman"].includes(city)) {
    zone = "TRG04";
  } else if (
    [
      "Pulau Perhentian",
      "Pulau Redang",
      "Pulau Lang Tengah",
      "Pulau Kapas",
      "Pulau Tenggol",
    ].includes(city)
  ) {
    zone = "TRG05";
  }

  // Wilayah Persekutuan
  else if (["Kuala Lumpur", "Putrajaya"].includes(city)) {
    zone = "WLY01";
  } else if (["Labuan"].includes(city)) {
    zone = "WLY02";
  }

  return zone;
}
