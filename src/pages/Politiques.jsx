import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Politiques = () => {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: `RenoSmart ("nous", "notre", "nos") s'engage à protéger et respecter votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos informations personnelles lorsque vous utilisez notre site web et nos services.`
    },
    {
      id: 'collecte',
      title: 'Collecte des Informations',
      content: `Nous collectons les informations suivantes :`,
      items: [
        'Informations que vous nous fournissez directement : nom, prénom, adresse email, numéro de téléphone, adresse postale, informations sur votre projet de rénovation ou de construction.',
        'Informations collectées automatiquement : adresse IP, type de navigateur, pages visitées, durée de visite, données de navigation.',
        'Cookies et technologies similaires : nous utilisons des cookies pour améliorer votre expérience sur notre site.'
      ]
    },
    {
      id: 'utilisation',
      title: 'Utilisation des Informations',
      content: `Nous utilisons vos informations personnelles pour :`,
      items: [
        'Traiter vos demandes de devis et répondre à vos questions.',
        'Vous contacter concernant nos services et votre projet.',
        'Améliorer notre site web et nos services.',
        'Vous envoyer des communications marketing (avec votre consentement).',
        'Respecter nos obligations légales et réglementaires.',
        'Prévenir la fraude et assurer la sécurité de nos services.'
      ]
    },
    {
      id: 'partage',
      title: 'Partage des Informations',
      content: `Nous ne vendons jamais vos informations personnelles. Nous pouvons partager vos informations uniquement dans les cas suivants :`,
      items: [
        'Avec nos partenaires de confiance (artisans, prestataires) uniquement pour la réalisation de votre projet, et uniquement avec votre consentement explicite.',
        'Avec les autorités légales si la loi l\'exige ou pour protéger nos droits.',
        'En cas de fusion, acquisition ou vente d\'actifs, sous réserve que les nouvelles entités respectent cette politique.'
      ]
    },
    {
      id: 'securite',
      title: 'Sécurité des Données',
      content: `Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos informations personnelles contre l'accès non autorisé, la perte, la destruction ou l'altération. Cependant, aucune méthode de transmission sur Internet n'est 100% sécurisée.`
    },
    {
      id: 'droits',
      title: 'Vos Droits',
      content: `Conformément à la législation en vigueur, vous disposez des droits suivants :`,
      items: [
        'Droit d\'accès : vous pouvez demander une copie de vos données personnelles.',
        'Droit de rectification : vous pouvez corriger vos informations inexactes.',
        'Droit à l\'effacement : vous pouvez demander la suppression de vos données.',
        'Droit d\'opposition : vous pouvez vous opposer au traitement de vos données.',
        'Droit à la portabilité : vous pouvez demander le transfert de vos données.',
        'Droit de retirer votre consentement à tout moment.'
      ]
    },
    {
      id: 'cookies',
      title: 'Cookies',
      content: `Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur. Les cookies essentiels sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés.`
    },
    {
      id: 'conservation',
      title: 'Conservation des Données',
      content: `Nous conservons vos informations personnelles aussi longtemps que nécessaire pour les finalités décrites dans cette politique, sauf si une période de conservation plus longue est requise ou autorisée par la loi.`
    },
    {
      id: 'modifications',
      title: 'Modifications de la Politique',
      content: `Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement important en publiant la nouvelle politique sur cette page avec une date de mise à jour révisée.`
    },
    {
      id: 'contact',
      title: 'Contact',
      content: `Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, vous pouvez nous contacter :`,
      contactInfo: {
        email: 'ediman.sarl@hotmail.com',
        phone: '+212 661-267027',
        address: '88 Amal 1, J5, c.y.m, Rabat, 10000 Rabat, Maroc'
      }
    }
  ];

  return (
    <div className="bg-white min-h-screen">


      <div className="bg-gray-50 py-3 sm:py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-xs sm:text-sm text-gray-600">
            <Link to="/" className="hover:text-orange transition-colors">Accueil</Link>
            <span className="mx-1 sm:mx-2">/</span>
            <span className="text-gray-900 font-medium truncate">Politique de Confidentialité</span>
          </nav>
        </div>
      </div>


      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-teal-darker via-teal-darker to-teal-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-orange rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-orange rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-orange/20 rounded-asymmetric flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
              Politique de <span className="text-orange">Confidentialité</span>
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <div className="h-1 w-12 sm:w-16 bg-orange"></div>
              <div className="h-0.5 w-24 sm:w-32 border-t-2 border-dashed border-orange/50"></div>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
              Votre confiance est importante pour nous. Découvrez comment nous protégeons et utilisons vos informations personnelles.
            </p>
            <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-white/80 px-4">
              <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </motion.div>
        </div>
      </section>


      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 sm:space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-asymmetric shadow-card p-4 sm:p-6 md:p-8 lg:p-10 border-l-4 border-orange"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange/10 rounded-asymmetric flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-xl font-bold text-orange">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-4 break-words">
                      {section.title}
                    </h2>
                    <div className="h-0.5 w-16 sm:w-20 bg-orange mb-2 sm:mb-4"></div>
                  </div>
                </div>

                <div className="ml-0 sm:ml-14 md:ml-16">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
                    {section.content}
                  </p>

                  {section.items && (
                    <ul className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
                      {section.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: itemIndex * 0.1 }}
                          className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-asymmetric hover:bg-orange/5 transition-colors"
                        >
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700 leading-relaxed flex-1 text-sm sm:text-base break-words">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {section.contactInfo && (
                    <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-teal-darker/5 rounded-asymmetric border border-teal-darker/20">
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange/10 rounded-asymmetric flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm sm:text-base">Email</p>
                            <a href={`mailto:${section.contactInfo.email}`} className="text-orange hover:text-orange-dark transition-colors text-xs sm:text-sm break-all">
                              {section.contactInfo.email}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange/10 rounded-asymmetric flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm sm:text-base">Téléphone</p>
                            <a href={`tel:${section.contactInfo.phone.replace(/\s/g, '')}`} className="text-orange hover:text-orange-dark transition-colors text-xs sm:text-sm break-all">
                              {section.contactInfo.phone}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange/10 rounded-asymmetric flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm sm:text-base">Adresse</p>
                            <p className="text-gray-700 text-xs sm:text-sm break-words">{section.contactInfo.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


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
                Des questions sur notre politique de confidentialité ?
              </h2>
              <p className="text-white/90 mb-6 sm:mb-8 text-base sm:text-lg px-2">
                Notre équipe est à votre disposition pour répondre à toutes vos questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-orange hover:bg-orange-dark text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-asymmetric transition-colors shadow-xl text-xs sm:text-sm uppercase tracking-wide inline-block text-center"
                >
                  Nous Contacter
                </Link>
                <Link
                  to="/"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-asymmetric transition-colors border-2 border-white/30 text-xs sm:text-sm uppercase tracking-wide inline-block text-center"
                >
                  Retour à l'Accueil
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Politiques;
