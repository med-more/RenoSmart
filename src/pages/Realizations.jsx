import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchRealizations } from '../services/realizationsService';


const Realizations = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        city: '',
        workType: '',
        habitatType: '',
        room: '',
        materials: ''
    });
    const [allRealizations, setAllRealizations] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadRealizations = async () => {
            setLoading(true);
            try {
                const apiRealizations = await fetchRealizations();
                setAllRealizations(apiRealizations || []);
            } catch (error) {
                console.error('Erreur lors du chargement des réalisations:', error);
                setAllRealizations([]);
            } finally {
                setLoading(false);
            }
        };
        loadRealizations();
    }, []);


    const filteredRealizations = allRealizations.filter(realization => {

      if (filters.city && !(realization.location || '').toLowerCase().includes(filters.city.toLowerCase())) {
            return false;
        }


        if (filters.workType) {
            const workTypeMap = {
                'renovation': 'Rénovation',
                'extension': 'Extension',
                'amenagement': 'Aménagement'
            };
            if (realization.type !== workTypeMap[filters.workType]) {
                return false;
            }
        }


        if (filters.habitatType && realization.habitatType !== filters.habitatType) {
            return false;
        }


        if (filters.room && realization.room !== filters.room) {
            return false;
        }


        if (filters.materials && realization.materials !== filters.materials) {
            return false;
        }

        return true;
    });

    const itemsPerPage = 15;
    const totalPages = Math.ceil(filteredRealizations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRealizations = filteredRealizations.slice(startIndex, endIndex);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
        setCurrentPage(1); 
        
    };

    const handleValidate = () => {

      setCurrentPage(1);
    };

    const handleReset = () => {
        setFilters({
            city: '',
            workType: '',
            habitatType: '',
            room: '',
            materials: ''
        });
        setCurrentPage(1);
    };

    return (
        <div className="bg-white min-h-screen">

            <div className="bg-gray-50 py-4 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center text-sm text-gray-600">
                        <Link to="/" className="hover:text-orange transition-colors">Accueil</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">Réalisations</span>
                    </nav>
                </div>
            </div>


            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Toutes nos réalisations</h1>
                    <div className="flex items-center justify-center gap-2">
                        <div className="h-1 w-16 bg-orange"></div>
                        <div className="h-0.5 w-32 border-t-2 border-dashed border-gray-300"></div>
                    </div>
                </div>
            </section>


            <section className="bg-gray-50 py-8 border-y-2 border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative">

                        <div className="absolute left-0 top-0 w-6 h-6 border-l-4 border-t-4 border-orange"></div>

                        <div className="absolute right-0 bottom-0 w-6 h-6 border-r-4 border-b-4 border-orange"></div>

                        <div className="bg-white rounded-lg p-4 sm:p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">

                                <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Ville ou département"
                                            value={filters.city}
                                            onChange={(e) => handleFilterChange('city', e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-300 rounded-asymmetric px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 text-xs sm:text-sm focus:outline-none focus:border-orange"
                                        />
                                        <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>


                                <div>
                                    <select
                                        value={filters.workType}
                                        onChange={(e) => handleFilterChange('workType', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-300 rounded-asymmetric px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:border-orange appearance-none"
                                    >
                                        <option value="">Type de travaux</option>
                                        <option value="renovation">Rénovation</option>
                                        <option value="extension">Extension</option>
                                        <option value="amenagement">Aménagement</option>
                                    </select>
                                </div>


                                <div>
                                    <select
                                        value={filters.habitatType}
                                        onChange={(e) => handleFilterChange('habitatType', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-300 rounded-asymmetric px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:border-orange appearance-none"
                                    >
                                        <option value="">Type d'habitat</option>
                                        <option value="maison">Maison</option>
                                        <option value="appartement">Appartement</option>
                                        <option value="villa">Villa</option>
                                    </select>
                                </div>


                                <div>
                                    <select
                                        value={filters.room}
                                        onChange={(e) => handleFilterChange('room', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-300 rounded-asymmetric px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:border-orange appearance-none"
                                    >
                                        <option value="">Pièce</option>
                                        <option value="cuisine">Cuisine</option>
                                        <option value="salle-de-bain">Salle de bain</option>
                                        <option value="salon">Salon</option>
                                        <option value="chambre">Chambre</option>
                                    </select>
                                </div>


                                <div>
                                    <select
                                        value={filters.materials}
                                        onChange={(e) => handleFilterChange('materials', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-300 rounded-asymmetric px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:border-orange appearance-none"
                                    >
                                        <option value="">Matériaux</option>
                                        <option value="bois">Bois</option>
                                        <option value="pierre">Pierre</option>
                                        <option value="beton">Béton</option>
                                        <option value="metal">Métal</option>
                                    </select>
                                </div>


                                <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2 flex gap-2 sm:gap-3">
                                    <button
                                        onClick={handleValidate}
                                        className="flex-1 bg-orange hover:bg-orange-dark text-white font-bold py-2 px-4 rounded-asymmetric transition-colors shadow-xl text-xs sm:text-sm uppercase tracking-wide whitespace-nowrap"
                                    >
                                        Valider
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-asymmetric transition-colors shadow-xl text-xs sm:text-sm uppercase tracking-wide whitespace-nowrap"
                                    >
                                        Réinitialiser
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-8 sm:py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-4 border-orange border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : filteredRealizations.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg mb-4">Aucune réalisation ne correspond à vos critères de recherche.</p>
                            <button
                                onClick={() => setFilters({ city: '', workType: '', habitatType: '', room: '', materials: '' })}
                                className="btn-orange"
                            >
                                Réinitialiser les filtres
                            </button>
                        </div>
                    ) : (
                        <>
                            {Object.values(filters).some(f => f !== '') && (
                                <div className="mb-6 text-sm text-gray-600">
                                    {filteredRealizations.length} réalisation{filteredRealizations.length > 1 ? 's' : ''} trouvée{filteredRealizations.length > 1 ? 's' : ''}
                                </div>
                            )}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                                {currentRealizations.map((realization, index) => (
                            <motion.div
                                key={realization.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link to={`/realisations/${realization.id}`} className="group block">
                                    <div className="relative aspect-square overflow-hidden bg-gray-200 rounded-asymmetric">
                                        <img
                                            src={realization.image}
                                            alt={realization.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />

                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-2 sm:p-3 md:p-4">
                                            <div className="flex items-start justify-between gap-1 sm:gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[10px] sm:text-sm text-white leading-tight group-hover:text-orange transition-colors line-clamp-2">
                                                        {realization.title} à {realization.location}
                                                    </p>
                                                </div>
                                                <svg className="w-3 h-3 sm:w-5 sm:h-5 text-white group-hover:text-orange transition-colors flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                            </div>
                        </>
                    )}
                </div>
            </section>


            <section className="py-6 sm:py-8 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="p-2 text-gray-600 hover:text-orange disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        {[...Array(totalPages)].map((_, index) => {
                            const page = index + 1;

                            const showPage = totalPages <= 5 || page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1);
                            const showEllipsis = totalPages > 5 && (page === currentPage - 2 || page === currentPage + 2) && currentPage > 3 && currentPage < totalPages - 2;

                            if (showEllipsis) {
                                return <span key={`ellipsis-${page}`} className="text-gray-400 hidden sm:inline">...</span>;
                            }

                            if (!showPage) return null;

                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-base font-bold transition-colors ${currentPage === page
                                            ? 'bg-orange text-white rounded-asymmetric'
                                            : 'text-gray-600 hover:text-orange'
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 text-gray-600 hover:text-orange disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Realizations;
