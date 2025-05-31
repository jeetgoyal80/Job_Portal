import { setjob, saveJob } from '@/redux/jobslice';
import { EndPointUserURLAPPLICATION, EndPointUserURLJOB } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Details = () => {
  const [saved, setSaved] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();
  const id = params.id;

  const job = useSelector(store => store.job?.job);
  const savedJobs = useSelector(store => store.job?.savedJobs || []);
  const user = useSelector(store => store.auth?.user);

  const [applied, setApplied] = useState(false);

  // ✅ Fetch job and check applied status
  useEffect(() => {
    const getJobDetails = async () => {
      try {
        const response = await axios.get(`${EndPointUserURLJOB}/getjobs/${id}`, {
          withCredentials: true,
        });

        const jobData = response.data.job || null;
        dispatch(setjob(jobData));
        setApplied(
          jobData?.applications?.some(app => app.applicant?._id?.toString() === user?._id?.toString()) || false
        );
        console.log(jobData?.applications?.[0]?.applicant._id);
        

     
      
        // ✅ Check if current user has applied


      } catch (error) {
        console.error("Failed to fetch job details:", error);
      }
    };

    getJobDetails();
  }, [id, dispatch, user?._id]);

  // ✅ Check if already saved
  useEffect(() => {
    const isSaved = savedJobs.some(j => j._id === id);
    setSaved(isSaved);
  }, [savedJobs, id]);

  // ✅ Apply function
  const jobapply = async () => {
    if (!user) {
      toast.error("Please login to apply.");
      return;
    }

    try {
      const res = await axios.get(`${EndPointUserURLAPPLICATION}/apply/${id}`, {
        withCredentials: true
      });

      if (res.data.success) {
        toast.success("Successfully applied!");
        setApplied(true);

        // Refresh job details to update applications count
        const updatedJob = await axios.get(`${EndPointUserURLJOB}/getjobs/${id}`, {
          withCredentials: true,
        });
        dispatch(setjob(updatedJob.data.job || null));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  // ✅ Save job
  const handleSaveJob = () => {
    if (!saved && job) {
      dispatch(saveJob(job));
      setSaved(true);
      toast.success("Job saved to bookmarks!");
    }
  };

  if (!job) return <div className="text-center mt-10 text-lg">Loading job details...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-xl">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Job Title and Metadata */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-2 text-sm text-gray-500">
          <span>{job?.company?.name}</span>
          <span>
            Posted on {job?.createdAt ? job.createdAt.split('T')[0] : 'Now'}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-3 mb-6 text-sm items-center">
        {job?.company?.logo && (
          <img
            src={job.company.logo}
            alt={`${job.company.name} logo`}
            className="w-6 h-6 rounded-full"
          />
        )}
        <span className="bg-gray-200 px-3 py-1 rounded-full">{job.position} Positions</span>
        <span className="bg-gray-200 px-3 py-1 rounded-full">{job.salary}</span>
      </div>


      {/* Detail Sections */}
      <div className="space-y-4 text-gray-700">
        <div>
          <h3 className="font-semibold">Location:</h3>
          <p>{job.locations}</p>
        </div>

        <div>
          <h3 className="font-semibold">Experience Required:</h3>
          <p>{job.experienceLevel}</p>
        </div>

        <div>
          <h3 className="font-semibold">Salary:</h3>
          <p>{job?.salary}</p>
        </div>

        <div>
          <h3 className="font-semibold">Description:</h3>
          <p className="text-sm leading-relaxed">{job?.description}</p>
        </div>

        <div>
          <h3 className="font-semibold">Total Applicants:</h3>
          <p>{(job.applications)?.length || 0} people have applied</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
        <button
          onClick={jobapply}
          disabled={applied}
          className={`px-6 py-2 rounded-lg text-white font-semibold shadow-md transition duration-200 ${applied ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
        >
          {applied ? 'Already Applied' : 'Apply Now'}
        </button>

        <button
          onClick={handleSaveJob}
          disabled={saved}
          className={`px-6 py-2 rounded-lg font-semibold shadow-md transition duration-200 ${saved ? 'bg-yellow-500 text-white' : 'bg-yellow-300 hover:bg-yellow-400'
            }`}
        >
          {saved ? 'Saved' : 'Save Job'}
        </button>
      </div>
    </div>
  );
};

export default Details;
