import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


    useEffect(() => {
        const isAuthenticated = localStorage.getItem('adminAuthenticated');
        if (isAuthenticated !== 'true') {
            navigate('/admin/login');
        }
    }, [navigate]);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);

            if (mobile) {
                setSidebarOpen(false);
            }
        };


        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {

      if (isMobile) {
            setSidebarOpen(false);
        }
    }, [location.pathname, isMobile]);

    const isActive = (path) => {
        return location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">

            <AnimatePresence>
                {sidebarOpen && isMobile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={closeSidebar}
                    />
                )}
            </AnimatePresence>


            <AnimatePresence>
                {sidebarOpen && (
                    <motion.aside
                        initial={isMobile ? { x: -256 } : { x: 0 }}
                        animate={{ x: 0 }}
                        exit={isMobile ? { x: -256 } : { x: -256 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className={`w-64 bg-teal-darker text-white flex flex-col fixed h-full z-50 ${isMobile ? 'md:hidden' : 'hidden md:flex'}`}
                    >
                        <div className="p-6 border-b border-teal-800 flex items-center justify-between">
                            <Link to="/" className="flex items-center space-x-2" onClick={isMobile ? closeSidebar : undefined}>
                                <span className="text-2xl font-extrabold text-white italic tracking-tighter">Reno</span>
                                <span className="text-2xl font-bold text-orange">Admin</span>
                            </Link>
                            {isMobile && (
                                <button
                                    onClick={closeSidebar}
                                    className="text-white hover:text-orange transition-colors p-1"
                                    aria-label="Fermer le menu"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                            <Link
                                to="/admin"
                                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/admin') && location.pathname === '/admin' ? 'bg-orange text-white font-bold' : 'text-teal-100 hover:bg-teal-800'}`}
                                onClick={isMobile ? closeSidebar : undefined}
                            >
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                                Tableau de bord
                            </Link>

                            <div className="pt-4 pb-2 px-4 text-xs font-semibold text-teal-400 uppercase tracking-wider">Gestion</div>
                            <Link
                                to="/admin/requests"
                                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${location.pathname.includes('requests') ? 'bg-orange text-white font-bold' : 'text-teal-100 hover:bg-teal-800'}`}
                                onClick={isMobile ? closeSidebar : undefined}
                            >
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                Demandes
                            </Link>
                            <Link
                                to="/admin/realizations"
                                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${location.pathname.includes('realizations') ? 'bg-orange text-white font-bold' : 'text-teal-100 hover:bg-teal-800'}`}
                                onClick={isMobile ? closeSidebar : undefined}
                            >
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                Projets réalisés
                            </Link>
                        </nav>

                        <div className="p-4 border-t border-teal-800">
                            <Link to="/" className="flex items-center text-teal-200 hover:text-white transition-colors" onClick={isMobile ? closeSidebar : undefined}>
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                Retour au site
                            </Link>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>


            <main className={`flex-1 transition-all duration-300 ${sidebarOpen && !isMobile ? 'md:ml-64' : 'md:ml-0'} ${isMobile ? '' : ''}`}>

                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleSidebar}
                            className="text-gray-700 hover:text-orange transition-colors p-2 rounded-lg hover:bg-gray-100"
                            aria-label="Toggle sidebar"
                        >
                            {sidebarOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                        <div className="text-xl font-bold text-gray-800">
                            Administration
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => {
                                localStorage.removeItem('adminAuthenticated');
                                navigate('/admin/login');
                            }}
                            className="text-sm text-gray-600 hover:text-orange transition-colors"
                            title="Déconnexion"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-orange text-white flex items-center justify-center font-bold">A</div>
                        <span className="text-sm font-medium text-gray-700 hidden sm:inline">Admin</span>
                    </div>
                </header>


                <div className="p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
  )
}

export default AdminLayout