import React from 'react';
import { motion } from 'framer-motion';
import alOmran from '../../public/alOmran.png';
import mt from '../../public/mt.png';
import onee from '../../public/onee.png';
import onhym from '../../public/onhym.png';
import orange from '../../public/orange.png';
import rabat from '../../public/rabat.png';
import RP from '../../public/RP.png';

const Clients = () => {
    const clients = [
        {
            id: 1,
            name: 'Al Omran',
            logo: alOmran,
            category: 'Construction'
        },
        {
            id: 2,
            name: 'MT',
            logo: mt,
            category: 'Architecture'
        },
        {
            id: 3,
            name: 'ONEE',
            logo: onee,
            category: 'Ingénierie'
        },
        {
            id: 4,
            name: 'ONHYM',
            logo: onhym,
            category: 'Design'
        },
        {
            id: 5,
            name: 'Orange',
            logo: orange,
            category: 'Construction'
        },
        {
            id: 6,
            name: 'Rabat',
            logo: rabat,
            category: 'Architecture'
        },
        {
            id: 7,
            name: 'RP',
            logo: RP,
            category: 'Ingénierie'
        }
    ];

    const duplicatedClients = [...clients, ...clients];

    return (
        <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1/3 h-full bg-teal/5 -skew-x-12 -z-10 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-1/3 h-full bg-orange/5 -skew-x-12 -z-10 opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <span className="text-orange font-bold tracking-widest text-xs sm:text-sm uppercase mb-2 block">
                        Nos Partenaires
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Ils Nous <span className="text-teal">Font Confiance</span>
                    </h2>
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="h-1 w-12 sm:w-16 bg-orange"></div>
                        <div className="h-0.5 w-24 sm:w-32 border-t-2 border-dashed border-gray-300"></div>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                        Nous collaborons avec les meilleures entreprises pour garantir l'excellence de nos projets.
                    </p>
                </motion.div>

                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none"></div>

                    <div className="overflow-hidden">
                        <motion.div
                            className="flex gap-4 sm:gap-6 md:gap-8"
                            animate={{
                                x: [0, -50 * 7] 
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30,
                                    ease: "linear"
                                }
                            }}
                            style={{ width: 'max-content' }}
                        >
                            {duplicatedClients.map((client, index) => (
                                <motion.div
                                    key={`${client.id}-${index}`}
                                    className="flex-shrink-0"
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="bg-white rounded-lg shadow-md hover:shadow-xl border border-gray-200/50 p-4 sm:p-5 md:p-6 w-32 sm:w-36 md:w-40 h-24 sm:h-28 md:h-32 flex items-center justify-center transition-all duration-300 group cursor-pointer overflow-hidden hover:border-orange/30">
                                        <img
                                            src={client.logo}
                                            alt={client.name}
                                            className="w-full h-full object-contain transition-all duration-300 p-1.5 sm:p-2"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-12 sm:mt-16 md:mt-20"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                        {[
                            { number: '50+', label: 'Partenaires' },
                            { number: '200+', label: 'Projets Réalisés' },
                            { number: '15', label: 'Années d\'Expérience' },
                            { number: '98%', label: 'Satisfaction Client' }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-orange mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Clients;
