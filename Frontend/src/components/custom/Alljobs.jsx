// src/components/custom/Alljobs.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import Comp from './Comp';

const Alljobs = () => {
  // 1) Read both jobs array and filters from Redux:
  const jobs = useSelector((store) => store.job.jobs || []);
  const filters = useSelector((store) => store.jobFilters);

  // 2) Convert filter values into protected variables:
  const selectedLocations = filters.location || [];   // array of strings
  const selectedProfiles = filters.profile || [];     // array of strings
  const minLpa = filters.salaryRange?.min ?? 0;       // numeric LPA
  const maxLpa = filters.salaryRange?.max ?? 50;      // numeric LPA
  const term = (filters.searchTerm || '').toLowerCase().trim();

  // 3) Filter the jobs safely:
  const filteredJobs = jobs.filter((job) => {
    // a) Protect against missing fields in each job
    const jobLocation = (job.locations || '').toLowerCase();
    const jobTitle = (job.title || '').toLowerCase();
    const jobCompany = (job.company?.name || '').toLowerCase();
    const jobSalaryNum = Number(job.salary) || 0; // presumed in rupees

    // b) Location filter: if nothing selected, pass all
    const locationMatch =
      selectedLocations.length === 0 ||
      selectedLocations.some((loc) => jobLocation.includes(loc.toLowerCase()));

    // c) Profile/title filter: 
    const profileMatch =
      selectedProfiles.length === 0 ||
      selectedProfiles.some((prof) => jobTitle.includes(prof.toLowerCase()));

    // d) Salary filter: convert LPA → rupees
    const minSalaryRupees = minLpa * 100000;
    const maxSalaryRupees = maxLpa * 100000;
    const salaryMatch =
      jobSalaryNum >= minSalaryRupees && jobSalaryNum <= maxSalaryRupees;

    // e) Search‐term filter: match either jobTitle or jobCompany
    const searchMatch = 
      !term ||
      jobTitle.includes(term) ||
      jobCompany.includes(term);

    return locationMatch && profileMatch && salaryMatch && searchMatch;
  });

  return (
    <section id="alljobs" className="bg-gray-50 w-full">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
        Latest & Top Job Openings
      </h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <Comp key={job._id || index} job={job} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No jobs match your selected filters.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Alljobs;
