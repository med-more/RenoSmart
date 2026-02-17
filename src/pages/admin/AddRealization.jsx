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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {

      const id = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') + '-' + Date.now();


        const mainImage = formData.images.length > 0 
        ? formData.images[0] 
        : 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

      const projectData = {
        id,
        title: formData.title,
        location: formData.location,
        type: formData.type,
        habitatType: formData.habitatType,
        room: formData.room || '',
        materials: formData.materials || '',
        image: mainImage, 
        images: formData.images, 
        description: formData.description,
        surface: formData.surface,
        duration: formData.duration,
        budget: formData.budget,
        year: formData.year,
        createdAt: new Date().toISOString(),
      };

      const loadingToast = toast.loading('Création du projet en cours...', {
        style: {
          borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
          border: '2px solid #FFA726',
        },
      });

      await createRealization(projectData);
      
      toast.success('Projet créé avec succès !', {
        id: loadingToast,
        icon: '✅',
        style: {
          borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
          border: '2px solid #10B981',
        },
      });
      
      setSuccess(true);
      

      setTimeout(() => {
        navigate('/admin/realizations');
      }, 2000);
    } catch (err) {
      toast.error(err.message || 'Erreur lors de la création du projet', {
        style: {
          borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
          border: '2px solid #EF4444',
        },
      });
      setError(err.message || 'Erreur lors de la création du projet');
      setLoading(false);
    }
  };

  return (
    <div>AddRealization</div>
  )
}

export default AddRealization