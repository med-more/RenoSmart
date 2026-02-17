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

    const loadProjectData = async () => {
    setFetching(true);
    setError('');
    try {
      const project = await fetchRealizationById(projectId);
      
      if (!project) {
        throw new Error('Projet non trouvé');
      }
      
      
      let numericId = null;
      
      if (project.id && typeof project.id === 'number') {
        numericId = project.id;
      } else {
        try {
          const { createApiInstance } = await import('../../services/api');
          const realizationsApi = createApiInstance('projects');
          const allResponse = await realizationsApi.get('');
          const allProjects = Array.isArray(allResponse.data) ? allResponse.data : [];
          
          const foundProject = allProjects.find(p => {
            const customIdMatch = p.id === projectId || 
                                 (project.id && p.id === project.id) ||
                                 (p.id?.toString() === projectId?.toString());
            const contentMatch = p.title === project.title && 
                                p.location === project.location;
            return customIdMatch || contentMatch;
          });
          
          if (foundProject && typeof foundProject.id === 'number') {
            numericId = foundProject.id;
          }
        } catch (err) {
          console.warn('Could not determine MockAPI numeric ID:', err);
        }
      }
      
      setMockApiId(numericId || projectId);
      
      setFormData({
        title: project.title || '',
        location: project.location || '',
        type: project.type || 'Rénovation',
        habitatType: project.habitatType || 'maison',
        room: project.room || '',
        materials: project.materials || '',
        images: project.images || [],
        description: project.description || '',
        surface: project.surface || '',
        duration: project.duration || '',
        budget: project.budget || '',
        year: project.year || new Date().getFullYear().toString(),
      });

      const images = project.images || [];
      if (project.image && !images.includes(project.image)) {
        images.unshift(project.image);
      }
      setExistingImages(images);
      setImagePreviews(images);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement du projet');
      toast.error('Erreur lors du chargement du projet', {
        style: {
          borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
          border: '2px solid #EF4444',
        },
      });
    } finally {
      setFetching(false);
    }
  };

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
    toast.success('Image supprimée', {
      style: {
        borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
        border: '2px solid #10B981',
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const mainImage = formData.images.length > 0 
        ? formData.images[0] 
        : (existingImages[0] || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');

      const projectData = {
        title: formData.title,
        location: formData.location,
        type: formData.type,
        habitatType: formData.habitatType,
        room: formData.room || '',
        materials: formData.materials || '',
        image: mainImage,
        images: formData.images.length > 0 ? formData.images : existingImages,
        description: formData.description,
        surface: formData.surface,
        duration: formData.duration,
        budget: formData.budget,
        year: formData.year,
      };

      const loadingToast = toast.loading('Mise à jour du projet en cours...', {
        style: {
          borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
          border: '2px solid #FFA726',
        },
      });

      const updateId = mockApiId || projectId;

      await updateRealization(updateId, projectData);
      
      toast.success('Projet mis à jour avec succès !', {
        id: loadingToast,
        icon: '✅',
        style: {
          borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
          border: '2px solid #10B981',
        },
      });
      
      if (onUpdate) {
        onUpdate();
      }
      
      // Close modal
      onClose();
    } catch (err) {
      toast.error(err.message || 'Erreur lors de la mise à jour du projet', {
        style: {
          borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
          border: '2px solid #EF4444',
        },
      });
      setError(err.message || 'Erreur lors de la mise à jour du projet');
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div>EditProjectModal</div>
  )
}

export default EditProjectModal