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

export const fetchRealizations = async () => {
  try {
    const response = await realizationsApi.get('');
    return response.data;
  } catch (error) {
    console.warn('Impossible de récupérer les projets depuis l\'API:', error.message);
  }
};

export const fetchRealizationById = async (id) =>{
  try {
    try {
      const response = await realizationsApi.get(`/${id}`);
      if (response.data) {
        return response.data;
      }
    } catch (directError) {
      console.log('Tentative de récupération directe échouée, recherche par champ id personnalisé...');
    }
    const allProjects = await fetchRealizations();
    const project = allProjects.find(p => p.id === id);

    if (project) {
      return project
      throw new Error('Projet non trouvé');
    }
  } catch (error) {
    throw new Error(`Erreur lors de la récupération du projet: ${error.message}`);
  }
};

export const updateRealization = async (id, projectData) => {
  try {
    const response = await realizationsApi.put(`/${id}`, projectData);
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour du projet: ${error.message}`);
  }
};

export const deleteRealization = async (id) =>{
  try {
    const response = await realizationsApi.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de la suppression du projet: ${error.message}`);
  }
};