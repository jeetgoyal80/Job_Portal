import React, { useState } from 'react';
import { Bookmark, BookmarkCheck, Clock, Users, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Comp = ({ job }) => {
  const [saved, setSaved] = useState(false);
  const id = job?._id || 'default-id';

  const handleSave = () => setSaved(!saved);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-md w-full bg-white border border-gray-100 shadow-lg rounded-3xl p-6 relative overflow-hidden"
    >
      {/* Top Right Save Icon and Posted Time */}
      <div className="absolute top-4 right-4 flex items-center gap-2 text-sm text-gray-400">
        <button onClick={handleSave} className="hover:text-black transition">
          {saved ? <BookmarkCheck size={18} className="text-black" /> : <Bookmark size={18} />}
        </button>
        <span>{job?.postedAgo || 'Recently posted'}</span>
      </div>

      {/* Company Logo and Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={job?.company?.logo || '/default-logo.png'}
          alt={job?.company?.name || 'Company'}
          className="w-12 h-12 rounded-xl object-cover border"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{job?.company?.name || 'Unknown Company'}</h3>
          <span className="text-sm text-gray-500">{job?.title || 'Job Title'}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm leading-relaxed mb-4">
        {job?.description || 'No description available.'}
      </p>

      {/* Meta Info Tags */}
      <div className="flex flex-wrap gap-3 text-sm text-gray-700 mb-5">
        <span className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-1">
          <Users size={14} /> Positions: {job?.position ?? 'N/A'}
        </span>
        <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full flex items-center gap-1">
          <Briefcase size={14} /> {job?.jobtype || 'Job Type'}
        </span>
        <span className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full">
          {job?.salary ? `₹${job.salary}` : 'Salary not specified'}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Link to={`/details/${id}`}>
          <button className="px-5 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-900 transition">
            View Details
          </button>
        </Link>
        <button
          onClick={handleSave}
          className="px-5 py-2 border border-black text-sm rounded-lg hover:bg-black hover:text-white transition"
        >
          {saved ? 'Saved' : 'Save for Later'}
        </button>
      </div>
    </motion.div>
  );
};

export default Comp;
