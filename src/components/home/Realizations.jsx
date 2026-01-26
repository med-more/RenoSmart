import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import img1 from '../../public/1.png';

const Realizations = () => {
    const [selectedRealization, setSelectedRealization] = useState(null);

    const realizations = [
        {
            id: 1,
            title: 'Rénovation d\'une longère',
            category: 'RÉNOVATION',
            image: img1,
            location: 'Normandie, France',
            year: '2023',
            description: 'Transformation complète d\'une longère traditionnelle en habitation moderne et confortable. Rénovation de la structure, isolation renforcée, aménagement intérieur sur mesure.',
            surface: '180 m²',
            duration: '8 mois',
            features: [
                'Rénovation complète de la structure',
                'Isolation thermique renforcée',
                'Aménagement intérieur sur mesure',
                'Installation de systèmes modernes',
                'Respect du patrimoine architectural',
                'Finitions haut de gamme'
            ],
            beforeAfter: {
                before: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                after: img1
            }
        },
        {
            id: 2,
            title: 'Extension contemporaine',
            category: 'EXTENSION',
            image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
            location: 'Île-de-France, France',
            year: '2024',
            description: 'Extension moderne de 45m² avec grandes baies vitrées, créant un espace lumineux et ouvert sur le jardin. Architecture contemporaine alliant esthétique et performance énergétique.',
            surface: '45 m²',
            duration: '5 mois',
            features: [
                'Extension de 45m²',
                'Grandes baies vitrées',
                'Architecture contemporaine',
                'Performance énergétique optimale',
                'Ouverture sur jardin',
                'Matériaux durables'
            ],
            beforeAfter: {
                before: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                after: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80'
            }
        }
    ];

    useEffect(() => {
        if (selectedRealization) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
        };
    }, [selectedRealization]);

    const handleDiscover = (e, realization) => {
        e.preventDefault();
        setSelectedRealization(realization);
    };

    const closeModal = () => {
        setSelectedRealization(null);
    };

    return (
        <>
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Nos réalisations</h2>
                    <div className="h-1 w-16 bg-orange rounded-full mx-auto mb-12"></div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
                        {realizations.map((realization) => (
                            <div key={realization.id} className="relative rounded-xl overflow-hidden shadow-sm group h-48 sm:h-64 lg:h-96">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: `url(${realization.image})` }}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3 sm:p-6 lg:p-8">
                                    <span className="bg-orange text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded w-fit mb-1 sm:mb-2">{realization.category}</span>
                                    <h3 className="text-white text-xs sm:text-lg lg:text-2xl font-bold mb-1 sm:mb-2 line-clamp-2">{realization.title}</h3>
                                    <button 
                                        onClick={(e) => handleDiscover(e, realization)}
                                        className="text-white text-[10px] sm:text-sm font-bold border-b border-orange pb-0.5 w-fit hover:text-orange transition-colors cursor-pointer"
                                    >
                                        Découvrir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link to="/realisations" className="btn-orange inline-block">
                            VOIR TOUTES NOS RÉALISATIONS
                        </Link>
                    </div>
                </div>
            </section>

            {/* Modal Popup */}
            <AnimatePresence>
                {selectedRealization && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        />

                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                className="bg-white rounded-asymmetric shadow-2xl w-full max-w-6xl relative max-h-[90vh] flex flex-col my-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                                    aria-label="Fermer"
                                >
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <div className="overflow-y-auto flex-1">
                                    <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
                                        <img
                                            src={selectedRealization.image}
                                            alt={selectedRealization.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                                            <span className="bg-orange text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-asymmetric mb-3 inline-block">
                                                {selectedRealization.category}
                                            </span>
                                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                                                {selectedRealization.title}
                                            </h2>
                                            <div className="flex flex-wrap gap-4 text-white/90 text-sm sm:text-base">
                                                <span className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {selectedRealization.location}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {selectedRealization.year}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 sm:p-8 md:p-10">
                                        <div className="mb-8">
                                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <div className="w-1 h-8 bg-orange"></div>
                                                À propos du projet
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                                {selectedRealization.description}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
                                            <div className="bg-gray-50 rounded-asymmetric p-4 sm:p-6 text-center">
                                                <div className="text-2xl sm:text-3xl font-bold text-orange mb-2">{selectedRealization.surface}</div>
                                                <div className="text-sm sm:text-base text-gray-600">Surface</div>
                                            </div>
                                            <div className="bg-gray-50 rounded-asymmetric p-4 sm:p-6 text-center">
                                                <div className="text-2xl sm:text-3xl font-bold text-orange mb-2">{selectedRealization.duration}</div>
                                                <div className="text-sm sm:text-base text-gray-600">Durée</div>
                                            </div>
                                            <div className="bg-gray-50 rounded-asymmetric p-4 sm:p-6 text-center col-span-2 md:col-span-1">
                                                <div className="text-2xl sm:text-3xl font-bold text-orange mb-2">{selectedRealization.year}</div>
                                                <div className="text-sm sm:text-base text-gray-600">Année</div>
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                                                <div className="w-1 h-8 bg-orange"></div>
                                                Caractéristiques
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                                {selectedRealization.features.map((feature, index) => (
                                                    <div key={index} className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-asymmetric">
                                                        <div className="w-6 h-6 bg-orange rounded-full flex items-center justify-center flex-shrink-0">
                                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                                                <div className="w-1 h-8 bg-orange"></div>
                                                Avant / Après
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                                <div>
                                                    <div className="relative aspect-video overflow-hidden rounded-asymmetric mb-2">
                                                        <img
                                                            src={selectedRealization.beforeAfter.before}
                                                            alt="Avant"
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-asymmetric text-sm font-bold">
                                                            Avant
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="relative aspect-video overflow-hidden rounded-asymmetric mb-2">
                                                        <img
                                                            src={selectedRealization.beforeAfter.after}
                                                            alt="Après"
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute top-4 left-4 bg-orange text-white px-3 py-1.5 rounded-asymmetric text-sm font-bold">
                                                            Après
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Realizations;
