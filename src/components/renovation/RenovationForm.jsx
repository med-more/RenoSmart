import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { WORK_TYPES } from '../../utils/constants';
import { generateEstimate } from '../../utils/calculateEstimate';


const renovationSchema = Yup.object().shape({
  clientName: Yup.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères')
    .required('Le nom est requis'),
  email: Yup.string()
    .email('Email invalide')
    .required('L\'email est requis'),
  phone: Yup.string()
    .matches(/^(\+212|0)[5-7]\d{8}$|^$/, 'Numéro de téléphone invalide (format marocain attendu: +212 612 345 678 ou 0612345678)')
    .nullable(),
  workType: Yup.string()
    .oneOf(WORK_TYPES.map(type => type.id), 'Veuillez sélectionner un type de travaux valide')
    .required('Veuillez sélectionner un type de travaux'),
  surface: Yup.number()
    .typeError('La surface doit être un nombre')
    .positive('La surface doit être supérieure à 0')
    .min(1, 'La surface doit être d\'au moins 1 m²')
    .max(10000, 'La surface ne peut pas dépasser 10000 m²')
    .required('La surface est requise'),
  budget: Yup.number()
    .typeError('Le budget doit être un nombre')
    .min(0, 'Le budget ne peut pas être négatif')
    .nullable(),
  description: Yup.string()
    .min(10, 'La description doit contenir au moins 10 caractères')
    .max(2000, 'La description ne peut pas dépasser 2000 caractères')
    .required('La description est requise'),
});
const RenovationForm = ({ onSubmit }) => {
  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    try {
      const estimate = generateEstimate({
        workType: values.workType,
        surface: parseFloat(values.surface),
      });

      const requestData = {
        clientName: values.clientName,
        email: values.email,
        phone: values.phone || null,
        workType: values.workType,
        surface: parseFloat(values.surface),
        budget: values.budget ? parseFloat(values.budget) : null,
        description: values.description,
        estimate,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };

      onSubmit(requestData);
      setSubmitting(false);
    } catch (error) {
      setStatus({ submit: error.message });
      setSubmitting(false);
    }
  };
  return (
    <div>RenovationForm</div>
  )
}

export default RenovationForm