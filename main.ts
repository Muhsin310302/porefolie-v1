/*import "./style.css";

document.addEventListener('DOMContentLoaded', async () => {
    const projectListContainer = document.getElementById('Pro') as HTMLDivElement;
    const projectForm = document.getElementById('project-form') as HTMLFormElement;

    if (!projectListContainer || !projectForm) return;

    
    const loadProjects = async () => {
        try {
            const response = await fetch('http://localhost:3999/json'); 
            const data = await response.json();

            projectListContainer.innerHTML = ''; 

            
            data.projects.forEach((project: { title: string; description: string; link: string }) => {
                addProjectToUI(project);
            });
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    
    const addProjectToUI = (project: { title: string; description: string; link: string }) => {
        const article = document.createElement('article'); 
        article.className = 'cards';

        
        const title = document.createElement('h2');
        title.textContent = project.title;

        
        const description = document.createElement('p');
        description.textContent = project.description;

        
        const link = document.createElement('a');
        link.href = project.link;
        link.textContent = 'Les mer'; 

        
        article.appendChild(title);
        article.appendChild(description);
        article.appendChild(link);

        
        projectListContainer.appendChild(article);
    };

   
    await loadProjects();

    
    projectForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 

       
        const formData = new FormData(projectForm);
        const newProject = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            link: formData.get('link') as string
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
