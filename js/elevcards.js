class ElevCards extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let elever = [
            { "name": "Anders", "age": 18, "class": "3B" },
            { "name": "Bengt", "age": 19, "class": "3B" },
            { "name": "Carl", "age": 20, "class": "3B" },
            { "name": "David", "age": 21, "class": "3B" },
            { "name": "Erik", "age": 22, "class": "3B" },
            { "name": "Filip", "age": 23, "class": "3B" },
            { "name": "Gustav", "age": 24, "class": "3B" },
            { "name": "Hans", "age": 25, "class": "3B" },
            { "name": "Ivar", "age": 26, "class": "3B" },
            { "name": "Johan", "age": 27, "class": "3B" }
        ];

        let cardHTML = `
        <div class="row">
        `;

        elever.forEach(elev => {
            cardHTML += `
            <div class="col-md-4 mb-5">
                <div class="card">
                    <img src="https://via.placeholder.com/150" class="card-img-top" alt="${elev.name}">
                    <div class="card-body">
                        <h5 class="card-title">${elev.name}</h5>
                        <p class="card-text">Age: ${elev.age}</p>
                        <p class="card-text">Class: ${elev.class}</p>
                        <a href="#" class="btn btn-primary">More Info</a>
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
