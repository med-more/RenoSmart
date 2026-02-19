import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { fetchRealizations, deleteRealization } from '../../services/realizationsService';
import EditProjectModal from '../../components/admin/EditProjectModal';

const AdminRealizations = () => {
  const [realizations, setRealizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    loadRealizations();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setCurrentPage(1);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadRealizations = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchRealizations();
      const sortedData = [...data].sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        if (a.createdAt) return -1; 
        if (b.createdAt) return 1;  
        
        const idA = typeof a.id === 'number' ? a.id : parseInt(a.id) || 0;
        const idB = typeof b.id === 'number' ? b.id : parseInt(b.id) || 0;
        return idB - idA; 
      });
      setRealizations(sortedData);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des projets');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const project = realizations.find(p => p.id === id);
    const projectTitle = project?.title || 'ce projet';

    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-bold text-gray-900">Confirmer la suppression</p>
        <p className="text-sm text-gray-600">
          Êtes-vous sûr de vouloir supprimer <strong>"{projectTitle}"</strong> ? Cette action est irréversible.
        </p>
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
                await deleteRealization(id);
                setRealizations(prev => prev.filter(p => p.id !== id));
                toast.success('Projet supprimé avec succès', {
                  id: loadingToast,
                  icon: '🗑️',
                  style: {
                    borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
                    border: '2px solid #10B981',
                  },
                });
              } catch (err) {
                toast.error('Erreur lors de la suppression: ' + err.message, {
                  id: loadingToast,
                  icon: '❌',
                  style: {
                    borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
                    border: '2px solid #EF4444',
                  },
                });
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

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projets réalisés</h1>
          <p className="text-gray-600 mt-1">Gérez les projets affichés dans la section réalisations</p>
        </div>
        <Link
          to="/admin/realizations/add"
          className="bg-orange hover:bg-orange-dark text-white font-bold py-2 px-6 rounded-asymmetric transition-colors"
        >
          + Ajouter un projet
        </Link>
      </div>


      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-asymmetric p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}


      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-orange border-t-transparent rounded-full animate-spin" />
        </div>
      ) : realizations.length === 0 ? (
        <div className="bg-white border-2 border-gray-200 rounded-asymmetric p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-gray-600 mb-4">Aucun projet réalisé pour le moment</p>
          <Link
            to="/admin/realizations/add"
            className="inline-block bg-orange hover:bg-orange-dark text-white font-bold py-2 px-6 rounded-asymmetric transition-colors"
          >
            Ajouter votre premier projet
          </Link>
        </div>
      ) : (
        <>
          {realizations.length > 0 && (
            <div className="flex items-center justify-between text-sm text-gray-600">
              <p>
                {realizations.length} projet{realizations.length > 1 ? 's' : ''} au total
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(() => {
              const itemsPerPage = isMobile ? 6 : 9;
              const totalPages = Math.ceil(realizations.length / itemsPerPage);
              const startIndex = (currentPage - 1) * itemsPerPage;
              const endIndex = startIndex + itemsPerPage;
              const paginatedRealizations = realizations.slice(startIndex, endIndex);

              return paginatedRealizations.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border-2 border-gray-200 rounded-asymmetric overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{project.location}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                    {project.type}
                  </span>
                  {project.year && (
                    <span className="text-xs text-gray-500">{project.year}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedProjectId(project.id);
                      setEditModalOpen(true);
                    }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-asymmetric transition-colors text-sm"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2 px-4 rounded-asymmetric transition-colors text-sm"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </motion.div>
              ));
            })()}
          </div>

          {(() => {
            const itemsPerPage = isMobile ? 6 : 9;
            const totalPages = Math.ceil(realizations.length / itemsPerPage);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            if (totalPages <= 1) return null;

            return (
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-t-2 border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 rounded-asymmetric">
                <div className="text-xs sm:text-sm text-gray-600">
                  Affichage de {startIndex + 1} à {Math.min(endIndex, realizations.length)} sur {realizations.length} projet{realizations.length > 1 ? 's' : ''}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Précédent
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        if (page === 1 || page === totalPages) return true;
                        if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                        return false;
                      })
                      .map((page, index, array) => {
                        const showEllipsisBefore = index > 0 && array[index] - array[index - 1] > 1;
                        return (
                          <React.Fragment key={page}>
                            {showEllipsisBefore && (
                              <span className="px-2 text-xs sm:text-sm text-gray-500">...</span>
                            )}
                            <button
                              onClick={() => setCurrentPage(page)}
                              className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
                                currentPage === page
                                  ? 'bg-orange text-white'
                                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        );
                      })}
                  </div>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            );
          })()}
        </>
      )}


      <EditProjectModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedProjectId(null);
        }}
        projectId={selectedProjectId}
        onUpdate={() => {
          loadRealizations();
        }}
      />
    </div>
  );
};

export default AdminRealizations;
