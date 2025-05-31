// src/components/custom/FilterArea.jsx
import React, { useEffect, useState } from 'react';
import { Slider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setFilter, clearFilters } from '@/redux/jobfilterslice';

const FilterArea = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [salary, setSalary] = useState([0, 50]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);


  const locations = ['Remote', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad'];
  const profiles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack',
    'Data Scientist',
    'Designer',
  ];

  useEffect(() => {
   clearAll()
  
   
  }, [])
  
  const handleSalaryChange = (_, newValue) => {
    setSalary(newValue);
  };

  const handleCheckboxChange = (value, type) => {
    const updater = type === 'location' ? setSelectedLocations : setSelectedProfiles;
    const selected = type === 'location' ? selectedLocations : selectedProfiles;
    if (selected.includes(value)) {
      updater(selected.filter((item) => item !== value));
    } else {
      updater([...selected, value]);
    }
  };

  const applyFilters = () => {
    // Dispatch each filter into Redux
    dispatch(setFilter({ key: 'salaryRange', value: { min: salary[0], max: salary[1] } }));
    dispatch(setFilter({ key: 'location', value: selectedLocations }));
    dispatch(setFilter({ key: 'profile', value: selectedProfiles }));
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
      {/* Toggle button for mobile */}
      <div className="lg:hidden mb-4 px-6 flex justify-center items-center">
        <button
          onClick={() => setIsOpen((o) => !o)}
          aria-expanded={isOpen}
          aria-controls="filter-panel"
          className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
          title={isOpen ? 'Hide Filters' : 'Show Filters'}
        >
          {isOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filter panel */}
      <div
        id="filter-panel"
        className={`bg-white w-full md:w-[280px] p-6 rounded-2xl shadow-md border border-gray-200 sticky top-4 h-fit
          ${isOpen ? 'block' : 'hidden'} lg:block`}
        role="region"
        aria-labelledby="filter-heading"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" id="filter-heading">
          Filter Jobs {totalSelected > 0 && `(${totalSelected} selected)`}
        </h2>

        {/* Location */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Location</h3>
          <div className="flex flex-col gap-3">
            {locations.map((loc) => (
              <label
                key={loc}
                className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-black transition"
              >
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(loc)}
                  onChange={() => handleCheckboxChange(loc, 'location')}
                  className="h-5 w-5 rounded border-gray-300"
                />
                <span className="select-none">{loc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Salary */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Salary Range (LPA)</h3>
          <Slider
            value={salary}
            onChange={handleSalaryChange}
            valueLabelDisplay="auto"
            min={0}
            max={50}
            sx={{
              color: '#111827',
              '& .MuiSlider-thumb': {
                borderRadius: '50%',
                border: '2px solid currentColor',
              },
            }}
          />
          <p className="mt-2 text-sm text-gray-500">
            ₹{salary[0]}L – ₹{salary[1]}L
          </p>
        </div>

        {/* Profile */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Job Profile</h3>
          <div className="flex flex-col gap-3">
            {profiles.map((profile) => (
              <label
                key={profile}
                className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-black transition"
              >
                <input
                  type="checkbox"
                  checked={selectedProfiles.includes(profile)}
                  onChange={() => handleCheckboxChange(profile, 'profile')}
                  className="h-5 w-5 rounded border-gray-300"
                />
                <span className="select-none">{profile}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-2">
          <button
            onClick={applyFilters}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition"
          >
            Apply Filters
          </button>
          <button
            onClick={clearAll}
            className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterArea;
