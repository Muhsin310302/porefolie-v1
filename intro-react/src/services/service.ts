

import { Project } from '../schemas/schema';
import { URLS } from '../config';
import { api } from "./cApi";
import { projectSchema } from '../schemas/schema';

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await api(URLS.GET_PROJECTS);
  if (response.success && Array.isArray(response.data)) {
    return response.data;
  } else {
    throw new Error(response.error || 'Failed to fetch projects');
  }
};


export const addProject = async (project: Project): Promise<Project> => {

  const validation = projectSchema.safeParse(project);
  if (!validation.success) {
    throw new Error('Invalid project data');
  }


  const response = await api(URLS.POST_PROJECT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validation.data),
  });
  if (response.success && response.data) {
    return response.data;
  } else {
    throw new Error(response.error || 'Failed to add project');
  }
};


export const updateProject = async (project: Project): Promise<Project> => {
  if (!project.id) {
    throw new Error('Project ID is required for update');
  }

  const response = await api(`${URLS.UPDATE_PROJECT}/${project.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
  if (response.success && response.data) {
    return response.data;
  } else {
    throw new Error(response.error || 'Failed to update project');
  }
};


export const deleteProject = async (projectId: string): Promise<void> => {
  const response = await api(`${URLS.DELETE_PROJECT}/${projectId}`, {
    method: 'DELETE',
  });

  if (!response.success) {
    throw new Error(response.error || 'Failed to delete project');
  }
};
