let projects = [
    {
        "name": "simons baller project",
        "owner": "simon",
        "desc": "very cool",
        "tags": ["cool", "purple"],
        "logo": "",
        "pot": 100
    },

    {
        "name": "isaacs lame project",
        "owner": "isaac",
        "desc": "very lame",
        "tags": ["lame", "gold"],
        "logo": "",
        "pot": 0
    }
 ];

function createProjectTemplate (project) {
    return `
     <div class = "project">
        <h2 class = "project-name"> ${project.name} </h3>
        <div class = "owner"> ${project.owner} </div>
        <p class = "project-desc"> ${project.desc} </p>
        <div class = "tags"> ${getTags(project)} </div>
     </div>`
}

function getTags(project) {
    let output = ""
    project.tags.forEach((item, index) => {
        output+=item
        output+=" "
    })
    return output
}

document.getElementById("page").innerHTML = 
`${projects.map(createProjectTemplate).join('')}`;