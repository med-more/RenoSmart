import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import img3 from '../public/3.png';

const Renovation = () => {
  return (
    <div className="bg-white min-h-screen">

      <div className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-orange transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Rénovation</span>
          </nav>
        </div>
      </div>


      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 text-white overflow-hidden">

        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
          }}
        >

          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>

          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-orange rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-orange rounded-full blur-3xl"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-orange/20 rounded-asymmetric flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
              Rénovation <span className="text-orange">Maison & Appartement</span>
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <div className="h-1 w-12 sm:w-16 bg-orange"></div>
              <div className="h-0.5 w-24 sm:w-32 border-t-2 border-dashed border-orange/50"></div>
          </div>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4 mb-6 sm:mb-8">
            Confiez vos travaux à un expert unique pour un résultat garanti.
              Rénovation complète, énergétique ou intérieure, nous transformons votre habitat.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link
                to="/devis"
                className="bg-orange hover:bg-orange-dark text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-asymmetric transition-colors shadow-xl text-xs sm:text-sm uppercase tracking-wide text-center"
              >
                Demander un Devis Gratuit
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-asymmetric transition-colors border-2 border-white/30 text-xs sm:text-sm uppercase tracking-wide text-center"
              >
                Nous Contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>


      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Pourquoi rénover avec RenoSmart ?</h2>
              <div className="space-y-6">
                {[
                  { title: "Interlocuteur Unique", desc: "Un maître d'œuvre dédié pilote votre projet de A à Z." },
                  { title: "Prix Ferme et Définitif", desc: "Aucune mauvaise surprise, le prix signé est le prix payé." },
                  { title: "Délais Garantis", desc: "Nous nous engageons contractuellement sur la date de livraison." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center flex-shrink-0 text-orange font-bold text-xl">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                className="rounded-asymmetric shadow-2xl w-full"
                alt="Rénovation Salon"
              />
              <div className="absolute -bottom-6 -left-6 bg-orange text-white p-6 rounded-asymmetric shadow-lg hidden md:block">
                <p className="font-bold text-2xl mb-1">96%</p>
                <p className="text-sm uppercase tracking-wide">De clients satisfaits</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Les étapes de votre projet</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                title: "1. Visite Conseils",
                desc: "Expertise à domicile",
                img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
              {
                title: "2. Étude & Devis",
                desc: "Chiffrage précis",
                img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
              {
                title: "3. Réalisation",
                desc: "Travaux suivis",
                img: img3
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group"
              >
                <div className="h-24 sm:h-32 overflow-hidden relative">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                </div>
                <div className="p-3 sm:p-4 text-center">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-xs text-gray-500">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Nos solutions pour vos travaux</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <div key={index} className="text-center p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 mx-auto mb-3 bg-orange/10 rounded-full flex items-center justify-center text-orange">
                  {solution.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1 leading-tight">{solution.title}</h3>
                <p className="text-xs text-gray-500">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Renovation;
