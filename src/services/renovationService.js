import api from './api';
import axios from 'axios';


export const createRenovationRequest = async(requestData) =>{
    try {
        const response = await api.post('', requestData);
        return response;
    } catch (error) {
        throw new Error(`Erreur lors de la création de la demande: ${error.message}`);
    }
};

export const fetchRenovationRequests = async () => {
    try {
        const response = await api.get('');
        return response;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des demandes: ${error.message}`);
    }
}; 

export const fetchRenovationRequestById = async (id) => {
    try {
        const response = await api.get(`/${id}`);
        return response;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération de la demande: ${error.message}`);
    }
};

export const  updateRenovationStatus = async (id, status) => {
    try {
        const response = await axios.put(`/${id}`, {status});
        return response;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour du statut: ${error.message}`);
    }
};

export const updateInternalNotes = async(id, internalNotes) => {
    try {
        const response = await api.put(`/${id}`, { internalNotes });
        return response;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour des notes internes: ${error.message}`);
    }
};

export const updateRenovationRequest = async (id, requestData) => {
  try {
    const response = await api.put(`/${id}`, requestData);
    return response;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour de la demande: ${error.message}`);
  }
};

export const deleteRenovationRequest = async(id) =>{
    try {
        const response = await api.delete(`/${id}`);
        return response;
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de la demande: ${error.message}`);
    }
};

//notification n8n for every devis created
export const notifyNewQuote = async(quoteData) => {
      const n8nWebhookUrl = import.meta.env.VITE_N8N_QUOTE_WEBHOOK_URL;
      if (n8nWebhookUrl) {
        try {
            console.log('Notification n8n envoyée pour le nouveau devis:', quoteData);
            const response = await axios.post(n8nWebhookUrl, quoteData);
            console.log('Réponse n8n:', response.data);
        } catch (error) {
            console.error('Erreur notification n8n:', error);
        }
      }
};