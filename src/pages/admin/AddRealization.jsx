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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;


    const totalImages = formData.images.length + files.length;
    if (totalImages > 10) {
      toast.error('Vous ne pouvez pas ajouter plus de 10 images', {
        style: {
          borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
          border: '2px solid #EF4444',
        },
      });
      setError('Vous ne pouvez pas ajouter plus de 10 images');
      return;
    }


    const newPreviews = [];
    const newImages = [];

    files.forEach((file) => {

      if (!file.type.startsWith('image/')) {
        toast.error('Veuillez sélectionner uniquement des fichiers image', {
          style: {
            borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
            border: '2px solid #EF4444',
          },
        });
        setError('Veuillez sélectionner uniquement des fichiers image');
        return;
      }


      if (file.size > 5 * 1024 * 1024) {
        toast.error('Les images ne doivent pas dépasser 5MB', {
          style: {
            borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
            border: '2px solid #EF4444',
          },
        });
        setError('Les images ne doivent pas dépasser 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        newImages.push(reader.result);


        if (newPreviews.length === files.length) {
          setImagePreviews(prev => [...prev, ...newPreviews]);
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...newImages]
          }));
          setError(''); 
          
          toast.success(`${files.length} image${files.length > 1 ? 's' : ''} ajoutée${files.length > 1 ? 's' : ''}`, {
            style: {
              borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
              border: '2px solid #10B981',
            },
            icon: '📷',
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div>AddRealization</div>
  )
}

export default AddRealization