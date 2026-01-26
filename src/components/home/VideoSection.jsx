import React from 'react';
import { motion } from 'framer-motion';

const VideoSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 relative inline-block">
                    Pourquoi choisir Camif Habitat ?
                    <span className="block h-1 w-20 bg-orange mx-auto mt-4 rounded-full"></span>
                </h2>

                <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
                    <div
                        className="w-full h-64 md:h-[500px] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80')"
                        }}
                    ></div>

                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-4"
                        >
                            <svg className="w-8 h-8 text-orange ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </motion.div>
                        <h3 className="text-white text-2xl md:text-4xl font-bold text-shadow-lg px-4">
                            Découvrez nos offres,
                            <br />
                            en moins d'une minute
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
