import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllRenovationRequests } from '../../store/slices/renovationSlice';
import { STATUS_LABELS, STATUS_COLORS } from '../../utils/constants';


const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { requests, loading } = useSelector((state) => state.renovation);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    dispatch(getAllRenovationRequests());
  }, [dispatch]);

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.workType?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const requestDate = new Date(request.createdAt);
      const now = new Date();
      const daysDiff = Math.floor((now - requestDate) / (1000 * 60 * 60 * 24));
      
      if (dateFilter === 'today') matchesDate = daysDiff === 0;
      else if (dateFilter === 'week') matchesDate = daysDiff <= 7;
      else if (dateFilter === 'month') matchesDate = daysDiff <= 30;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === 'Pending').length,
    inReview: requests.filter((r) => r.status === 'In Review').length,
    approved: requests.filter((r) => r.status === 'Approved').length,
    rejected: requests.filter((r) => r.status === 'Rejected').length,
    active: requests.filter((r) => ['In Review', 'Approved'].includes(r.status)).length,
  };

  const totalBudget = requests.reduce((sum, req) => {
    return sum + (req.estimatedBudget || req.budget || req.estimate?.budget || 0);
  }, 0);

  const workTypeStats = requests.reduce((acc, req) => {
    const type = req.workType || 'Autres';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard