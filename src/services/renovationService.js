import api from './api';
import axios from 'axios';

export const createRenovationRequest = async (requestData) => {
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

export const updateRenovationStatus = async (id, status) => {
  try {
    const response = await api.put(`/${id}`, { status });
    return response;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour du statut: ${error.message}`);
  }
};

export const updateInternalNotes = async (id, internalNotes) => {
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


export const deleteRenovationRequest = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response;
  } catch (error) {
    throw new Error(`Erreur lors de la suppression de la demande: ${error.message}`);
  }
};


export const notifyNewQuote = async (quoteData) => {
  const n8nWebhookUrl = import.meta.env.VITE_N8N_QUOTE_WEBHOOK_URL;
  if(n8nWebhookUrl) {
    try {
      console.log('Notification n8n envoyée pour le nouveau devis:', quoteData);
      const response = await axios.post(n8nWebhookUrl, quoteData);
      console.log('Réponse n8n:', response.data);
    } catch (error) {
      console.error('Erreur notification n8n:', error);
    }
  } else {	
    console.warn('URL webhook n8n non configurée pour les nouveaux devis');
  }
};


export const notifyStatusChange = async (requestData) => {
  const n8nWebhookUrl = import.meta.env.VITE_N8N_STATUS_WEBHOOK_URL;
  
  if (!n8nWebhookUrl) {
    console.warn('URL webhook n8n non configurée pour les changements de statut');
    return;
  }

  try {
    console.log('Notification n8n envoyée pour le changement de statut:', requestData);
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
      mode: 'no-cors', 
    });
    console.log('Notification n8n envoyée avec succès (mode no-cors)');
  } catch (error) {
    console.warn('Erreur lors de l\'envoi à n8n (peut être normal avec no-cors):', error.message);
  }
};


export const sendRequestDetailsEmail = async (requestData) => {
  const n8nWebhookUrl = import.meta.env.VITE_N8N_SEND_DETAILS_WEBHOOK_URL;
  
  if (!n8nWebhookUrl) {
    console.warn('URL webhook n8n non configurée pour l\'envoi des détails');
    return;
  }

  try {
    const pdfSize = requestData.pdfFile ? requestData.pdfFile.length : 0;
    const maxPdfSize = 5 * 1024 * 1024; 
    
    const dataToSend = { ...requestData };
    
    if (pdfSize > maxPdfSize) {
      console.warn('PDF trop volumineux, envoi sans PDF pour éviter les erreurs');
      dataToSend.pdfFile = null;
      dataToSend.pdfFileName = null;
      dataToSend.pdfTooLarge = true;
    }
        const logData = {
      ...dataToSend,
      pdfFile: dataToSend.pdfFile ? `[PDF base64 - ${Math.round(pdfSize / 1024)}KB]` : null
    };
    console.log('Envoi email avec détails de la demande:', logData);
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
      mode: 'no-cors', 
    });
    
    console.log('Requête envoyée à N8N (mode no-cors)');
    
  } catch (error) {
    console.error('Erreur réseau lors de l\'envoi de l\'email:', error);
    throw new Error(`Erreur lors de l'envoi de l'email: ${error.message}`);
  }
};
