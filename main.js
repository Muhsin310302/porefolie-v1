
/*const projectList = document.getElementById('Pro');
const projectForm = document.getElementById('project-form');


const saveProjectsToLocalStorage = (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects));
};

const getProjectsFromLocalStorage = () => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [];
};

const addProjectToUI = (project) => {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');

    const projectTitle = document.createElement('h3');
    projectTitle.textContent = project.title;

    const projectDescription = document.createElement('p');
    projectDescription.textContent = project.description;

    const projectLink = document.createElement('a');
    projectLink.href = project.link;
    projectLink.textContent = "View Project";
    projectLink.target = "_blank"; // Open in a new tab

    
    projectDiv.appendChild(projectTitle);
    projectDiv.appendChild(projectDescription);
    projectDiv.appendChild(projectLink);
    
    projectList.appendChild(projectDiv);
};
const loadProjects = () => {
    const projects = getProjectsFromLocalStorage();
    projects.forEach(addProjectToUI); // Add each project to the UI
};

const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent form submission from refreshing the page
    
    const title = projectForm.title.value;
    const description = projectForm.description.value;
    const link = projectForm.link.value;

    const newProject = { title, description, link };
    
    addProjectToUI(newProject);
    
    const projects = getProjectsFromLocalStorage();
    
    projects.push(newProject);
    
    saveProjectsToLocalStorage(projects);
    
    projectForm.reset();
};

projectForm.addEventListener('submit', handleFormSubmit);


document.addEventListener('DOMContentLoaded', loadProjects);*/



/*document.addEventListener('DOMContentLoaded', async () => {
    const projectListContainer = document.getElementById('Pro');
    const projectForm = document.getElementById('project-form');

    if (!projectListContainer || !projectForm) return;


    const loadProjects = async () => {
        try {
            const response = await fetch('http://localhost:3999/json'); 
            const data = await response.json();

            projectListContainer.innerHTML = ''; 

            
            data.projects.forEach((project) => {
                addProjectToUI(project);
            });
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

  
    const addProjectToUI = (project) => {
        const projectHTML = `
            <article class="cards">
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank">Les mer</a>
            </article>
        `;

        projectListContainer.insertAdjacentHTML('beforeend', projectHTML);
    };

    
    await loadProjects();

    
    projectForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        
        const formData = new FormData(projectForm);
        const newProject = {
            title: formData.get('title'),
            description: formData.get('description'),
            link: formData.get('link')
        };

        try {
            const response = await fetch('http://localhost:3999/projects', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProject)
            });

            if (response.ok) {
                addProjectToUI(newProject); 
                projectForm.reset(); 
            } else {
                console.error('Failed to save project');
            }
        } catch (error) {
            console.error('Error saving project:', error);
        }
    });
});*/
