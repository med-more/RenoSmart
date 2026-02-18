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
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50"
        />

        <div className="flex min-h-screen items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-asymmetric shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b-2 border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Modifier le projet</h2>
                <p className="text-sm text-gray-600 mt-1">Modifiez les informations du projet</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {fetching ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-orange border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border-2 border-red-200 rounded-asymmetric p-4 mb-6"
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-800">{error}</p>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Titre du projet *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-asymmetric focus:outline-none focus:border-orange"
                          placeholder="Ex: Rénovation complète d'une maison"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Localisation *
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-asymmetric focus:outline-none focus:border-orange"
                          placeholder="Ex: Rabat, Maroc"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Type de travaux *
                        </label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-asymmetric focus:outline-none focus:border-orange"
                        >
                          <option value="Rénovation">Rénovation</option>
                          <option value="Extension">Extension</option>
                          <option value="Aménagement">Aménagement</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Type d'habitat *
                        </label>
                        <select
                          name="habitatType"
                          value={formData.habitatType}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-asymmetric focus:outline-none focus:border-orange"
                        >
                          <option value="maison">Maison</option>
                          <option value="appartement">Appartement</option>
                          <option value="villa">Villa</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Pièce (optionnel)
                        </label>
                        <select
                          name="room"
                          value={formData.room}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-asymmetric focus:outline-none focus:border-orange"
                        >
                          <option value="">Aucune</option>
                          <option value="cuisine">Cuisine</option>
                          <option value="salle-de-bain">Salle de bain</option>
                          <option value="salon">Salon</option>
                          <option value="chambre">Chambre</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Matériaux (optionnel)
                        </label>
                        <select
                          name="materials"
                          value={formData.materials}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-asymmetric focus:outline-none focus:border-orange"
                        >
                          <option value="">Aucun</option>
                          <option value="bois">Bois</option>
                          <option value="pierre">Pierre</option>
                          <option value="beton">Béton</option>
                          <option value="metal">Métal</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Images du projet
                        </label>
                        
                        <div className="mb-4">
                          <input
                            type="file"
                            id="edit-image-upload"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          <label
                            htmlFor="edit-image-upload"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-orange hover:bg-orange-dark text-white font-bold rounded-asymmetric cursor-pointer transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Ajouter des images
                          </label>
                          <p className="text-xs text-gray-500 mt-2">
                            Vous pouvez ajouter de nouvelles images (max 10 au total, 5MB par image)
                          </p>
                        </div>

                        {imagePreviews.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                            {imagePreviews.map((preview, index) => (
                              <div key={index} className="relative group">
                                <div className="aspect-square overflow-hidden rounded-asymmetric bg-gray-200">
                                  <img
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                  title="Supprimer cette image"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                                {index === 0 && (
                                  <div className="absolute bottom-2 left-2 bg-orange text-white text-xs font-bold px-2 py-1 rounded">
                                    Principale
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows="4"
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-asymmetric focus:outline-none focus:border-orange"
                          placeholder="Description détaillée du projet..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Surface (optionnel)
                        </label>
                        <input
                          type="text"
                          name="surface"
                          value={formData.surface}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-asymmetric focus:outline-none focus:border-orange"
                          placeholder="Ex: 120 m²"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Durée (optionnel)
                        </label>
                        <input
                          type="text"
                          name="duration"
                          value={formData.duration}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-asymmetric focus:outline-none focus:border-orange"
                          placeholder="Ex: 8 semaines"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Budget (optionnel)
                        </label>
                        <input
                          type="text"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-asymmetric focus:outline-none focus:border-orange"
                          placeholder="Ex: 50 000 €"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Année
                        </label>
                        <input
                          type="text"
                          name="year"
                          value={formData.year}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-asymmetric focus:outline-none focus:border-orange"
                          placeholder="2024"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t-2 border-gray-200">
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-orange hover:bg-orange-dark text-white font-bold py-2 px-6 rounded-asymmetric transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Mise à jour...' : 'Enregistrer les modifications'}
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-asymmetric transition-colors"
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default EditProjectModal;
