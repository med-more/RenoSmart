import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

import Home from '../pages/Home';
import Services from '../pages/Services';
import ServiceDetail from '../pages/ServiceDetail';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Renovation from '../pages/Renovation';
import Realizations from '../pages/Realizations';
import RealizationDetail from '../pages/RealizationDetail';
import QuoteRequest from '../pages/QuoteRequest';
import FAQ from '../pages/FAQ';
import Politiques from '../pages/Politiques';
import Extension from '../pages/Extension';
import Amenagement from '../pages/Amenagement';
import Conseils from '../pages/Conseils';



import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminRequests from '../pages/admin/AdminRequests';
import RenovationDetails from '../pages/admin/RenovationDetails';

import AdminLayout from '../components/layout/AdminLayout';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:id" element={<ServiceDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="renovation" element={<Renovation />} />
          <Route path="realisations" element={<Realizations />} />
          <Route path="realisations/:id" element={<RealizationDetail />} />
          <Route path="devis" element={<QuoteRequest />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="politiques" element={<Politiques />} />
          <Route path="extension" element={<Extension />} />
          <Route path="amenagement" element={<Amenagement />} />
          <Route path="conseils" element={<Conseils />} />
        </Route>


        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="requests" element={<AdminRequests />} />
          <Route path="requests/:id" element={<RenovationDetails />} />
        </Route>


        <Route
          path="*"
          element={
            <MainLayout>
              <div className="min-h-screen py-20 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                  <p className="text-gray-600 mb-6">Page non trouvée</p>
                  <a href="/" className="btn-orange">
                    Retour à l'accueil
                  </a>
                </div>
              </div>
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
