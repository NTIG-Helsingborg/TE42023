/*!
 * Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project
// when deploying consider this: "TE4_23-24_Site"
export const getRootPath = () => {
  const url = new URL(window.location.href);
  const pathRoot = url.origin;
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

export const columnClick = (newRelativeLocation, key, value) => {
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
export const getData = async (targetData, urlParam, getOne = true) => {
  let jsonFile = getRootPath() + "/data.json";
  let urlString = window.location.href;
  let paramString = urlString.split("?")[1];
  let queryString = new URLSearchParams(paramString);
  let specificData = queryString.get(urlParam);
  specificData = specificData?.toLowerCase();
  const response = await fetch(jsonFile);
  const jsonData = await response.json();
  if (getOne == true) {
    let data = jsonData[targetData][specificData];
    return { data: data, urlParamValue: specificData, jsonData: jsonData };
  } else {
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
