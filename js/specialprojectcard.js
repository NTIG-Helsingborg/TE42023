class specialProjectCard extends HTMLElement {
  static observedAttributes = ["title", "src", "alt", "text"];
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <hr />
    <section>
        <div class="container d-flex justify-content-center">
            <div class="col-5">
                <img src="${this.getAttribute("src")}" alt="${this.getAttribute(
      "alt"
    )}" style="min-width: 500px" />
            </div>
            <div class="container col-5">
                <div class="m-1">${this.getAttribute("title")}</div>
                <div class="m-1">
                    ${this.getAttribute("text")}
                </div>
            </div>
        </div>
    </section>
    <hr />
        `;
  }
}

customElements.define("special-project-card", specialProjectCard);
