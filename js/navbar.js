

class navbar extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){

        this.innerHTML =
             `
        
        <nav class="navbar navbar-expand-lg sticky-top navbar-light bg-white py-3">
        <div class="container px-5">
        <a class="navbar-brand" href="index.html"><span class="fw-bolder text-primary">Te4 23-24</span></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
            <li class="nav-item"><a class="nav-link" href="index.html">Hem</a></li>
            <li class="nav-item"><a class="nav-link" href="resume.html">Timeline</a></li>
            <li class="nav-item"><a class="nav-link" href="projects.html">Projekt</a></li>
            <li class="nav-item"><a class="nav-link" href="index.html#Utvecklare">Utvecklare</a></li>
            </ul>
        </div>
        </div>
    </nav>
        `;

    }
}

customElements.define('nav-bar', navbar);
