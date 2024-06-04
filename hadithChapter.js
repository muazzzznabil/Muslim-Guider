// Function to get query parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the value from URL parameters
const value = getQueryParam('value');

let apiUrlChapter;
if (value == 0) {
    apiUrlChapter = 'https://hadithapi.com/api/sahih-bukhari/chapters?apiKey=$2y$10$b7iVORLvYlYxA4SrjrPGu9OVCA7C6TaOYwxaltQTFfApmMai';
}
else if (value == 1) {
    apiUrlChapter = 'https://hadithapi.com/api/sahih-muslim/chapters?apiKey=$2y$10$b7iVORLvYlYxA4SrjrPGu9OVCA7C6TaOYwxaltQTFfApmMai';
}
else if (value == 2) {
    apiUrlChapter = 'https://hadithapi.com/api/al-tirmidhi/chapters?apiKey=$2y$10$b7iVORLvYlYxA4SrjrPGu9OVCA7C6TaOYwxaltQTFfApmMai';
}
else if (value == 3) {
    apiUrlChapter = 'https://hadithapi.com/api/abu-dawood/chapters?apiKey=$2y$10$b7iVORLvYlYxA4SrjrPGu9OVCA7C6TaOYwxaltQTFfApmMai';
}
else if (value == 4) {
    apiUrlChapter = 'https://hadithapi.com/api/ibn-e-majah/chapters?apiKey=$2y$10$b7iVORLvYlYxA4SrjrPGu9OVCA7C6TaOYwxaltQTFfApmMai';
}
else if (value == 5) {
    apiUrlChapter = 'https://hadithapi.com/api/sunan-nasai/chapters?apiKey=$2y$10$b7iVORLvYlYxA4SrjrPGu9OVCA7C6TaOYwxaltQTFfApmMai';
}
else if (value == 6) {
    apiUrlChapter = 'https://hadithapi.com/api/mishkat/chapters?apiKey=$2y$10$b7iVORLvYlYxA4SrjrPGu9OVCA7C6TaOYwxaltQTFfApmMai';
}
else if (value == 7) {
    apiUrlChapter = 'https://hadithapi.com/api/musnad-ahmad/chapters?apiKey=$2y$10$b7iVORLvYlYxA4SrjrPGu9OVCA7C6TaOYwxaltQTFfApmMai';
}
else if (value == 8) {
    apiUrlChapter = 'https://hadithapi.com/api/al-silsila-sahiha/chapters?apiKey=$2y$10$b7iVORLvYlYxA4SrjrPGu9OVCA7C6TaOYwxaltQTFfApmMai';
}
else {
    alert("Wrong chapter");
}

fetch(apiUrlChapter)
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('chapter-table-body');

        data.chapters.forEach(chapter => {
            const row = document.createElement('tr');

            const cellNo = document.createElement('td');
            const linkNo = document.createElement('a');
            linkNo.href = `Hadith.html?id=${chapter.id}`;
            linkNo.setAttribute('data-value', chapter.chapterNumber);
            linkNo.textContent = chapter.chapterNumber;
            cellNo.appendChild(linkNo);
            row.appendChild(cellNo);

            const cellEnglish = document.createElement('td');
            const linkEnglish = document.createElement('a');
            linkEnglish.href = `Hadith.html?id=${chapter.id}`;
            linkEnglish.setAttribute('data-value', chapter.chapterNumber);
            linkEnglish.textContent = chapter.chapterEnglish;
            cellEnglish.appendChild(linkEnglish);
            row.appendChild(cellEnglish);

            const cellArabic = document.createElement('td');
            const linkArabic = document.createElement('a');
            linkArabic.href = `Hadith.html?id=${chapter.id}`;
            linkArabic.setAttribute('data-value', chapter.chapterNumber);
            linkArabic.textContent = chapter.chapterArabic;
            cellArabic.appendChild(linkArabic);
            row.appendChild(cellArabic);

            const cellUrdu = document.createElement('td');
            const linkUrdu = document.createElement('a');
            linkUrdu.href = `Hadith.html?id=${chapter.id}`;
            linkUrdu.setAttribute('data-value', chapter.chapterNumber);
            linkUrdu.textContent = chapter.chapterUrdu;
            cellUrdu.appendChild(linkUrdu);
            row.appendChild(cellUrdu);

            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching chapters:', error);
    });
