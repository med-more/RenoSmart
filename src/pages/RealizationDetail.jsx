import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchRealizationById } from '../services/realizationsService';


const realizationsData = {
  'renovation-maison-ville-paris': {
    id: 'renovation-maison-ville-paris',
    title: 'Rénovation de locaux professionnels pour une agence immobilière',
    location: 'Toulouse (31)',
    surface: '120 m²',
    type: 'Rénovation',
    year: '2023',
    duration: '8 semaines',
    budget: '49 000 €',
    mainImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    clientProject: {
      description: 'Le client souhaitait une rénovation complète de ses locaux professionnels pour créer une agence immobilière moderne et fonctionnelle. L\'objectif était de transformer l\'espace existant en un environnement accueillant et professionnel, adapté à l\'accueil de clients et au travail d\'équipe.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    phases: [
      {
        title: 'Phase préparatoire et suivi',
        description: 'Diagnostic complet des locaux, étude de faisabilité, conception des plans et coordination de l\'ensemble du projet. Mise en place d\'un suivi régulier pour garantir le respect des délais et du budget.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Remise aux normes et aménagement',
        description: 'Mise aux normes des installations électriques et de sécurité, réaménagement des espaces, création de bureaux individuels et d\'espaces communs. Optimisation de la circulation et de l\'éclairage naturel.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Finitions',
        description: 'Pose des revêtements de sol, peinture, installation des menuiseries et des équipements. Décoration et aménagement final pour créer un espace professionnel moderne et accueillant.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence Camif Habitat Toulouse Sud-Est',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    nearbyProjects: [
      { id: 'amenagement-exterieurs', title: 'Aménagement des extérieurs', location: 'Aucamville (31)', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-terrasse', title: 'Rénovation d\'une terrasse', location: 'Aucamville Toulouse (31)', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'transformation-garage', title: 'Transformation d\'un ancien garage en studio étudiant', location: 'Lanta (31)', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-salle-bain', title: 'Rénovation d\'une salle de bains', location: 'Ramonville (31)', image: 'https://images.unsplash.com/photo-1552321901-711579f15733?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'extension-maison-normandie': {
    id: 'extension-maison-normandie',
    title: 'Extension d\'une maison en Normandie',
    location: 'Normandie (14)',
    surface: '45 m² d\'extension',
    type: 'Extension',
    year: '2023',
    duration: '6 mois',
    budget: '65 000 €',
    mainImage: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    clientProject: {
      description: 'Extension latérale d\'une maison pour créer un espace de vie supplémentaire avec cuisine ouverte et salon.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    phases: [
      {
        title: 'Phase préparatoire et suivi',
        description: 'Étude de faisabilité, permis de construire, conception architecturale.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Remise aux normes et aménagement',
        description: 'Fondations, structure, isolation, réseaux.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Finitions',
        description: 'Carrelage, peinture, menuiseries, équipements.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence Camif Habitat Normandie',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    nearbyProjects: [
      { id: 'amenagement-exterieurs', title: 'Aménagement des extérieurs', location: 'Caen (14)', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-terrasse', title: 'Rénovation d\'une terrasse', location: 'Rouen (76)', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'transformation-garage', title: 'Transformation d\'un garage', location: 'Le Havre (76)', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-salle-bain', title: 'Rénovation salle de bain', location: 'Deauville (14)', image: 'https://images.unsplash.com/photo-1552321901-711579f15733?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'renovation-appartement-paris': {
    id: 'renovation-appartement-paris',
    title: 'Rénovation d\'un appartement',
    location: 'Paris (75)',
    surface: '85 m²',
    type: 'Rénovation',
    year: '2023',
    duration: '4 mois',
    budget: '65 000 €',
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    clientProject: {
      description: 'Rénovation complète d\'un appartement parisien, modernisation de tous les espaces tout en respectant l\'architecture haussmannienne.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    phases: [
      {
        title: 'Phase préparatoire et suivi',
        description: 'Diagnostic, coordination avec copropriété, plans.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Remise aux normes et aménagement',
        description: 'Rénovation réseaux, isolation, réaménagement.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Finitions',
        description: 'Restauration parquets, peinture, finitions.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence Camif Habitat Paris',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    nearbyProjects: [
      { id: 'amenagement-exterieurs', title: 'Aménagement des extérieurs', location: 'Paris (75)', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-terrasse', title: 'Rénovation terrasse', location: 'Paris (75)', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'transformation-garage', title: 'Transformation garage', location: 'Paris (75)', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-salle-bain', title: 'Rénovation salle de bain', location: 'Paris (75)', image: 'https://images.unsplash.com/photo-1552321901-711579f15733?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'amenagement-combles-ile-de-france': {
    id: 'amenagement-combles-ile-de-france',
    title: 'Aménagement de combles',
    location: 'Île-de-France (92)',
    surface: '35 m²',
    type: 'Aménagement',
    year: '2023',
    duration: '3 mois',
    budget: '28 000 €',
    mainImage: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    clientProject: {
      description: 'Transformation de combles perdus en deux chambres et un bureau, avec une isolation performante et un éclairage naturel optimisé.',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    phases: [
      {
        title: 'Phase préparatoire et suivi',
        description: 'Diagnostic, vérification faisabilité, plans.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Remise aux normes et aménagement',
        description: 'Isolation, VMC, électricité, création pièces.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Finitions',
        description: 'Fenêtres de toit, escalier, finitions.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence Camif Habitat Île-de-France',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    nearbyProjects: [
      { id: 'amenagement-exterieurs', title: 'Aménagement extérieurs', location: 'Nanterre (92)', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-terrasse', title: 'Rénovation terrasse', location: 'Boulogne (92)', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'transformation-garage', title: 'Transformation garage', location: 'Asnières (92)', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-salle-bain', title: 'Rénovation salle de bain', location: 'Colombes (92)', image: 'https://images.unsplash.com/photo-1552321901-711579f15733?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'renovation-salle-de-bain-lyon': {
    id: 'renovation-salle-de-bain-lyon',
    title: 'Rénovation salle de bain',
    location: 'Lyon (69)',
    surface: '12 m²',
    type: 'Rénovation',
    year: '2023',
    duration: '3 semaines',
    budget: '12 000 €',
    mainImage: 'https://images.unsplash.com/photo-1552321901-711579f15733?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1552321901-711579f15733?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    clientProject: {
      description: 'Rénovation complète d\'une salle de bain avec création d\'une douche à l\'italienne, vasque sur mesure et carrelage moderne.',
      image: 'https://images.unsplash.com/photo-1552321901-711579f15733?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    phases: [
      {
        title: 'Phase préparatoire et suivi',
        description: 'Conception, plans 3D, choix équipements.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Remise aux normes et aménagement',
        description: 'Démolition, refonte réseaux, étanchéité.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Finitions',
        description: 'Pose équipements, carrelage, finitions.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence Camif Habitat Lyon',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    nearbyProjects: [
      { id: 'amenagement-exterieurs', title: 'Aménagement extérieurs', location: 'Villeurbanne (69)', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-terrasse', title: 'Rénovation terrasse', location: 'Lyon (69)', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'transformation-garage', title: 'Transformation garage', location: 'Vénissieux (69)', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-salle-bain', title: 'Rénovation salle de bain', location: 'Lyon (69)', image: 'https://images.unsplash.com/photo-1552321901-711579f15733?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'cuisine-sur-mesure-toulouse': {
    id: 'cuisine-sur-mesure-toulouse',
    title: 'Cuisine sur mesure',
    location: 'Toulouse (31)',
    surface: '18 m²',
    type: 'Aménagement',
    year: '2023',
    duration: '6 semaines',
    budget: '15 000 €',
    mainImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    clientProject: {
      description: 'Conception et installation d\'une cuisine équipée sur mesure, optimisée pour l\'espace disponible avec îlot central.',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    phases: [
      {
        title: 'Phase préparatoire et suivi',
        description: 'Conception 3D, plans, choix matériaux.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Remise aux normes et aménagement',
        description: 'Fabrication meubles, préparation réseaux.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Finitions',
        description: 'Installation, pose plan de travail, finitions.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence Camif Habitat Toulouse',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    nearbyProjects: [
      { id: 'amenagement-exterieurs', title: 'Aménagement extérieurs', location: 'Blagnac (31)', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-terrasse', title: 'Rénovation terrasse', location: 'Toulouse (31)', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'transformation-garage', title: 'Transformation garage', location: 'Colomiers (31)', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-salle-bain', title: 'Rénovation salle de bain', location: 'Toulouse (31)', image: 'https://images.unsplash.com/photo-1552321901-711579f15733?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'renovation-maison-1': {
    id: 'renovation-maison-1',
    title: 'Rénovation complète d\'une maison',
    location: 'Bordeaux (33)',
    surface: '150 m²',
    type: 'Rénovation',
    year: '2023',
    duration: '5 mois',
    budget: '85 000 €',
    mainImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    clientProject: {
      description: 'Rénovation complète d\'une maison de 150 m² incluant la rénovation de tous les espaces intérieurs, la modernisation des installations électriques et de plomberie, ainsi que l\'isolation thermique.',
      image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    phases: [
      {
        title: 'Phase préparatoire et suivi',
        description: 'Diagnostic complet de la maison, étude de faisabilité, conception des plans et coordination de l\'ensemble du projet.',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Remise aux normes et aménagement',
        description: 'Mise aux normes des installations électriques et de plomberie, isolation thermique, réaménagement des espaces.',
        image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Finitions',
        description: 'Pose des revêtements de sol, peinture, installation des menuiseries et des équipements.',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence Camif Habitat Bordeaux',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    nearbyProjects: [
      { id: 'extension-1', title: 'Extension avec véranda', location: 'Bordeaux (33)', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-2', title: 'Rénovation énergétique', location: 'Pessac (33)', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'amenagement-1', title: 'Aménagement suite parentale', location: 'Mérignac (33)', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-3', title: 'Rénovation d\'une longère', location: 'Talence (33)', image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'extension-1': {
    id: 'extension-1',
    title: 'Extension avec véranda',
    location: 'Nantes (44)',
    surface: '50 m² d\'extension',
    type: 'Extension',
    year: '2023',
    duration: '7 mois',
    budget: '75 000 €',
    mainImage: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    clientProject: {
      description: 'Extension d\'une maison avec création d\'une véranda de 50 m² offrant un espace de vie supplémentaire lumineux et moderne.',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    phases: [
      {
        title: 'Phase préparatoire et suivi',
        description: 'Étude de faisabilité, permis de construire, conception architecturale de la véranda.',
        image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Remise aux normes et aménagement',
        description: 'Fondations, structure métallique, vitrage, isolation, réseaux.',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Finitions',
        description: 'Carrelage, peinture, menuiseries, équipements de la véranda.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence Camif Habitat Nantes',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    nearbyProjects: [
      { id: 'renovation-maison-1', title: 'Rénovation complète maison', location: 'Nantes (44)', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-2', title: 'Rénovation énergétique', location: 'Saint-Nazaire (44)', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'amenagement-1', title: 'Aménagement suite parentale', location: 'La Baule (44)', image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-3', title: 'Rénovation d\'une longère', location: 'Rezé (44)', image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'renovation-2': {
    id: 'renovation-2',
    title: 'Rénovation énergétique',
    location: 'Strasbourg (67)',
    surface: '120 m²',
    type: 'Rénovation',
    year: '2023',
    duration: '6 mois',
    budget: '95 000 €',
    mainImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    clientProject: {
      description: 'Rénovation énergétique complète d\'une maison avec isolation renforcée, remplacement des fenêtres, installation d\'une pompe à chaleur et amélioration de la ventilation.',
      image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    phases: [
      {
        title: 'Phase préparatoire et suivi',
        description: 'Audit énergétique, étude de faisabilité, conception des solutions d\'isolation et de chauffage.',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Remise aux normes et aménagement',
        description: 'Isolation des murs, toiture et sols, remplacement des fenêtres, installation pompe à chaleur, VMC double flux.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Finitions',
        description: 'Enduits, peinture, finitions intérieures et extérieures.',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence Camif Habitat Strasbourg',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    nearbyProjects: [
      { id: 'renovation-maison-1', title: 'Rénovation complète maison', location: 'Strasbourg (67)', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'extension-1', title: 'Extension avec véranda', location: 'Mulhouse (68)', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'amenagement-1', title: 'Aménagement suite parentale', location: 'Colmar (68)', image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-3', title: 'Rénovation d\'une longère', location: 'Haguenau (67)', image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'amenagement-1': {
    id: 'amenagement-1',
    title: 'Aménagement suite parentale',
    location: 'Marseille (13)',
    surface: '40 m²',
    type: 'Aménagement',
    year: '2023',
    duration: '4 mois',
    budget: '42 000 €',
    mainImage: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    clientProject: {
      description: 'Création d\'une suite parentale complète et indépendante au rez-de-chaussée d\'une maison, avec chambre, salle de bain et coin cuisine.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    phases: [
      {
        title: 'Phase préparatoire et suivi',
        description: 'Conception de la suite parentale, plans, choix des équipements et matériaux.',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Remise aux normes et aménagement',
        description: 'Cloisonnement, installation réseaux, plomberie, électricité, isolation.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Finitions',
        description: 'Carrelage, peinture, installation équipements sanitaires et cuisine, finitions.',
        image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence Camif Habitat Marseille',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    nearbyProjects: [
      { id: 'renovation-maison-1', title: 'Rénovation complète maison', location: 'Marseille (13)', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'extension-1', title: 'Extension avec véranda', location: 'Aix-en-Provence (13)', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-2', title: 'Rénovation énergétique', location: 'Martigues (13)', image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-3', title: 'Rénovation d\'une longère', location: 'Aubagne (13)', image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'renovation-3': {
    id: 'renovation-3',
    title: 'Rénovation d\'une longère',
    location: 'Rennes (35)',
    surface: '180 m²',
    type: 'Rénovation',
    year: '2023',
    duration: '8 mois',
    budget: '120 000 €',
    mainImage: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    clientProject: {
      description: 'Rénovation complète d\'une longère bretonne de 180 m², préservation du caractère authentique tout en modernisant les équipements et l\'isolation.',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    phases: [
      {
        title: 'Phase préparatoire et suivi',
        description: 'Diagnostic complet, étude de faisabilité, conception des plans en respectant l\'architecture traditionnelle.',
        image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Remise aux normes et aménagement',
        description: 'Restauration des murs en pierre, isolation, mise aux normes électriques et plomberie, réaménagement des espaces.',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Finitions',
        description: 'Restauration des poutres, pose des revêtements, installation des équipements, finitions authentiques.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence Camif Habitat Rennes',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    nearbyProjects: [
      { id: 'renovation-maison-1', title: 'Rénovation complète maison', location: 'Rennes (35)', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'extension-1', title: 'Extension avec véranda', location: 'Saint-Malo (35)', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-2', title: 'Rénovation énergétique', location: 'Vannes (56)', image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'amenagement-1', title: 'Aménagement suite parentale', location: 'Fougères (35)', image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'extension-2': {
    id: 'extension-2',
    title: 'Surélévation de maison',
    location: 'Lille (59)',
    surface: '60 m² de surélévation',
    type: 'Extension',
    year: '2023',
    duration: '9 mois',
    budget: '95 000 €',
    mainImage: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    clientProject: {
      description: 'Surélévation d\'une maison pour créer un étage supplémentaire de 60 m² avec deux chambres et une salle de bain.',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    phases: [
      {
        title: 'Phase préparatoire et suivi',
        description: 'Étude de faisabilité, permis de construire, renforcement de la structure existante, conception architecturale.',
        image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Remise aux normes et aménagement',
        description: 'Renforcement des fondations, construction de l\'étage, isolation, réseaux électriques et plomberie.',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Finitions',
        description: 'Carrelage, peinture, menuiseries, installation des équipements sanitaires, finitions.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence Camif Habitat Lille',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    nearbyProjects: [
      { id: 'renovation-maison-1', title: 'Rénovation complète maison', location: 'Lille (59)', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'extension-1', title: 'Extension avec véranda', location: 'Roubaix (59)', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-2', title: 'Rénovation énergétique', location: 'Tourcoing (59)', image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'amenagement-1', title: 'Aménagement suite parentale', location: 'Villeneuve-d\'Ascq (59)', image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'renovation-4': {
    id: 'renovation-4',
    title: 'Rénovation intérieure complète',
    location: 'Nice (06)',
    surface: '95 m²',
    type: 'Rénovation',
    year: '2023',
    duration: '4 mois',
    budget: '72 000 €',
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    clientProject: {
      description: 'Rénovation intérieure complète d\'un appartement de 95 m² à Nice, modernisation de tous les espaces avec une décoration contemporaine et lumineuse.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    phases: [
      {
        title: 'Phase préparatoire et suivi',
        description: 'Diagnostic, coordination avec copropriété, conception des plans et choix des matériaux.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Remise aux normes et aménagement',
        description: 'Rénovation réseaux, isolation, réaménagement des espaces, création d\'une cuisine ouverte.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Finitions',
        description: 'Pose des revêtements, peinture, installation des équipements, décoration.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence Camif Habitat Nice',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    nearbyProjects: [
      { id: 'renovation-maison-1', title: 'Rénovation complète maison', location: 'Nice (06)', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'extension-1', title: 'Extension avec véranda', location: 'Cannes (06)', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-2', title: 'Rénovation énergétique', location: 'Antibes (06)', image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'amenagement-1', title: 'Aménagement suite parentale', location: 'Grasse (06)', image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'amenagement-2': {
    id: 'amenagement-2',
    title: 'Aménagement sous-sol',
    location: 'Toulouse (31)',
    surface: '55 m²',
    type: 'Aménagement',
    year: '2023',
    duration: '5 mois',
    budget: '38 000 €',
    mainImage: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    clientProject: {
      description: 'Transformation d\'un sous-sol de 55 m² en espace de vie avec salle de jeux, bureau et espace détente, avec traitement de l\'humidité et éclairage optimisé.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    phases: [
      {
        title: 'Phase préparatoire et suivi',
        description: 'Diagnostic humidité, étude de faisabilité, conception des espaces et traitement des problèmes d\'étanchéité.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Remise aux normes et aménagement',
        description: 'Traitement de l\'humidité, isolation, VMC, électricité, cloisonnement, création des espaces.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Finitions',
        description: 'Revêtements de sol, peinture, éclairage, installation des équipements, finitions.',
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence Camif Habitat Toulouse',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    nearbyProjects: [
      { id: 'renovation-maison-1', title: 'Rénovation complète maison', location: 'Toulouse (31)', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'extension-1', title: 'Extension avec véranda', location: 'Blagnac (31)', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-2', title: 'Rénovation énergétique', location: 'Colomiers (31)', image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-3', title: 'Rénovation d\'une longère', location: 'Muret (31)', image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'renovation-5': {
    id: 'renovation-5',
    title: 'Rénovation façade',
    location: 'Montpellier (34)',
    surface: '200 m² de façade',
    type: 'Rénovation',
    year: '2023',
    duration: '3 mois',
    budget: '45 000 €',
    mainImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    clientProject: {
      description: 'Rénovation complète de la façade d\'une maison de 200 m² avec ravalement, isolation par l\'extérieur, remplacement des menuiseries et création d\'un nouveau revêtement.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    phases: [
      {
        title: 'Phase préparatoire et suivi',
        description: 'Diagnostic de la façade, étude de faisabilité, permis de construire si nécessaire, choix des matériaux.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Remise aux normes et aménagement',
        description: 'Isolation par l\'extérieur, remplacement des menuiseries, préparation du support, installation des réseaux.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Finitions',
        description: 'Pose du revêtement de façade, enduits, peinture, finitions des menuiseries.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence Camif Habitat Montpellier',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    nearbyProjects: [
      { id: 'renovation-maison-1', title: 'Rénovation complète maison', location: 'Montpellier (34)', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'extension-1', title: 'Extension avec véranda', location: 'Sète (34)', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-2', title: 'Rénovation énergétique', location: 'Nîmes (30)', image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'amenagement-1', title: 'Aménagement suite parentale', location: 'Béziers (34)', image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'extension-3': {
    id: 'extension-3',
    title: 'Extension latérale',
    location: 'Grenoble (38)',
    surface: '55 m² d\'extension',
    type: 'Extension',
    year: '2023',
    duration: '6 mois',
    budget: '82 000 €',
    mainImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    clientProject: {
      description: 'Extension latérale d\'une maison pour créer un espace de vie supplémentaire avec cuisine ouverte et salon.',
      image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    phases: [
      {
        title: 'Phase préparatoire et suivi',
        description: 'Étude de faisabilité, permis de construire, conception architecturale.',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Remise aux normes et aménagement',
        description: 'Fondations, structure, isolation, réseaux.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Finitions',
        description: 'Carrelage, peinture, menuiseries, équipements.',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence Camif Habitat Grenoble',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    nearbyProjects: [
      { id: 'renovation-maison-1', title: 'Rénovation complète maison', location: 'Grenoble (38)', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'extension-1', title: 'Extension avec véranda', location: 'Chambéry (73)', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-2', title: 'Rénovation énergétique', location: 'Annecy (74)', image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'amenagement-1', title: 'Aménagement suite parentale', location: 'Valence (26)', image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  },
  'renovation-6': {
    id: 'renovation-6',
    title: 'Rénovation toiture',
    location: 'Dijon (21)',
    surface: '150 m² de toiture',
    type: 'Rénovation',
    year: '2023',
    duration: '2 mois',
    budget: '35 000 €',
    mainImage: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    clientProject: {
      description: 'Rénovation complète de la toiture d\'une maison de 150 m² avec remplacement des tuiles, renforcement de la charpente et amélioration de l\'isolation.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    phases: [
      {
        title: 'Phase préparatoire et suivi',
        description: 'Diagnostic de la toiture et de la charpente, étude de faisabilité, choix des matériaux.',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Remise aux normes et aménagement',
        description: 'Renforcement de la charpente, isolation renforcée, pose de la nouvelle toiture.',
        image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Finitions',
        description: 'Pose des tuiles, finitions des rives et faîtières, installation des accessoires.',
        image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    projectManager: {
      name: 'JEAN-RAYMOND ACAP',
      phone: '06 87 58 69 25',
      agency: 'Mon agence Camif Habitat Dijon',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    nearbyProjects: [
      { id: 'renovation-maison-1', title: 'Rénovation complète maison', location: 'Dijon (21)', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'extension-1', title: 'Extension avec véranda', location: 'Beaune (21)', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'renovation-2', title: 'Rénovation énergétique', location: 'Chalon-sur-Saône (71)', image: 'https://images.unsplash.com/photo-1600585152915-d0bec72a0df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
      { id: 'amenagement-1', title: 'Aménagement suite parentale', location: 'Auxerre (89)', image: 'https://images.unsplash.com/photo-1600607687644-c7f32b3901b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
    ]
  }
};

const RealizationDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [realization, setRealization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRealization = async () => {
      setLoading(true);
      setError(null);
      
      try {

        try {
          const apiData = await fetchRealizationById(id);
          if (apiData) {
            const imagesArray = apiData.images && Array.isArray(apiData.images) && apiData.images.length > 0
              ? apiData.images
              : apiData.image
                ? [apiData.image]
                : ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'];
            
            const mainImage = imagesArray[0];
            
            const transformedData = {
              id: apiData.id,
              title: apiData.title,
              location: apiData.location,
              surface: apiData.surface || '',
              type: apiData.type,
              year: apiData.year || new Date().getFullYear().toString(),
              duration: apiData.duration || '',
              budget: apiData.budget || '',
              mainImage: mainImage,
              images: imagesArray,
              clientProject: {
                description: apiData.description || 'Projet de rénovation réalisé avec succès.',
                image: mainImage
              },
              phases: [
                {
                  title: 'Phase préparatoire',
                  description: apiData.description || 'Préparation et planification du projet.',
                  image: apiData.image || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                }
              ],
              projectManager: {
                name: 'JEAN-RAYMOND ACAP',
                phone: '06 87 58 69 25',
                agency: 'Mon agence Camif Habitat',
                photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
              },
              nearbyProjects: []
            };
            setRealization(transformedData);
            setLoading(false);
            return;
          }
        } catch (apiError) {
          console.warn('Erreur lors du chargement depuis l\'API:', apiError);

        }


        const staticData = realizationsData[id];
        if (staticData) {
          setRealization(staticData);
        } else {
          setError('Réalisation non trouvée');
        }
      } catch (err) {
        setError('Erreur lors du chargement de la réalisation');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadRealization();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-20 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de la réalisation...</p>
        </div>
      </div>
    );
  }

  if (error || !realization) {
    return (
      <div className="min-h-screen py-20 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Réalisation non trouvée</h1>
          <p className="text-gray-600 mb-6">{error || 'La réalisation demandée n\'existe pas.'}</p>
          <Link to="/realisations" className="btn-orange">
            Retour aux réalisations
          </Link>
        </div>
      </div>
    );
  }

  const allImages = realization.mainImage ? [realization.mainImage, ...(realization.images || [])] : (realization.images || []);

  return (
    <div className="bg-white min-h-screen">

      <div className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-orange transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <Link to="/realisations" className="hover:text-orange transition-colors">Réalisations</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{realization.title}</span>
          </nav>
        </div>
      </div>


      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{realization.title} à {realization.location}</h1>
        </div>
      </section>


      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-6">

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="sm:col-span-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-asymmetric bg-gray-200">
                    <img
                      src={allImages[selectedImage]}
                      alt={realization.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-1 sm:space-y-3 sm:space-y-4 gap-3 sm:gap-0">
                  {allImages.slice(0, Math.min(4, allImages.length)).map((image, index) => (
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
                  {allImages.length > 4 && (
                    <div className="relative aspect-square overflow-hidden rounded-asymmetric bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">+{allImages.length - 4}</span>
                    </div>
                  )}
                </div>
              </div>


              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-words">{realization.budget}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-words">{realization.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-bold text-gray-900 break-words">{realization.location}</p>
                  </div>
                </div>
              </div>
            </div>


            <div className="lg:col-span-1">
              <div className="bg-white border-2 border-gray-200 rounded-asymmetric p-4 sm:p-6 sticky top-20 sm:top-24">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={realization.projectManager.photo}
                      alt={realization.projectManager.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{realization.projectManager.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">{realization.projectManager.phone}</p>
                  <button className="w-full bg-teal-darker hover:bg-teal-dark text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-asymmetric transition-colors text-xs sm:text-sm mb-3 sm:mb-4">
                    Contacter mon agence
                  </button>
                  <p className="text-xs text-gray-500">{realization.projectManager.agency}</p>
                </div>


                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.5h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.33z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span className="text-lg font-bold text-gray-900">4.9</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-teal rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span className="text-lg font-bold text-gray-900">4.9</span>
                    </div>
                  </div>
                </div>


                <div className="space-y-3">
                  <Link
                    to="/devis"
                    className="block w-full bg-orange hover:bg-orange-dark text-white font-bold py-3 px-4 rounded-asymmetric text-center transition-colors text-sm"
                  >
                    Être rappelé(e) pour mon projet
                  </Link>
                  <Link
                    to="/devis"
                    className="block w-full bg-orange hover:bg-orange-dark text-white font-bold py-3 px-4 rounded-asymmetric text-center transition-colors text-sm"
                  >
                    Demander un devis gratuit
                  </Link>
                  <Link
                    to="/contact"
                    className="block w-full bg-orange hover:bg-orange-dark text-white font-bold py-3 px-4 rounded-asymmetric text-center transition-colors text-sm"
                  >
                    Trouver mon agence
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Le projet du client</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src={realization.clientProject.image}
                alt="Projet client"
                className="w-full h-80 object-cover rounded-asymmetric"
              />
            </div>
            <div>
              <p className="text-lg text-gray-700 leading-relaxed">{realization.clientProject.description}</p>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Au programme</h2>
          <div className="space-y-12">
            {realization.phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div className={index % 2 === 0 ? '' : 'md:order-2'}>
                  <img
                    src={phase.image}
                    alt={phase.title}
                    className="w-full h-64 object-cover rounded-asymmetric"
                  />
                </div>
                <div className={index % 2 === 0 ? '' : 'md:order-1'}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{phase.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{phase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-2 border-gray-200 rounded-asymmetric p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Guide travaux"
                  className="w-full h-48 object-cover rounded-asymmetric"
                />
              </div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">NOS GUIDES TRAVAUX</h3>
                <p className="text-lg text-gray-700 mb-6">
                  Quel budget prévoir pour la rénovation de ma maison ?
                </p>
                <Link
                  to="/services"
                  className="inline-block bg-orange hover:bg-orange-dark text-white font-bold py-3 px-6 rounded-asymmetric transition-colors"
                >
                  Voir tous nos guides
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 bg-teal-darker text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Nos autres réalisations à proximité de {realization.location.split('(')[0].trim()}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {realization.nearbyProjects.map((project) => (
              <Link
                key={project.id}
                to={`/realisations/${project.id}`}
                className="bg-white/10 hover:bg-white/20 rounded-asymmetric overflow-hidden transition-all group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-orange transition-colors">{project.title}</h3>
                  <p className="text-sm text-white/80 mb-4">{project.location}</p>
                  <button className="text-orange font-bold text-sm uppercase flex items-center gap-2">
                    Découvrir
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Nos solutions pour vos travaux</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                title: 'Rénovation clé en main',
                description: 'Un interlocuteur unique pour tous vos travaux'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: 'Conception et suivi de projet',
                description: 'De la conception à la réalisation'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'Sélection d\'artisans qualifiés',
                description: 'Des professionnels certifiés et expérimentés'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Gestion administrative',
                description: 'Suivi des démarches et garanties'
              }
            ].map((solution, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-orange/10 rounded-full flex items-center justify-center text-orange">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                <p className="text-gray-600">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RealizationDetail;
