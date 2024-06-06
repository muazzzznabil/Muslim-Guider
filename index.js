document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = 0;

    function showNextImage() {
        const carouselInner = document.querySelector('.carousel-inner');
        const items = document.querySelectorAll('.carousel-item');
        currentIndex = (currentIndex + 1) % items.length;
        const offset = -currentIndex * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;
    }

    setInterval(showNextImage, 3000); // Change image every 3 seconds
});
