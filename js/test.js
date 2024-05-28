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
  console.log(jsonFile);
  let urlString = window.location.href;
  if (getOne == true) {
    let paramString = urlString.split("?")[1];
    let queryString = new URLSearchParams(paramString);
    let specificData = queryString.get(urlParam);
    console.log("specific data: " + specificData);
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
/*
"catMan": {
    "image": "image1.jpg",
    "alt": "cool image",
    "text"
}
*/
let cardHTML = "";
let individualProjects = await getData("students", "student", false);
for (let project in individualProjects) {
  imagePath = getRootPath() + "/assets/" + individualProjects[project]["image"];
  console.log(imagePath);
  cardHTML += ` 
      <special-project-card title = ${project} src = "${project["image"]}" alt = "${project["alt"]}" text="${project["text"]}"/>
    `;
}
return cardHTML;
