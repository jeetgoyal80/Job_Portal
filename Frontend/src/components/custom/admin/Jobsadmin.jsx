import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { setcurcompany } from "@/redux/companySlice";
import { setAdminjobs } from "@/redux/jobslice";
import { EndPointUserURLJOB } from "@/utils/constant";

const Jobsadmin = () => {
  const dispatch = useDispatch();
  const { id: companyId } = useParams(); // cleaner destructuring
  const jobs = useSelector((state) => state.job.AdminJobs) || [];

  // Fetch jobs whenever companyId changes
  useEffect(() => {
    if (!companyId) return;

    dispatch(setcurcompany(companyId));

    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${EndPointUserURLJOB}/getAdminjob/${companyId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAdminjobs(res.data.jobs));
        } else {
          dispatch(setAdminjobs([])); // clear jobs if not found
        }
      } catch (error) {
        console.error("Failed to fetch admin jobs:", error);
        dispatch(setAdminjobs([])); // fail-safe
      }
    };

    fetchJobs();
  }, [companyId, dispatch]);

  // Handle viewing applicants
  // const handleViewApplicants = (job) => {
  //   if (!job.applications?.length) {
  //     alert("No applicants for this job yet.");
  //   } else {
  //     const names = job.applications.map((a) => a.name).join(", ");
  //     alert(`Applicants for "${job.title}":\n${names}`);
  //   }
  // };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Jobs Posted by Admin
        </h1>
        <Link to="/admin/job/register">
          <button className="px-5 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 transition">
            + New Job
          </button>
        </Link>
      </div>

      {/* Jobs Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-indigo-50">
            <tr>
              {[
                "Title",
                "Location",
                "Job Type",
                "Experience (yrs)",
                "Salary (₹)",
                "Total Applicants",
                "Updated At",
                "Applicants",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-400">
                  No jobs found.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job._id} className="hover:bg-indigo-50 transition">
                  <td className="px-4 py-3 text-gray-900 font-medium">{job.title}</td>
                  <td className="px-4 py-3 text-gray-700">{job.locations}</td>
                  <td className="px-4 py-3 text-gray-700">{job.jobtype}</td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {job.experienceLevel}
                  </td>
                  <td className="px-4 py-3 text-right text-green-600 font-semibold">
                    ₹{job.salary?.toLocaleString() ?? "N/A"}
                  </td>
                  <td className="px-4 py-3 text-center text-indigo-600 font-semibold">
                    {job.applications?.length || 0}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {new Date(job.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link to={'/admin/allapplicants'}>
                    <button
        
                      className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition"
                    >
                      View
                    </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Jobsadmin;
