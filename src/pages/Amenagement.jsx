import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import img2 from '../public/2.png';
import img3 from '../public/3.png';
import img4 from '../public/4.png';

const Amenagement = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const services = [
    {
      title: 'Cuisines',
      description: 'Conception et installation de cuisines équipées sur mesure, fonctionnelles et esthétiques.',
      image: img2,
      features: ['Cuisine équipée', 'Cuisine sur mesure', 'Cuisine ouverte', 'Cuisine fermée', 'Island central', 'Aménagement optimisé'],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      title: 'Salles de Bain',
      description: 'Rénovation complète ou création de salles de bain modernes et fonctionnelles.',
      image: img3,
      features: ['Salle de bain complète', 'Douche italienne', 'Baignoire', 'Meuble vasque', 'Carrelage', 'Sanitaires'],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: 'Suite Parentale',
      description: 'Créez un espace de vie privé et confortable avec chambre, dressing et salle de bain.',
      image: img4,
      features: ['Chambre parentale', 'Dressing sur mesure', 'Salle de bain privée', 'Espace détente', 'Éclairage adapté', 'Isolation phonique'],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      title: 'Dressing',
      description: 'Aménagement de dressings sur mesure pour optimiser l\'espace et l\'organisation.',
      image: img2,
      features: ['Dressing sur mesure', 'Rangements optimisés', 'Éclairage intégré', 'Portes coulissantes', 'Étagères ajustables', 'Tiroirs organisés'],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      )
    },
    {
      title: 'Bureau',
      description: 'Aménagement d\'espaces de travail fonctionnels et ergonomiques à domicile.',
      image: img3,
      features: ['Bureau sur mesure', 'Bibliothèque intégrée', 'Éclairage adapté', 'Rangements', 'Espace détente', 'Isolation phonique'],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'Combles',
      description: 'Transformation de vos combles perdus en véritables pièces à vivre.',
      image: img4,
      features: ['Aménagement combles', 'Chambres supplémentaires', 'Bureaux', 'Salles de jeux', 'Isolation renforcée', 'Éclairage zénithal'],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Conception sur mesure',
      description: 'Étude de vos besoins et création d\'un projet personnalisé adapté à votre espace.'
    },
    {
      step: 2,
      title: 'Choix des matériaux',
      description: 'Sélection des matériaux et finitions selon vos goûts et votre budget.'
    },
    {
      step: 3,
      title: 'Fabrication',
      description: 'Fabrication sur mesure dans nos ateliers par nos artisans qualifiés.'
    },
    {
      step: 4,
      title: 'Installation',
      description: 'Pose et installation par nos équipes avec soin et précision.'
    },
    {
      step: 5,
      title: 'Finitions',
      description: 'Mise en place des finitions et accessoires pour un rendu parfait.'
    },
    {
      step: 6,
      title: 'Livraison',
      description: 'Réception des travaux et formation à l\'utilisation de vos nouveaux équipements.'
    }
  ];

  const gallery = [img2, img3, img4, img2, img3, img4];

  return (
    <div className="bg-white min-h-screen">

      <div className="bg-gray-50 py-3 sm:py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-xs sm:text-sm text-gray-600">
            <Link to="/" className="hover:text-orange transition-colors">Accueil</Link>
            <span className="mx-1 sm:mx-2">/</span>
            <span className="text-gray-900 font-medium">Aménager</span>
          </nav>
        </div>
      </div>


      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 text-white overflow-hidden">

        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
          }}
        >

          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>

          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-orange rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-orange rounded-full blur-3xl"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-orange/20 rounded-asymmetric flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
              Aménagez Votre <span className="text-orange">Intérieur</span>
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <div className="h-1 w-12 sm:w-16 bg-orange"></div>
              <div className="h-0.5 w-24 sm:w-32 border-t-2 border-dashed border-orange/50"></div>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4 mb-6 sm:mb-8">
              Cuisine, salle de bain, suite parentale, dressing... Transformez vos espaces 
              avec des aménagements sur mesure qui allient fonctionnalité et esthétique.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link
                to="/devis"
                className="bg-orange hover:bg-orange-dark text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-asymmetric transition-colors shadow-xl text-xs sm:text-sm uppercase tracking-wide text-center"
              >
                Demander un Devis Gratuit
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-asymmetric transition-colors border-2 border-white/30 text-xs sm:text-sm uppercase tracking-wide text-center"
              >
                Nous Contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>


      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Nos Aménagements
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <div className="h-1 w-12 sm:w-16 bg-orange"></div>
              <div className="h-0.5 w-24 sm:w-32 border-t-2 border-dashed border-gray-300"></div>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Des solutions sur mesure pour chaque pièce de votre maison.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-asymmetric shadow-card overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange/20 backdrop-blur-sm rounded-asymmetric flex items-center justify-center text-orange mb-2">
                        {service.icon}
                      </div>
                      <h3 className="text-white font-bold text-lg sm:text-xl mb-1">{service.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 sm:space-y-3">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-700">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Notre Processus
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <div className="h-1 w-12 sm:w-16 bg-orange"></div>
              <div className="h-0.5 w-24 sm:w-32 border-t-2 border-dashed border-gray-300"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-asymmetric shadow-card p-6 sm:p-8 relative border-l-4 border-orange"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg sm:text-xl md:text-2xl">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Nos Réalisations
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <div className="h-1 w-12 sm:w-16 bg-orange"></div>
              <div className="h-0.5 w-24 sm:w-32 border-t-2 border-dashed border-gray-300"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {gallery.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-asymmetric cursor-pointer group"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`Réalisation ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold text-sm sm:text-base">Voir en grand</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-teal-darker to-teal-dark rounded-asymmetric p-6 sm:p-8 md:p-12 text-white text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-orange/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
                Transformez votre intérieur dès aujourd'hui
              </h2>
              <p className="text-white/90 mb-6 sm:mb-8 text-base sm:text-lg px-2">
                Contactez-nous pour un projet d'aménagement sur mesure adapté à vos besoins.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  to="/devis"
                  className="bg-orange hover:bg-orange-dark text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-asymmetric transition-colors shadow-xl text-xs sm:text-sm uppercase tracking-wide text-center"
                >
                  Demander un Devis
                </Link>
                <Link
                  to="/contact"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-asymmetric transition-colors border-2 border-white/30 text-xs sm:text-sm uppercase tracking-wide text-center"
                >
                  Nous Contacter
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImage}
              alt="Réalisation"
              className="max-w-full max-h-full rounded-asymmetric shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Amenagement;
