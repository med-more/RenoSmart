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
    <Formik
      initialValues={{
        clientName: '',
        email: '',
        phone: '',
        workType: '',
        surface: '',
        budget: '',
        description: '',
      }}
      validationSchema={renovationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status, touched, errors }) => (
        <Form className="space-y-6">

          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet <span className="text-red-500">*</span>
            </label>
            <Field
              type="text"
              id="clientName"
              name="clientName"
              placeholder="Votre nom"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange ${
                touched.clientName && errors.clientName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <ErrorMessage name="clientName" component="p" className="mt-1 text-sm text-red-500" />
          </div>


          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="votre@email.com"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange ${
                touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-500" />
          </div>


          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone <span className="text-gray-400 text-xs">(optionnel)</span>
            </label>
            <Field
              type="tel"
              id="phone"
              name="phone"
              placeholder="+212 612 345 678 ou 0612345678"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange ${
                touched.phone && errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <ErrorMessage name="phone" component="p" className="mt-1 text-sm text-red-500" />
          </div>


          <div>
            <label htmlFor="workType" className="block text-sm font-medium text-gray-700 mb-2">
              Type de travaux <span className="text-red-500">*</span>
            </label>
            <Field
              as="select"
              id="workType"
              name="workType"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange ${
                touched.workType && errors.workType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Sélectionnez un type de travaux</option>
              {WORK_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.icon} {type.label}
                </option>
              ))}
            </Field>
            <ErrorMessage name="workType" component="p" className="mt-1 text-sm text-red-500" />
          </div>


          <div>
            <label htmlFor="surface" className="block text-sm font-medium text-gray-700 mb-2">
              Surface à rénover (m²) <span className="text-red-500">*</span>
            </label>
            <Field
              type="number"
              id="surface"
              name="surface"
              min="1"
              step="0.1"
              placeholder="Ex: 25"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange ${
                touched.surface && errors.surface ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <ErrorMessage name="surface" component="p" className="mt-1 text-sm text-red-500" />
          </div>


          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Budget approximatif (€) <span className="text-gray-400 text-xs">(optionnel)</span>
            </label>
            <Field
              type="number"
              id="budget"
              name="budget"
              min="0"
              step="10"
              placeholder="Ex: 2000"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange ${
                touched.budget && errors.budget ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <ErrorMessage name="budget" component="p" className="mt-1 text-sm text-red-500" />
          </div>


          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description de votre projet <span className="text-red-500">*</span>
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              rows="5"
              placeholder="Décrivez votre projet de rénovation en détail..."
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange ${
                touched.description && errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <ErrorMessage name="description" component="p" className="mt-1 text-sm text-red-500" />
          </div>


          {status?.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {status.submit}
            </div>
          )}


          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-orange disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Traitement en cours...' : 'Obtenir mon devis gratuit'}
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default RenovationForm