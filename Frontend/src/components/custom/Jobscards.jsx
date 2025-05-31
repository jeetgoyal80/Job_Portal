import React from 'react';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { EndPointUserURLAPPLICATION } from '@/utils/constant';

 // Replace with actual

const Jobscards = ({ job }) => {
  const navigate = useNavigate();
  const companyName = job.company?.name || "Unknown Company";
  const companyLocation = job.company?.location || job.location || "Unknown Location";
  const jobId = job._id || job.id; // Use correct ID field

  const handleClick = () => {
    navigate(`details/${jobId}`);
  };

  return (
    <motion.div
      className="p-4 cursor-pointer"
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-2">
          <Briefcase size={22} className="text-black" />
          {job.title}
        </h2>

        <div className="mb-3 text-sm text-gray-600 flex flex-wrap items-center gap-2">
          <span className="text-primary font-semibold text-[15px]">{companyName}</span>
          <span className="text-gray-400">•</span>
          <span className="flex items-center gap-1 text-gray-500">
            <MapPin size={14} /> {companyLocation}
          </span>
        </div>

        <p className="text-gray-700 mb-5 text-[15px] leading-relaxed">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-3 text-sm">
          <span className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full font-medium">
            Positions: {job.position}
          </span>
          <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full font-medium flex items-center gap-1">
            <Clock size={14} /> {job.jobtype}
          </span>
          <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full font-medium">
            ₹{job.salary}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Jobscards;
