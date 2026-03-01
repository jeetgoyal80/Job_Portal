// src/components/custom/Alljobs.jsx
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Comp from "./Comp";

const Alljobs = () => {
  const jobs = useSelector((store) => store.job.jobs || []);
  const filters = useSelector((store) => store.jobFilters);

  const selectedLocations = filters.location || [];
  const selectedProfiles = filters.profile || [];
  const minLpa = filters.salaryRange?.min ?? 0;
  const maxLpa = filters.salaryRange?.max ?? 50;
  const term = (filters.searchTerm || "").toLowerCase().trim();

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const jobLocation = (job.locations || "").toLowerCase();
      const jobTitle = (job.title || "").toLowerCase();
      const jobCompany = (job.company?.name || "").toLowerCase();
      const jobSalaryNum = Number(job.salary) || 0;

      const locationMatch =
        selectedLocations.length === 0 ||
        selectedLocations.some((loc) =>
          jobLocation.includes(loc.toLowerCase())
        );

      const profileMatch =
        selectedProfiles.length === 0 ||
        selectedProfiles.some((prof) =>
          jobTitle.includes(prof.toLowerCase())
        );

      const minSalaryRupees = minLpa * 100000;
      const maxSalaryRupees = maxLpa * 100000;
      const salaryMatch =
        jobSalaryNum >= minSalaryRupees &&
        jobSalaryNum <= maxSalaryRupees;

      const searchMatch =
        !term ||
        jobTitle.includes(term) ||
        jobCompany.includes(term);

      return locationMatch && profileMatch && salaryMatch && searchMatch;
    });
  }, [jobs, filters]);

  return (
    <section className="w-full">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Job Listings
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {filteredJobs.length} job{filteredJobs.length !== 1 && "s"} found
          </p>
        </div>

        {/* Sort Placeholder (future ready) */}
        <div className="mt-4 sm:mt-0">
          <select className="text-sm border border-gray-300 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900">
            <option>Sort by: Relevance</option>
            <option>Newest First</option>
            <option>Salary: High to Low</option>
            <option>Salary: Low to High</option>
          </select>
        </div>

      </div>

      {/* Jobs Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job, index) => (
            <Comp key={job._id || index} job={job} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-10 text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            No jobs found
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Try adjusting your filters or search criteria.
          </p>
        </div>
      )}
    </section>
  );
};

export default Alljobs;