import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const videoRefs = useRef([]);


    const slides = [
        {
            video: "https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4",
            fallbackImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
        },
        {
            video: "https://videos.pexels.com/video-files/3044083/3044083-hd_1920_1080_30fps.mp4",
            fallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        },
        {
            video: "https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4",
            fallbackImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80",
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 8000); 

        return () => clearInterval(interval);
    }, [slides.length]);

    useEffect(() => {
        videoRefs.current.forEach((video) => {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });

        if (videoRefs.current[currentSlide]) {
            videoRefs.current[currentSlide].play().catch((e) => {
                console.log("Erreur de lecture vidéo:", e);
            });
        }
    }, [currentSlide]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative w-full h-screen sm:h-[550px] md:h-[650px] lg:h-[700px] xl:h-[800px] bg-gray-900 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                    {slides.map((slide, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                        animate={{ 
                            opacity: index === currentSlide ? 1 : 0,
                        }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="absolute inset-0"
                        style={{ zIndex: index === currentSlide ? 1 : 0 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage: `url('${slide.fallbackImage}')`,
                                    }}
                                    animate={{
                                        scale: [1, 1.1],
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "linear"
                                    }}
                                />
                                <motion.div
                                    className="absolute inset-0 w-full h-full overflow-hidden"
                                    animate={{
                                        scale: [1, 1.1],
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "linear"
                                    }}
                                >
                                <video
                                    ref={(el) => (videoRefs.current[index] = el)}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                >
                                    <source src={slide.video} type="video/mp4" />
                                </video>
                            </motion.div>
                            </motion.div>
                    ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-5"></div>

            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="sm:hidden flex flex-col items-start text-white z-10"
                >
                    <div className="mb-4">
                        <div className="flex items-center space-x-1">
                            <div className="relative">
                                <span className="text-5xl font-bold text-white tracking-tight" style={{ 
                                    textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.9)'
                                }}>Reno</span>
                                <div className="absolute top-0 -right-1.5 text-orange">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                                </div>
                            </div>
                            <span className="text-5xl font-bold text-orange" style={{ 
                                textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.9)'
                            }}>Smart</span>
                        </div>
                    </div>
                    
                    <p className="text-left text-xl sm:text-2xl font-semibold text-white leading-relaxed tracking-tight mb-6" style={{ 
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}>
                        Besoin d'accompagnement pour réussir vos travaux ?
                    </p>

                    <Link 
                        to="/devis"
                        className="inline-block bg-orange hover:bg-orange-dark text-white font-bold py-3 px-6 rounded-asymmetric transition-colors shadow-xl text-base uppercase tracking-wide"
                    >
                        Contactez-nous !
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hidden sm:flex flex-col justify-center max-w-2xl text-white z-10"
                >
                    <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="relative">
                                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white tracking-tight" style={{ 
                                    textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.9)'
                                }}>Reno</span>
                                <div className="absolute top-0 -right-1 sm:-right-1.5 md:-right-2 text-orange">
                                    <svg className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                                </div>
                            </div>
                            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-orange" style={{ 
                                textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.9)'
                            }}>Smart</span>
                        </div>
                    </div>
                    
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-4 sm:mb-5 md:mb-6 lg:mb-8 text-white leading-tight sm:leading-normal tracking-tight" style={{ 
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}>
                        Besoin d'accompagnement pour réussir vos travaux ?
                    </p>

                    <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">
                        <Link 
                            to="/devis"
                            className="inline-block bg-orange hover:bg-orange-dark text-white font-bold py-3 px-6 rounded-asymmetric transition-colors shadow-xl text-base uppercase tracking-wide"
                        >
                            Contactez-nous !
                        </Link>
                    </div>
                </motion.div>
            </div>

            <button
                onClick={prevSlide}
                className="hidden sm:block absolute left-1 sm:left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-orange/90 hover:bg-orange text-white p-1 sm:p-1.5 md:p-2 rounded-full transition-all shadow-lg"
                aria-label="Slide précédent"
            >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="hidden sm:block absolute right-1 sm:right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-orange/90 hover:bg-orange text-white p-1 sm:p-1.5 md:p-2 rounded-full transition-all shadow-lg"
                aria-label="Slide suivant"
            >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`rounded-full transition-all ${
                                index === currentSlide
                                    ? 'bg-orange w-6 h-1.5 sm:w-8 sm:h-2 md:w-10 md:h-3'
                                    : 'bg-white/60 hover:bg-white/80 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3'
                            }`}
                            aria-label={`Aller à la slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
