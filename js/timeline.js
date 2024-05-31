document.addEventListener("DOMContentLoaded", async function () {
  const data = await fetch("data.json").then((response) => response.json());
  const section = document.getElementById("timeline2");

  for (const entry of Object.values(data.timeline)) {
    const newCard = document.createElement("li");
    newCard.classList.add("card");
    if (entry.subtitle && entry.subtitle != "Företagsbesök") {
      console.log(entry.subtitle);
      newCard.classList.add("project");
    }
    newCard.setAttribute("data-bs-toggle", "modal");
    newCard.setAttribute("data-bs-target", "#modal-" + entry.id);

    newCard.innerHTML = `

              <div class="card-body shadow rounded-4">
                    <div class="row align-items-center gx-5">
                      <div class="col text-center mb-4 mb-lg-0">
                        <div class="bg-light p-4 rounded-4">
                          <div class="text-primary fw-bolder mb-2">
                            ${entry.date}
                          </div>
                          <div class="small fw-bolder">${entry.title}</div>
                          <div class="small text-muted">${entry.subtitle}</div>
                        </div>
                      </div>
                    </div>
                  </div>

              `;
    section.appendChild(newCard);
  }
  for (const entry of Object.values(data.timeline)) {
    if (
      !entry.subtitle ||
      (entry.subtitle == "Företagsbesök" && !entry.img_asset)
    ) {
      continue;
    }
    const newModal = document.createElement("div");
    newModal.classList.add("modal", "fade");
    newModal.setAttribute("id", "modal-" + entry.id);
    newModal.setAttribute("tabindex", "-1");
    newModal.setAttribute("aria-labelledby", "modal-" + entry.id);
    newModal.setAttribute("aria-hidden", "true");

    const modalContent =
      entry.subtitle === "Företagsbesök"
        ? `<img src='assets/Företag_besök/${entry.img_asset}' alt='Timeline' class='img-fluid' />`
        : entry.description;

    newModal.innerHTML = `
              <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">
                        ${entry.title}
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      ${modalContent}

                    </div>
                    <div class="modal-footer">
                      ${
                        entry.goto_project
                          ? `<a href="projects.html" class="btn btn-primary">Läs mer</a>`
                          : ""
                      }
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>`;
    section.appendChild(newModal);
  }
  // Initialize viewport detection after items are created
  initializeViewportDetection();
});

function initializeViewportDetection() {
  "use strict";

  // define variables
  var items = document.querySelectorAll(".timeline li");
  console.log(items.length);

  // check if an element is in viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }
  callbackFunc();
  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
}
