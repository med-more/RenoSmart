import React from 'react';

const testimonials = [
    {
        id: 1,
        name: 'Jean & Marie P.',
        location: 'Lyon (69)',
        text: "Nous avons été accompagnés du début à la fin pour notre extension. Le résultat dépasse nos espérances !",
        rating: 5,
        date: 'Il y a 2 semaines'
    },
    {
        id: 2,
        name: 'Sophie L.',
        location: 'Bordeaux (33)',
        text: "Une rénovation complète de notre appartement sans stress grâce au suivi de chantier impeccable.",
        rating: 5,
        date: 'Il y a 1 mois'
    }
];

const Testimonials = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Nos clients témoignent</h2>
                        <div className="h-1 w-16 bg-orange rounded-full"></div>
                    </div>
                    <a href="#" className="hidden md:block text-orange font-bold hover:text-orange-dark transition-colors">
                        Voir tous les avis &rarr;
                    </a>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8">
                    {testimonials.map((item) => (
                        <div key={item.id} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex text-orange scale-75 origin-left">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    ))}
                                </div>
                                <span className="text-[10px] text-gray-400">{item.date}</span>
                            </div>
                            <p className="text-gray-600 text-xs italic mb-4 line-clamp-3">"{item.text}"</p>
                            <div className="flex items-center mt-auto">
                                <div className="w-8 h-8 bg-teal rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0">
                                    {item.name.charAt(0)}
                                </div>
                                <div className="overflow-hidden">
                                    <h4 className="font-bold text-gray-900 text-xs truncate">{item.name}</h4>
                                    <p className="text-[10px] text-gray-500 truncate">{item.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <a href="#" className="inline-block bg-white border border-orange text-orange font-bold py-2 px-4 rounded-lg hover:bg-orange hover:text-white transition-colors text-sm uppercase tracking-wide">
                        Voir tous les avis
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
