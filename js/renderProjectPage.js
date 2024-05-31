import { getRootPath, columnClick, getData } from "./scripts.js";
function renderGalleryProject(clone, data) {
  //console.log("render gallery student", data, jsonData);
  let projectImages = data["project-images"];
  let list = clone.querySelectorAll(".carousel__item");
  let x = 0;
  list.forEach((item) => {
    if (typeof projectImages[x] != "undefined") {
      item.style.background = `linear-gradient(45deg, rgb(210 43 212 / 57%), rgb(153 0 255 / 59%)), url(${projectImages[x]["src"]}) no-repeat center`;
      // Example: adding a class to each item
      item.style.backgroundSize = "cover";
      item.textContent = projectImages[x]["caption"];
      x += 1;
    }
  });
}

async function renderProject() {
  console.trace("renderProject");
  let { data, urlParamValue, jsonData } = await getData(
    "projects",
    "project",
    true
  );
  const template = document.getElementById("sample").content;

  //First Card
  const app = document.getElementById("app");
  const cloneHTML = document.importNode(template, true);
  cloneHTML.querySelector(".about").textContent = data["about"];
  cloneHTML.querySelector(".Project-title").textContent = data["displayName"];
  if (data["image"] == null) {
    cloneHTML.querySelector(".img-project").src = "assets/missingImage.jpg";
  } else {
    cloneHTML.querySelector(".img-project").src =
      "assets/projects/" + data["image"];
  }

  cloneHTML.querySelector(".img-project").alt = urlParamValue;

  cloneHTML.querySelector(".github").href = data["links"]["github"];
  cloneHTML.querySelector(".website").href = data["links"]["website"];

  cloneHTML.querySelector(".badge").innerHTML = data["badge"];
  //gallery
  renderGalleryProject(cloneHTML, data);

  const tag = document.createElement("nav-bar");
  app.appendChild(tag);
  app.appendChild(cloneHTML);
}

document.addEventListener("DOMContentLoaded", async () => {
  await renderProject();
  const state = {};
  let carouselList = document.querySelector(".carousel__list");
  let carouselItems = document.querySelectorAll(".carousel__item");
  let elems = Array.from(carouselItems);

  carouselList.addEventListener("click", function (event) {
    var newActive = event.target;
    var isItem = newActive.closest(".carousel__item");

    if (!isItem || newActive.classList.contains("carousel__item_active")) {
      return;
    }
    elems = Array.from(carouselItems);
    carouselList = document.querySelector(".carousel__list");
    carouselItems = document.querySelectorAll(".carousel__item");
    update(newActive);
  });

  const update = function (newActive) {
    const newActivePos = newActive.dataset.pos;

    const current = elems.find((elem) => elem.dataset.pos == 0);
    const prev = elems.find((elem) => elem.dataset.pos == -1);
    const next = elems.find((elem) => elem.dataset.pos == 1);
    const first = elems.find((elem) => elem.dataset.pos == -2);
    const last = elems.find((elem) => elem.dataset.pos == 2);
    const first2 = elems.find((elem) => elem.dataset.pos == -3);

    current.classList.remove("carousel__item_active");

    [current, prev, next, first, last, first2].forEach((item) => {
      var itemPos = item.dataset.pos;

      item.dataset.pos = getPos(itemPos, newActivePos);
    });
  };

  const getPos = function (current, active) {
    const diff = current - active;

    if (Math.abs(current - active) > 2) {
      return -current;
    }

    return diff;
  };
});
