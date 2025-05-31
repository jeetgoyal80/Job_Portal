import React from 'react';
import Navbar from '../components/custom/Navbar';
import JobCard from '../components/custom/Comp';
import Footer from '@/components/custom/Footer';
import { useSelector } from 'react-redux';
import { store } from '@/redux/store';

const Browse = () => {
  const jobs = useSelector(store => store.job.jobs) || [];
  const searchterm = useSelector(store => store.jobFilters.searchTerm)?.toLowerCase() || '';

  // Filter jobs based on title, company name, or description
  const filteredJobs = jobs.filter(job => {
    const title = job.title?.toLowerCase() || '';
    const description = job.description?.toLowerCase() || '';
    const company = job.company?.name?.toLowerCase() || '';
    return (
      title.includes(searchterm) ||
      description.includes(searchterm) ||
      company.includes(searchterm)
    );
  });

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">
          Search Results ({filteredJobs.length})
        </h2>

        {filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
