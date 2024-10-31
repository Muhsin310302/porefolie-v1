// src/hooks/useProjects.ts

import { useState, useEffect } from 'react';
import { fetchProjects, addProject, deleteProject, updateProject } from '../services/service';
import { Project } from '../schemas/schema';

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError((err as Error).message);
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const addNewProject = async (project: Project) => {
    try {
      const addedProject = await addProject(project);
      setProjects((prevProjects) => [...prevProjects, addedProject]);
    } catch (err) {
      setError((err as Error).message);
      console.error('Error adding project:', err);
    }
  };

  const removeProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
    } catch (err) {
      setError((err as Error).message);
      console.error('Error deleting project:', err);
    }
  };

  const editProject = async (updatedProject: Project) => {
    try {
      const updated = await updateProject(updatedProject);
      setProjects((prevProjects) =>
        prevProjects.map((project) => (project.id === updated.id ? updated : project))
      );
    } catch (err) {
      setError((err as Error).message);
      console.error('Error updating project:', err);
    }
  };

  return { projects, loading, error, addNewProject, removeProject, editProject };
};

export default useProjects;
