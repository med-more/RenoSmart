import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import AdminRealizations from '../pages/admin/AdminRealizations';
import AddRealization from '../pages/admin/AddRealization';
import AdminLogin from '../pages/admin/AdminLogin';

import AdminLayout from '../components/layout/AdminLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'services/:id', element: <ServiceDetail /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'renovation', element: <Renovation /> },
      { path: 'realisations', element: <Realizations /> },
      { path: 'realisations/:id', element: <RealizationDetail /> },
      { path: 'devis', element: <QuoteRequest /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'politiques', element: <Politiques /> },
      { path: 'extension', element: <Extension /> },
      { path: 'amenagement', element: <Amenagement /> },
      { path: 'conseils', element: <Conseils /> },
    ],
  },
  { path: '/admin/login', element: <AdminLogin /> },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'requests', element: <AdminRequests /> },
      { path: 'requests/:id', element: <RenovationDetails /> },
      { path: 'realizations', element: <AdminRealizations /> },
      { path: 'realizations/add', element: <AddRealization /> },
    ],
  },
  {
    path: '*',
    element: (
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
    ),
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
