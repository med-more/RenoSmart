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

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  });

  const requestsByDay = last7Days.map((day) => {
    const dayStart = new Date(day);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(day);
    dayEnd.setHours(23, 59, 59, 999);
    
    return requests.filter((req) => {
      const reqDate = new Date(req.createdAt);
      return reqDate >= dayStart && reqDate <= dayEnd;
    }).length;
  });

  const maxRequests = Math.max(...requestsByDay, 1);

  const calculateInsights = () => {
    const insights = [];
    

    const recentDays = requestsByDay.slice(-3);
    const previousDays = requestsByDay.slice(0, 3);
    const recentAvg = recentDays.reduce((a, b) => a + b, 0) / recentDays.length;
    const previousAvg = previousDays.reduce((a, b) => a + b, 0) / previousDays.length;
    const activityTrend = recentAvg > previousAvg ? 'augmentation' : recentAvg < previousAvg ? 'diminution' : 'stable';
    
    if (activityTrend === 'augmentation') {
      insights.push({
        type: 'success',
        icon: '📈',
        title: 'Tendance positive',
        message: `L'activité est en hausse avec ${recentAvg.toFixed(1)} demandes/jour en moyenne sur les 3 derniers jours.`
      });
    } else if (activityTrend === 'diminution') {
      insights.push({
        type: 'warning',
        icon: '📉',
        title: 'Attention',
        message: `L'activité a diminué. Pensez à relancer vos campagnes marketing.`
      });

       if (stats.pending > 5) {
      insights.push({
        type: 'info',
        icon: '⏰',
        title: 'Demandes en attente',
        message: `${stats.pending} demandes nécessitent votre attention. Priorisez les plus anciennes.`
      });
    }


    const topWorkType = Object.entries(workTypeStats).sort((a, b) => b[1] - a[1])[0];
    if (topWorkType && topWorkType[1] > 0) {
      const percentage = (topWorkType[1] / stats.total) * 100;
      insights.push({
        type: 'info',
        icon: '🏆',
        title: 'Type de travaux populaire',
        message: `"${topWorkType[0]}" représente ${percentage.toFixed(0)}% de vos demandes. C'est votre spécialité principale.`
      });
    }


    const approvalRate = stats.total > 0 ? (stats.approved / stats.total) * 100 : 0;
    if (approvalRate > 50) {
      insights.push({
        type: 'success',
        icon: '✅',
        title: 'Taux d\'approbation élevé',
        message: `${approvalRate.toFixed(0)}% de vos demandes sont approuvées. Excellent taux de conversion !`
      });
    } else if (approvalRate < 30 && stats.total > 5) {
      insights.push({
        type: 'warning',
        icon: '⚠️',
        title: 'Taux d\'approbation faible',
        message: `Seulement ${approvalRate.toFixed(0)}% de vos demandes sont approuvées. Analysez les causes de rejet.`
      });
    }


    const avgBudget = totalBudget / stats.total || 0;
    if (avgBudget > 30000) {
      insights.push({
        type: 'success',
        icon: '💰',
        title: 'Budget moyen élevé',
        message: `Budget moyen de ${(avgBudget / 1000).toFixed(0)}K € par projet. Excellente valorisation !`
      });
    }

    return insights;
  };


  const displayInsights = calculateInsights();

  const statCards = [
    {
      title: 'Demandes Totales',
      value: stats.total,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'En Attente',
      value: stats.pending,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'En Cours',
      value: stats.inReview,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Approuvées',
      value: stats.approved,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Rejetées',
      value: stats.rejected,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      change: '-3%',
      changeType: 'negative'
    },
    {
      title: 'Budget Total',
      value: `${(totalBudget / 1000).toFixed(0)}K €`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-teal-500',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
      change: '+22%',
      changeType: 'positive'
    }
  ];
    }
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard