let projects = [
    {
        "name": "simon",
        "desc": "very cool"
    },

    {
        "name": "isaac",
        "desc": "not cool at all"
    }
 ];

function createProjectTemplate (project) {
    return `
     <div class = "project">
        <h3 class = "project-name"> ${project.name} </h3>
        <p class = "project-desc"> ${project.desc} </p>
     </div>`
}

document.getElementById("page").innerHTML = 
`${projects.map(createProjectTemplate).join('')}`;