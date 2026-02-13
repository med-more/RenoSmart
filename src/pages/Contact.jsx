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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen">

      <div className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-orange transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Contact</span>
          </nav>
        </div>
      </div>


      <section className="py-8 sm:py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">Contactez-nous</h1>
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
            <div className="h-1 w-12 sm:w-16 bg-orange"></div>
            <div className="h-0.5 w-24 sm:w-32 border-t-2 border-dashed border-gray-300"></div>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-4 sm:mt-6 max-w-2xl mx-auto px-4">
            Une équipe d'experts à votre écoute pour concrétiser vos projets.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 bg-white relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-0 sm:w-1/4 lg:w-1/3 bg-orange/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">

            <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-sm">
              {submitSuccess ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-asymmetric p-8 text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xl font-bold text-green-700 mb-2">Message envoyé !</p>
                  <p className="text-green-600">Nous vous répondrons sous 24h.</p>
                </div>
              ) : (
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    phone: '',
                    zipCode: '',
                    projectType: '',
                    message: '',
                  }}
                  validationSchema={contactSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting: formikSubmitting, touched, errors }) => (
                    <Form className="space-y-4 sm:space-y-5 md:space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 sm:mb-2">
                            Type de projet <span className="text-red-500">*</span>
                          </label>
                          <Field
                            as="select"
                            name="projectType"
                            className={`w-full bg-gray-50 border rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none transition-colors ${
                              touched.projectType && errors.projectType
                                ? 'border-red-500 focus:border-red-500'
                                : 'border-gray-200 focus:border-teal'
                            }`}
                          >
                            <option value="">Sélectionner...</option>
                            <option value="renovation">Rénovation</option>
                            <option value="extension">Extension</option>
                            <option value="amenagement">Aménagement</option>
                          </Field>
                          <ErrorMessage name="projectType" component="div" className="mt-1 text-xs text-red-500" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 sm:mb-2">
                            Votre nom <span className="text-red-500">*</span>
                          </label>
                          <Field
                            type="text"
                            name="name"
                            placeholder="Jean Dupont"
                            className={`w-full bg-gray-50 border rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none transition-colors ${
                              touched.name && errors.name
                                ? 'border-red-500 focus:border-red-500'
                                : 'border-gray-200 focus:border-teal'
                            }`}
                          />
                          <ErrorMessage name="name" component="div" className="mt-1 text-xs text-red-500" />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
                            Votre email <span className="text-red-500">*</span>
                          </label>
                          <Field
                            type="email"
                            name="email"
                            placeholder="jean@exemple.com"
                            className={`w-full bg-gray-50 border rounded-asymmetric px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm focus:outline-none ${
                              touched.email && errors.email
                                ? 'border-red-500 focus:border-red-500'
                                : 'border-gray-300 focus:border-orange'
                            }`}
                          />
                          <ErrorMessage name="email" component="div" className="mt-1 text-xs text-red-500" />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
                            Votre téléphone <span className="text-red-500">*</span>
                          </label>
                          <Field
                            type="tel"
                            name="phone"
                            placeholder="+212 612 345 678 ou 0612345678"
                            className={`w-full bg-gray-50 border rounded-asymmetric px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm focus:outline-none ${
                              touched.phone && errors.phone
                                ? 'border-red-500 focus:border-red-500'
                                : 'border-gray-300 focus:border-orange'
                            }`}
                          />
                          <ErrorMessage name="phone" component="div" className="mt-1 text-xs text-red-500" />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">
                            Votre code postal <span className="text-red-500">*</span>
                          </label>
                          <Field
                            type="text"
                            name="zipCode"
                            placeholder="10000"
                            className={`w-full bg-gray-50 border rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none transition-colors ${
                              touched.zipCode && errors.zipCode
                                ? 'border-red-500 focus:border-red-500'
                                : 'border-gray-200 focus:border-teal'
                            }`}
                          />
                          <ErrorMessage name="zipCode" component="div" className="mt-1 text-xs text-red-500" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 sm:mb-2">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="textarea"
                          name="message"
                          rows="4"
                          placeholder="Décrivez votre projet..."
                          className={`w-full bg-gray-50 border rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none transition-colors resize-none ${
                            touched.message && errors.message
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-gray-200 focus:border-teal'
                          }`}
                        />
                        <ErrorMessage name="message" component="div" className="mt-1 text-xs text-red-500" />
                      </div>
                      <div className="pt-2 sm:pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting || formikSubmitting}
                          className="w-full bg-orange hover:bg-orange-dark text-white font-bold py-2 px-4 rounded-asymmetric transition-colors shadow-xl text-sm uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting || formikSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </div>


            <div className="space-y-4 sm:space-y-6 md:space-y-8">

              <div className="bg-teal-darker text-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Nos Coordonnées</h3>
                  <ul className="space-y-4 sm:space-y-5 md:space-y-6">
                    <li className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-xs sm:text-sm text-teal-200 mb-1">Téléphone</span>
                        <span className="text-base sm:text-lg font-bold break-words">+212 661-267027</span>
                        <span className="text-base sm:text-lg font-bold break-words block mt-1">+212 537-646567</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-xs sm:text-sm text-teal-200 mb-1">Email</span>
                        <span className="text-base sm:text-lg font-bold break-all">ediman.sarl@hotmail.com</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-xs sm:text-sm text-teal-200 mb-1">Adresse</span>
                        <span className="text-base sm:text-lg font-bold">88 Amal 1, J5, c.y.m, Rabat,<br />10000 Rabat, Maroc</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-xs sm:text-sm text-teal-200 mb-1">Heures d'Ouverture</span>
                        <span className="text-base sm:text-lg font-bold">Lundi - Vendredi: 8:30 - 17:30<br />Samedi: 9:00 - 13:00</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange/20 rounded-full blur-3xl"></div>
              </div>


              <div className="h-40 sm:h-48 md:h-56 lg:h-64 rounded-asymmetric overflow-hidden shadow-lg border-2 border-gray-200 relative group">
                <MapContainer
                  center={[34.0209, -6.8416]}
                  zoom={15}
                  style={{ height: '100%', width: '100%', zIndex: 1 }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[34.0209, -6.8416]}>
                    <Popup>
                      <div className="text-sm">
                        <strong>RenoSmart</strong><br />
                        88 Amal 1, J5, c.y.m<br />
                        10000 Rabat, Maroc
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=88+Amal+1,+J5,+c.y.m,+Rabat,+10000+Rabat,+Maroc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 right-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-asymmetric shadow-lg font-bold text-xs sm:text-sm text-gray-800 hover:bg-gray-50 transition-colors z-20"
                  aria-label="Ouvrir dans Google Maps"
                >
                  Ouvrir dans Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-8 sm:py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center px-4">Nos solutions pour vos travaux</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                title: 'Rénovation clé en main',
                description: 'Interlocuteur unique'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: 'Conception & Suivi',
                description: 'De A à Z'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'Artisans qualifiés',
                description: 'Professionnels certifiés'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Gestion administrative',
                description: 'Suivi complet'
              }
            ].map((solution, index) => (
              <div key={index} className="text-center p-3 sm:p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-orange/10 rounded-full flex items-center justify-center text-orange">
                  <div className="w-6 h-6 sm:w-8 sm:h-8">
                    {solution.icon}
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 leading-tight">{solution.title}</h3>
                <p className="text-[10px] sm:text-xs text-gray-500">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
