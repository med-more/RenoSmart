import React from 'react';
import Hero from '../components/home/Hero';
import VideoSection from '../components/home/VideoSection';
import Services from '../components/home/Services';
import Testimonials from '../components/home/Testimonials';
import Realizations from '../components/home/Realizations';
import Inspirations from '../components/home/Inspirations';
import NewsSection from '../components/home/NewsSection';
import Clients from '../components/home/Clients';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <VideoSection />

      <Services />


      <section className="bg-teal py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-white mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">Vous avez un projet de travaux ?</h2>
            <p className="text-teal-100">Bénéficiez d'une visite conseils gratuite et sans engagement.</p>
          </div>
          <button className="bg-white text-teal font-bold py-2 px-4 rounded-asymmetric shadow-xl hover:bg-gray-50 transition-colors text-sm uppercase tracking-wide">
            Prendre rendez-vous
          </button>
        </div>
      </section>

      <Realizations />

      <Clients />

      <Testimonials />

      <Inspirations />

      <NewsSection />


      <section className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Logo_Camif_Habitat.svg/2560px-Logo_Camif_Habitat.svg.png" alt="Camif" className="h-8 grayscale opacity-50 hidden" />


            <div className="bg-teal-darker rounded-xl p-8 w-full shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
                <div>
                  <div className="text-4xl font-extrabold text-orange mb-1">40</div>
                  <div className="text-white text-xs font-bold uppercase">Ans d'expérience</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-white mb-1">50 000</div>
                  <div className="text-white text-xs font-bold uppercase">Chantiers réalisés</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-white mb-1">600</div>
                  <div className="text-white text-xs font-bold uppercase">Maîtres d'œuvre agréés</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-white mb-1">96%</div>
                  <div className="text-white text-xs font-bold uppercase">Clients satisfaits</div>
                </div>
              </div>

              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 rounded-full bg-teal/20"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
