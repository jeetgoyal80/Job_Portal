import React from 'react';
import Jobscards from './Jobscards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const demoJobs = useSelector(store => store.job.jobs || []);

  

  return (
    <section className="px-4 md:px-12 lg:px-24 py-12 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
        🔥 Latest & Top Job Openings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoJobs.length <= 0 ? (
          <p>No job found</p>
        ) : (
          demoJobs.map((job, index) => (
            <Jobscards key={index} job={job} />
          ))
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
