class Projectcard extends HTMLElement {
  static observedAttributes = ["group", "text-side","describiton","title"];

  constructor() {
    super();
  }

  connectedCallback() {
    this.renderCards();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "group") {
      this.renderCards();
    }
  }

  renderCards() {
    const group = parseInt(this.getAttribute("group"));

    let projects = [
      { group: 1, name: "Whisker Wonders", image: "https://placehold.co/100x0", link: "https://example.com" },
      { group: 1, name: "Wheeldeal", image: "https://placehold.co/100x0", link: "https://example.com" },
      { group: 1, name: "Retro Tech", image: "https://placehold.co/100x0", link: "https://example.com" },
      { group: 1, name: "Deep Sea NFT", image: "https://placehold.co/100x0", link: "https://example.com" },
      { group: 2, name: "CosmicHub", image: "https://placehold.co/100x0", link: "https://example.com" },
      { group: 2, name: "GameHub", image: "https://placehold.co/100x0", link: "https://example.com" },
      { group: 2, name: "PokeNetX", image: "https://placehold.co/100x0", link: "https://example.com" },
      { group: 3, name: "Somnium", image: "https://placehold.co/100x0", link: "https://example.com" },
      { group: 3, name: "Magic Mender", image: "https://placehold.co/100x0", link: "https://example.com" },
      { group: 3, name: "Consoldata", image: "https://placehold.co/100x0", link: "https://example.com" },
      { group: 4, name: "Linda", image: "https://placehold.co/100x0", link: "https://example.com" },
      { group: 4, name: "Mikey", image: "https://placehold.co/100x0", link: "https://example.com" },
      { group: 4, name: "Ehab", image: "https://placehold.co/100x0", link: "https://example.com" },
      { group: 4, name: "Josef", image: "https://placehold.co/100x0", link: "https://example.com" },
      { group: 5, name: "Infoskärm", image: "https://placehold.co/100x0", link: "https://example.com" },
      { group: 5, name: "Basecamp", image: "https://placehold.co/100x0", link: "https://example.com" },
    ];



    var Textside ;
    var cardSide;

    let boxHTML = ` <div class="row gx-5 justify-content-center m-0 mb-5 m-xl-5 px-0 px-xl-5" >`;
   

 
  if (window.innerWidth < 1200) {
      Textside = "text-center";
      cardSide = "justify-content-center";
    }
    else if (this.getAttribute("text-side") === "right") {
      Textside =  "text-end";
      cardSide = "justify-content-start";
     } 
     else {
       Textside = "text-start";
        cardSide = "justify-content-end";
        }






     let titleHTML = `
   <div class="col-xl-7 ${Textside} ">
        <h2 class="display-6 fw-bolder">
          <span class="text-gradient d-inline">${this.getAttribute("title")}</span>
        </h2>
        <div class="fs-3 fw-light text-muted mb-4">
            Projekt ${group}
        </div>
          <p class=" card-text">${this.getAttribute("describiton")}</p>
    </div>`;

    let cardHTML = `<div class="col-xl-5 row my-4 my-xl-0 ${cardSide}">`;

    projects.forEach((project) => {
      if (project.group === group) {
        cardHTML += `
                <div class="card d-inline-block shadow border-0 p-1 my-2 mx-2   ">
                <a class="stretched-link " href="index.html ">
                <img src="${project.image}"  class="card-img" alt="...">
                        
                <div class="card-img-overlay ">
                <h5 class="card-title">${project.name}</h5>
               
              </div>
                    </a>
                </div>
                
                `;
      }
    });

    cardHTML += `</div>`;




    if (this.getAttribute("text-side") === "left" || window.innerWidth < 1200) {
      this.innerHTML = boxHTML + titleHTML + cardHTML + `</div> `;
    } 
    else {
      this.innerHTML = boxHTML + cardHTML + titleHTML + `</div> `;
    }
  }
}

customElements.define("project-card", Projectcard);
