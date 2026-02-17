
export const WORK_TYPES = [
  { id: 'peinture', label: 'Peinture', icon: '🎨' },
  { id: 'carrelage', label: 'Carrelage', icon: '🧱' },
  { id: 'plomberie', label: 'Plomberie', icon: '🚿' },
  { id: 'electricite', label: 'Électricité', icon: '⚡' },
  { id: 'autres', label: 'Autres', icon: '🔧' },
];


export const REQUEST_STATUSES = {
  PENDING: 'Pending',
  IN_REVIEW: 'In Review',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
};


export const STATUS_LABELS = {
  [REQUEST_STATUSES.PENDING]: 'En attente',
  [REQUEST_STATUSES.IN_REVIEW]: 'En cours d\'examen',
  [REQUEST_STATUSES.APPROVED]: 'Approuvé',
  [REQUEST_STATUSES.REJECTED]: 'Rejeté',
};


export const STATUS_COLORS = {
  [REQUEST_STATUSES.PENDING]: 'bg-yellow-100 text-yellow-800',
  [REQUEST_STATUSES.IN_REVIEW]: 'bg-blue-100 text-blue-800',
  [REQUEST_STATUSES.APPROVED]: 'bg-green-100 text-green-800',
  [REQUEST_STATUSES.REJECTED]: 'bg-red-100 text-red-800',
};


const envUrl = import.meta.env.VITE_MOCKAPI_BASE_URL;
export const MOCKAPI_BASE_URL = envUrl || 'https://6973a0feb5f46f8b5827e065.mockapi.io/projects';


if (import.meta.env.DEV) {
  console.log('MOCKAPI_BASE_URL:', MOCKAPI_BASE_URL);
  console.log('VITE_MOCKAPI_BASE_URL from env:', envUrl);
}



