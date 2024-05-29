class specialProjectCard extends HTMLElement {
  static observedAttributes = ["title", "src", "alt", "text", "choice"];
  constructor() {
    super();
  }

  connectedCallback() {
    console.log(this.getAttribute("choice"));
    if (this.getAttribute("choice") == "true")
      this.innerHTML = `
      <div class="row py-5">
        <div class="col-12 col-lg-5 d-flex">
          <img src="${this.getAttribute("src")}" alt="${this.getAttribute(
        "alt"
      )}" class="rounded-4 m-auto shadow"/>
        </div>
        <div class="col-12 col-lg-7 text-center">
          <h1 class="display-3 fs-1 fw-bolder mb-5 mt-5 mt-lg-0"><span class="text-gradient d-inline">${this.getAttribute(
            "title"
          )}</span></h1>
          <div class="fs-4 fw-light text-muted">${this.getAttribute(
            "text"
          )}</div>
        </div>
      </div>
    `;
    else if (this.getAttribute("choice") == "false") {
      this.innerHTML = `
      <div class="row py-5">
          <div class="col-12 col-lg-5 d-flex order-lg-last order-first">
            <img src="${this.getAttribute("src")}" alt="${this.getAttribute(
        "alt"
      )}" class="rounded-4 m-auto shadow"/>
          </div>
          <div class="col-12 col-lg-7 text-center ">
            <h1 class="display-3 fs-1 fw-bolder mb-5"><span class="text-gradient d-inline">${this.getAttribute(
              "title"
            )}</span></h1>
            <div class="fs-4 fw-light text-muted"> 
            ${this.getAttribute("text")}
            </div>
          </div>
      </div>
      `;
    }
  }
}

customElements.define("special-project-card", specialProjectCard);
/**
 



 */
