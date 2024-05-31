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
      { group: 1, name: "Whisker Wonders", image: "./assets/projects/whiskerwonderslogo.png", link: "whiskerwonders" },
      { group: 1, name: "", image: "./assets/projects/wheeldeallogo.png", link: "wheeldeal" },
      { group: 1, name: "", image: "./assets/projects/retro.png", link: "RetroTech" },
      { group: 1, name: "", image: "./assets/projects/dsnft.png", link: "deepseanft" },
      { group: 2, name: "", image: "./assets/projects/cosmiclogo.png", link: "cosmichub" },
      { group: 2, name: "", image: "./assets/projects/gamehub.png", link: "GameHub" },
      { group: 2, name: "", image: "./assets/projects/pokenet.png", link: "pokinetx" },
      { group: 3, name: "", image: "./assets/projects/somnium.png", link: "somnium" },
      { group: 3, name: "Magic Mender", image: "./assets/projects/anvil.png", link: "magicmender" },
      { group: 3, name: "Consolata", image: "./assets/projects/consolata.png", link: "Consolata" },
      { group: 4, name: "Linda", image: "./assets/projects/linda.png", link: "linda" },
      { group: 4, name: "Mickey", image: "./assets/projects/mickeymailer.png", link: "mickeymailer" },
      { group: 4, name: "Ehab", image: "./assets/projects/ehabifySmallLogo.png", link: "Ehabify" },
      { group: 4, name: "Josef", image: "./assets/projects/josef.jpeg", link: "josefs-hemsida" },
      { group: 5, name: "Infoskärm", image: "./assets/projects/infoskarm.png", link: "Infoskarm" },
      { group: 5, name: "", image: "./assets/projects/basecamplogo.png", link: "Basecamp" },
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
          <p class="p-3 text-muted fs-5 card-text">${this.getAttribute("describiton")}</p>
    </div>`;

    let cardHTML = `<div class="col-xl-5 row my-4 my-xl-0 ${cardSide}">`;

    projects.forEach((project) => {
      if (project.group === group) {
        cardHTML += `
                <div class="card d-inline-block shadow border-0 p-1 my-3 mx-2">
                <a class="stretched-link " href="indivproject.html?project=${project.link}">
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
