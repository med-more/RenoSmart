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
    <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
        <div className="flex-1 min-w-0">
          <Link to="/admin" className="text-gray-500 hover:text-orange text-xs sm:text-sm mb-2 inline-block">← Retour au tableau de bord</Link>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-4 mb-1 sm:mb-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">{currentRequest.clientName}</h1>
            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold w-fit ${STATUS_COLORS[currentRequest.status]}`}>
              {STATUS_LABELS[currentRequest.status]}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 break-words">Dossier #{currentRequest.id.substring(0, 8)} • Créé le {new Date(currentRequest.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button onClick={handleDelete} className="text-red-500 hover:text-red-700 font-medium px-3 sm:px-4 py-1.5 sm:py-2 bg-red-50 rounded-lg transition-colors text-xs sm:text-sm">
            Supprimer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">

        <div className="lg:col-span-2 space-y-4 sm:space-y-5 md:space-y-6">

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 border-b pb-2 text-sm sm:text-base md:text-lg">Détails du projet</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">Type de travaux</p>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 break-words">{currentRequest.workType}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">Surface</p>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">{currentRequest.surface} m²</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">Email Client</p>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 break-all">{currentRequest.email}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">Téléphone</p>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
                  {currentRequest.phone || currentRequest.telephone || 'Non renseigné'}
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-5 md:mt-6">
              <p className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wide mb-2">Description</p>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-xs sm:text-sm md:text-base text-gray-700 italic border border-gray-200 break-words">
                "{currentRequest.description}"
              </div>
            </div>
          </div>
        </div>


        <div className="space-y-4 sm:space-y-5 md:space-y-6">

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Mise à jour statut</h2>
            <div className="space-y-3 sm:space-y-4">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
              >
                {Object.values(REQUEST_STATUSES)
                  .filter(status => status !== REQUEST_STATUSES.REJECTED)
                  .map(status => (
                  <option key={status} value={status}>{STATUS_LABELS[status]}</option>
                ))}
              </select>
              <button
                onClick={handleStatusUpdate}
                disabled={loading || newStatus === currentRequest.status}
                className="w-full btn-teal py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold"
              >
                Mettre à jour
              </button>
            </div>
          </div>


          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Notes internes</h2>
            <p className="text-xs text-gray-500 mb-2">Notes privées visibles uniquement par l'équipe admin</p>
            <textarea
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2 sm:p-3 text-xs sm:text-sm focus:outline-none focus:border-orange h-24 sm:h-28 md:h-32 resize-none"
              placeholder="Ajouter une note interne (ex: Appelé le client le 15/01, rendez-vous prévu le 20/01, etc.)"
            />
          </div>


          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Facture / Devis PDF</h2>
            <p className="text-xs text-gray-500 mb-3">Téléchargez un fichier PDF contenant les informations et le budget estimé du projet</p>
            

            <div className="mb-3">
              <label className="block w-full">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;


                    if (file.type !== 'application/pdf') {
                      toast.error('Veuillez sélectionner un fichier PDF', {
                        icon: '❌',
                        style: {
                          borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
                          border: '2px solid #EF4444',
                        },
                      });
                      return;
                    }


                    if (file.size > 10 * 1024 * 1024) {
                      toast.error('Le fichier PDF ne doit pas dépasser 10MB', {
                        icon: '❌',
                        style: {
                          borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
                          border: '2px solid #EF4444',
                        },
                      });
                      return;
                    }

                    setUploadingPDF(true);
                    const loadingToast = toast.loading('Téléchargement du PDF...', {
                      style: {
                        borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
                        border: '2px solid #FFA726',
                      },
                    });

                    try {

                      const reader = new FileReader();
                      reader.onloadend = async () => {
                        try {
                          const base64PDF = reader.result;
                          await dispatch(updateRequestPDF({ id, pdfFile: base64PDF })).unwrap();
                          toast.success('PDF téléchargé avec succès', {
                            id: loadingToast,
                            icon: '📄',
                            style: {
                              borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
                              border: '2px solid #10B981',
                            },
                          });
                          dispatch(getAllRenovationRequests());
                        } catch (err) {
                          toast.error('Erreur lors du téléchargement du PDF', {
                            id: loadingToast,
                            icon: '❌',
                            style: {
                              borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
                              border: '2px solid #EF4444',
                            },
                          });
                        } finally {
                          setUploadingPDF(false);
                        }
                      };
                      reader.onerror = () => {
                        toast.error('Erreur lors de la lecture du fichier', {
                          id: loadingToast,
                          icon: '❌',
                          style: {
                            borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
                            border: '2px solid #EF4444',
                          },
                        });
                        setUploadingPDF(false);
                      };
                      reader.readAsDataURL(file);
                    } catch (err) {
                      toast.error('Erreur lors du téléchargement du PDF', {
                        id: loadingToast,
                        icon: '❌',
                        style: {
                          borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
                          border: '2px solid #EF4444',
                        },
                      });
                      setUploadingPDF(false);
                    }
                  }}
                  disabled={uploadingPDF || loading}
                  className="hidden"
                  id="pdf-upload"
                />
                <div className={`w-full border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                  uploadingPDF || loading
                    ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                    : 'border-gray-300 hover:border-teal hover:bg-teal-50'
                }`}>
                  <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <label htmlFor="pdf-upload" className="cursor-pointer">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      {uploadingPDF ? 'Téléchargement en cours...' : currentRequest?.pdfFile ? 'Remplacer le PDF' : 'Cliquez pour télécharger un PDF'}
                    </span>
                    <span className="text-xs text-gray-500 block mt-1">PDF uniquement (max 10MB)</span>
                  </label>
                </div>
              </label>
            </div>


            {currentRequest?.pdfFile && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                    <span className="text-xs sm:text-sm font-medium text-gray-700">PDF téléchargé</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={currentRequest.pdfFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-teal hover:text-orange font-bold transition-colors"
                    >
                      Voir le PDF
                    </a>
                    <button
                      onClick={async () => {
                        const confirmToast = toast((t) => (
                          <div className="flex flex-col gap-3">
                            <p className="font-bold text-gray-900">Supprimer le PDF</p>
                            <p className="text-sm text-gray-600">Êtes-vous sûr de vouloir supprimer ce PDF ?</p>
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={async () => {
                                  toast.dismiss(t.id);
                                  const loadingToast = toast.loading('Suppression du PDF...', {
                                    style: {
                                      borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
                                      border: '2px solid #FFA726',
                                    },
                                  });

                                  try {
                                    dispatch(setLoading(true));
                                    await dispatch(updateRequestPDF({ id, pdfFile: null })).unwrap();
                                    toast.success('PDF supprimé avec succès', {
                                      id: loadingToast,
                                      icon: '🗑️',
                                      style: {
                                        borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
                                        border: '2px solid #10B981',
                                      },
                                    });
                                    dispatch(getAllRenovationRequests());
                                  } catch (err) {
                                    toast.error('Erreur lors de la suppression du PDF', {
                                      id: loadingToast,
                                      icon: '❌',
                                      style: {
                                        borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
                                        border: '2px solid #EF4444',
                                      },
                                    });
                                  } finally {
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
                      }}
                      disabled={loading || uploadingPDF}
                      className="text-xs sm:text-sm text-red-500 hover:text-red-700 font-bold transition-colors disabled:text-gray-400 disabled:cursor-not-allowed flex items-center gap-1"
                      title="Supprimer le PDF"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


      <div className="mt-6 sm:mt-8 flex justify-end">
        <button
          onClick={async () => {
            const loadingToast = toast.loading('Enregistrement et envoi de l\'email...', {
              style: {
                borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
                border: '2px solid #FFA726',
              },
            });

            try {
              dispatch(setLoading(true));
              

              await dispatch(updateRequestInternalNotes({ id, internalNotes })).unwrap();
              

              const emailData = {
                clientName: currentRequest.clientName,
                email: currentRequest.email,
                phone: currentRequest.phone || currentRequest.telephone || 'Non renseigné',
                workType: currentRequest.workType,
                surface: currentRequest.surface,
                budget: currentRequest.estimatedBudget || currentRequest.budget || 'Non spécifié',
                description: currentRequest.description,
                status: currentRequest.status,
                statusLabel: STATUS_LABELS[currentRequest.status] || currentRequest.status,
                internalNotes: internalNotes || 'Aucune note',
                pdfFile: currentRequest.pdfFile || null,
                pdfFileName: currentRequest.pdfFile ? 'Facture_Devis.pdf' : null,
                createdAt: currentRequest.createdAt,
                requestId: currentRequest.id,
              };


              try {
                await sendRequestDetailsEmail(emailData);
                toast.success('Note enregistrée et email envoyé avec succès', {
                  id: loadingToast,
                  icon: '✅',
                  style: {
                    borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
                    border: '2px solid #10B981',
                  },
                });
              } catch (emailError) {

                console.warn('Erreur lors de l\'envoi de l\'email:', emailError);
                toast.success('Note enregistrée avec succès (email non envoyé)', {
                  id: loadingToast,
                  icon: '📝',
                  style: {
                    borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
                    border: '2px solid #10B981',
                  },
                });
              }

              dispatch(setSuccessMessage('Note enregistrée et email envoyé !'));

              dispatch(getAllRenovationRequests());
            } catch (err) {
              toast.error('Erreur lors de l\'enregistrement', {
                id: loadingToast,
                icon: '❌',
                style: {
                  borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem',
                  border: '2px solid #EF4444',
                },
              });
              dispatch(setError('Erreur lors de l\'enregistrement.'));
            } finally {
              dispatch(setLoading(false));
            }
          }}
          disabled={loading}
          className="bg-teal hover:bg-teal-dark text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-asymmetric text-sm sm:text-base transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
        >
          {loading ? 'Enregistrement...' : 'Enregistrer et envoyer l\'email au client'}
        </button>
      </div>
    </div>
  )
}

export default RenovationDetails