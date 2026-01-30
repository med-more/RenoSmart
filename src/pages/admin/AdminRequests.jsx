import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllRenovationRequests } from '../../store/slices/renovationSlice';
import { STATUS_LABELS, STATUS_COLORS } from '../../utils/constants';


const AdminRequests = () => {
  const dispatch = useDispatch();
  const { requests, loading } = useSelector((state) => state.renovation);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setCurrentPage(1); 
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    useEffect(() => {
    dispatch(getAllRenovationRequests());
  }, [dispatch]);

  const filteredRequests = requests
    .filter((request) => {
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
    })
    .sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'date-asc') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === 'name-asc') {
        return (a.clientName || '').localeCompare(b.clientName || '');
      } else if (sortBy === 'name-desc') {
        return (b.clientName || '').localeCompare(a.clientName || '');
      }
      return 0;
    });

    const stats = {
    total: filteredRequests.length,
    pending: filteredRequests.filter((r) => r.status === 'Pending').length,
    inReview: filteredRequests.filter((r) => r.status === 'In Review').length,
    approved: filteredRequests.filter((r) => r.status === 'Approved').length,
    rejected: filteredRequests.filter((r) => r.status === 'Rejected').length,
  };

  const itemsPerPage = isMobile ? 6 : 10;
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, endIndex);

   useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateFilter, sortBy]);
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des demandes</h1>
        <p className="text-gray-600 mt-1">Consultez et gérez toutes les demandes de rénovation</p>
      </div>


      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-gray-200 rounded-asymmetric p-3 sm:p-4"
        >
          <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total</div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border-2 border-gray-200 rounded-asymmetric p-3 sm:p-4"
        >
          <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1">En attente</div>
          <div className="text-xl sm:text-2xl font-bold text-orange">{stats.pending}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border-2 border-gray-200 rounded-asymmetric p-3 sm:p-4"
        >
          <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1">En cours</div>
          <div className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.inReview}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border-2 border-gray-200 rounded-asymmetric p-3 sm:p-4"
        >
          <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Approuvées</div>
          <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.approved}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border-2 border-gray-200 rounded-asymmetric p-3 sm:p-4"
        >
          <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Rejetées</div>
          <div className="text-xl sm:text-2xl font-bold text-red-600">{stats.rejected}</div>
        </motion.div>
      </div>


      <div className="bg-white border-2 border-gray-200 rounded-asymmetric p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <svg className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher par client, email ou type de travaux..."
              className="w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2 sm:py-3 border-2 border-gray-200 rounded-asymmetric focus:outline-none focus:border-orange transition-colors text-xs sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-asymmetric focus:outline-none focus:border-orange transition-colors text-xs sm:text-sm"
          >
            <option value="all">Tous les statuts</option>
            <option value="Pending">En attente</option>
            <option value="In Review">En cours</option>
            <option value="Approved">Approuvée</option>
            <option value="Rejected">Rejetée</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-asymmetric focus:outline-none focus:border-orange transition-colors text-xs sm:text-sm"
          >
            <option value="all">Toutes les dates</option>
            <option value="today">Aujourd'hui</option>
            <option value="week">7 derniers jours</option>
            <option value="month">30 derniers jours</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-asymmetric focus:outline-none focus:border-orange transition-colors text-xs sm:text-sm"
          >
            <option value="date-desc">Plus récent</option>
            <option value="date-asc">Plus ancien</option>
            <option value="name-asc">Nom (A-Z)</option>
            <option value="name-desc">Nom (Z-A)</option>
          </select>
        </div>
      </div>


      <div className="bg-white border-2 border-gray-200 rounded-asymmetric overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b-2 border-gray-200 bg-gray-50">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            Liste des demandes ({filteredRequests.length})
          </h3>
        </div>


        <div className="block md:hidden px-4 sm:px-6 py-4 space-y-3">
          {loading ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <div className="w-10 h-10 border-4 border-orange border-t-transparent rounded-full animate-spin" />
              <span className="text-xs sm:text-sm text-gray-500">Chargement...</span>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-8 text-gray-500">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-sm font-medium">Aucune demande trouvée</p>
              <p className="text-xs">Essayez de modifier vos filtres de recherche</p>
            </div>
          ) : (
            paginatedRequests.map((req, index) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="border border-gray-200 rounded-asymmetric p-3 flex flex-col gap-2 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal to-teal-dark text-white flex items-center justify-center font-bold text-xs">
                      {req.clientName?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">{req.clientName || 'N/A'}</p>
                      <p className="text-[11px] text-gray-500 truncate">{req.email || 'N/A'}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-asymmetric text-[10px] font-bold ${
                      STATUS_COLORS[req.status] || 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {STATUS_LABELS[req.status] || req.status}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 text-[11px] text-gray-600">
                  <span className="truncate">{req.workType || 'Type inconnu'}</span>
                  <span>
                    {req.surface ? `${req.surface} m²` : ''}
                    {(req.estimatedBudget || req.budget || req.estimate?.budget) 
                      ? ` • ${(req.estimatedBudget || req.budget || req.estimate?.budget || 0).toLocaleString()} €` 
                      : ''}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 text-[11px] text-gray-500">
                  <span>
                    {new Date(req.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <Link
                    to={`/admin/requests/${req.id}`}
                    className="inline-flex items-center gap-1 text-teal hover:text-orange font-bold text-[11px] transition-colors"
                  >
                    Voir
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>


        <div className="hidden md:block overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Client
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Projet
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Surface
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Budget
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Date
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Statut
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 border-4 border-orange border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-gray-500">Chargement...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-3">
                      <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                      </svg>
                      <p className="text-lg font-medium">Aucune demande trouvée</p>
                      <p className="text-sm">Essayez de modifier vos filtres de recherche</p>
                    </div>
                  </td>
                </tr>
              ) : (
                    paginatedRequests.map((req, index) => (
                  <motion.tr
                    key={req.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-teal to-teal-dark text-white flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                          {req.clientName?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div className="min-w-0">
                              <div className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                                {req.clientName || 'N/A'}
                              </div>
                              <div className="text-xs text-gray-500 truncate">{req.email || 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="text-xs sm:text-sm font-medium text-gray-900">{req.workType || 'N/A'}</div>
                    </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="text-xs sm:text-sm text-gray-900">{req.surface || 'N/A'} m²</div>
                    </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="text-xs sm:text-sm font-bold text-gray-900">
                        {(req.estimatedBudget || req.budget || req.estimate?.budget) 
                          ? `${(req.estimatedBudget || req.budget || req.estimate?.budget || 0).toLocaleString()} €` 
                          : 'N/A'}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                        {new Date(req.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                            year: 'numeric',
                        })}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <span
                            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-asymmetric text-xs font-bold ${
                              STATUS_COLORS[req.status] || 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {STATUS_LABELS[req.status] || req.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                      <Link
                        to={`/admin/requests/${req.id}`}
                        className="inline-flex items-center gap-1 sm:gap-2 text-teal hover:text-orange font-bold text-xs sm:text-sm transition-colors group-hover:gap-2 sm:group-hover:gap-3"
                      >
                            <span>Voir détails</span>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </td>
                  </motion.tr>
                ))
              )}
                </tbody>
              </table>
            </div>
          </div>
        </div>


        {filteredRequests.length > 0 && totalPages > 1 && (
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t-2 border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-xs sm:text-sm text-gray-600">
              Affichage de {startIndex + 1} à {Math.min(endIndex, filteredRequests.length)} sur {filteredRequests.length} demandes
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Précédent
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {

                    if (page === 1 || page === totalPages) return true;
                    if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                    return false;
                  })
                  .map((page, index, array) => {

                    const showEllipsisBefore = index > 0 && array[index] - array[index - 1] > 1;
                    return (
                      <React.Fragment key={page}>
                        {showEllipsisBefore && (
                          <span className="px-2 text-xs sm:text-sm text-gray-500">...</span>
                        )}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
                            currentPage === page
                              ? 'bg-orange text-white'
                              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    );
                  })}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Suivant
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminRequests