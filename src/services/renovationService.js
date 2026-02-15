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