import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const img5 = '/5.png';
const img6 = '/6.png';


const servicesData = {
  'renovation-complete': {
    id: 'renovation-complete',
    title: 'Rénovation Complète',
    subtitle: 'Remise à neuf intégrale de votre habitat',
    location: 'Partout en France',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Une rénovation complète transforme entièrement votre logement pour le moderniser, améliorer son confort et sa performance énergétique.',
    longDescription: 'Notre service de rénovation complète couvre tous les aspects de votre habitat : sols, murs, électricité, plomberie, isolation, menuiserie, et finitions. Nous vous accompagnons de la conception à la réalisation avec un interlocuteur unique et des artisans certifiés.',
    features: [
      'Étude de faisabilité complète',
      'Plans et devis détaillés',
      'Coordination de tous les corps de métier',
      'Suivi de chantier régulier',
      'Garantie décennale incluse',
      'Réception des travaux'
    ],
    process: [
      {
        title: 'Phase préparatoire et suivi',
        description: 'Visite technique approfondie, analyse des besoins et contraintes, proposition de solutions adaptées. Planification et pilotage intégral de votre chantier.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Conception et devis',
        description: 'Plans détaillés, choix des matériaux, devis transparent et détaillé avec planning prévisionnel. Coordination de tous les corps de métier.',
        image: img5
      },
      {
        title: 'Réalisation',
        description: 'Coordination des travaux, suivi qualité, respect des délais et du budget. Travaux réalisés par nos artisans certifiés et réception du chantier.',
        image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    priceRange: 'À partir de 30 000 €',
    duration: '3 à 6 mois selon le projet',
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence RenoSmart',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    relatedServices: [
      { id: 'extensions', title: 'Extensions', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'amenagement-combles', title: 'Aménagement de Combles', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'salle-de-bain', title: 'Salles de Bain', image: img6 },
      { id: 'cuisines', title: 'Cuisines', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'extensions': {
    id: 'extensions',
    title: 'Extensions',
    subtitle: 'Gagnez des m² supplémentaires sans déménager',
    location: 'Partout en France',
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Agrandissez votre maison avec une extension sur mesure, en respectant les normes et l\'architecture existante.',
    longDescription: 'Que ce soit une extension latérale, une surélévation ou une véranda, nous concevons et réalisons votre projet d\'agrandissement en harmonie avec votre habitat existant. Nous gérons toutes les démarches administratives et assurons une intégration parfaite.',
    features: [
      'Démarches administratives (permis de construire)',
      'Architecture sur mesure',
      'Intégration harmonieuse',
      'Respect des normes RT 2012',
      'Isolation performante',
      'Finitions de qualité'
    ],
    process: [
      {
        title: 'Étude de faisabilité',
        description: 'Analyse du terrain, contraintes réglementaires, étude de sol si nécessaire.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Conception architecturale',
        description: 'Plans détaillés, permis de construire, choix des matériaux et devis.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Construction',
        description: 'Réalisation des travaux, coordination, suivi qualité et réception.',
        image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    priceRange: 'À partir de 25 000 €',
    duration: '4 à 8 mois selon le projet',
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence RenoSmart',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    relatedServices: [
      { id: 'renovation-complete', title: 'Rénovation Complète', image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'amenagement-combles', title: 'Aménagement de Combles', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'salle-de-bain', title: 'Salles de Bain', image: img6 },
      { id: 'cuisines', title: 'Cuisines', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'amenagement-combles': {
    id: 'amenagement-combles',
    title: 'Aménagement de Combles',
    subtitle: 'Transformez vos combles perdus en véritables pièces à vivre',
    location: 'Partout en France',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Créez de nouveaux espaces habitables en aménageant vos combles : chambres, bureaux, salles de jeux...',
    longDescription: 'L\'aménagement de combles est une solution économique pour gagner de l\'espace. Nous optimisons chaque m² disponible en créant des pièces confortables et lumineuses, avec une isolation performante et une ventilation adaptée.',
    features: [
      'Étude de faisabilité (hauteur sous plafond)',
      'Isolation thermique et phonique',
      'Éclairage naturel optimisé',
      'Ventilation VMC',
      'Escalier sur mesure',
      'Finitions personnalisées'
    ],
    process: [
      {
        title: 'Diagnostic',
        description: 'Vérification de la faisabilité, hauteur sous plafond, structure portante.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Conception',
        description: 'Plans d\'aménagement, choix des matériaux, devis détaillé.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Aménagement',
        description: 'Isolation, électricité, plomberie si nécessaire, finitions.',
        image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    priceRange: 'À partir de 15 000 €',
    duration: '2 à 4 mois',
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence RenoSmart',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    relatedServices: [
      { id: 'renovation-complete', title: 'Rénovation Complète', image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'extensions', title: 'Extensions', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'salle-de-bain', title: 'Salles de Bain', image: img6 },
      { id: 'cuisines', title: 'Cuisines', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'salle-de-bain': {
    id: 'salle-de-bain',
    title: 'Salles de Bain',
    subtitle: 'Création ou rénovation de votre salle de bain',
    location: 'Partout en France',
    image: img6,
    images: [
      img6,
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Concevez la salle de bain de vos rêves : moderne, fonctionnelle et adaptée à vos besoins.',
    longDescription: 'De la conception à la pose, nous créons des salles de bain sur mesure qui allient esthétique et fonctionnalité. Nous vous accompagnons dans le choix des équipements, des carrelages et des finitions pour un résultat à la hauteur de vos attentes.',
    features: [
      'Design personnalisé',
      'Choix des équipements (douche, baignoire, vasque)',
      'Carrelage et faïence',
      'Plomberie et électricité',
      'Ventilation adaptée',
      'Finitions premium'
    ],
    process: [
      {
        title: 'Conception',
        description: 'Plans 3D, choix des équipements et matériaux, devis détaillé.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Préparation',
        description: 'Démolition si nécessaire, préparation des réseaux.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Installation',
        description: 'Pose des équipements, carrelage, finitions et mise en service.',
        image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    priceRange: 'À partir de 8 000 €',
    duration: '3 à 6 semaines',
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence RenoSmart',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    relatedServices: [
      { id: 'renovation-complete', title: 'Rénovation Complète', image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'extensions', title: 'Extensions', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'amenagement-combles', title: 'Aménagement de Combles', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'cuisines', title: 'Cuisines', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'cuisines': {
    id: 'cuisines',
    title: 'Cuisines',
    subtitle: 'Conception et installation de cuisines équipées',
    location: 'Partout en France',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Cuisines fonctionnelles et esthétiques, conçues sur mesure pour optimiser votre espace.',
    longDescription: 'Nous créons des cuisines qui s\'adaptent à votre mode de vie et à vos besoins. De la conception 3D à l\'installation, nous vous accompagnons dans le choix des matériaux, des équipements et de l\'agencement pour une cuisine parfaitement adaptée.',
    features: [
      'Conception 3D personnalisée',
      'Choix des matériaux (bois, stratifié, inox)',
      'Électroménager intégré',
      'Optimisation de l\'espace',
      'Éclairage adapté',
      'Installation professionnelle'
    ],
    process: [
      {
        title: 'Conception',
        description: 'Plans 3D, choix des matériaux et équipements, devis.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Fabrication',
        description: 'Fabrication sur mesure dans nos ateliers.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Installation',
        description: 'Pose, raccordements, finitions et mise en service.',
        image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    priceRange: 'À partir de 10 000 €',
    duration: '4 à 8 semaines',
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence RenoSmart',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    relatedServices: [
      { id: 'renovation-complete', title: 'Rénovation Complète', image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'extensions', title: 'Extensions', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'amenagement-combles', title: 'Aménagement de Combles', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'salle-de-bain', title: 'Salles de Bain', image: img6 }
    ]
  },
  'isolation-thermique': {
    id: 'isolation-thermique',
    title: 'Isolation Thermique',
    subtitle: 'Améliorez la performance énergétique de votre logement',
    location: 'Partout en France',
    image: 'https://images.unsplash.com/photo-1632832960662-79058b8849b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1632832960662-79058b8849b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Réduisez vos factures énergétiques et améliorez votre confort avec une isolation performante.',
    longDescription: 'Une bonne isolation est essentielle pour réduire votre consommation d\'énergie et améliorer votre confort. Nous proposons des solutions d\'isolation adaptées à votre logement : isolation des murs, des combles, des sols, avec des matériaux performants et écologiques.',
    features: [
      'Audit énergétique',
      'Isolation des murs (ITI/ITE)',
      'Isolation des combles',
      'Isolation des sols',
      'Matériaux écologiques',
      'Aides financières (MaPrimeRénov)'
    ],
    process: [
      {
        title: 'Audit',
        description: 'Diagnostic énergétique, identification des déperditions.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Devis',
        description: 'Proposition de solutions, devis détaillé, aides financières.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Travaux',
        description: 'Réalisation de l\'isolation, contrôle qualité, réception.',
        image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    priceRange: 'À partir de 5 000 €',
    duration: '1 à 3 semaines',
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence RenoSmart',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    relatedServices: [
      { id: 'renovation-complete', title: 'Rénovation Complète', image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'extensions', title: 'Extensions', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'amenagement-combles', title: 'Aménagement de Combles', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'salle-de-bain', title: 'Salles de Bain', image: img6 }
    ]
  }
};

const ServiceDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  const service = servicesData[id];

  if (!service) {
    return (
      <div className="min-h-screen py-12 sm:py-16 md:py-20 bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Service non trouvé</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Le service demandé n'existe pas.</p>
          <Link to="/services" className="btn-orange text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4">
            Retour aux services
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [service.image, ...service.images];

  return (
    <div className="bg-white min-h-screen">

      <div className="bg-gray-50 py-3 sm:py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-xs sm:text-sm text-gray-600 flex-wrap">
            <Link to="/" className="hover:text-orange transition-colors">Accueil</Link>
            <span className="mx-1 sm:mx-2">/</span>
            <Link to="/services" className="hover:text-orange transition-colors">Services</Link>
            <span className="mx-1 sm:mx-2">/</span>
            <span className="text-gray-900 font-medium truncate">{service.title}</span>
          </nav>
        </div>
      </div>


      <section className="py-4 sm:py-6 md:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 break-words">{service.title}</h1>
        </div>
      </section>


      <section className="py-4 sm:py-6 md:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">

            <div className="lg:col-span-2 space-y-4 sm:space-y-6">

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                <div className="sm:col-span-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-asymmetric bg-gray-200">
                    <img
                      src={allImages[selectedImage]}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
                  {allImages.slice(0, 2).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square overflow-hidden rounded-asymmetric bg-gray-200 w-full ${
                        selectedImage === index ? 'ring-2 ring-orange' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Vue ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>


              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 break-words">{service.priceRange}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 break-words">{service.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 break-words">{service.location}</p>
                  </div>
                </div>
              </div>
            </div>


            <div className="lg:col-span-1">
              <div className="bg-white border-2 border-gray-200 rounded-asymmetric p-3 sm:p-4 md:p-6 lg:sticky lg:top-20">
                <div className="text-center mb-3 sm:mb-4 md:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={service.projectManager.photo}
                      alt={service.projectManager.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 break-words">{service.projectManager.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">{service.projectManager.phone}</p>
                  <button className="w-full bg-teal-darker hover:bg-teal-dark text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded-asymmetric transition-colors shadow-xl text-xs sm:text-sm uppercase tracking-wide mb-2 sm:mb-3 md:mb-4">
                    Contacter mon agence
                  </button>
                  <p className="text-[10px] sm:text-xs text-gray-500">{service.projectManager.agency}</p>
                </div>


                <div className="border-t border-gray-200 pt-4 sm:pt-6 mb-4 sm:mb-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.5h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.33z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span className="text-base sm:text-lg font-bold text-gray-900">4.9</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-teal rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span className="text-base sm:text-lg font-bold text-gray-900">4.9</span>
                    </div>
                  </div>
                </div>


                <div className="space-y-2 sm:space-y-3">
                  <Link
                    to="/devis"
                    className="block w-full bg-orange hover:bg-orange-dark text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded-asymmetric text-center transition-colors shadow-xl text-xs sm:text-sm uppercase tracking-wide"
                  >
                    Être rappelé(e) pour mon projet
                  </Link>
                  <Link
                    to="/devis"
                    className="block w-full bg-orange hover:bg-orange-dark text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded-asymmetric text-center transition-colors shadow-xl text-xs sm:text-sm uppercase tracking-wide"
                  >
                    Demander un devis gratuit
                  </Link>
                  <Link
                    to="/contact"
                    className="block w-full bg-orange hover:bg-orange-dark text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded-asymmetric text-center transition-colors shadow-xl text-xs sm:text-sm uppercase tracking-wide"
                  >
                    Trouver mon agence
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 text-center sm:text-left">À propos de ce service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
            <div>
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-asymmetric"
              />
            </div>
            <div>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">{service.longDescription}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs sm:text-sm md:text-base text-gray-700 break-words">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-12 text-center">Au programme</h2>
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {service.process.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center"
              >
                <div className={index % 2 === 0 ? '' : 'md:order-2'}>
                  <img
                    src={phase.image}
                    alt={phase.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-asymmetric"
                  />
                </div>
                <div className={index % 2 === 0 ? '' : 'md:order-1'}>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">{phase.title}</h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">{phase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-8 sm:py-12 md:py-16 bg-teal-darker text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 text-center">Nos autres services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {service.relatedServices.map((relatedService) => (
              <Link
                key={relatedService.id}
                to={`/services/${relatedService.id}`}
                className="bg-white/10 hover:bg-white/20 rounded-asymmetric overflow-hidden transition-all group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={relatedService.image}
                    alt={relatedService.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-2 sm:p-3 md:p-4">
                  <h3 className="font-bold text-xs sm:text-sm md:text-base text-white mb-1 sm:mb-2 group-hover:text-orange transition-colors break-words line-clamp-2">{relatedService.title}</h3>
                  <button className="text-orange font-bold text-[10px] sm:text-xs md:text-sm uppercase flex items-center gap-1 sm:gap-2">
                    Découvrir
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-12 text-center">Nos solutions pour vos travaux</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
            {[
              {
                icon: (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                title: 'Rénovation clé en main',
                description: 'Un interlocuteur unique pour tous vos travaux'
              },
              {
                icon: (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: 'Conception et suivi de projet',
                description: 'De la conception à la réalisation'
              },
              {
                icon: (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'Sélection d\'artisans qualifiés',
                description: 'Des professionnels certifiés et expérimentés'
              },
              {
                icon: (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Gestion administrative',
                description: 'Suivi des démarches et garanties'
              }
            ].map((solution, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-2 sm:mb-3 md:mb-4 bg-orange/10 rounded-full flex items-center justify-center text-orange">
                  {solution.icon}
                </div>
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 md:mb-3 break-words">{solution.title}</h3>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-600 break-words">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
