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
  if (getOne == true) {
    let paramString = urlString.split("?")[1];
    let queryString = new URLSearchParams(paramString);
    let specificData = queryString.get(urlParam);
    const response = await fetch(jsonFile);
    const jsonData = await response.json();
    data = jsonData[targetData][specificData];
    return data;
  } else {
    const response = await fetch(jsonFile);
    const jsonData = await response.json();
    data = jsonData[targetData];
    return data;
  }
};

const projectImages = async () => {
  const cardContainer = document.getElementById("card-container");
  let projects = await getData("inviduelltProjekt", "none", false);
  console.log(cardContainer);
  let cardHTML = "";
  for (let project in projects) {
    let imagePath = getRootPath() + "/" + getData["imageName"];
    cardHTML += ` 
      <div class="card overflow-hidden shadow rounded-4 border-0 mb-5">
        <div class="card-body p-0">
            <div class="d-flex align-items-center row">
                <div class="project-img-container col-lg-5" style = "background: linear-gradient(45deg, rgb(210 43 212 / 57%), rgb(153 0 255 / 59%)), url(${project.imageName}) no-repeat center; background-size: cover;"></div>
                <div class="p-5 project-font col-lg-7 ">
                    <h2 class="fw-bolder">Project Name 5</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius at enim eum illum aperiam placeat esse? Mollitia omnis minima saepe recusandae libero, iste ad asperiores! Explicabo commodi quo itaque! Ipsam!</p>
                </div>
            </div>
        </div>
      </div>
    `;
  }
  cardContainer.innerHTML = cardHTML;
};
