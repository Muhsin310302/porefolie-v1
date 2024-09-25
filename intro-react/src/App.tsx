import { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';


type DisProject = {
  title: string;
  description: string;
  link: string;
};

const application: React.FC = () => {
  const [projects, setProjects] = useState<DisProject[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const respons = await fetch('http://localhost:3999/projects');
        const data = await respons.json();
        setProjects(data.projects); 
      } catch (error) {
        console.error('Error getting projects:', error);
      }
    };

    fetchProjects();
  }, []);


  const addProject = async (newProject: DisProject) => {
    try {
      const respons = await fetch('http://localhost:3999/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });

      if (respons.ok) {
        const addedProject = await respons.json();
        setProjects((prevProjects) => [...prevProjects, addedProject.project]);
      } else {
        console.error('Failed to add project');
      }
    } catch (error) {
      console.error('Error retreving project:', error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Portfolio</h1>
      </header>
      <main>
        <Form addProject={addProject} />
        <List projects={projects} />
      </main>
    </div>
  );
};

export default application;
