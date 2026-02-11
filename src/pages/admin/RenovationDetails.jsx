import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  getAllRenovationRequests,
  updateRequestStatus,
  updateRequestInternalNotes,
  updateRequestPDF,
  removeRenovationRequest,
  setCurrentRequest,
} from '../../store/slices/renovationSlice';
import { setSuccessMessage, clearMessages, setLoading, setError } from '../../store/slices/uiSlice';
import { REQUEST_STATUSES, STATUS_LABELS, STATUS_COLORS } from '../../utils/constants';
import { sendRequestDetailsEmail } from '../../services/renovationService';



const RenovationDetails = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { requests, currentRequest, loading, error } = useSelector((state) => state.renovation);
  const [newStatus, setNewStatus] = useState('');
  const [internalNotes, setInternalNotes] = useState(currentRequest?.internalNotes || '');
  const [uploadingPDF, setUploadingPDF] = useState(false);

  useEffect(() => {
    const request = requests.find((r) => r.id === id);
    if (request) {
      dispatch(setCurrentRequest(request));
      setNewStatus(request.status);
      setInternalNotes(request.internalNotes || '');
    } else {
      dispatch(getAllRenovationRequests());
    }
    return () => { dispatch(clearMessages()); };
  }, [id, requests, dispatch]);

  useEffect(() => {
    if (currentRequest?.internalNotes !== undefined) {
      setInternalNotes(currentRequest.internalNotes || '');
    }
  }, [currentRequest]);

  const handleStatusUpdate = async () => {
    if (!newStatus || newStatus === currentRequest?.status) return;
    
    const loadingToast = toast.loading('Mise à jour du statut...', {
      style: {
        borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
        border: '2px solid #FFA726',
      },
    });

    try {
      dispatch(setLoading(true));
      await dispatch(updateRequestStatus({ id, status: newStatus })).unwrap();
      toast.success(`Statut mis à jour : ${STATUS_LABELS[newStatus]}`, {
        id: loadingToast,
        icon: '✅',
        style: {
          borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
          border: '2px solid #10B981',
        },
      });
      dispatch(setSuccessMessage('Statut mis à jour !'));
    } catch (err) {
      toast.error('Erreur lors de la mise à jour du statut', {
        id: loadingToast,
        icon: '❌',
        style: {
          borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
          border: '2px solid #EF4444',
        },
      });
      dispatch(setError('Erreur lors de la mise à jour.'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDelete = async () => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-bold text-gray-900">Confirmer la suppression</p>
        <p className="text-sm text-gray-600">Êtes-vous sûr de vouloir supprimer ce dossier ? Cette action est irréversible.</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingToast = toast.loading('Suppression en cours...', {
                style: {
                  borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
                  border: '2px solid #EF4444',
                },
              });
              
    try {
      dispatch(setLoading(true));
      await dispatch(removeRenovationRequest(id)).unwrap();
                toast.success('Dossier supprimé avec succès', {
                  id: loadingToast,
                  icon: '🗑️',
                  style: {
                    borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
                    border: '2px solid #10B981',
                  },
                });
                setTimeout(() => {
                  navigate('/admin/requests');
                }, 1000);
    } catch (err) {
                toast.error('Erreur lors de la suppression', {
                  id: loadingToast,
                  icon: '❌',
                  style: {
                    borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
                    border: '2px solid #EF4444',
                  },
                });
      dispatch(setError('Erreur lors de la suppression.'));
      dispatch(setLoading(false));
    }
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-asymmetric text-sm transition-colors"
          >
            Supprimer
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-asymmetric text-sm transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    ), {
      duration: 10000,
      style: {
        borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
        border: '2px solid #EF4444',
        padding: '16px',
        minWidth: '320px',
      },
    });
  };

    if (!currentRequest) return <div className="p-4 sm:p-6 md:p-8 text-center text-xs sm:text-sm text-gray-500">Chargement du dossier...</div>;

  return (
    <div>RenovationDetails</div>
  )
}

export default RenovationDetails