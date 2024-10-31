
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3999';

export const URLS = {
  GET_PROJECTS: `${API_URL}/projects`,
  POST_PROJECT: `${API_URL}/projects`,
  UPDATE_PROJECT: `${API_URL}/projects`,
  DELETE_PROJECT: `${API_URL}/projects`,
};
