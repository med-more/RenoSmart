import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FAQ = () => {

  const [openSections, setOpenSections] = useState({
    'avant-se-lancer': true,
    'renovation-maison': true,
    'extension-maison': true,
    'surelevation-maison': true,
    'deroulement-travaux': true,
    'financement-garanties': true
  });

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const faqSections = [
    {
      id: 'avant-se-lancer',
      title: 'Avant de se lancer',
      questions: [
        {
          q: 'Qui est RenoSmart?',
          a: 'RenoSmart est un réseau de professionnels spécialisés dans la rénovation, l\'extension et la surélévation de maisons. Nous accompagnons nos clients à chaque étape de leur projet pour trouver les solutions adaptées à leurs besoins et à leur budget.'
        },
        {
          q: 'Pourquoi choisir RenoSmart pour mon projet?',
          a: 'Choisir RenoSmart, c\'est bénéficier d\'un interlocuteur unique, d\'artisans qualifiés et locaux, d\'un accompagnement dans le suivi de projet et d\'une optimisation des devis. Nous vous simplifions la vie en gérant tous les aspects de votre projet.'
        },
        {
          q: 'Comment prendre contact avec RenoSmart?',
          a: 'Vous pouvez contacter une agence locale via notre site internet, par téléphone ou en vous rendant directement dans l\'une de nos agences. Nos conseillers sont à votre disposition pour répondre à toutes vos questions.'
        },
        {
          q: 'Quels types de travaux sont pris en charge?',
          a: 'Nous prenons en charge la rénovation complète ou partielle, l\'extension de maison, la surélévation et les travaux d\'amélioration énergétique. Nous couvrons tous les corps de métier nécessaires à la réalisation de votre projet.'
        }
      ]
    },
    {
      id: 'renovation-maison',
      title: 'Rénovation de maison',
      questions: [
        {
          q: 'Par où commencer pour rénover ma maison?',
          a: 'Commencez par contacter RenoSmart pour une première analyse de vos besoins. Nous établirons ensemble la liste des travaux à réaliser, vous fournirons une estimation budgétaire et sélectionnerons les artisans qualifiés pour votre projet.'
        },
        {
          q: 'Combien coûte une rénovation?',
          a: 'Le coût d\'une rénovation dépend de nombreux facteurs : la surface à rénover, la nature des travaux, les matériaux choisis, etc. Un devis précis est établi après l\'étude de votre projet par nos experts.'
        },
        {
          q: 'Quelles aides financières sont disponibles pour la rénovation?',
          a: 'Plusieurs aides sont disponibles : MaPrimeRénov\', les aides de l\'ANAH, l\'Éco-prêt à taux zéro (Éco-PTZ) et les Certificats d\'Économie d\'Énergie (CEE). Nos conseillers vous accompagnent dans vos démarches pour bénéficier de ces aides.'
        },
        {
          q: 'Quels professionnels dois-je solliciter pour ma rénovation?',
          a: 'Notre réseau comprend des architectes, des maîtres d\'œuvre et des artisans spécialisés dans tous les corps de métier : électricité, plomberie, menuiserie, carrelage, peinture, etc. Nous sélectionnons les meilleurs professionnels pour votre projet.'
        },
        {
          q: 'Combien de temps dure une rénovation?',
          a: 'La durée varie selon l\'ampleur du projet. Une rénovation complète peut prendre plusieurs mois, tandis que des travaux plus légers peuvent être réalisés en quelques semaines. Un planning détaillé vous est fourni lors de l\'établissement du devis.'
        },
        {
          q: 'Quelles sont les normes à respecter?',
          a: 'Les normes à respecter concernent notamment la réglementation thermique (RT 2012 ou RE 2020), les normes électriques (NF C 15-100) et les règles spécifiques aux zones classées. Nos experts s\'assurent que tous les travaux respectent la réglementation en vigueur.'
        }
      ]
    },
    {
      id: 'extension-maison',
      title: 'Extension de maison',
      questions: [
        {
          q: 'Quelles sont les démarches administratives pour une extension?',
          a: 'Les démarches dépendent de la surface de l\'extension : déclaration préalable pour moins de 20m², déclaration préalable pour 20 à 40m² (si la surface totale dépasse 150m², permis de construire et architecte obligatoires), et permis de construire obligatoire pour plus de 40m².'
        },
        {
          q: 'Quel budget prévoir pour une extension?',
          a: 'Le budget dépend du type d\'extension (bois, parpaing, ossature métallique), de sa complexité et des finitions choisies. En moyenne, comptez entre 1 500 et 3 000 € par m² selon les matériaux et la complexité du projet.'
        },
        {
          q: 'L\'extension augmente-t-elle la valeur de ma maison?',
          a: 'Oui, une extension bien pensée peut considérablement augmenter la valeur de votre bien immobilier. Elle permet également d\'améliorer votre confort de vie en créant de nouveaux espaces adaptés à vos besoins.'
        },
        {
          q: 'Quels matériaux choisir pour une extension?',
          a: 'Plusieurs options s\'offrent à vous : le bois (léger, rapide à mettre en œuvre, écologique), le parpaing/béton (résistant, bonne isolation) et l\'ossature métallique (moderne, adaptée aux grandes ouvertures). Nos experts vous conseillent selon votre projet.'
        }
      ]
    },
    {
      id: 'surelevation-maison',
      title: 'Surélévation de maison',
      questions: [
        {
          q: 'Comment savoir si ma maison peut être surélevée?',
          a: 'Nos agences locales réalisent une étude de faisabilité qui prend en compte la structure de l\'habitation existante et les règles d\'urbanisme. Cette étude détermine si votre projet est réalisable et quelles sont les contraintes à respecter.'
        },
        {
          q: 'Quel coût prévoir pour une surélévation?',
          a: 'Le coût dépend de la surface créée, des matériaux utilisés et des finitions. En moyenne, comptez entre 2 500 et 4 500 € par m² selon la complexité du projet et les matériaux choisis.'
        },
        {
          q: 'Faut-il un permis de construire pour une surélévation?',
          a: 'Oui, sauf si l\'augmentation de surface de plancher est inférieure à 40m², auquel cas une déclaration préalable peut suffire. Dans tous les cas, nos experts vous accompagnent dans vos démarches administratives.'
        },
        {
          q: 'Quels sont les matériaux les plus adaptés pour une surélévation?',
          a: 'Le bois est souvent privilégié pour sa légèreté, idéale pour ne pas surcharger les fondations. Le béton offre une meilleure isolation mais est plus lourd. L\'ossature mixte combine solidité et esthétique. Le choix dépend de votre projet et de votre budget.'
        }
      ]
    },
    {
      id: 'deroulement-travaux',
      title: 'Déroulement des travaux',
      questions: [
        {
          q: 'Comment se déroule un chantier avec RenoSmart?',
          a: 'Le processus comprend plusieurs étapes : étude et validation du projet, sélection des artisans, planification et lancement des travaux, suivi régulier du chantier, et réception des travaux. Un interlocuteur unique vous accompagne tout au long du projet.'
        },
        {
          q: 'Que faire en cas d\'imprévu pendant les travaux?',
          a: 'Nos agences locales sont disponibles pour gérer les ajustements et trouver des solutions. En cas d\'imprévu, contactez immédiatement votre interlocuteur qui coordonnera les interventions nécessaires avec les artisans concernés.'
        }
      ]
    },
    {
      id: 'financement-garanties',
      title: 'Financement et garanties',
      questions: [
        {
          q: 'Comment financer mon projet de rénovation ou d\'extension?',
          a: 'Plusieurs solutions de financement existent : prêt à la consommation spécifique, prêt immobilier avec enveloppe rénovation, et aides publiques (MaPrimeRénov\', ANAH, Éco-PTZ, CEE). Contactez l\'agence la plus proche pour étudier les solutions de financement adaptées à votre situation.'
        },
        {
          q: 'RenoSmart propose-t-elle des garanties?',
          a: 'Nos agences locales sélectionnent des professionnels qualifiés et certifiés. Les garanties décennales et de parfait achèvement sont assurées par les artisans. Nous ne proposons pas de garantie prix et délais, mais nous nous engageons à vous accompagner tout au long de votre projet.'
        },
        {
          q: 'Combien coûte une étude de faisabilité?',
          a: 'Le coût d\'une étude de faisabilité varie selon l\'ampleur du projet et les interventions nécessaires (diagnostics, plans, etc.). Nos agences vous fournissent un devis avant toute prestation. Contactez l\'agence la plus proche pour obtenir une estimation.'
        }
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">

      <div className="bg-gray-50 py-3 sm:py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-xs sm:text-sm text-gray-600">
            <Link to="/" className="hover:text-orange transition-colors">Accueil</Link>
            <span className="mx-1 sm:mx-2">/</span>
            <span className="text-gray-900 font-medium truncate">Des réponses à toutes vos questions</span>
          </nav>
        </div>
      </div>


      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-teal-darker mb-3 sm:mb-4 text-center px-2">
            Des réponses à toutes vos questions
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
            <div className="h-1 w-12 sm:w-16 bg-orange"></div>
            <div className="h-0.5 flex-1 max-w-md border-t-2 border-dashed border-orange"></div>
          </div>
        </div>
      </section>


      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            {faqSections.map((section, sectionIndex) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-asymmetric p-4 sm:p-6 md:p-8"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-4"
                >
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
                    <span className="text-xl sm:text-2xl font-bold text-teal-darker flex-shrink-0">{sectionIndex + 1}.</span>
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-teal-darker text-left break-words">
                      {section.title}
                    </h2>
                  </div>
                  <svg
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-teal-darker transition-transform flex-shrink-0 ${openSections[section.id] ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <div className="h-0.5 flex-1 border-t-2 border-dashed border-orange"></div>
                </div>

                {openSections[section.id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    {section.questions.map((item, qIndex) => (
                      <div
                        key={qIndex}
                        className="border-l-4 border-orange pl-3 sm:pl-4 md:pl-6"
                      >
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 break-words">
                          {item.q}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-2 border-gray-200 rounded-asymmetric p-6 sm:p-8 md:p-12 relative">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">NEWSLETTER</h2>
            <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8 px-2">
              Recevez tous les mois nos conseils, nos offres promotionnelles, nos réalisations...
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="email"
                placeholder="Votre email..."
                className="flex-1 bg-gray-50 border border-gray-300 rounded-asymmetric px-4 sm:px-6 py-3 sm:py-4 text-sm focus:outline-none focus:border-orange w-full"
              />
              <button className="bg-orange hover:bg-orange-dark text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-asymmetric transition-colors uppercase text-xs sm:text-sm whitespace-nowrap w-full sm:w-auto">
                Je m'inscris !
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;

