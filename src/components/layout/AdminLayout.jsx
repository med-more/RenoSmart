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
  return (
    <div>AdminLayout</div>
  )
}

export default AdminLayout