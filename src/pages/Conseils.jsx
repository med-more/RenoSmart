import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const img1 = '/1.png';
const img2 = '/2.png';
const img3 = '/3.png';

const Conseils = () => {
  const [activeTab, setActiveTab] = useState('guides');

  const guides = [
    {
      title: 'Guide de la Rénovation',
      description: 'Tout ce que vous devez savoir avant de commencer vos travaux de rénovation.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      image: img1,
      topics: ['Planification', 'Budget', 'Démarches administratives', 'Choix des matériaux', 'Calendrier des travaux']
    },
    {
      title: 'Guide de l\'Extension',
      description: 'Comment agrandir votre maison : extension, surélévation, véranda...',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      image: img2,
      topics: ['Autorisations', 'Faisabilité', 'Coûts', 'Matériaux', 'Délais']
    },
    {
      title: 'Guide de l\'Aménagement',
      description: 'Conseils pour aménager votre intérieur : cuisine, salle de bain, dressing...',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      image: img3,
      topics: ['Optimisation espace', 'Éclairage', 'Rangements', 'Style', 'Budget']
    }
  ];

  const demarches = [
    {
      title: 'Déclaration Préalable',
      description: 'Pour les travaux de moins de 20m² ou certaines modifications.',
      steps: ['Remplir le formulaire', 'Joindre les pièces', 'Dépôt en mairie', 'Délai de réponse : 1 mois']
    },
    {
      title: 'Permis de Construire',
      description: 'Obligatoire pour les extensions de plus de 40m² ou les surélévations.',
      steps: ['Dossier complet', 'Plans architecturaux', 'Dépôt en mairie', 'Délai de réponse : 2-3 mois']
    },
    {
      title: 'Autorisation d\'Urbanisme',
      description: 'Pour les travaux en zone protégée ou classée.',
      steps: ['Étude préalable', 'Dossier spécifique', 'Dépôt en mairie', 'Délai variable']
    }
  ];

  const conseils = [
    {
      category: 'Budget',
      items: [
        'Prévoir 10 à 15% de marge pour les imprévus',
        'Comparer plusieurs devis avant de choisir',
        'Négocier les matériaux en gros volumes',
        'Échelonner les travaux si nécessaire'
      ]
    },
    {
      category: 'Planning',
      items: [
        'Planifier les travaux par phases',
        'Anticiper les délais administratifs',
        'Coordonner les différents corps de métier',
        'Prévoir une marge de sécurité'
      ]
    },
    {
      category: 'Matériaux',
      items: [
        'Choisir des matériaux durables',
        'Privilégier la qualité à la quantité',
        'Opter pour des matériaux écologiques',
        'Comparer les prix et les performances'
      ]
    },
    {
      category: 'Professionnels',
      items: [
        'Vérifier les certifications et assurances',
        'Demander des références',
        'Visiter des réalisations précédentes',
        'Établir un contrat détaillé'
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">

      <div className="bg-gray-50 py-3 sm:py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-xs sm:text-sm text-gray-600">
            <Link to="/" className="hover:text-orange transition-colors">Accueil</Link>
            <span className="mx-1 sm:mx-2">/</span>
            <span className="text-gray-900 font-medium">Conseils & Guides</span>
          </nav>
        </div>
      </div>


      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 text-white overflow-hidden">

        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
              Guides & <span className="text-orange">Conseils</span>
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <div className="h-1 w-12 sm:w-16 bg-orange"></div>
              <div className="h-0.5 w-24 sm:w-32 border-t-2 border-dashed border-orange/50"></div>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4 mb-6 sm:mb-8">
              Toutes les informations dont vous avez besoin pour réussir votre projet de rénovation, 
              d'extension ou d'aménagement. Guides pratiques, conseils d'experts et démarches administratives.
            </p>
          </motion.div>
        </div>
      </section>


      <section className="py-8 sm:py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {[
              { id: 'guides', label: 'Guides Pratiques' },
              { id: 'demarches', label: 'Démarches Administratives' },
              { id: 'conseils', label: 'Conseils d\'Experts' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-asymmetric font-bold text-xs sm:text-sm uppercase tracking-wide transition-colors ${
                  activeTab === tab.id
                    ? 'bg-orange text-white shadow-xl'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>


      {activeTab === 'guides' && (
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Guides Pratiques
              </h2>
              <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
                <div className="h-1 w-12 sm:w-16 bg-orange"></div>
                <div className="h-0.5 w-24 sm:w-32 border-t-2 border-dashed border-gray-300"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {guides.map((guide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-asymmetric shadow-card overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img
                      src={guide.image}
                      alt={guide.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange/20 backdrop-blur-sm rounded-asymmetric flex items-center justify-center text-orange mb-2">
                          {guide.icon}
                        </div>
                        <h3 className="text-white font-bold text-lg sm:text-xl">{guide.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                      {guide.description}
                    </p>
                    <ul className="space-y-2 sm:space-y-3">
                      {guide.topics.map((topic, tIndex) => (
                        <li key={tIndex} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-700">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}


      {activeTab === 'demarches' && (
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Démarches Administratives
              </h2>
              <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
                <div className="h-1 w-12 sm:w-16 bg-orange"></div>
                <div className="h-0.5 w-24 sm:w-32 border-t-2 border-dashed border-gray-300"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {demarches.map((demarche, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-asymmetric shadow-card p-6 sm:p-8 border-l-4 border-orange"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    {demarche.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                    {demarche.description}
                  </p>
                  <ul className="space-y-2 sm:space-y-3">
                    {demarche.steps.map((step, sIndex) => (
                      <li key={sIndex} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-700">
                        <div className="w-6 h-6 bg-orange rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-bold text-xs">{sIndex + 1}</span>
                        </div>
                        <span className="flex-1">{step}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}


      {activeTab === 'conseils' && (
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Conseils d'Experts
              </h2>
              <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
                <div className="h-1 w-12 sm:w-16 bg-orange"></div>
                <div className="h-0.5 w-24 sm:w-32 border-t-2 border-dashed border-gray-300"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {conseils.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-asymmetric shadow-card p-6 sm:p-8 border-t-4 border-orange"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange/10 rounded-asymmetric flex items-center justify-center text-orange">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    {category.category}
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    {category.items.map((item, iIndex) => (
                      <li key={iIndex} className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="flex-1 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}


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
                Besoin d'un accompagnement personnalisé ?
              </h2>
              <p className="text-white/90 mb-6 sm:mb-8 text-base sm:text-lg px-2">
                Nos experts sont à votre disposition pour vous conseiller sur votre projet.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-orange hover:bg-orange-dark text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-asymmetric transition-colors shadow-xl text-xs sm:text-sm uppercase tracking-wide text-center"
                >
                  Nous Contacter
                </Link>
                <Link
                  to="/faq"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-asymmetric transition-colors border-2 border-white/30 text-xs sm:text-sm uppercase tracking-wide text-center"
                >
                  Consulter la FAQ
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Conseils;
