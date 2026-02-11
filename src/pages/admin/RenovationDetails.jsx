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
  return (
    <div>RenovationDetails</div>
  )
}

export default RenovationDetails