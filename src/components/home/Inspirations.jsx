import React from 'react';
import img2 from '../../public/2.png';
import img3 from '../../public/3.png';
import img4 from '../../public/4.png';
const Inspirations = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Nos inspirations</h2>
                <div className="h-1 w-16 bg-orange rounded-full mx-auto mb-12"></div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">
                    <div className="col-span-1 md:col-span-1 row-span-2 relative rounded-lg overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Inspiration 1" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                    </div>
                    <div className="col-span-1 md:col-span-1 relative rounded-lg overflow-hidden group">
                        <img src={img2} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Inspiration 2" />
                    </div>
                    <div className="col-span-2 md:col-span-2 row-span-2 relative rounded-lg overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1616137466211-f939a420be84?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Inspiration 3" />
                        <div className="absolute bottom-6 left-6 bg-white py-2 px-4 rounded shadow-lg">
                            <p className="font-bold text-gray-800">Salon scandinave</p>
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-1 relative rounded-lg overflow-hidden group">
                        <img src={img3} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Inspiration 4" />
                    </div>
                    <div className="col-span-1 md:col-span-1 relative rounded-lg overflow-hidden group">
                        <img src={img4} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Inspiration 5" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Inspirations;
