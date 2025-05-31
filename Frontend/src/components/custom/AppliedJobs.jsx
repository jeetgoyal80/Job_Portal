import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAppliedJobs } from '@/redux/jobslice';
import { EndPointUserURLAPPLICATION } from '@/utils/constant';

const statusColor = {
  "pending": 'bg-yellow-100 text-yellow-800',
  "accepted": 'bg-green-100 text-green-800',
  "rejected": 'bg-red-100 text-red-800',
};

const AppliedJobs = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const appliedJobs = useSelector((state) => state.job.AppliedJobs || []);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${EndPointUserURLAPPLICATION}/all-appliedJobs`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAppliedJobs(res.data.jobs));
        }
      } catch (error) {
        console.error('Failed to fetch applied jobs:', error);
      }
    };

    fetchAppliedJobs();
  }, [user._id ,dispatch]);

  return (
    <div className="bg-gradient-to-r from-slate-100 to-white min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Applied Jobs</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-600 uppercase tracking-wider">
                <th className="px-4 py-3">Job Role</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {appliedJobs.length > 0 ? (
                appliedJobs.map((job) => (
                  <tr key={job._id} className="border-b hover:bg-gray-50 text-sm text-gray-700">
                    <td className="px-4 py-3">{job?.job?.title || 'N/A'}</td>
                    <td className="px-4 py-3">{job?.job?.company?.name || 'N/A'}</td>
                    <td className="px-4 py-3">
                      {new Date(job?.appliedAt || job?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[job?.status] || 'bg-gray-100 text-gray-800'}`}
                      >
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                    No jobs applied yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
