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
  return (
    <div>RenovationDetails</div>
  )
}

export default RenovationDetails