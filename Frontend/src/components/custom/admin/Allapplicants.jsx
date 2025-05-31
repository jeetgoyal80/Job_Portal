import { setapplicant } from "@/redux/applicantslice";
import { EndPointUserURLAPPLICATION } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {Link} from 'react-router-dom'

const statusColors = {
  selected: "text-green-600",
  rejected: "text-red-600",
  pending: "text-yellow-500",
};

const AllApplicants = () => {
  const jobid = useSelector((store) => store.job.job)?._id;
  const applicants = useSelector((store) => store.applicant.applicants);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!jobid) return;

    const fetchapplicants = async () => {
      try {
        const res = await axios.get(
          `${EndPointUserURLAPPLICATION}/all-applicant/${jobid}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setapplicant(res.data.applicants));
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
        toast.error("Failed to fetch applicants");
      }
    };

    fetchapplicants();
  }, [jobid, dispatch]);

  // Function to update applicant status via API and Redux store
  const updateApplicantStatus = async (applicantId, newStatus, index) => {
    try {
      const res = await axios.put(
        `${EndPointUserURLAPPLICATION}/update-status/${applicantId}`,
        { status: newStatus },
        { withCredentials: true }
      );

     
        // Update Redux store locally for immediate UI update
        const updatedApplicants = [...applicants];
        updatedApplicants[index].status = newStatus;
        dispatch(setapplicant(updatedApplicants));

        toast.success(res.data.message);
      
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Applicants for this Job
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {["Full Name", "Date Applied", "Resume", "Status"].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {applicants.length > 0 ? (
              applicants.map((applicant, index) => (
                <tr key={applicant._id || index} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-900">
                   <Link to = ''>{applicant?.applicant?.fullname}</Link> 
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {new Date(applicant?.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    {applicant?.applicant?.profile?.resume ? (
                      <a
                        href={applicant.applicant.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      <button
                        onClick={() => toast.warn("No resume uploaded.")}
                        className="text-yellow-600 underline cursor-pointer"
                      >
                        No Resume
                      </button>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={applicant.status}
                      className={`border rounded px-2 py-1 text-sm focus:outline-none ${
                        statusColors[applicant.status] || ""
                      }`}
                      disabled={applicant.status !== "pending"}
                      onChange={(e) =>
                        updateApplicantStatus(applicant._id, e.target.value, index)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">
                  No applicants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllApplicants;
