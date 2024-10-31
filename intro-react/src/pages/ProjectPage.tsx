import React, { useState } from 'react';
import Form from '../components/Form';
import List from '../components/List';
import useProjects from '../hooks/UseProject';
import { Project } from '../schemas/schema';

const ProjectPage: React.FC = () => {
  const { projects, addNewProject, removeProject, editProject } = useProjects();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const handleAddOrEditProject = (project: Project) => {
    if (currentProject) {
      editProject({ ...project, id: currentProject.id });
      setCurrentProject(null); 
    } else {
      addNewProject(project);
    }
  };

  const handleEditClick = (project: Project) => setCurrentProject(project);
  const handleDeleteClick = (id: string) => removeProject(id);

  return (
    <div>
      <Form addProject={handleAddOrEditProject} currentProject={currentProject} editProject={editProject} />
      <List projects={projects} deleteProject={handleDeleteClick} editProject={handleEditClick} />
    </div>
  );
};

export default ProjectPage;
