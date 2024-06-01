// prayerTime.js

function getPrayerTimes() {
    try {
      // Determine the zone based on city
      var city = document.getElementById('city').value.trim();
      var area = getZone(city);
  
      if (area) {
        // Fetch prayer times using the zone
        var prayerTimeResponse = fetch(`https://api.waktusolat.app/v2/solat/${area}`);
        var prayerTimeData = prayerTimeResponse.json();
  
        // Display prayer times
        var prayerTimes = prayerTimeData.data;
        var prayerTimesDiv = document.getElementById("prayerTimes");
        prayerTimesDiv.innerHTML = `
          <p>Fajr: ${prayerTimes.fajr}</p>
          <p>Dhuhr: ${prayerTimes.dhuhr}</p>
          <p>Asr: ${prayerTimes.asr}</p>
          <p>Maghrib: ${prayerTimes.maghrib}</p>
          <p>Isha: ${prayerTimes.isha}</p>
        `;
      } else {
        document.getElementById('prayerTimes').textContent = 'Location not supported for prayer times.';
        return;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  

function getZone(city) {
    var zone = "";

    // Johor
    if (["Pulau Aur", "Pulau Pemanggil"].includes(city)) {
        zone = "JHR01";
    } else if (["Johor Bahru", "Kota Tinggi", "Mersing", "Kulai"].includes(city)) {
        zone = "JHR02";
    } else if (["Kluang", "Pontian"].includes(city)) {
        zone = "JHR03";
    } else if (["Batu Pahat", "Muar", "Segamat", "Gemas Johor", "Tangkak"].includes(city)) {
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
    else if (["Bachok", "Kota Bharu", "Machang", "Pasir Mas", "Pasir Puteh", "Tanah Merah", "Tumpat", "Kuala Krai", "Mukim Chiku"].includes(city)) {
        zone = "KTN01";
    } else if (["Gua Musang(Daerah Galas Dan Bertam)", "Jel", "Jajahan Kecil Lojing"].includes(city)) {
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
    } else if (["Jerantut", "Temerloh", "Maran", "Bera", "Chenor", "Jengka"].includes(city)) {
        zone = "PHG03";
    } else if (["Bentong", "Lipis", "Raub"].includes(city)) {
        zone = "PHG04";
    } else if (["Genting Sempah", "Janda Baik", "Bukit Tinggi"].includes(city)) {
        zone = "PHG05";
    } else if (["Cameron Highlands", "Genting Highlands", "Bukit Fraser"].includes(city)) {
        zone = "PHG06";
    }

    // Perak
    else if (["Tapah", "Slim River", "Tanjung Malim"].includes(city)) {
        zone = "PRK01";
    } else if (["Kuala Kangsar", "Sg.Siput", "Ipoh", "Batu Gajah", "Kampar"].includes(city)) {
        zone = "PRK02";
    } else if (["Lenggong", "Pengkalan Hulu", "Grik"].includes(city)) {
        zone = "PRK03";
    } else if (["Temengor", "Belum"].includes(city)) {
        zone = "PRK04";
    } else if (["Kg Gajah", "Teluk Intan", "Bagan Datuk", "Seri Iskandar", "Beruas", "Parit", "Lumut", "Sitiawan", "Pulau Pangkor"].includes(city)) {
        zone = "PRK05";
    } else if (["Selama", "Taiping", "Bagan Serai", "Parit Buntar"].includes(city)) {
        zone = "PRK06";
    } else if (["Bukit Larut"].includes(city)) {
        zone = "PRK07";
    }

    // Perlis
    else if (["Kangar", "Arau", "Kaki Bukit", "Kuala Perlis", "Padang Besar", "Simpang Empat"].includes(city)) {
        zone = "PLS01";
    }

    // Pulau Pinang
    else if (["Barat Daya", "Seberang Perai Selatan", "Seberang Perai Tengah", "Seberang Perai Utara", "Timur Laut"].includes(city)) {
        zone = "PNG01";
    }

    // Sabah
    else if (["Bahagian Sandakan (Timur)", "Bukit Garam", "Semawang", "Temanggong", "Tambisan", "Bandar Sandakan", "Sukau"].includes(city)) {
        zone = "SBH01";
    } else if (["Beluran", "Telupid", "Pinangah", "Terusan", "Kuamut", "Bahagian Sandakan (Barat)"].includes(city)) {
        zone = "SBH02";
    } else if (["Lahad Datu", "Silabukan", "Kunak", "Sahabat", "Semporna", "Tungku", "Bahagian Tawau (Timur)"].includes(city)) {
        zone = "SBH03";
    } else if (["Bandar Tawau", "Balong", "Merotai", "Kalabakan", "Bahagian Tawau (Barat)"].includes(city)) {
        zone = "SBH04";
    } else if (["Kudat", "Kota Marudu", "Pitas", "Pulau Banggi", "Bahagian Kudat"].includes(city)) {
        zone = "SBH05";
    } else if (["Gunung Kinabalu"].includes(city)) {
        zone = "SBH06";
    } else if (["Kota Kinabalu", "Ranau", "Kota Belud", "Tuaran", "Penampang", "Papar", "Putatan", "Bahagian Pantai Barat"].includes(city)) {
        zone = "SBH07";
    } else if (["Pensiangan", "Keningau", "Tambunan", "Nabawan", "Bahagian Pendalaman(Atas)"].includes(city)) {
        zone = "SBH08";
    } else if (["Beaufort", "Kuala Penyu", "Sipitang", "Tenom", "Long Pasia", "Membakut", "Weston", "Bahagian Pendalaman (Bawah)"].includes(city)) {
        zone = "SBH09";
    }

    // Sarawak
    else if (["Limbang", "Lawas", "Sundar", "Trusan"].includes(city)) {
        zone = "SWK01";
    } else if (["Miri", "Niah", "Bekenu", "Sibuti", "Marudi"].includes(city)) {
        zone = "SWK02";
    } else if (["Pandan", "Belaga", "Suai", "Tatau", "Sebauh", "Bintulu"].includes(city)) {
        zone = "SWK03";
    } else if (["Sibu", "Mukah", "Dalat", "Song", "Igan", "Oya", "Balingian", "Kanowit", "Kapit"].includes(city)) {
        zone = "SWK04";
    } else if (["Sarikei", "Matu", "Julau", "Rajang", "Daro", "Bintangor", "Belawai"].includes(city)) {
        zone = "SWK05";
    } else if (["Lubok Antu", "Sri Aman", "Roban", "Debak", "Kabong", "Lingga", "Engkelili", "Betong", "Spaoh", "Pusa", "Saratok"].includes(city)) {
        zone = "SWK06";
    } else if (["Serian", "Simunjan", "Samarahan", "Sebuyau", "Meludam"].includes(city)) {
        zone = "SWK07";
    } else if (["Kuching", "Bau", "Lundu", "Sematan"].includes(city)) {
        zone = "SWK08";
    } else if (["Kampung Patarikan"].includes(city)) {
        zone = "SWK09";
    }

    // Selangor
    else if (["Gombak", "Petaling", "Sepang", "Hulu Langat", "Hulu Selangor", "Shah Alam"].includes(city)) {
        zone = "SRG01";
    } else if (["Kuala Selangor", "Sabak Bernam"].includes(city)) {
        zone = "SRG02";
    } else if (["Klang", "Kuala Langat"].includes(city)) {
        zone = "SRG03";
    }

    //Terengganu
    else if (["Kuala Terengganu", "Marang", "Kuala Nerus"].includes(city)) {
        zone = "TRG01";
    } else if (["Besut", "Setiu"].includes(city)) {
        zone = "TRG02";
    } else if (["Hulu Terengganu"].includes(city)) {
        zone = "TRG03";
    } else if (["Dungun", "Kemaman"].includes(city)) {
        zone = "TRG04";
    }

    //Wilayah Persekutuan
    else if (["Kuala Lumpur", "Putrajaya"].includes(city)) {
        zone = "WLY01";
    } else if (["Labuan"].includes(city)) {
        zone = "WLY02";
    }

    return zone;

}