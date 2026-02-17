import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { fetchRealizationById, updateRealization } from '../../services/realizationsService';


const EditProjectModal = ({ isOpen, onClose, projectId, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'Rénovation',
    habitatType: 'maison',
    room: '',
    materials: '',
    images: [],
    description: '',
    surface: '',
    duration: '',
    budget: '',
    year: new Date().getFullYear().toString(),
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [mockApiId, setMockApiId] = useState(null);

  useEffect(() => {
    if (isOpen && projectId) {
      loadProjectData();
    } else {
      setFormData({
        title: '',
        location: '',
        type: 'Rénovation',
        habitatType: 'maison',
        room: '',
        materials: '',
        images: [],
        description: '',
        surface: '',
        duration: '',
        budget: '',
        year: new Date().getFullYear().toString(),
      });
      setImagePreviews([]);
      setExistingImages([]);
      setMockApiId(null);
      setError('');
    }
  }, [isOpen, projectId]);
  return (
    <div>EditProjectModal</div>
  )
}

export default EditProjectModal