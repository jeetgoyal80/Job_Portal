import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { EndPointUserURLJOB } from '@/utils/constant';
import { toast } from 'sonner';

const NewJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    locations: '',
    jobtype: '',
    experienceLevel: '',
    salary: '',
    position: '',
  });

  const companyId = useSelector((state) => state.company.curcompany);
  const token = useSelector((state) => state.auth.token); // get token from Redux (make sure it's saved)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyId) {
      toast.error("Missing company information. Please log in again.");
      return;
    }

    const jobData = {
      ...formData,
      requirements: formData.requirements
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item.length > 0),
      experienceLevel: Number(formData.experienceLevel),
      salary: Number(formData.salary),
      position: Number(formData.position),
      company: companyId,
      // ✅ Do not send created_by anymore
    };

    try {
      const response = await axios.post(`${EndPointUserURLJOB}/register`, jobData,{withCredentials:true}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message || "Job posted successfully.");

        setFormData({
          title: '',
          description: '',
          requirements: '',
          locations: '',
          jobtype: '',
          experienceLevel: '',
          salary: '',
          position: '',
        });
      }
    } catch (error) {
      console.error('Error creating job:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to create job.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 py-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-4xl font-bold text-indigo-700 mb-2">Create New Job</h1>
      <p className="text-gray-600 mb-8 text-sm">Fill in the details below to post a new job opening.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Briefly describe the job role and responsibilities"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Requirements (comma-separated) <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="e.g. React, Node.js, MongoDB"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="locations"
              value={formData.locations}
              onChange={handleChange}
              placeholder="e.g. Bangalore"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Job Type <span className="text-red-500">*</span></label>
            <select
              name="jobtype"
              value={formData.jobtype}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
            >
              <option value="">Select Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Experience (years) <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              placeholder="e.g. 2"
              required
              min="0"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Salary (in ₹) <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. 60000"
              required
              min="0"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Open Positions <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g. 3"
              required
              min="1"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-lg shadow-md transition"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default NewJob;
