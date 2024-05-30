import { getRootPath, columnClick, getData } from "./scripts.js";







async function renderProject() {
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
    cloneHTML.querySelector(".Project-title").textContent = urlParamValue
    if (data["image"] == null) {
      cloneHTML.querySelector(".img-project").src = "assets/missingImage.jpg";
    } else {
      cloneHTML.querySelector(".img-project").src = "assets/" + data["image"];
    }
  
    cloneHTML.querySelector(".img-project").alt = urlParamValue;
  



    
  
    cloneHTML.querySelector(".github").href =
      data["links"]["github"];
      cloneHTML.querySelector(".website").href =
      data["links"]["website"];


    cloneHTML.querySelector(".badge").innerHTML = data["badge"];


  
    const tag = document.createElement("nav-bar");
    app.appendChild(tag);
    app.appendChild(cloneHTML);
  }
  




  document.addEventListener("DOMContentLoaded", async () => {
    await renderProject();
    



  });
  