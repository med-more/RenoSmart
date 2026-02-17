import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);


    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';


    if (username === adminUsername && password === adminPassword) {

      localStorage.setItem('adminAuthenticated', 'true');

      navigate('/admin');
    } else {
      setError('Nom d\'utilisateur ou mot de passe incorrect');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-gray-200 rounded-asymmetric shadow-xl p-8 w-full max-w-md"
      >

        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-3xl font-extrabold text-teal tracking-tight">Reno</span>
            <span className="text-3xl font-bold text-orange">Admin</span>
          </div>
          <p className="text-gray-600 text-sm">Connexion à l'espace d'administration</p>
        </div>


        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-2 border-red-200 rounded-asymmetric p-4 mb-6"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          </motion.div>
        )}


        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-asymmetric focus:outline-none focus:border-orange transition-colors"
              placeholder="Entrez votre nom d'utilisateur"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-asymmetric focus:outline-none focus:border-orange transition-colors"
              placeholder="Entrez votre mot de passe"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange hover:bg-orange-dark text-white font-bold py-3 px-6 rounded-asymmetric transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>


        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Les identifiants sont configurés dans le fichier .env
          </p>
        </div>


        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-teal hover:text-orange font-medium transition-colors"
          >
            ← Retour au site
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
