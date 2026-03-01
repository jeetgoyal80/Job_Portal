import React, { useMemo, useState } from "react";
import Navbar from "../components/custom/Navbar";
import JobCard from "../components/custom/Comp";
import Footer from "@/components/custom/Footer";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";

const Browse = () => {
  const jobs = useSelector((state) => state.job.jobs) || [];

  const [searchInput, setSearchInput] = useState("");
  const [activeTrend, setActiveTrend] = useState("");

  const trendingRoles = ["React", "Node", "Data", "Backend", "Frontend"];

  // 🧠 Intelligent Match Scoring
  const scoredJobs = useMemo(() => {
    const keyword = (activeTrend || searchInput).toLowerCase().trim();

    return jobs
      .map((job) => {
        const title = job.title?.toLowerCase() || "";
        const description = job.description?.toLowerCase() || "";
        const company = job.company?.name?.toLowerCase() || "";

        const combined = `${title} ${description} ${company}`;

        if (!keyword) return { ...job, matchScore: 0 };

        const occurrences = combined.split(keyword).length - 1;
        const score = Math.min(100, occurrences * 30);

        return { ...job, matchScore: score };
      })
      .filter((job) => (keyword ? job.matchScore > 0 : true))
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [jobs, searchInput, activeTrend]);

  const avgSalary =
    scoredJobs.length > 0
      ? (
          scoredJobs.reduce(
            (sum, job) => sum + (Number(job.salary) || 0),
            0
          ) /
          scoredJobs.length /
          100000
        ).toFixed(1)
      : 0;

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen">

        {/* ===== HEADER ===== */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-12">

            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
              Discover roles that match your profile
            </h1>

            {/* 🔎 SEARCH BAR */}
            <div className="mt-6 relative max-w-xl">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search roles, companies, skills..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setActiveTrend("");
                }}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <p className="text-sm text-gray-500 mt-6">
              {scoredJobs.length} opportunit
              {scoredJobs.length !== 1 ? "ies" : "y"} found
            </p>

          </div>
        </div>

        {/* ===== MAIN SECTION ===== */}
        <div className="max-w-7xl mx-auto px-4 py-10">

          {/* 🔥 TRENDING ROLES */}
          <div className="mb-12">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Trending Roles
            </h3>

            <div className="flex flex-wrap gap-3">
              {trendingRoles.map((role) => {
                const isActive = activeTrend === role.toLowerCase();

                return (
                  <button
                    key={role}
                    onClick={() => {
                      setActiveTrend(isActive ? "" : role.toLowerCase());
                      setSearchInput("");
                    }}
                    className={`px-4 py-2 rounded-full text-sm border transition
                    ${
                      isActive
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {role}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 📊 MARKET INSIGHT */}
          {scoredJobs.length > 0 && (
            <div className="bg-white border rounded-2xl p-6 mb-12">
              <h3 className="text-lg font-semibold text-gray-900">
                Market Insight
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Average salary in these results:
                <span className="ml-2 font-medium text-gray-900">
                  ₹{avgSalary} LPA
                </span>
              </p>
            </div>
          )}

          {/* ===== JOB RESULTS ===== */}
          {scoredJobs.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-16 text-center">
              <h3 className="text-lg font-semibold text-gray-700">
                No matching jobs found
              </h3>
              <p className="text-sm text-gray-500 mt-3">
                Try another keyword or explore trending roles.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {scoredJobs.map((job) => {
                let matchLabel = null;

                if (job.matchScore >= 85) {
                  matchLabel = "Strong match";
                } else if (job.matchScore >= 70) {
                  matchLabel = "Good match";
                }

                return (
                  <div
                    key={job._id}
                    className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    {/* Match Tag — inside flow, no overlap */}
                    {matchLabel && (
                      <div className="mb-3 inline-block bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-200">
                        {matchLabel}
                      </div>
                    )}

                    <JobCard job={job} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Browse;