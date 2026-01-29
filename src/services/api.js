import axios from 'axios';
import { MOCKAPI_BASE_URL } from '../utils/constants';


export const createApiInstance = (endpoint = '') => {
  let baseUrl = MOCKAPI_BASE_URL;
  

  if (baseUrl.includes('/projects') || baseUrl.includes('/renovations')) {

    const currentEndpoint = baseUrl.split('/').pop();
    if (endpoint && endpoint !== currentEndpoint) {

        baseUrl = baseUrl.replace(`/${currentEndpoint}`, `/${endpoint}`);
    }

} else {

    if (!baseUrl.endsWith('/')) {
      baseUrl = baseUrl + '/';
    }
    baseUrl = endpoint ? `${baseUrl}${endpoint}` : baseUrl.slice(0, -1);
  }
  

  if (import.meta.env.DEV) {
    console.log(`API Instance created for endpoint "${endpoint}":`, baseUrl);
  }
  
  return axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};


const api = axios.create({
  baseURL: MOCKAPI_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response) {

        console.error('Erreur API:', error.response.data);
    } else if (error.request) {

        console.error('Pas de réponse du serveur');
    } else {

        console.error('Erreur de configuration:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;



