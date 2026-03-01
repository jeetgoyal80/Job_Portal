// src/components/custom/FilterArea.jsx
import React, { useEffect, useState } from "react";
import { Slider } from "@mui/material";
import { useDispatch } from "react-redux";
import { setFilter, clearFilters } from "@/redux/jobfilterslice";

const FilterArea = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [salary, setSalary] = useState([0, 50]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  const locations = ["Remote", "Bangalore", "Mumbai", "Delhi", "Hyderabad"];
  const profiles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack",
    "Data Scientist",
    "Designer",
  ];

  useEffect(() => {
    clearAll();
  }, []);

  const handleSalaryChange = (_, newValue) => {
    setSalary(newValue);
  };

  const handleCheckboxChange = (value, type) => {
    const updater = type === "location" ? setSelectedLocations : setSelectedProfiles;
    const selected = type === "location" ? selectedLocations : selectedProfiles;

    if (selected.includes(value)) {
      updater(selected.filter((item) => item !== value));
    } else {
      updater([...selected, value]);
    }
  };

  const applyFilters = () => {
    dispatch(setFilter({ key: "salaryRange", value: { min: salary[0], max: salary[1] } }));
    dispatch(setFilter({ key: "location", value: selectedLocations }));
    dispatch(setFilter({ key: "profile", value: selectedProfiles }));
  };

  const clearAll = () => {
    setSalary([0, 50]);
    setSelectedLocations([]);
    setSelectedProfiles([]);
    dispatch(clearFilters());
  };

  const totalSelected = selectedLocations.length + selectedProfiles.length;

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden mb-4 flex justify-center">
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="px-4 py-2 text-sm font-medium rounded-full bg-gray-800 text-white hover:bg-gray-700 transition"
        >
          {isOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filter Panel */}
      <div
        className={`w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-6 
        sticky top-[90px] h-fit
        ${isOpen ? "block" : "hidden"} lg:block`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Filters
          </h2>

          {totalSelected > 0 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {totalSelected} selected
            </span>
          )}
        </div>

        {/* LOCATION */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">
            Location
          </h3>

          <div className="space-y-3">
            {locations.map((loc) => (
              <label
                key={loc}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(loc)}
                  onChange={() => handleCheckboxChange(loc, "location")}
                  className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                <span className="text-gray-700 group-hover:text-black transition">
                  {loc}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 my-6" />

        {/* SALARY */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">
            Salary (LPA)
          </h3>

          <Slider
            value={salary}
            onChange={handleSalaryChange}
            valueLabelDisplay="auto"
            min={0}
            max={50}
            sx={{
              color: "#111827",
              "& .MuiSlider-thumb": {
                border: "2px solid currentColor",
              },
            }}
          />

          <p className="mt-3 text-sm text-gray-500">
            ₹{salary[0]}L – ₹{salary[1]}L
          </p>
        </div>

        <div className="border-t border-gray-100 my-6" />

        {/* PROFILE */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">
            Job Role
          </h3>

          <div className="space-y-3">
            {profiles.map((profile) => (
              <label
                key={profile}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedProfiles.includes(profile)}
                  onChange={() => handleCheckboxChange(profile, "profile")}
                  className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                <span className="text-gray-700 group-hover:text-black transition">
                  {profile}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3 pt-4">
          <button
            onClick={applyFilters}
            className="w-full py-2.5 rounded-xl bg-gray-900 text-white font-medium hover:bg-black transition"
          >
            Apply Filters
          </button>

          <button
            onClick={clearAll}
            className="w-full py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterArea;