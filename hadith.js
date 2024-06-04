  // Function to get query parameters
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the id and chapterNumber from URL parameters
const id = getQueryParam('id');
const chapterNumber = getQueryParam('chapterNumber');

// Display the values passed from the URL
const hadithContent = document.getElementById('hadith-content');
// hadithContent.innerHTML = `<h2>Chapter ID: ${id}</h2>`;
// const bookId=id;
// const chapterId=id;
// if(id<=8){
//     bookId=25;
//     chapterId=1;
// }
// else if(id<=25){
//     bookId=25;
//     chapterId=2;
// }
const cid=id-1;


const apiUrl = 'https://hadithapi.com/api/hadiths?apiKey=$2y$10$b7iVORLvYlYxA4SrjrPGu9OVCA7C6TaOYwxaltQTFfApmMai';
fetch(apiUrl)
.then(response => response.json())
.then(data => {
    console.log(data);
    document.getElementById("hadith-narrator").innerHTML = "" + data.hadiths.data[id].englishNarrator;
    document.getElementById("hadith-writer").innerHTML = "Writer Name : " + data.hadiths.data[id].book.writerName;
    document.getElementById("hadith-book-name").innerHTML = "" + data.hadiths.data[id].book.bookName;
    document.getElementById("hadith-chapter-number").innerHTML = "Hadith Number : " + data.hadiths.data[cid].hadithNumber;
    document.getElementById("hadith-chapter-english").innerHTML = "Chapter Name (English) : " + data.hadiths.data[id].chapter.chapterEnglish;
    document.getElementById("hadith-chapter-arabic").innerHTML = "Chapter Name (Arabic) : " + data.hadiths.data[id].chapter.chapterArabic;
    document.getElementById("hadith-chapter-urdu").innerHTML = "Chapter Name (Urdu) : " + data.hadiths.data[id].chapter.chapterUrdu;
    document.getElementById("hadith-urdu").innerHTML = " " + data.hadiths.data[id].hadithUrdu;
    document.getElementById("hadith-english").innerHTML = " " + data.hadiths.data[id].hadithEnglish;
    document.getElementById("hadith-arabic").innerHTML = " " + data.hadiths.data[id].hadithArabic;


})
.catch(error => {
    console.log(error);
})