import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WORK_TYPES, STATUS_LABELS, STATUS_COLORS } from '../../utils/constants';

const RenovationCard = ({ request }) => {

  const workTypeInfo = WORK_TYPES.find(type => type.id === request.workType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="card cursor-pointer hover:shadow-xl transition-shadow"
    >
      <Link to={`/admin/requests/${request.id}`}>

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {workTypeInfo && (
              <div className="text-3xl">{workTypeInfo.icon}</div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {request.clientName}
              </h3>
              <p className="text-sm text-gray-500">{request.email}</p>
            </div>
          </div>
          

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[request.status] || STATUS_COLORS.Pending}`}
          >
            {STATUS_LABELS[request.status] || request.status}
          </span>
        </div>


        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Type de travaux</span>
            <span className="text-sm font-medium text-gray-800">
              {workTypeInfo ? workTypeInfo.label : request.workType}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Surface</span>
            <span className="text-sm font-medium text-gray-800">{request.surface} m²</span>
          </div>
        </div>


        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 line-clamp-2">
            {request.description}
          </p>
        </div>


        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            Créé le {new Date(request.createdAt).toLocaleDateString('fr-FR')}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default RenovationCard;
