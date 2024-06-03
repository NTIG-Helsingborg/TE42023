/*!
 * Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project
// when deploying consider this: "TE4_23-24_Site"


/*
För att använda funktionen nedan 

exempel: användare trycker ned på poki API projektet
         på projekt sidan. Vi vill skicka personen 
         till den dynamiska inviduella projekt templatesidan 
         med URL parametern "Pokidex"
        
Använding:
columnClick("page/projekt", "Projektet", "Pokidex");
*/

/*
För att använda funktionen nedan 

exempel: Användaren är nu på den inviduella projekt sidan, 
         efter att tryckt på pokidex. Vi vill hämta json data
         som ska displayas på sidan.
        
Använding:
getData("inviduelltProjekt", "Projektet");

*/
export const getData = async (targetData, urlParam, getOne = true) => {
  let jsonFile = "data.json";
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

