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
    <div>AdminLayout</div>
  )
}

export default AdminLayout