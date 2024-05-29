class ElevCards extends HTMLElement {
    static observedAttributes = ["elever"];
    constructor() {
        super();
    }
    

    connectedCallback() {
        let elever = JSON.parse(this.getAttribute("elever"));

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
