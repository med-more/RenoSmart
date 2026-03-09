import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon in bundler (Vite/React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const contactSchema = Yup.object().shape({
  lastName: Yup.string().min(2, 'Min. 2 caractères').required('Requis'),
  firstName: Yup.string().min(2, 'Min. 2 caractères').required('Requis'),
  email: Yup.string().email('Email invalide').required('Requis'),
  phone: Yup.string().required('Requis'),
  address: Yup.string().min(5, 'Min. 5 caractères').required('Requis'),
  zipCode: Yup.string().matches(/^\d{5}$/, '5 chiffres').required('Requis'),
  city: Yup.string().min(2, 'Min. 2 caractères').required('Requis'),
  theme: Yup.string().required('Veuillez sélectionner un thème'),
  workRequest: Yup.string().required('Veuillez sélectionner un type de demande'),
  message: Yup.string().min(10, 'Min. 10 caractères').required('Requis'),
});

const THEMES = [
  { value: '', label: 'Thème' },
  { value: 'renovation', label: 'Rénovation' },
  { value: 'extension', label: 'Extension' },
  { value: 'amenagement', label: 'Aménagement' },
  { value: 'devis', label: 'Devis' },
  { value: 'autre', label: 'Autre' },
];

const WORK_REQUESTS = [
  { value: '', label: 'Demande de travaux' },
  { value: 'renovation', label: 'Rénovation' },
  { value: 'extension', label: 'Extension' },
  { value: 'amenagement', label: 'Aménagement' },
  { value: 'construction', label: 'Construction' },
  { value: 'info', label: 'Information' },
];

const MAP_CENTER = [34.0209, -6.8416]; // Rabat
const MAP_ZOOM = 14;
const ADDRESS = '88 Amal 1, J5, 10000 Rabat, Maroc';
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

const Contact = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    await new Promise((r) => setTimeout(r, 800));
    setSubmitSuccess(true);
    setSubmitting(false);
  };

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Breadcrumbs */}
      <div className="bg-white py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-orange transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Contactez-nous</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Un projet ? Une question ?
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h2>
          <div className="h-1 w-24 bg-orange mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Pour toute demande d'information ou pour concrétiser votre projet,{' '}
            <span className="text-orange font-semibold">nos professionnels locaux</span>
            {' '}sont à votre disposition. Remplissez le formulaire ci-dessous et nous vous recontacterons dans les plus brefs délais.
          </p>
        </div>
      </section>

      {/* Two columns: Agency + Form */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Left: Image + CTA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Équipe RenoSmart"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-700 font-medium text-center sm:text-left">
                Découvrez l'agence la plus proche de chez vous !
              </p>
              <div className="flex justify-center lg:justify-start">
                <a
                  href="#formulaire-contact"
                  className="btn-orange inline-block py-2.5 px-6"
                >
                  Recherchez l'agence la plus proche
                </a>
              </div>
            </motion.div>

            {/* Right: Form with orange bar */}
            <motion.div
              id="formulaire-contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex"
            >
              <div className="w-2 bg-orange flex-shrink-0 hidden sm:block"></div>
              <div className="flex-1 p-6 sm:p-8">
                {submitSuccess ? (
                  <div className="py-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
                    <p className="text-gray-600">Nous vous recontacterons sous 24h.</p>
                  </div>
                ) : (
                  <Formik
                    initialValues={{
                      lastName: '',
                      firstName: '',
                      email: '',
                      phone: '',
                      address: '',
                      zipCode: '',
                      city: '',
                      theme: '',
                      workRequest: '',
                      message: '',
                    }}
                    validationSchema={contactSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting, touched, errors }) => (
                      <Form className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <Field
                              name="lastName"
                              placeholder="Nom*"
                              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/50 ${
                                touched.lastName && errors.lastName ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            <ErrorMessage name="lastName" component="div" className="mt-0.5 text-xs text-red-500" />
                          </div>
                          <div>
                            <Field
                              name="firstName"
                              placeholder="Prénom*"
                              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/50 ${
                                touched.firstName && errors.firstName ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            <ErrorMessage name="firstName" component="div" className="mt-0.5 text-xs text-red-500" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <Field
                              name="email"
                              type="email"
                              placeholder="Email*"
                              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/50 ${
                                touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            <ErrorMessage name="email" component="div" className="mt-0.5 text-xs text-red-500" />
                          </div>
                          <div>
                            <Field
                              name="phone"
                              type="tel"
                              placeholder="Téléphone*"
                              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/50 ${
                                touched.phone && errors.phone ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            <ErrorMessage name="phone" component="div" className="mt-0.5 text-xs text-red-500" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div className="col-span-2 sm:col-span-1">
                            <Field
                              name="address"
                              placeholder="Adresse*"
                              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/50 ${
                                touched.address && errors.address ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            <ErrorMessage name="address" component="div" className="mt-0.5 text-xs text-red-500" />
                          </div>
                          <div>
                            <Field
                              name="zipCode"
                              placeholder="Code postal*"
                              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/50 ${
                                touched.zipCode && errors.zipCode ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            <ErrorMessage name="zipCode" component="div" className="mt-0.5 text-xs text-red-500" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <Field
                              name="city"
                              placeholder="Ville*"
                              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/50 ${
                                touched.city && errors.city ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            <ErrorMessage name="city" component="div" className="mt-0.5 text-xs text-red-500" />
                          </div>
                          <div>
                            <Field
                              as="select"
                              name="theme"
                              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/50 text-gray-500 ${
                                touched.theme && errors.theme ? 'border-red-500' : 'border-gray-300'
                              }`}
                            >
                              {THEMES.map((t) => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                              ))}
                            </Field>
                            <ErrorMessage name="theme" component="div" className="mt-0.5 text-xs text-red-500" />
                          </div>
                        </div>
                        <div>
                          <Field
                            as="select"
                            name="workRequest"
                            className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/50 text-gray-500 ${
                              touched.workRequest && errors.workRequest ? 'border-red-500' : 'border-gray-300'
                            }`}
                          >
                            {WORK_REQUESTS.map((w) => (
                              <option key={w.value} value={w.value}>{w.label}</option>
                            ))}
                          </Field>
                          <ErrorMessage name="workRequest" component="div" className="mt-0.5 text-xs text-red-500" />
                        </div>
                        <div>
                          <Field
                            as="textarea"
                            name="message"
                            rows="4"
                            placeholder="Message*"
                            className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/50 resize-none ${
                              touched.message && errors.message ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          <ErrorMessage name="message" component="div" className="mt-0.5 text-xs text-red-500" />
                        </div>
                        <p className="text-xs text-gray-500">*Champs obligatoires</p>
                        <div className="flex justify-end pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-orange disabled:opacity-50 disabled:cursor-not-allowed py-2.5 px-8"
                          >
                            {isSubmitting ? 'Envoi...' : 'Valider'}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Carte & adresse */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Où nous trouver</h2>
            <div className="h-1 w-20 bg-orange mx-auto mb-3" />
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Venez nous rencontrer à Rabat ou contactez-nous pour un rendez-vous.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Carte adresse */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 order-2 lg:order-1 space-y-4"
            >
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 sm:p-8 h-full flex flex-col justify-center">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Adresse</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{ADDRESS}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 mt-5 pt-5 border-t border-gray-200">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Téléphone</h3>
                    <a href="tel:+212661267027" className="text-teal hover:text-teal-dark font-medium text-sm">
                      +212 661 267 027
                    </a>
                  </div>
                </div>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-orange inline-flex items-center justify-center gap-2 w-full sm:w-auto mt-6"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Voir l&apos;itinéraire
                </a>
              </div>
            </motion.div>
            {/* Carte map */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 order-1 lg:order-2"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-[320px] sm:h-[380px] min-h-[280px]">
                <MapContainer
                  center={MAP_CENTER}
                  zoom={MAP_ZOOM}
                  className="h-full w-full"
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={MAP_CENTER}>
                    <Popup>
                      <div className="text-center py-1">
                        <strong className="text-gray-900">RenoSmart</strong>
                        <p className="text-sm text-gray-600 mt-1">{ADDRESS}</p>
                        <a
                          href={GOOGLE_MAPS_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange font-medium text-sm mt-2 inline-block"
                        >
                          Itinéraire →
                        </a>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky widget: Une question ? - désactivé
      <div className="fixed right-4 bottom-24 sm:bottom-6 z-40 flex flex-col gap-2">
        <div className="bg-orange text-white rounded-t-xl rounded-l-xl px-4 py-3 shadow-lg">
          <p className="font-bold text-sm whitespace-nowrap">Une question ?</p>
        </div>
        <div className="bg-orange text-white rounded-xl shadow-lg overflow-hidden">
          <a href="tel:+212661267027" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-orange-dark transition-colors">
            Être rappelé(e)
          </a>
          <Link to="/devis" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-orange-dark transition-colors border-t border-orange-dark/30">
            Parler avec un conseiller
          </Link>
          <Link to="/devis" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-orange-dark transition-colors border-t border-orange-dark/30">
            Prendre RDV
          </Link>
        </div>
      </div>
      */}
    </div>
  );
};

export default Contact;
