import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères')
    .required('Le nom est requis'),
  email: Yup.string()
    .email('Email invalide')
    .required('L\'email est requis'),
  phone: Yup.string()
    .matches(/^(\+212|0|212)[\s-]?[5-7][\s-]?\d{2}[\s-]?\d{2}[\s-]?\d{2}[\s-]?\d{2}$|^(\+212|0|212)[5-7]\d{8}$/, 'Numéro de téléphone invalide (format marocain attendu: +212 612 345 678 ou 0612345678)')
    .required('Le téléphone est requis'),
  zipCode: Yup.string()
    .matches(/^\d{5}$/, 'Le code postal doit contenir 5 chiffres')
    .required('Le code postal est requis'),
  projectType: Yup.string()
    .oneOf(['renovation', 'extension', 'amenagement'], 'Type de projet invalide')
    .required('Veuillez sélectionner un type de projet'),
  message: Yup.string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(1000, 'Le message ne peut pas dépasser 1000 caractères')
    .required('Le message est requis'),
});

const Contact = () => {
  return (
    <div>Contact</div>
  )
}

export default Contact