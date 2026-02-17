import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { createRealization } from '../../services/realizationsService';

const AddRealization = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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

  return (
    <div>AddRealization</div>
  )
}

export default AddRealization