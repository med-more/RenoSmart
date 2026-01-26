import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
    {
        title: 'AGRANDIR',
        description: 'Extension maison, surélévation, véranda...',
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
        ),
        link: '/extension'
    },
    {
        title: 'RÉNOVER',
        description: 'Rénovation complète, énergétique, intérieure...',
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
        ),
        link: '/renovation'
    },
    {
        title: 'AMÉNAGER',
        description: 'Cuisine, salle de bain, suite parentale...',
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
        ),
        link: '/amenagement'
    },
    {
        title: 'S\'INFORMER',
        description: 'Guides, conseils, démarches administratives...',
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        ),
        link: '/conseils'
    }
];

const Services = () => {
    return (
        <section className="py-20 relative bg-white">

            <div className="absolute top-0 left-0 w-1/3 h-full bg-gray-50 -skew-x-12 -z-10 opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-16">
                    <div className="max-w-xl">
                        <span className="text-orange font-bold tracking-widest text-sm uppercase mb-2 block">Nos expertises</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                            CE QUE NOUS SAVONS <br />
                            <span className="text-teal">FAIRE POUR VOUS...</span>
                        </h2>
                    </div>
                    <div className="mt-8 lg:mt-0 hidden lg:block">

                        <svg className="w-32 h-16 text-orange transform rotate-12" fill="none" stroke="currentColor" viewBox="0 0 100 50"><path strokeLinecap="round" strokeDasharray="5,5" strokeWidth="2" d="M0,50 Q50,0 100,50" /></svg>
                        <span className="text-orange font-handwriting text-xl -mt-4 block text-right font-bold">...MAIS AUSSI</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center text-center transition-all group h-full"
                        >
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-teal/10 flex items-center justify-center text-teal mb-3 sm:mb-4 group-hover:bg-teal group-hover:text-white transition-colors">
                                <div className="scale-75 sm:scale-100 transform transform-origin-center">
                                    {service.icon}
                                </div>
                            </div>
                            <h3 className="font-bold text-sm sm:text-lg text-gray-900 mb-2 group-hover:text-teal transition-colors leading-tight">{service.title}</h3>
                            <p className="text-gray-500 text-xs sm:text-sm mb-4 line-clamp-3">{service.description}</p>
                            <Link to={service.link} className="text-orange font-bold text-xs uppercase mt-auto hover:underline">
                                Découvrir
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
