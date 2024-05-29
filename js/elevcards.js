class ElevCards extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let elever = [
            { "name": "Jonathan Cano Sjöstedt", "age": "Placeholder 1", "class": "Placeholder 2" },
            { "name": "David Olsson", "age": "Placeholder 1", "class": "Placeholder 2" },
            { "name": "Ebba Elversson", "age": "Placeholder 1", "class": "Placeholder 2" },
            { "name": "Eduard Mihic", "age": "Placeholder 1", "class": "Placeholder 2" },
            { "name": "Gustaf Fäldt", "age": "Placeholder 1", "class": "Placeholder 2" },
            { "name": "Jakob Helgesson", "age": "Placeholder 1", "class": "Placeholder 2" },
            { "name": "Jonathan Thösing-Jörgensen", "age": "Placeholder 1", "class": "Placeholder 2" },
            { "name": "Kirill Puljavin", "age": "Placeholder 1", "class": "Placeholder 2" },
            { "name": "Margarita Shaposhnikova", "age": "Placeholder 1", "class": "Placeholder 2" },
            { "name": "Oskar Ternström", "age": "Placeholder 1", "class": "Placeholder 2" },
            { "name": "Othman Al-Ani", "age": "Placeholder 1", "class": "Placeholder 2" },
            { "name": "Rami Agha", "age": "Placeholder 1", "class": "Placeholder 2" },
            { "name": "Salah Al Hassun", "age": "Placeholder 1", "class": "Placeholder 2" },
            { "name": "Simon Jonasson", "age": "Placeholder 1", "class": "Placeholder 2" },
            { "name": "Zimon Johnsson", "age": "Placeholder 1", "class": "Placeholder 2" }
        ];

        let cardHTML = `
        <div class="row d-flex justify-content-center">
        <style>
            .card-container {
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            .card {
                flex: 1 1 auto;
            }
        </style>
        `;

        elever.forEach(elev => {
            cardHTML += `
            <div class="col-6 col-md-4 col-lg-3 mb-5">
                <div class="card-container">
                    <div class="card shadow border-primary">
                        <img src="https://via.placeholder.com/150" class="card-img-top" alt="${elev.name}">
                        <div class="card-body">
                            <h5 class="card-title">${elev.name}</h5>
                            <p class="card-text">Info 1: ${elev.age}</p>
                            <p class="card-text">Info 2: ${elev.class}</p>
                            <a href="#" class="btn btn-primary">More Info</a>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });

        cardHTML += `</div>`;
        this.innerHTML = cardHTML;
    }
}

customElements.define('elev-cards', ElevCards);
