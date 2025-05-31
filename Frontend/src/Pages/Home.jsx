import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Caurselscategory from '@/components/custom/Caurselscategory';
import Footer from '@/components/custom/Footer';
import HeroSection from '@/components/custom/HeroSection';
import LatestJobs from '@/components/custom/LatestJobs';
import Navbar from '@/components/custom/Navbar';

import useFetchJobs from '@/Hooks/GetAllJobs';

const Home = () => {
  const user = useSelector(store => store.auth.user);
  const navigate = useNavigate();

  // ✅ Get all jobs using the custom hook
  useFetchJobs()

   // This will internally fetch jobs when component mounts

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/companies');
    }
  }, [user, navigate]); // ✅ Added dependencies

  return (
    <>
      <Navbar />
      <HeroSection />
      <Caurselscategory />
      <LatestJobs /> {/* Optional: pass jobs if needed */}
      <Footer />
    </>
  );
};

export default Home;
