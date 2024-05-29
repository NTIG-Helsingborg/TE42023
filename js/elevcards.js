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
                        <img src="${elev.image}" class="card-img-top" alt="${elev.name}">
                        <div class="card-body text-center">
                            <h4 class="card-title">${elev.name}</h4>
                            <p class="card-text"> ${elev.title}</p>
                           
                            <a href="student?${elev.link}" class="btn btn-primary">view page</a>
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
