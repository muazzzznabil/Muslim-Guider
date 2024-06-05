
function searchWord() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();
    let table = document.getElementById('all-hadith');
    let tr = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those who don't match the search query
    for (let i = 1; i < tr.length; i++) {
        let tds = tr[i].getElementsByTagName('td');
        let rowContainsSearchTerm = false;
        
        // Loop through all table cells in the current row
        for (let j = 0; j < tds.length; j++) {
            let cell = tds[j];
            if (cell) {
                let cellText = cell.textContent || cell.innerText;
                if (cellText.toLowerCase().indexOf(searchInput) > -1) {
                    rowContainsSearchTerm = true;
                    cell.innerHTML = cellText.replace(new RegExp(searchInput, 'gi'), match => `<span class="highlight">${match}</span>`);
                } else {
                    cell.innerHTML = cellText; // Remove previous highlights if any
                }
            }
        }
        
        if (rowContainsSearchTerm) {
            tr[i].style.display = '';
        } else {
            tr[i].style.display = 'none';
        }
    }
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the value from URL parameters
const value = getQueryParam('value');

let apiUrlChapter;
if (value == 0) {
    apiUrlChapter = 'https://api.hadith.gading.dev/books/abu-daud?range=1-300';
}
else if (value == 1) {
    apiUrlChapter = 'https://api.hadith.gading.dev/books/ahmad?range=1-300';
}
else if (value == 2) {
    apiUrlChapter = 'https://api.hadith.gading.dev/books/bukhari?range=1-300';
}
else if (value == 3) {
    apiUrlChapter = 'https://api.hadith.gading.dev/books/darimi?range=1-300';
}
else if (value == 4) {
    apiUrlChapter = 'https://api.hadith.gading.dev/books/ibnu-majah?range=1-300';
}
else if (value == 5) {
    apiUrlChapter = 'https://api.hadith.gading.dev/books/malik?range=1-300';
}
else if (value == 6) {
    apiUrlChapter = 'https://api.hadith.gading.dev/books/muslim?range=1-300';
}
else if (value == 7) {
    apiUrlChapter = 'https://api.hadith.gading.dev/books/nasai?range=1-300';
}
else if (value == 8) {
    apiUrlChapter = 'https://api.hadith.gading.dev/books/tirmidzi?range=1-300';
}
else {
    alert("Wrong Hadith");
}

fetch(apiUrlChapter)
  .then(response => response.json())
  .then(data => {
    const hadiths = data.data.hadiths;
    document.getElementById("hadith-name").innerHTML=""+data.data.name;
    document.getElementById("hadith-name-writer").innerHTML="Imam "+data.data.id;

    // Create table rows for each hadith
    const tableBody = document.getElementById('hadith-data');
    hadiths.forEach(hadith => {
      const tableRow = document.createElement('tr');
      tableRow.innerHTML = `
        <td>${hadith.number}</td>
        <td>${hadith.id}</td>
        <td>${hadith.arab}</td>
      `;
      tableBody.appendChild(tableRow);
    });
  })
  .catch(error => {
    console.error('Error fetching chapters:', error);
  });

// fetch(apiUrlChapter)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         document.getElementById("hadith-number").innerHTML = "" + data.data.hadiths[0].number;
//         document.getElementById("hadith-Indonesia").innerHTML = "" + data.data.hadiths[0].id;
//         document.getElementById("hadith-Arab").innerHTML = "" + data.data.hadiths[0].arab;
//     })
//     .catch(error => {
//         console.error('Error fetching chapters:', error);
//     });
