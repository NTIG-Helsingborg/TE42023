/*!
 * Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project

//JSON DATA
//Denna kod är just nu inte färdig, är tänkt för att dynamisk hämta data från och visa på en
//sida exempelvis projekten och elevsidorna

// kör en server exempelvis med (om python installed): "python -m http.server 8000"
// accessa filer i webbläsaren: http://localhost:8000/

const boxClick = (path, item) => {
  let urlString = window.location.href;
  let pathRoot = urlString.slice(
    0,
    urlString.indexOf("TE42023_2024") + "TE42023_2024".length
  );
  let newUrl = pathRoot + "/" + path; // Create a URL object
  let url = new URL(newUrl); // Add a parameter to the URL
  url.searchParams.set("Elev", "JonathanCS"); // Set the 'user' parameter to '12345'
  window.location.href = url.toString(); // Redirect the user to the new URL
};

//inte än färdig tänkt ut hur parameterna ska göras i funktionen
const getJsonData = async (path) => {
  let jsonFile = "http://localhost:8000/data.json";
  let urlString = window.location.href;
  let paramString = urlString.split("?")[1];
  let queryString = new URLSearchParams(paramString);
  let elev = queryString.get("Elev");
  const response = await fetch(jsonFile);
  const jsonData = await response.json();
  console.log(jsonData);
  let elevData = jsonData["elever"][elev];
  console.log(elevData);
};
