import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllRenovationRequests } from '../../store/slices/renovationSlice';
import { STATUS_LABELS, STATUS_COLORS } from '../../utils/constants';
import { generateDashboardInsights } from '../../services/aiService';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { requests, loading } = useSelector((state) => state.renovation);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [aiInsights, setAiInsights] = useState([]);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [insightsError, setInsightsError] = useState(null);

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


  const last7DaysData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    date.setHours(0, 0, 0, 0);
    
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);
    
    return {
      date: date,
      label: date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
      dayStart: dayStart,
      dayEnd: dayEnd,
    };
  });

  const requestsByDay = last7DaysData.map((dayData) => {
    return requests.filter((req) => {
      if (!req.createdAt) return false;
      const reqDate = new Date(req.createdAt);
      reqDate.setHours(0, 0, 0, 0);
      return reqDate >= dayData.dayStart && reqDate <= dayData.dayEnd;
    }).length;
  });

  const last7Days = last7DaysData.map(d => d.label);

  const maxRequests = Math.max(...requestsByDay, 1);

  const recentDays = requestsByDay.slice(-3);

  // Get latest requests sorted by date (newest first), independent of filters
  const latestRequests = [...requests]
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateB - dateA; // Newest first
    })
    .slice(0, 5); // Get only the 5 most recent
  const previousDays = requestsByDay.slice(0, 3);
  const recentAvg = recentDays.reduce((a, b) => a + b, 0) / recentDays.length;
  const previousAvg = previousDays.reduce((a, b) => a + b, 0) / previousDays.length;
  const activityTrend = recentAvg > previousAvg ? 'augmentation' : recentAvg < previousAvg ? 'diminution' : 'stable';
  const avgBudget = stats.total > 0 ? totalBudget / stats.total : 0;

  const calculateFallbackInsights = () => {
    const insights = [];
    
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
    }

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

  useEffect(() => {
    const fetchAIInsights = async () => {
      if (requests.length === 0 || loading) return;

      setInsightsLoading(true);
      setInsightsError(null);

      try {
        const dashboardData = {
          stats,
          totalBudget,
          avgBudget,
          workTypeStats,
          requestsByDay,
          activityTrend,
        };

        const insights = await generateDashboardInsights(dashboardData);
        setAiInsights(insights);
      } catch (error) {
        console.error('Error generating AI insights:', error);
        setInsightsError(error.message);
        setAiInsights(calculateFallbackInsights());
      } finally {
        setInsightsLoading(false);
      }
    };

    fetchAIInsights();
  }, [requests.length, loading]);

  const displayInsights = aiInsights.length > 0 ? aiInsights : calculateFallbackInsights();

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

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-1">
          Vue d'ensemble de l'activité et des performances de vos demandes de rénovation
        </p>
      </div>


      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border-2 border-gray-200 rounded-asymmetric p-3 sm:p-4 md:p-6 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
              <div className={`${stat.bgColor} p-1.5 sm:p-2 md:p-3 rounded-asymmetric`}>
                <div className={`${stat.textColor} w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8`}>
                  {stat.icon}
                </div>
              </div>
              <span
                className={`text-[10px] sm:text-xs font-bold px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 rounded-full ${
                  stat.changeType === 'positive'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
              {stat.title}
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>


      {displayInsights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-gray-200 rounded-asymmetric p-4 sm:p-6"
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal to-teal-dark rounded-asymmetric flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Insights IA</h2>
                {insightsLoading && (
                  <div className="w-4 h-4 border-2 border-teal border-t-transparent rounded-full animate-spin" />
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                {insightsError ? 'Analyse basée sur des règles (IA indisponible)' : 'Analyse intelligente par Gemini AI'}
              </p>
            </div>
          </div>
          {insightsLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-sm text-gray-600">Génération des insights par l'IA...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {displayInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 border-2 border-gray-200 rounded-asymmetric p-3 sm:p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-asymmetric flex items-center justify-center flex-shrink-0 ${
                  insight.type === 'success' ? 'bg-green-100' :
                  insight.type === 'warning' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  <span className="text-base sm:text-lg">{insight.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                    {insight.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words">
                    {insight.message}
                  </p>
                </div>
              </div>
            </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}


      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border-2 border-gray-200 rounded-asymmetric p-4 sm:p-6 2xl:col-span-2"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h3 className="text-lg font-bold text-gray-900">Activité des demandes (7 derniers jours)</h3>
            <span className="text-xs sm:text-sm text-gray-500">
              {stats.total} demandes au total • {stats.active} actives
            </span>
          </div>
          <div className="h-56 sm:h-64 flex items-end justify-between gap-2 sm:gap-3">
            {requestsByDay.map((count, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1 sm:gap-2">
                <div
                  className="w-full relative bg-gray-100 rounded-asymmetric overflow-hidden"
                  style={{ height: '160px' }}
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(count / maxRequests) * 100}%` }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="absolute bottom-0 w-full bg-gradient-to-t from-orange to-orange-dark rounded-asymmetric"
                  />
                </div>
                <span className="text-[10px] sm:text-xs text-gray-600 font-medium">
                  {last7Days[index]}
                </span>
                <span className="text-xs font-bold text-gray-900">{count}</span>
              </div>
            ))}
          </div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >

          <div className="bg-white border-2 border-gray-200 rounded-asymmetric p-4 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Répartition par type de travaux
            </h3>
            {stats.total === 0 ? (
              <p className="text-sm text-gray-500">Aucune donnée disponible pour le moment.</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(workTypeStats)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 4)
                  .map(([type, count], index) => {
                    const percentage = (count / stats.total) * 100;
                    return (
                      <div key={type} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs sm:text-sm">
                          <span className="font-medium text-gray-700">{type}</span>
                          <span className="font-bold text-gray-900">
                            {count} ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="h-full bg-gradient-to-r from-teal to-teal-dark rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>


          <div className="bg-white border-2 border-gray-200 rounded-asymmetric p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-gray-900">Dernières demandes</h3>
              <Link
                to="/admin/requests"
                className="text-xs sm:text-sm font-bold text-teal hover:text-orange transition-colors"
              >
                Voir toutes les demandes
              </Link>
            </div>
            {loading ? (
              <div className="flex flex-col items-center gap-3 py-6">
                <div className="w-8 h-8 border-4 border-orange border-t-transparent rounded-full animate-spin" />
                <span className="text-xs sm:text-sm text-gray-500">Chargement...</span>
              </div>
            ) : latestRequests.length === 0 ? (
              <p className="text-sm text-gray-500">Aucune demande récente.</p>
            ) : (
              <ul className="space-y-3 max-h-64 overflow-y-auto">
                {latestRequests.map((req) => (
                  <li
                    key={req.id}
                    className="flex items-start justify-between gap-3 p-3 rounded-asymmetric bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gradient-to-br from-teal to-teal-dark text-white flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                        {req.clientName?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                          {req.clientName || 'N/A'}
                        </p>
                        <p className="text-[11px] sm:text-xs text-gray-500 truncate">
                          {req.workType || 'Type inconnu'} •{' '}
                          {new Date(req.createdAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`px-2 py-0.5 rounded-asymmetric text-[10px] sm:text-xs font-bold ${
                          STATUS_COLORS[req.status] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {STATUS_LABELS[req.status] || req.status}
                      </span>
                      <Link
                        to={`/admin/requests/${req.id}`}
                        className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-teal hover:text-orange font-bold transition-colors"
                      >
                        Voir
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
