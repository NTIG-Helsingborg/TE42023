document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.querySelector('.image-container');
    const animationDuration = 5000; // Tid det tar för en bild att flytta från vänster till höger (i millisekunder)

    // Function to fetch images
    function fetchImages() {
        fetch('images.json')
            .then(response => response.json())
            .then(data => {
                // Loop through each image path and create an image element
                data.images.forEach((imagePath, index) => {
                    const img = new Image();
                    img.src = imagePath;
                    img.classList.add('img-fluid', 'm-2', 'animated-image');
                    // Använd fördröjningen för att starta animationen för varje bild baserat på dess index
                    img.style.animationDelay = `${index * animationDuration / data.images.length}ms`;
                    // Append the image element to the image container
                    imageContainer.appendChild(img);
                });
            })
            .catch(error => console.error('Error fetching images:', error));
    }

    // Fetch images och starta animation när sidan är laddad
    fetchImages();
});
