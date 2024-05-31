import { getData } from "./scripts.js";

class ElevCards extends HTMLElement {
    static observedAttributes = ["elever"];
    constructor() {
        super();
    }


    connectedCallback() {
        if (this.students) {
            this.render();
        } else {
            this.fetchStudents().then(students => {
                this.students = students;
                this.render();
            });
        }
    }
    render() {
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

        Object.entries(this.students).forEach(([id, student]) => {
            cardHTML += `
            <div class="col-6 col-md-4 col-lg-3 mb-5">
                <div class="card-container">
                    <div class="card shadow border-primary">
                        <div class="bg-gradient-primary-to-secondary">
                            <img src="assets/profile/${student.image}" class="card-img-top img-fluid" alt="${student.displayName}">
                        </div>
                        <div class="card-body text-center">
                            <h4 class="card-title">${student.displayName}</h4>
                            <p class="card-text"> ${student.klassens}</p>
                           
                            <a href="student.html?student=${id}" class="btn btn-primary">view page</a>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });

        cardHTML += `</div>`;
        this.innerHTML = cardHTML;
    }

    // async method to fetch data from the server
    async fetchStudents() {
        let { data } = await getData("students", "", false);
        const url = new URL(window.location.href);

        const projectFilter = url.searchParams.get("project");

        if (projectFilter) {
            // data = data.filter(student => student.projects.includes(projectFilter));
            data = Object.fromEntries(Object.entries(data).filter(([id, student]) => student.projects.includes(projectFilter)));
        }

        return data;
    }
}

customElements.define('elev-cards', ElevCards);
