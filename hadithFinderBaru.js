const apiUrl = 'https://api.hadith.gading.dev/books';
fetch(apiUrl)
.then(response => response.json())
.then(data => {
    console.log(data);
    document.getElementById("hadith-writer").innerHTML = "Writer Name : " + data.data[0].name;
})
.catch(error => {
    console.log(error);
})