document.addEventListener("DOMContentLoaded", function () {
    const imageSlider = document.querySelector('.image-slider');
    const totalImages = 73; // Totalt antal bilder
    let currentImageIndex = 0;

    // Funktion för att visa nästa bild
    function showNextImage() {
        // Uppdatera bildens källa
        const currentImages = imageSlider.querySelectorAll('.current-image');
        currentImages.forEach((image, index) => {
            const nextIndex = (currentImageIndex + index) % totalImages + 1;
            image.src = `assets/gallery/image${nextIndex}.webp`;
        });

        // Öka index för nästa bild
        currentImageIndex = (currentImageIndex + 4) % totalImages;
    }

    // Visa första setet av bilder när sidan laddas
    showNextImage();

    // Uppdatera bild var tredje sekund
    setInterval(showNextImage, 2000);
});
