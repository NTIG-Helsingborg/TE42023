import { getRootPath, columnClick, getData } from "./scripts.js";
async function renderGalleryStudent(clone, data, jsonData) {
  //console.log("render gallery student", data, jsonData);
  let studentProjects = data["projects"];
  let projectData = jsonData["projects"];

  let list = clone.querySelectorAll(".carousel__item");
  let x = 0;
  console.log(studentProjects);
  list.forEach((item) => {
    if (typeof projectData[studentProjects[x]] != "undefined") {
      console.log(studentProjects[x]);
      item.style.background = `linear-gradient(45deg, rgb(210 43 212 / 57%), rgb(153 0 255 / 59%)), url(${
        projectData[studentProjects[x]]["image"]
      }) no-repeat center`;
      // Perform an action with each item

      // Example: adding a class to each item
      item.style.backgroundSize = "cover";
      if (studentProjects[x] == "Infoskarm") item.textContent = "Infoskärm";
      else item.textContent = studentProjects[x];
      x += 1;
    }
  });
}

//{ data: data, urlParamValue: specificData }

/*
    ExamensArbeteText
    ExamensArbeteBild
  */
async function renderStudent() {
  let { data, urlParamValue, jsonData } = await getData(
    "students",
    "student",
    true
  );
  const template = document.getElementById("sample").content;

  //First Card
  const app = document.getElementById("app");
  const cloneHTML = document.importNode(template, true);
  cloneHTML.querySelector(".aboutMe").textContent = data["aboutMe"];
  if (data["image"] == null) {
    cloneHTML.querySelector(".img-student").src = "assets/missingImage.jpg";
  } else {
    cloneHTML.querySelector(".img-student").src = "assets/" + data["image"];
  }

  cloneHTML.querySelector(".img-student").alt = urlParamValue;

  let links = [".linkedIn", ".github", ".cv", ".instagram"];
  let studentLinks = Object.keys(data["links"]);
  links.map((linkItem) => {
    if (!studentLinks.includes(linkItem.slice(1, linkItem.length)))
      cloneHTML.querySelector(linkItem).remove();
  });

  //gallery
  await renderGalleryStudent(cloneHTML, data, jsonData);

  //Examens arbete
  let certifikatList = "";
  for (let thing in data["certifikat"]) {
    certifikatList += `<li>${data["certifikat"][thing]}</li>`;
  }

  cloneHTML.querySelector(".ExamensArbeteTitel").textContent =
    data["exam"]["name"];
  cloneHTML.querySelector(".ExamensArbeteBild").src =
    "assets/" + data["exam"]["image"];
  cloneHTML.querySelector(".certifikat").innerHTML = certifikatList;
  cloneHTML.querySelector(".ExamensArbeteText").textContent =
    data["exam"]["text"];

  cloneHTML.querySelector(".fullName").textContent = urlParamValue;
  cloneHTML.querySelector(
    ".klassens"
  ).innerHTML = `<i>"${data["klassens"]}"</i>`;

  //inviduella projekt
  let val = true;
  let box = cloneHTML.querySelector(".extraContainer");
  Object.entries(data["individualProjects"]).map((entry) => {
    box.innerHTML += `<special-project-card title = "${
      entry[0]
    }" src = "assets/${data["individualProjects"][entry[0]]["image"]}" alt="${
      data["individualProjects"][entry[0]]["alt"]
    }" text="${data["individualProjects"][entry[0]]["text"]}" choice="${val}">`;
    val = !val;
  });

  const tag = document.createElement("nav-bar");
  app.appendChild(tag);
  app.appendChild(cloneHTML);
}

document.addEventListener("DOMContentLoaded", async () => {
  await renderStudent();
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
    const last2 = elems.find((elem) => elem.dataset.pos == 3);

    current.classList.remove("carousel__item_active");

    [current, prev, next, first, last, first2, last2].forEach((item) => {
      var itemPos = item.dataset.pos;

      item.dataset.pos = getPos(itemPos, newActivePos);
    });
  };

  const getPos = function (current, active) {
    const diff = current - active;

    if (Math.abs(current - active) > 3) {
      return -current;
    }

    return diff;
  };
});
