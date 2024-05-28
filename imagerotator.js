document.addEventListener("DOMContentLoaded", function () {
        const imageGrid = document.querySelector('.image-grid');
    
        // Function to fetch images from assets/Rotationbilder folder
        function fetchImages() {
            const imageExtensions = ['jpg', 'jpeg', 'png'];
            let imageIndex = 1;
            for (let i = 1; i <= 100; i++) {
                const img = new Image();
                let found = false;
                for (const ext of imageExtensions) {
                    img.src = `assets/Rotationbilder/image${imageIndex}.${ext}`;
                    img.onload = function () {
                        // If image exists, add it to the image grid
                        const imgElement = document.createElement('img');
                        imgElement.src = this.src;
                        imageGrid.appendChild(imgElement);
                        if (!found) found = true;
                    };
                    if (found) break; // If image found, stop searching for other extensions
                }
                imageIndex++;
            }
        }
    
        fetchImages();
    });
    