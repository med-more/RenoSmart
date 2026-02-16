import { createApiInstance } from './api';


const realizationsApi = createApiInstance('projects');

export const createRealization = async (projectData) => {
  try {
    const response = await realizationsApi.post('', projectData);
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de la création du projet: ${error.message}`);
  }
};