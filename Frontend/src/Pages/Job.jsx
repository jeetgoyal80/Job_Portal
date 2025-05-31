// src/Pages/Job.jsx
import React from 'react';
import Navbar from '@/components/custom/Navbar';
import FilterArea from '@/components/custom/FilterArea';
import Alljobs from '@/components/custom/Alljobs';
import Footer from '@/components/custom/Footer';

const Job = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="flex flex-col lg:flex-row gap-6 px-4 py-6 lg:px-8">
          {/* Sidebar for filters */}
          <aside className="lg:w-1/4 w-full lg:sticky lg:top-[80px] z-10">
            <FilterArea />
          </aside>

          {/* Job Listings (handles filtering internally) */}
          <main className="lg:w-3/4 w-full">
            <Alljobs />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Job;
