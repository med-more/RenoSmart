import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import aboutImage from '../assets/images/about.png';
import constructionImage from '../assets/images/Construction de Bâtiments.png';
import genieCivilImage from '../assets/images/Génie Civil & VRD.png';
import renovationImage from '../assets/images/Rénovation Tous Bâtiments.png';
import terrassementImage from '../assets/images/Terrassement & Démolition.png';
import plomberieImage from '../assets/images/Plomberie & Électricité.png';

const About = () => {
   const [currentTestimonial, setCurrentTestimonial] = useState(0);
   const [selectedService, setSelectedService] = useState(null);


   useEffect(() => {
      if (selectedService) {
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
   }, [selectedService]);

   const services = [
      {
         id: 'construction-batiments',
         title: 'Construction de Bâtiments',
         description: 'Construction de bâtiments résidentiels, commerciaux et industriels. Villas, maisons, immeubles, bureaux.',
         image: constructionImage,
         items: ['Construction neuve', 'Travaux d\'agrandissement', 'Maçonnerie générale'],
         fullDescription: 'RenoSmart est votre spécialiste en construction de bâtiments à Rabat, Témara et dans toute la région Rabat-Salé-Kénitra. Nous construisons des villas modernes et traditionnelles, des maisons individuelles, des immeubles résidentiels et des bâtiments commerciaux selon vos besoins.',
         buildingTypes: [
            'Villas modernes et traditionnelles',
            'Maisons individuelles R+1 ou R+2',
            'Immeubles résidentiels',
            'Bâtiments commerciaux',
            'Locaux industriels',
            'Constructions clé en main'
         ],
         steps: [
            {
               number: 1,
               title: 'Étude du terrain',
               description: 'Analyse du sol et faisabilité du projet. Étude géotechnique et topographique.'
            },
            {
               number: 2,
               title: 'Plans et permis',
               description: 'Conception architecturale et démarches administratives. Obtention des autorisations nécessaires.'
            },
            {
               number: 3,
               title: 'Fondations',
               description: 'Terrassement et coulage des fondations. Préparation du terrain et travaux de structure.'
            },
            {
               number: 4,
               title: 'Gros œuvre',
               description: 'Structure, murs porteurs, dalle, toiture. Construction de l\'ossature du bâtiment.'
            },
            {
               number: 5,
               title: 'Second œuvre',
               description: 'Électricité, plomberie, menuiserie. Installation des réseaux et équipements.'
            },
            {
               number: 6,
               title: 'Finitions',
               description: 'Peinture, carrelage, aménagements. Finalisation et remise des clés.'
            }
         ]
      },
      {
         id: 'genie-civil',
         title: 'Génie Civil & VRD',
         description: 'Travaux de génie civil, voirie et réseaux divers. Aménagements extérieurs, assainissement.',
         image: genieCivilImage,
         items: ['VRD', 'Terrassement', 'Assainissement'],
         fullDescription: 'Expert en génie civil et VRD (Voirie et Réseaux Divers), RenoSmart réalise tous vos projets d\'infrastructure : routes, réseaux d\'eau, assainissement, aménagements urbains.',
         buildingTypes: [
            'Voirie et réseaux',
            'Assainissement collectif',
            'Réseaux d\'eau potable',
            'Aménagements extérieurs',
            'Travaux de terrassement',
            'Infrastructures urbaines'
         ],
         steps: [
            {
               number: 1,
               title: 'Étude préalable',
               description: 'Analyse des besoins et étude de faisabilité du projet d\'infrastructure.'
            },
            {
               number: 2,
               title: 'Conception',
               description: 'Élaboration des plans techniques et obtention des autorisations.'
            },
            {
               number: 3,
               title: 'Terrassement',
               description: 'Préparation du terrain et réalisation des fouilles nécessaires.'
            },
            {
               number: 4,
               title: 'Réseaux',
               description: 'Installation des réseaux d\'eau, assainissement et électricité.'
            },
            {
               number: 5,
               title: 'Voirie',
               description: 'Réalisation des chaussées, trottoirs et aménagements de surface.'
            },
            {
               number: 6,
               title: 'Réception',
               description: 'Contrôles qualité et réception des travaux réalisés.'
            }
         ]
      },
      {
         id: 'renovation',
         title: 'Rénovation Tous Bâtiments',
         description: 'Rénovation complète ou partielle de tous types de bâtiments. Appartements, maisons, bureaux, locaux commerciaux.',
         image: renovationImage,
         items: ['Rénovation intérieure', 'Rénovation énergétique', 'Aménagements extérieurs'],
         fullDescription: 'RenoSmart transforme et modernise tous types de bâtiments : appartements, maisons, bureaux et locaux commerciaux. Rénovation complète ou partielle selon vos besoins.',
         buildingTypes: [
            'Rénovation d\'appartements',
            'Rénovation de maisons',
            'Rénovation de bureaux',
            'Rénovation de locaux commerciaux',
            'Rénovation énergétique',
            'Mise aux normes'
         ],
         steps: [
            {
               number: 1,
               title: 'Diagnostic',
               description: 'Analyse complète du bâtiment et identification des travaux nécessaires.'
            },
            {
               number: 2,
               title: 'Conception',
               description: 'Élaboration du projet de rénovation et choix des matériaux.'
            },
            {
               number: 3,
               title: 'Démolition',
               description: 'Démolition sélective des éléments à remplacer.'
            },
            {
               number: 4,
               title: 'Travaux structurels',
               description: 'Renforcement ou modification de la structure si nécessaire.'
            },
            {
               number: 5,
               title: 'Rénovation',
               description: 'Mise aux normes des réseaux, isolation et aménagements.'
            },
            {
               number: 6,
               title: 'Finitions',
               description: 'Peinture, revêtements, aménagements et décoration.'
            }
         ]
      },
      {
         id: 'terrassement',
         title: 'Terrassement & Démolition',
         description: 'Travaux de terrassement, nivellement de terrain, démolition de structures existantes. Préparation de chantier.',
         image: terrassementImage,
         items: ['Terrassement', 'Démolition', 'Évacuation'],
         fullDescription: 'RenoSmart réalise tous vos travaux de terrassement et de démolition. Préparation de terrain, nivellement, démolition sélective ou totale, évacuation des déchets.',
         buildingTypes: [
            'Terrassement de terrain',
            'Nivellement',
            'Démolition sélective',
            'Démolition totale',
            'Évacuation de déchets',
            'Préparation de chantier'
         ],
         steps: [
            {
               number: 1,
               title: 'Étude du terrain',
               description: 'Analyse topographique et identification des contraintes.'
            },
            {
               number: 2,
               title: 'Planification',
               description: 'Élaboration du plan de terrassement ou de démolition.'
            },
            {
               number: 3,
               title: 'Démolition',
               description: 'Démolition sélective ou totale selon le projet.'
            },
            {
               number: 4,
               title: 'Terrassement',
               description: 'Excavation, remblaiement et nivellement du terrain.'
            },
            {
               number: 5,
               title: 'Évacuation',
               description: 'Tri et évacuation des déchets vers les centres agréés.'
            },
            {
               number: 6,
               title: 'Préparation',
               description: 'Mise en forme finale du terrain pour la construction.'
            }
         ]
      },
      {
         id: 'plomberie-electricite',
         title: 'Plomberie & Électricité',
         description: 'Installation, réparation et maintenance des systèmes de plomberie et d\'électricité. Neuf et rénovation.',
         image: plomberieImage,
         items: ['Plomberie', 'Électricité', 'Dépannage urgent'],
         fullDescription: 'RenoSmart assure l\'installation, la réparation et la maintenance de tous vos systèmes de plomberie et d\'électricité. Intervention rapide pour dépannage urgent.',
         buildingTypes: [
            'Installation plomberie',
            'Installation électrique',
            'Rénovation réseaux',
            'Dépannage urgent',
            'Maintenance préventive',
            'Mise aux normes'
         ],
         steps: [
            {
               number: 1,
               title: 'Diagnostic',
               description: 'Analyse des installations existantes et identification des besoins.'
            },
            {
               number: 2,
               title: 'Conception',
               description: 'Élaboration des schémas techniques et choix des équipements.'
            },
            {
               number: 3,
               title: 'Préparation',
               description: 'Préparation des réseaux et des emplacements d\'équipements.'
            },
            {
               number: 4,
               title: 'Installation',
               description: 'Pose des canalisations, câblages et équipements.'
            },
            {
               number: 5,
               title: 'Mise en service',
               description: 'Tests, vérifications et mise en service des installations.'
            },
            {
               number: 6,
               title: 'Maintenance',
               description: 'Formation et plan de maintenance pour garantir la durabilité.'
            }
         ]
      }
   ];

   const realizations = [
      { id: 'residence-al-andalous', title: 'Résidence Al Andalous', type: 'Résidentiel', year: '2023', image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
      { id: 'residence-temara', title: 'Résidence commerciale à Témara', type: 'Commercial', year: '2023', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
      { id: 'hopital-taza', title: 'Hôpital à Taza', type: 'Public', year: '2022', image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
      { id: 'parking-riad', title: 'Parking Souterrain Riad II', type: 'Infrastructure', year: '2023', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }
   ];

   const testimonials = [
      {
         quote: 'Vos équipes ont fait un travail remarquable sur la rénovation de notre appartement. Le résultat est au-delà de nos attentes. Professionnalisme et écoute, je recommande vivement RenoSmart.',
         author: 'Ahmed Tazi',
         role: 'Directeur de Projet'
      },
      {
         quote: 'Nous avons confié la construction de notre villa à RenoSmart et nous sommes ravis du suivi et de la qualité des travaux. Une entreprise sérieuse et fiable.',
         author: 'Samira El Ouazzani',
         role: 'Responsable des Services Techniques, Commune de Rabat'
      },
      {
         quote: 'Excellent service et équipe très professionnelle. Les délais ont été respectés et la qualité des travaux est exceptionnelle. Je recommande sans hésitation.',
         author: 'Mohamed Benali',
         role: 'Propriétaire'
      }
   ];

   return (
      <div className="bg-white min-h-screen">
         {/* Breadcrumbs */}
         <div className="bg-gray-50 py-4 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <nav className="flex items-center text-sm text-gray-600">
                  <Link to="/" className="hover:text-orange transition-colors">Accueil</Link>
                  <span className="mx-2">/</span>
                  <span className="text-gray-900 font-medium">À propos</span>
               </nav>
            </div>
         </div>

         {/* Hero Section */}
         <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                     <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Construction, Rénovation <span className="text-orange">Plomberie & Électricité</span>
                     </h1>
                     <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                        RenoSmart, votre entreprise BTP à Rabat, Témara, et régions depuis 2020. Experts en construction, rénovation maison, villa et bureaux, plomberie, électricité et terrassement. Intervenons dans toute la région Rabat-Salé-Kénitra, et ce en 150 projets réalisés au Maroc.
                     </p>
                     <div className="flex gap-4 mb-6">
                        <Link
                           to="/devis"
                           className="bg-orange hover:bg-orange-dark text-white font-bold py-3 px-6 rounded-asymmetric transition-colors shadow-xl"
                        >
                           Devis Gratuit
                        </Link>
                        <Link
                           to="/services"
                           className="bg-white border-2 border-orange text-orange hover:bg-orange/5 font-bold py-3 px-6 rounded-asymmetric transition-colors shadow-xl"
                        >
                           Nos Services
                        </Link>
                     </div>
                     <div className="flex gap-6 flex-wrap">
                        <div className="flex items-center gap-2">
                           <div className="w-10 h-10 bg-orange/10 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                           </div>
                           <div>
                              <p className="font-bold text-gray-900">10 ans d'expérience</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="w-10 h-10 bg-orange/10 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                           </div>
                           <div>
                              <p className="font-bold text-gray-900">Qualité Garantie</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="w-10 h-10 bg-orange/10 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                           </div>
                           <div>
                              <p className="font-bold text-gray-900">Délais respectés</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="relative">
                     <img
                        src={aboutImage}
                        alt="Equipe RenoSmart"
                        className="rounded-asymmetric shadow-2xl w-full"
                     />
                  </div>
               </div>
            </div>
         </section>

         {/* Services Section */}
         <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Services de Construction au Maroc</h2>
                  <div className="flex items-center justify-center gap-2">
                     <div className="h-1 w-16 bg-orange"></div>
                     <div className="h-0.5 w-32 border-t-2 border-dashed border-gray-300"></div>
                  </div>
                  <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
                     RenoSmart propose une gamme complète de services dans la construction de bâtiments, rénovation et tous travaux.
                  </p>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {services.map((service, index) => (
                     <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-asymmetric shadow-card overflow-hidden"
                     >
                        <div className="relative h-32 sm:h-48 overflow-hidden">
                           <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-full object-cover"
                           />
                        </div>
                        <div className="p-3 sm:p-6">
                           <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">{service.title}</h3>
                           <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">{service.description}</p>
                           <ul className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                              {service.items.map((item, i) => (
                                 <li key={i} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-orange rounded-full flex-shrink-0"></div>
                                    <span className="line-clamp-1">{item}</span>
                                 </li>
                              ))}
                           </ul>
                           <button
                              onClick={() => setSelectedService(service)}
                              className="text-orange font-bold text-xs sm:text-sm hover:text-orange-dark transition-colors inline-flex items-center gap-1 sm:gap-2"
                           >
                              En savoir plus
                              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                           </button>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* Realizations Section */}
         <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Réalisations</h2>
                  <div className="flex items-center justify-center gap-2">
                     <div className="h-1 w-16 bg-orange"></div>
                     <div className="h-0.5 w-32 border-t-2 border-dashed border-gray-300"></div>
                  </div>
                  <p className="text-gray-600 mt-6">Découvrez nos projets récents et laissez-vous inspirer.</p>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                  {realizations.map((realization, index) => (
                     <motion.div
                        key={realization.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group"
                     >
                        <Link to={`/realisations/${realization.id}`} className="block">
                           <div className="relative aspect-square overflow-hidden rounded-asymmetric bg-gray-200">
                              <img
                                 src={realization.image}
                                 alt={realization.title}
                                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                                 <span className="bg-orange text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-asymmetric text-[10px] sm:text-xs font-bold">
                                    {realization.type}
                                 </span>
                              </div>
                              <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                                 <span className="bg-white/90 text-gray-900 px-2 py-0.5 sm:px-3 sm:py-1 rounded-asymmetric text-[10px] sm:text-xs font-bold">
                                    {realization.year}
                                 </span>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-2 sm:p-4">
                                 <h3 className="text-white font-bold group-hover:text-orange transition-colors text-xs sm:text-sm md:text-base line-clamp-2">
                                    {realization.title}
                                 </h3>
                              </div>
                           </div>
                        </Link>
                     </motion.div>
                  ))}
               </div>

               <div className="text-center mt-8">
                  <Link
                     to="/realisations"
                     className="inline-block bg-teal-darker hover:bg-teal-dark text-white font-bold py-3 px-8 rounded-asymmetric transition-colors shadow-xl"
                  >
                     Voir toutes les réalisations
                  </Link>
               </div>
            </div>
         </section>

         {/* Key Figures Section */}
         <section className="py-16 bg-teal-darker text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Chiffres Clés</h2>
                  <p className="text-white/80 max-w-2xl mx-auto">
                     Des résultats concrets qui témoignent de notre engagement et de notre savoir-faire.
                  </p>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                     { number: '14', label: 'Années d\'Expérience' },
                     { number: '108', label: 'Projets Réalisés' },
                     { number: '68', label: 'Clients Satisfaits' },
                     { number: '145', label: 'Professionnels' }
                  ].map((stat, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white/10 backdrop-blur-sm rounded-asymmetric p-6 text-center"
                     >
                        <div className="text-5xl md:text-6xl font-bold text-orange mb-3">{stat.number}</div>
                        <div className="text-white/90 text-sm md:text-base">{stat.label}</div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* Testimonials Section */}
         <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Clients</h2>
                  <div className="flex items-center justify-center gap-2">
                     <div className="h-1 w-16 bg-orange"></div>
                     <div className="h-0.5 w-32 border-t-2 border-dashed border-gray-300"></div>
                  </div>
                  <p className="text-gray-600 mt-6">Ce que disent nos clients</p>
               </div>

               <div className="relative max-w-4xl mx-auto">
                  <motion.div
                     key={currentTestimonial}
                     initial={{ opacity: 0, x: 50 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -50 }}
                     className="bg-gray-50 rounded-asymmetric p-8 md:p-12 shadow-card"
                  >
                     <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                           <svg className="w-6 h-6 text-orange" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                           </svg>
                        </div>
                        <div className="flex-1">
                           <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                              "{testimonials[currentTestimonial].quote}"
                           </p>
                           <div>
                              <p className="font-bold text-gray-900">{testimonials[currentTestimonial].author}</p>
                              <p className="text-sm text-gray-600">{testimonials[currentTestimonial].role}</p>
                           </div>
                        </div>
                     </div>
                  </motion.div>

                  <div className="flex items-center justify-center gap-2 mt-8">
                     {testimonials.map((_, index) => (
                        <button
                           key={index}
                           onClick={() => setCurrentTestimonial(index)}
                           className={`w-3 h-3 rounded-full transition-colors ${
                              currentTestimonial === index ? 'bg-orange' : 'bg-gray-300'
                           }`}
                           aria-label={`Témoignage ${index + 1}`}
                        />
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* Service Modal */}
         <AnimatePresence>
            {selectedService && (
               <>

                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     onClick={() => setSelectedService(null)}
                     className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                  />

                  {/* Modal */}
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
                     <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-asymmetric shadow-2xl w-full max-w-6xl relative max-h-[90vh] flex flex-col"
                     >

                        <button
                           onClick={() => setSelectedService(null)}
                           className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                           aria-label="Fermer"
                        >
                           <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                           </svg>
                        </button>

                        {/* Modal Content - Scrollable */}
                        <div className="overflow-y-auto flex-1">

                              <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
                                 <img
                                    src={selectedService.image}
                                    alt={selectedService.title}
                                    className="w-full h-full object-cover"
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                 <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                                       {selectedService.title}
                                    </h2>
                                 </div>
                              </div>

                              {/* Content */}
                              <div className="p-6 sm:p-8 md:p-10">

                                 <div className="mb-8">
                                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                       {selectedService.fullDescription}
                                    </p>
                                 </div>

                                 {/* Building Types */}
                                 <div className="mb-8">
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                       <div className="w-1 h-8 bg-orange"></div>
                                       Types de Bâtiments / Services
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                       {selectedService.buildingTypes.map((type, index) => (
                                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-asymmetric">
                                             <div className="w-6 h-6 bg-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg className="w-4 h-4 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                             </div>
                                             <span className="text-gray-700 text-sm sm:text-base">{type}</span>
                                          </div>
                                       ))}
                                    </div>
                                 </div>

                                 {/* Steps */}
                                 <div className="mb-8">
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                       <div className="w-1 h-8 bg-orange"></div>
                                       Les Étapes de Votre Projet
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                       {selectedService.steps.map((step, index) => (
                                          <motion.div
                                             key={index}
                                             initial={{ opacity: 0, y: 20 }}
                                             animate={{ opacity: 1, y: 0 }}
                                             transition={{ delay: index * 0.1 }}
                                             className="bg-gray-50 rounded-asymmetric p-4 sm:p-6 relative"
                                          >
                                             <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-orange rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg sm:text-xl">
                                                   {step.number}
                                                </div>
                                                <div className="flex-1">
                                                   <h4 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">
                                                      {step.title}
                                                   </h4>
                                                   <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                                      {step.description}
                                                   </p>
                                                </div>
                                             </div>
                                          </motion.div>
                                       ))}
                                    </div>
                                 </div>

                                 {/* CTA Buttons */}
                                 <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                                    <Link
                                       to="/devis"
                                       onClick={() => setSelectedService(null)}
                                       className="flex-1 bg-orange hover:bg-orange-dark text-white font-bold py-3 px-6 rounded-asymmetric transition-colors shadow-xl text-center"
                                    >
                                       Demander un Devis Gratuit
                                    </Link>
                                    <Link
                                       to="/contact"
                                       onClick={() => setSelectedService(null)}
                                       className="flex-1 bg-white border-2 border-orange text-orange hover:bg-orange/5 font-bold py-3 px-6 rounded-asymmetric transition-colors shadow-xl text-center"
                                    >
                                       Nous Contacter
                                    </Link>
                                 </div>
                              </div>
                        </div>
                     </motion.div>
                  </div>
               </>
            )}
         </AnimatePresence>
      </div>
   );
};

export default About;
