
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

let apiUrlChapter='https://api.hadith.gading.dev/books/ibnu-majah?range=1-300';


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

