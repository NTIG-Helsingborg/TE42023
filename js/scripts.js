/*!
 * Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project
// when deploying consider this: "TE4_23-24_Site"
const getRootPath = () => {
  let urlString = window.location.href;
  let pathRoot = urlString.slice(
    0,
    urlString.indexOf("http://localhost:8000") + "http://localhost:8000".length
  );
  return pathRoot;
};

/*
För att använda funktionen nedan 

exempel: användare trycker ned på poki API projektet
         på projekt sidan. Vi vill skicka personen 
         till den dynamiska inviduella projekt templatesidan 
         med URL parametern "Pokidex"
        
Använding:
columnClick("page/projekt", "Projektet", "Pokidex");
*/

const columnClick = (newRelativeLocation, key, value) => {
  let pathRoot = getRootPath();
  console.log(newRelativeLocation);
  let newUrl = pathRoot + newRelativeLocation; // Create a URL object
  let url = new URL(newUrl); // Add a parameter to the URL
  url.searchParams.set(key, value); // Set the 'user' parameter to '12345'
  window.location.href = url.toString(); // Redirect the user to the new URL
};

/*
För att använda funktionen nedan 

exempel: Användaren är nu på den inviduella projekt sidan, 
         efter att tryckt på pokidex. Vi vill hämta json data
         som ska displayas på sidan.
        
Använding:
getData("inviduelltProjekt", "Projektet");

*/
const getData = async (targetData, urlParam, getOne = true) => {
  let jsonFile = getRootPath() + "/data.json";
  let urlString = window.location.href;
  let paramString = urlString.split("?")[1];
  let queryString = new URLSearchParams(paramString);
  let specificData = queryString.get(urlParam);
  if (getOne == true) {
    const response = await fetch(jsonFile);
    const jsonData = await response.json();
    let data = jsonData[targetData][specificData];
    return { data: data, urlParamValue: specificData, jsonData: jsonData };
  } else {
    const response = await fetch(jsonFile);
    const jsonData = await response.json();
    let data = jsonData[targetData];
    return { data: data, urlParamValue: specificData, jsonData: jsonData };
  }
};

//an exemple of creating blocks this wont work for not
const projectImages = async () => {
  let projects,
    urlParamValue = await getData("inviduelltProjekt", "none", false);
  console.log(projects);
  let cardHTML = "";
  let imagePath = "";
  for (let project in projects) {
    console.log("project " + project);
    imagePath = getRootPath() + "/assets/" + projects[project]["imageName"];
    console.log(imagePath);
    cardHTML += ` 
      <div class="card overflow-hidden shadow rounded-4 border-0 mb-5">
        <div class="card-body p-0">
            <div class="d-flex align-items-center row">
                <div class="project-img-container col-lg-5" style = "background: linear-gradient(45deg, rgb(210 43 212 / 57%), rgb(153 0 255 / 59%)), url(${imagePath}) no-repeat center; background-size: cover;"></div>
                <div class="p-5 project-font col-lg-7 ">
                    <h2 class="fw-bolder">Project Name 5</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius at enim eum illum aperiam placeat esse? Mollitia omnis minima saepe recusandae libero, iste ad asperiores! Explicabo commodi quo itaque! Ipsam!</p>
                </div>
            </div>
        </div>
      </div>
    `;
  }
  return cardHTML;
};

//HTML and css gets rendered first. For Dynamic pages everything needs
//to be rendered through javascript to have smooth rendering

const makeIndividualProject = (studentObj) => {
  let individualProjects = studentObj["individualProjects"];
  let cardHTML = "";
  for (let project in individualProjects) {
    imagePath =
      getRootPath() + "/assets/" + individualProjects[project]["image"];
    cardHTML += ` 
      <special-project-card title = ${project} src = "assets/Juan.jpg" alt = "haha ita me" text="what is up"/>
    `;
  }
  return cardHTML;
};

async function renderGalleryStudent() {
  let { data, urlParamValue, jsonData } = await getData(
    "students",
    "student",
    true
  );
  let studentProjects = data["projects"];
  let projectData = jsonData["projects"];
  for (let dataIndex = 0; dataIndex < studentProjects.length; dataIndex++) {
    let li = document.createElement("li");
    li.className = "carousel__item border border-2 border-primary";
    li.style.background = `linear-gradient(45deg, rgb(210 43 212 / 57%), rgb(153 0 255 / 59%)), url(${
      projectData[studentProjects[dataIndex]]["image"]
    }) no-repeat center`;
    li.style.backgroundSize = "cover";
    li.dataset.pos = dataIndex;
    li.textContent = projectData[studentProjects[dataIndex]]["project"];
    document.querySelector(".carousel__list").appendChild(li);
  }
}

//{ data: data, urlParamValue: specificData }
async function renderStudent() {
  let { data, urlParamValue, jsonData } = await getData(
    "students",
    "student",
    true
  );
  let individualProjectData = makeIndividualProject(data);
  const template = document.getElementById("sample").content;
  const app = document.getElementById("app");
  const cloneHTML = document.importNode(template, true);
  cloneHTML.querySelector(".aboutMe").textContent = data["aboutMe"];
  let links = [".linkedIn", ".github", ".cv"];
  let studentLinks = Object.keys(data["links"]);
  links.map((linkItem) => {
    if (!studentLinks.includes(linkItem.slice(1, linkItem.length)))
      cloneHTML.querySelector(linkItem).remove();
  });

  let certifikatList = "";
  for (let thing in data["certifikat"]) {
    certifikatList += `<li>${data["certifikat"][thing]}</li>`;
  }

  cloneHTML.querySelector(".certificat").innerHTML = list;
  cloneHTML.querySelector(".fullName").textContent = urlParamValue;
  cloneHTML.getElementById("special-container").innerHTML +=
    individualProjectData;
  const tag = document.createElement("nav-bar");
  app.appendChild(tag);
  app.appendChild(cloneHTML);
}

//<li class="carousel__item border border-2 border-primary" data-pos="-3"></li>;
//"projects": ["apiProject", "catTown", "me"],
/*
     <li class="carousel__item border border-2 border-primary" data-pos="-3">0</li>
      <li class="carousel__item border border-2 border-primary" data-pos="-2">1</li>
      <li class="carousel__item border border-2 border-primary" data-pos="-1">2</li>
      <li class="carousel__item border border-2 border-primary" data-pos="0">3</li>
      <li class="carousel__item border border-2 border-primary" data-pos="1">4</li>
      <li class="carousel__item border border-2 border-primary" data-pos="2">5</li>
      <li class="carousel__item border border-2 border-primary" data-pos="3">6</li>
*/

document.addEventListener("DOMContentLoaded", async () => {
  await renderGalleryStudent();
});
