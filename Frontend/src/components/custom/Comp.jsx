import React, { useState } from "react";
import { Bookmark, BookmarkCheck, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const formatSalary = (salary) => {
  if (!salary) return "Not disclosed";
  const lpa = (Number(salary) / 100000).toFixed(1);
  return `₹${lpa} LPA`;
};

const Comp = ({ job }) => {
  const [saved, setSaved] = useState(false);
  const id = job?._id || "default-id";

  const handleSave = () => setSaved(!saved);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all duration-300"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-4">
          <img
            src={job?.company?.logo || "/default-logo.png"}
            alt={job?.company?.name || "Company"}
            className="w-12 h-12 rounded-xl object-cover border"
          />

          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {job?.title || "Job Title"}
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              {job?.company?.name || "Unknown Company"}
            </p>

            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {job?.locations || "Location"}
              </span>

              <span className="flex items-center gap-1">
                <Clock size={14} />
                {job?.postedAgo || "Recently posted"}
              </span>
            </div>
          </div>
        </div>

        {/* Save Icon */}
        <button
          onClick={handleSave}
          className="text-gray-400 hover:text-black transition"
        >
          {saved ? (
            <BookmarkCheck size={18} className="text-black" />
          ) : (
            <Bookmark size={18} />
          )}
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-4 line-clamp-3">
        {job?.description || "No description available."}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-4 text-sm text-gray-700">
          <span className="px-3 py-1 bg-gray-100 rounded-full">
            {job?.jobtype || "Full Time"}
          </span>

          <span className="font-medium text-gray-900">
            {formatSalary(job?.salary)}
          </span>
        </div>

        <Link to={`/details/${id}`}>
          <button className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-black transition">
            View
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Comp;