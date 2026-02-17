import React from 'react';
import { Link } from 'react-router-dom';

const PageHero = ({ title, subtitle, bgImage, breadcrumb }) => {
    return (
        <div className="relative h-[300px] md:h-[400px] bg-gray-900 flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('${bgImage || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"}')`,
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                {breadcrumb && (
                    <nav className="flex justify-center mb-4 text-sm font-medium text-gray-300">
                        <Link to="/" className="hover:text-orange transition-colors">Accueil</Link>
                        <span className="mx-2">/</span>
                        <span className="text-white">{breadcrumb}</span>
                    </nav>
                )}
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{title}</h1>
                {subtitle && <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">{subtitle}</p>}

                <div className="mt-8 h-1 w-24 bg-orange mx-auto rounded-full"></div>
            </div>
        </div>
    );
};

export default PageHero;
