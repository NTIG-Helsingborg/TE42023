class footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <footer class="bg-white py-4 mt-auto shadow-lg">
      <div class="container px-5">
        <div
          class="row align-items-center justify-content-between flex-column flex-sm-row"
        >
          <div class="col-auto">
            <img
              src="assets/NTIgymnasiet.png"
              alt=""
              style="max-width: 200px"
            />
          </div>
          <div class="col-auto">
            <div class="fs-3 fw-light text-muted text-center pt-3">
              <a href="https://www.linkedin.com/company/te-4-nti-gymnasiet-helsingborg/about/" target="_blank" class="m-4"><i class="bi bi-linkedin"></i></a>
              <a href="https://github.com/NTIG-Helsingborg" target="_blank" class="m-4"><i class="bi bi-github"></i></a>
              <a href="https://ntigymnasiet.se/helsingborg/" target="_blank" class="m-4"><i class="bi bi-house-door-fill"></i></a>
            </div>
          </div>

          <div class="col-auto ">
            <p class="small">Carl Krooks gata 9 252 25 Helsingborg</p>
            <p class="small">042-177030</p>
            <p class="small">helsingborg@ntig.se</p>
          </div>
        </div>
      </div>
    </footer>
        `;
  }
}

customElements.define("footer-bar", footer);
