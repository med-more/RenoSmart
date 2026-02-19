import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addRenovationRequest } from '../store/slices/renovationSlice';
import { notifyNewQuote } from '../services/renovationService';

const STEPS = [
    { id: 'client_type', label: 'Qui êtes vous ?' },
    { id: 'project_type', label: 'Votre projet concerne ?' },
    { id: 'residency_type', label: 'Type de résidence ?' },
    { id: 'work_type', label: 'Type de travaux ?' },
    { id: 'timeframe', label: 'Quand ?' },
    { id: 'budget', label: 'Votre budget' },
    { id: 'contact', label: 'Vos coordonnées' },
];

const QuoteRequest = () => {
    const dispatch = useDispatch();
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        clientType: '',
        propertyType: '',
        residencyType: '',
        workType: [],
        timeframe: '',
        budget: '',
        surface: '',
        clientName: '',
        email: '',
        phone: '',
        zipCode: '',
        description: '',
    });

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setDirection(1);
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleStepClick = (stepIndex) => {
        if (stepIndex !== currentStep) {
            setDirection(stepIndex > currentStep ? 1 : -1);
            setCurrentStep(stepIndex);
            window.scrollTo(0, 0);
        }
    };

    const updateData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };


    const contactSchema = Yup.object().shape({
        clientName: Yup.string()
            .min(2, 'Le nom doit contenir au moins 2 caractères')
            .max(50, 'Le nom ne peut pas dépasser 50 caractères')
            .required('Le nom est requis'),
        email: Yup.string()
            .email('Email invalide')
            .required('L\'email est requis'),
        zipCode: Yup.string()
            .matches(/^\d{5}$/, 'Le code postal doit contenir 5 chiffres')
            .required('Le code postal est requis'),
        phone: Yup.string()
            .matches(/^(\+212|0)[5-7]\d{8}$|^$/, 'Numéro de téléphone invalide (format marocain attendu)')
            .nullable(),
        description: Yup.string()
            .max(2000, 'La description ne peut pas dépasser 2000 caractères')
            .nullable(),
    });

    const handleSubmit = async (values) => {

      const updatedFormData = { ...formData, ...values };


      const payload = {
            clientName: updatedFormData.clientName,
            email: updatedFormData.email,
            phone: updatedFormData.phone || null,
            workType: updatedFormData.workType.join(', '),
            residencyType: updatedFormData.residencyType,
            propertyType: updatedFormData.propertyType,
            surface: updatedFormData.surface || 0,
            budget: updatedFormData.budget ? parseFloat(updatedFormData.budget) : null,
            estimatedBudget: updatedFormData.budget ? parseFloat(updatedFormData.budget) : null,
            description: `[${updatedFormData.clientType}] Budget: ${updatedFormData.budget}. Délai: ${updatedFormData.timeframe}. Desc: ${updatedFormData.description}`,
            status: 'Pending',
            createdAt: new Date().toISOString(),
        };


        setIsSubmitted(true);
        window.scrollTo(0, 0);


        try {
            await dispatch(addRenovationRequest(payload)).unwrap();


            try {
                await notifyNewQuote({
                    clientName: updatedFormData.clientName,
                    email: updatedFormData.email,
                    phone: updatedFormData.phone || null,
                    workType: updatedFormData.workType.join(', '),
                    estimatedBudget: updatedFormData.budget || null,
                    createdAt: new Date().toISOString(),
                });
            } catch (n8nError) {

              console.warn('Notification n8n non envoyée :', n8nError);
            }
        } catch (error) {

          console.warn("La demande n'a pas pu être enregistrée dans l'API, mais le récapitulatif est disponible:", error);
        }
    };



    const getClientTypeLabel = (value) => {
        const labels = {
            'proprietaire': 'Propriétaire particulier',
            'acquereur': 'Futur acquéreur particulier',
            'pro': 'Professionnel',
            'renseignement': 'Je me renseigne'
        };
        return labels[value] || value;
    };

    const getPropertyTypeLabel = (value) => {
        const labels = {
            'maison': 'Maison',
            'appartement': 'Appartement',
            'loft': 'Loft / Atelier'
        };
        return labels[value] || value;
    };

    const getResidencyTypeLabel = (value) => {
        const labels = {
            'principale': 'Résidence Principale',
            'secondaire': 'Résidence Secondaire',
            'locatif': 'Investissement Locatif'
        };
        return labels[value] || value;
    };

    const getWorkTypeLabel = (value) => {
        const labels = {
            'renovation_totale': 'Rénovation Totale',
            'extension': 'Extension',
            'salle_de_bain': 'Salle de bain',
            'cuisine': 'Cuisine',
            'amenagement_combles': 'Aménagement Combles',
            'energetique': 'Rénovation Énergétique'
        };
        return labels[value] || value;
    };

    const getTimeframeLabel = (value) => {
        const labels = {
            'asap': 'Dès que possible',
            '3_months': 'Dans les 3 mois',
            '6_months': 'Dans les 6 mois',
            'project': "C'est juste un projet"
        };
        return labels[value] || value;
    };

    

    const renderSuccess = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl shadow-xl border-t-8 border-teal"
        >
            <div className="text-center mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <span className="text-3xl sm:text-4xl md:text-5xl">🎉</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">Demande enregistrée avec succès !</h2>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg px-4">
                    Voici le récapitulatif complet de votre demande de devis.
                </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6 md:p-8 border border-gray-200 mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-4 sm:mb-6 pb-2 sm:pb-3 border-b-2 border-teal flex items-center gap-2">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Récapitulatif de votre projet
                </h3>

                <div className="space-y-4 sm:space-y-6">


                    <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 shadow-sm">
                        <h4 className="text-xs sm:text-sm text-gray-500 uppercase font-bold tracking-wider mb-2 sm:mb-3">Vos coordonnées</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <span className="text-[10px] sm:text-xs text-gray-400 block mb-1">Nom complet</span>
                                <p className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg break-words">{formData.clientName || 'Non renseigné'}</p>
                            </div>
                            <div>
                                <span className="text-[10px] sm:text-xs text-gray-400 block mb-1">Email</span>
                                <p className="font-semibold text-gray-900 text-sm sm:text-base break-words">{formData.email || 'Non renseigné'}</p>
                            </div>
                            <div>
                                <span className="text-[10px] sm:text-xs text-gray-400 block mb-1">Téléphone</span>
                                <p className="font-semibold text-gray-900 text-sm sm:text-base">{formData.phone || 'Non renseigné'}</p>
                            </div>
                            <div>
                                <span className="text-[10px] sm:text-xs text-gray-400 block mb-1">Code Postal</span>
                                <p className="font-semibold text-gray-900 text-sm sm:text-base">{formData.zipCode || 'Non renseigné'}</p>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 shadow-sm">
                        <h4 className="text-xs sm:text-sm text-gray-500 uppercase font-bold tracking-wider mb-2 sm:mb-3">Profil</h4>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg">{getClientTypeLabel(formData.clientType)}</p>
                    </div>


                    <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 shadow-sm">
                        <h4 className="text-xs sm:text-sm text-gray-500 uppercase font-bold tracking-wider mb-2 sm:mb-3">Caractéristiques du bien</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <span className="text-[10px] sm:text-xs text-gray-400 block mb-1">Type de bien</span>
                                <p className="font-semibold text-gray-900 text-sm sm:text-base">{getPropertyTypeLabel(formData.propertyType)}</p>
                            </div>
                            <div>
                                <span className="text-[10px] sm:text-xs text-gray-400 block mb-1">Type de résidence</span>
                                <p className="font-semibold text-gray-900 text-sm sm:text-base">{getResidencyTypeLabel(formData.residencyType)}</p>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 shadow-sm">
                        <h4 className="text-xs sm:text-sm text-gray-500 uppercase font-bold tracking-wider mb-2 sm:mb-3">Type de travaux</h4>
                        <div className="flex flex-wrap gap-2">
                            {formData.workType.length > 0 ? (
                                formData.workType.map((work, index) => (
                                    <span key={index} className="inline-block bg-orange/10 text-orange font-semibold px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg border border-orange/20 text-xs sm:text-sm">
                                        {getWorkTypeLabel(work)}
                                    </span>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">Aucun type de travaux sélectionné</p>
                            )}
                        </div>
                    </div>


                    <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 shadow-sm">
                        <h4 className="text-xs sm:text-sm text-gray-500 uppercase font-bold tracking-wider mb-2 sm:mb-3">Détails du projet</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                            <div>
                                <span className="text-[10px] sm:text-xs text-gray-400 block mb-1">Surface</span>
                                <p className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg">{formData.surface ? `${formData.surface} m²` : 'Non renseigné'}</p>
                            </div>
                            <div>
                                <span className="text-[10px] sm:text-xs text-gray-400 block mb-1">Délai souhaité</span>
                                <p className="font-semibold text-gray-900 text-sm sm:text-base">{getTimeframeLabel(formData.timeframe) || 'Non renseigné'}</p>
                            </div>
                            <div>
                                <span className="text-[10px] sm:text-xs text-gray-400 block mb-1">Budget estimé</span>
                                <p className="font-semibold text-orange text-sm sm:text-base md:text-lg">{formData.budget || 'Non renseigné'}</p>
                            </div>
                        </div>
                    </div>


                    {formData.description && (
                        <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 shadow-sm">
                            <h4 className="text-xs sm:text-sm text-gray-500 uppercase font-bold tracking-wider mb-2 sm:mb-3">Précisions sur votre projet</h4>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{formData.description}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-teal/5 rounded-xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 border border-teal/20">
                <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Prochaines étapes</h4>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                            Notre équipe va examiner votre demande et vous contactera dans les plus brefs délais.
                            Vous recevrez un email de confirmation à l'adresse <strong className="break-all">{formData.email}</strong>.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                    to="/"
                    className="inline-block px-4 py-2 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors text-center text-sm uppercase tracking-wide"
                >
                    Retour à l'accueil
                </Link>
                <Link
                    to="/contact"
                    className="inline-block px-4 py-2 bg-teal text-white font-bold rounded-asymmetric hover:bg-teal-dark transition-colors shadow-xl text-center text-sm uppercase tracking-wide"
                >
                    Nous contacter
                </Link>
            </div>
        </motion.div>
    );

    
    
    const renderStep = () => {

      switch (currentStep) {
            case 0: return (
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                    {[
                        { id: 'proprietaire', label: 'Propriétaire particulier', icon: '🔑' },
                        { id: 'acquereur', label: 'Futur acquéreur particulier', icon: '📝' },
                        { id: 'pro', label: 'Professionnel', icon: '💼' },
                        { id: 'renseignement', label: 'Je me renseigne', icon: '❓' },
                    ].map(option => (
                        <div
                            key={option.id}
                            onClick={() => { updateData('clientType', option.id); handleNext(); }}
                            className={`p-3 sm:p-4 rounded-xl border cursor-pointer transition-all hover:shadow-sm flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2 min-h-[100px] sm:min-h-[140px]
                          ${formData.clientType === option.id ? 'border-orange bg-orange-50' : 'border-gray-200 hover:border-orange bg-white'}`}
                        >
                            <span className="text-2xl sm:text-3xl">{option.icon}</span>
                            <span className="font-semibold text-[10px] sm:text-xs text-gray-800">{option.label}</span>
                        </div>
                    ))}
                </div>
            );
            case 1: return (
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                    {[
                        { id: 'maison', label: 'Maison', icon: '🏠' },
                        { id: 'appartement', label: 'Appartement', icon: '🏢' },
                        { id: 'loft', label: 'Loft / Atelier', icon: '🏭' },
                    ].map(option => (
                        <div
                            key={option.id}
                            onClick={() => { updateData('propertyType', option.id); handleNext(); }}
                            className={`p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg flex flex-col items-center justify-center text-center gap-2 sm:gap-3 min-h-[120px] sm:min-h-[160px]
                      ${formData.propertyType === option.id ? 'border-orange bg-orange-50' : 'border-gray-200 hover:border-orange bg-white'}`}
                        >
                            <span className="text-3xl sm:text-4xl">{option.icon}</span>
                            <span className="font-bold text-sm sm:text-base text-gray-800">{option.label}</span>
                        </div>
                    ))}
                </div>
            );
            case 2: return (
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                    {[
                        { id: 'principale', label: 'Résidence Principale', icon: '📍' },
                        { id: 'secondaire', label: 'Résidence Secondaire', icon: '🏖️' },
                        { id: 'locatif', label: 'Investissement Locatif', icon: '💰' },
                    ].map(option => (
                        <div
                            key={option.id}
                            onClick={() => { updateData('residencyType', option.id); handleNext(); }}
                            className={`p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg flex flex-col items-center justify-center text-center gap-2 sm:gap-3 min-h-[120px] sm:min-h-[160px]
                     ${formData.residencyType === option.id ? 'border-orange bg-orange-50' : 'border-gray-200 hover:border-orange bg-white'}`}
                        >
                            <span className="text-3xl sm:text-4xl">{option.icon}</span>
                            <span className="font-bold text-sm sm:text-base text-gray-800">{option.label}</span>
                        </div>
                    ))}
                </div>
            );
            case 3: return (
                <div className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {[
                            { id: 'renovation_totale', label: 'Rénovation Totale' },
                            { id: 'extension', label: 'Extension' },
                            { id: 'salle_de_bain', label: 'Salle de bain' },
                            { id: 'cuisine', label: 'Cuisine' },
                            { id: 'amenagement_combles', label: 'Aménagement Combles' },
                            { id: 'energetique', label: 'Rénovation Énergétique' },
                        ].map(option => {
                            const isSelected = formData.workType.includes(option.id);
                            return (
                                <div
                                    key={option.id}
                                    onClick={() => {
                                        const newTypes = isSelected
                                            ? formData.workType.filter(t => t !== option.id)
                                            : [...formData.workType, option.id];
                                        updateData('workType', newTypes);
                                    }}
                                    className={`p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-center text-center font-bold text-xs sm:text-sm min-h-[50px] sm:min-h-[60px]
                                  ${isSelected ? 'border-orange bg-orange text-white shadow-md' : 'border-gray-200 hover:border-orange bg-white text-gray-700'}`}
                                >
                                    {option.label}
                                </div>
                            );
                        })}
                    </div>
                    <div className="text-center mt-4 sm:mt-6">
                        <button
                            onClick={handleNext}
                            disabled={formData.workType.length === 0}
                            className="btn-orange disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4"
                        >
                            Continuer
                        </button>
                    </div>
                </div>
            );
            case 4: return (
                <div className="max-w-xl mx-auto space-y-4 sm:space-y-6 bg-white p-3 sm:p-5 md:p-6 rounded-xl shadow-lg border border-gray-100">
                    <div>
                        <label className="block text-gray-700 font-bold mb-1.5 sm:mb-2 text-sm sm:text-base">Surface approximative (m²)</label>
                        <input
                            type="number"
                            value={formData.surface}
                            onChange={(e) => updateData('surface', e.target.value)}
                            className="w-full text-center text-lg sm:text-xl p-2.5 sm:p-3 border-2 border-gray-200 rounded-xl focus:border-orange focus:outline-none font-bold text-gray-800"
                            placeholder="ex: 120"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-1.5 sm:mb-2 text-sm sm:text-base">Quand souhaitez-vous démarrer ?</label>
                        <select
                            value={formData.timeframe}
                            onChange={(e) => updateData('timeframe', e.target.value)}
                            className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-xl text-sm sm:text-base bg-white focus:border-orange focus:outline-none"
                        >
                            <option value="">Choisir une période...</option>
                            <option value="asap">Dès que possible</option>
                            <option value="3_months">Dans les 3 mois</option>
                            <option value="6_months">Dans les 6 mois</option>
                            <option value="project">C'est juste un projet</option>
                        </select>
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={!formData.surface || !formData.timeframe}
                        className="w-full btn-orange disabled:opacity-50 text-xs sm:text-sm py-1.5 sm:py-2"
                    >
                        Continuer
                    </button>
                </div>
            );
            case 5: return (
                <div className="max-w-xl mx-auto space-y-4 sm:space-y-6">
                    <div className="space-y-2 sm:space-y-3">
                        {[
                            "Moins de 20 000 €",
                            "20 000 € - 50 000 €",
                            "50 000 € - 100 000 €",
                            "Plus de 100 000 €"
                        ].map(range => (
                            <div
                                key={range}
                                onClick={() => { updateData('budget', range); handleNext(); }}
                                className={`p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between group
                                ${formData.budget === range ? 'border-orange bg-orange-50' : 'border-gray-200 hover:border-orange bg-white'}`}
                            >
                                <span className="font-bold text-sm sm:text-base text-gray-800 pr-2">{range}</span>
                                <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                                ${formData.budget === range ? 'border-orange bg-orange' : 'border-gray-300 group-hover:border-orange'}`}>
                                    {formData.budget === range && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
            case 6: return (
                <Formik
                    initialValues={{
                        clientName: formData.clientName || '',
                        email: formData.email || '',
                        zipCode: formData.zipCode || '',
                        phone: formData.phone || '',
                        description: formData.description || '',
                    }}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {

                      Object.keys(values).forEach(key => {
                            updateData(key, values[key]);
                        });
                        handleSubmit(values);
                    }}
                >
                    {({ isSubmitting, touched, errors }) => (
                        <Form className="max-w-2xl mx-auto bg-white p-3 sm:p-5 md:p-6 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-center text-gray-900 mb-3 sm:mb-4">Dernière étape pour recevoir votre estimation</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div>
                                    <label className="block text-[10px] sm:text-xs font-bold text-gray-700 mb-1">
                                        Nom complet <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                type="text"
                                        name="clientName"
                                        className={`w-full p-2 sm:p-2.5 border rounded-lg focus:outline-none text-xs sm:text-sm ${
                                            touched.clientName && errors.clientName
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:border-orange'
                                        }`}
                                    />
                                    <ErrorMessage name="clientName" component="div" className="mt-0.5 text-[10px] text-red-500" />
                        </div>
                        <div>
                                    <label className="block text-[10px] sm:text-xs font-bold text-gray-700 mb-1">
                                        Code Postal <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                type="text"
                                        name="zipCode"
                                        className={`w-full p-2 sm:p-2.5 border rounded-lg focus:outline-none text-xs sm:text-sm ${
                                            touched.zipCode && errors.zipCode
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:border-orange'
                                        }`}
                                    />
                                    <ErrorMessage name="zipCode" component="div" className="mt-0.5 text-[10px] text-red-500" />
                        </div>
                        <div>
                                    <label className="block text-[10px] sm:text-xs font-bold text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                type="email"
                                        name="email"
                                        className={`w-full p-2 sm:p-2.5 border rounded-lg focus:outline-none text-xs sm:text-sm ${
                                            touched.email && errors.email
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:border-orange'
                                        }`}
                                    />
                                    <ErrorMessage name="email" component="div" className="mt-0.5 text-[10px] text-red-500" />
                        </div>
                        <div>
                                    <label className="block text-[10px] sm:text-xs font-bold text-gray-700 mb-1">Téléphone</label>
                                    <Field
                                type="tel"
                                        name="phone"
                                        placeholder="+212 612 345 678 ou 0612345678"
                                        className={`w-full p-2 sm:p-2.5 border rounded-lg focus:outline-none text-xs sm:text-sm ${
                                            touched.phone && errors.phone
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-300 focus:border-orange'
                                        }`}
                                    />
                                    <ErrorMessage name="phone" component="div" className="mt-0.5 text-[10px] text-red-500" />
                        </div>
                    </div>
                            <div className="mb-4 sm:mb-6">
                                <label className="block text-[10px] sm:text-xs font-bold text-gray-700 mb-1">Précisions sur votre projet (facultatif)</label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    className={`w-full p-2 sm:p-2.5 border rounded-lg focus:outline-none h-20 sm:h-24 text-xs sm:text-sm ${
                                        touched.description && errors.description
                                            ? 'border-red-500 focus:border-red-500'
                                            : 'border-gray-300 focus:border-orange'
                                    }`}
                                />
                                <ErrorMessage name="description" component="div" className="mt-0.5 text-[10px] text-red-500" />
                    </div>
                    <button
                        type="submit"
                                disabled={isSubmitting}
                                className="w-full btn-orange hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm py-1.5 sm:py-2"
                    >
                                {isSubmitting ? 'Traitement en cours...' : 'VALIDER MA DEMANDE GRATUITE'}
                    </button>
                            <p className="text-[9px] sm:text-[10px] text-gray-400 text-center mt-2 sm:mt-3 px-2">
                        Vos données sont sécurisées et ne seront utilisées que pour traiter votre demande.
                    </p>
                        </Form>
                    )}
                </Formik>
            );
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12 sm:pb-16 md:pb-20">
            <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 pt-4 sm:pt-6 md:pt-8">
                {isSubmitted ? renderSuccess() : (
                    <>


                        <div className="mb-6 sm:mb-8 pb-3">
                            <div className="flex items-start justify-between px-2 sm:px-4 md:px-6 gap-0.5 sm:gap-1 md:gap-2">
                                {STEPS.map((step, index) => {
                                    const isActive = index === currentStep;
                                    const isCompleted = index < currentStep;
                                    return (
                                        <div 
                                            key={index} 
                                            className="flex flex-col items-center relative z-10 flex-1 min-w-0 cursor-pointer"
                                            onClick={() => handleStepClick(index)}
                                        >
                                            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center text-[10px] sm:text-xs font-bold mb-1 bg-white transition-all duration-300 flex-shrink-0 hover:scale-110
                                        ${isActive ? 'border-orange text-orange scale-105 sm:scale-110' :
                                                    isCompleted ? 'border-orange bg-orange text-white hover:bg-orange-dark' : 'border-gray-300 text-gray-300 hover:border-gray-400'}`}>
                                                {isCompleted ? '✓' : index + 1}
                                            </div>
                                            <span className={`text-[7px] sm:text-[9px] font-medium text-center transition-colors duration-300 mt-0.5 sm:mt-1 leading-tight ${isActive ? 'text-orange font-bold' : isCompleted ? 'text-gray-800' : 'text-gray-300'}`}>
                                                {step.label}
                                            </span>
                                            {index !== STEPS.length - 1 && (
                                                <div className="hidden sm:block absolute top-2.5 sm:top-3 left-1/2 w-full h-[2px] -z-10">
                                                    <div className={`h-full ml-3 w-[calc(100%-12px)] sm:w-[calc(100%-24px)] border-t-2 border-dotted ${isCompleted ? 'border-orange' : 'border-gray-200'}`}></div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="text-center mb-4 sm:mb-6">
                            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 tracking-tight px-4">
                                {STEPS[currentStep].label}
                                {currentStep === 0 && <span className="text-orange">...</span>}
                            </h1>
                            <div className="w-10 sm:w-12 h-0.5 bg-orange mx-auto mt-1.5 sm:mt-2 rounded-full"></div>
                        </div>

                        {/* Content */}
                        <AnimatePresence mode='wait' custom={direction}>
                            <motion.div
                                key={currentStep}
                                custom={direction}
                                initial={{ opacity: 0, x: direction * 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction * -50 }}
                                transition={{ duration: 0.3 }}
                                className="min-h-[250px] sm:min-h-[300px]"
                            >
                                {renderStep()}
                            </motion.div>
                        </AnimatePresence>

                        {/* Nav */}
                        <div className="flex justify-center mt-6 sm:mt-8 gap-3">
                            {currentStep > 0 && (
                                <button
                                    onClick={handleBack}
                                    className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full border border-gray-300 text-gray-600 font-medium hover:bg-gray-100 transition-colors text-xs sm:text-sm"
                                >
                                    ← Précédent
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuoteRequest;
