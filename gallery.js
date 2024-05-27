document.addEventListener("DOMContentLoaded", function () {
    const imageGrid = document.querySelector('.image-grid');
    const imageExtensions = ['jpg', 'png', 'jpeg']; // Endast dessa filformat

    // Function to fetch images from assets/Rotationbilder folder
    function fetchImages() {
        for (let i = 1; i <= 2; i++) {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('col-md-3', 'col-sm-6');

            const img = new Image();
            let found = false;
            for (const ext of imageExtensions) {
                img.src = `assets/Rotationbilder/image${i}.${ext}`;
                img.onload = function () {
                    // If image exists, add it to the image grid
                    const imgElement = document.createElement('img');
                    imgElement.src = this.src;
                    imgElement.classList.add('img-fluid', 'mb-4');
                    imgContainer.appendChild(imgElement);
                    if (!found) found = true;
                };
                if (found) break; // If image found, stop searching for other extensions
            }

            imageGrid.appendChild(imgContainer);
        }
    }

    fetchImages();

    // Function to rotate images every 3 seconds
    let currentIndex = 1;
    setInterval(function () {
        const images = imageGrid.querySelectorAll('img');
        for (let i = 0; i < images.length; i++) {
            images[i].src = `assets/Rotationbilder/image${currentIndex}.${imageExtensions[0]}`;
            currentIndex = (currentIndex % 8) + 1;
        }
    }, 3000);
});
