// src/components/custom/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { FiSearch, FiBriefcase, FiMapPin } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { updateSearchTerm } from '@/redux/jobfilterslice';
import { useNavigate } from 'react-router-dom';

// Keywords to display as tags
const keywords = [
  'Frontend',
  'Backend',
  'React',
  'Remote',
  'Internships',
  'Fresher Jobs',
  'Full-time',
  'Startups',
];

// Gradient backgrounds for “Dream Job”
const gradientBackgrounds = [
  'linear-gradient(90deg, #FF8C00, #1E3A8A)', // orange → dark blue
  'linear-gradient(90deg, #F59E0B, #1E40AF)', // amber → more royal blue
  'linear-gradient(90deg, #EA580C, #3B82F6)', // pumpkin orange → blue-500
];
const gradientDuration = 5; // seconds per cycle

const HeroSection = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  // Track mouse for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Controls for floating icons
  const floatControls = useAnimation();

  // Cycle gradient backgrounds
  const [gradIndex, setGradIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setGradIndex((prev) => (prev + 1) % gradientBackgrounds.length);
    }, gradientDuration * 1000);
    return () => clearInterval(timer);
  }, []);

  // Start floating icons animation
  useEffect(() => {
    floatControls.start({
      y: [0, -20, 0],
      transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
    });
  }, [floatControls]);

  const handleInputChange = (e) => setSearchInput(e.target.value);
  const applySearch = () => {
    dispatch(updateSearchTerm(searchInput.trim()));
    navigate('/browse');
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') applySearch();
  };

  // Parallax transforms: circles move opposite to mouse
  const parallaxX1 = useTransform(
    mouseX,
    [-window.innerWidth / 2, window.innerWidth / 2],
    [30, -30]
  );
  const parallaxY1 = useTransform(
    mouseY,
    [-window.innerHeight / 2, window.innerHeight / 2],
    [30, -30]
  );
  const parallaxX2 = useTransform(
    mouseX,
    [-window.innerWidth / 2, window.innerWidth / 2],
    [-40, 40]
  );
  const parallaxY2 = useTransform(
    mouseY,
    [-window.innerHeight / 2, window.innerHeight / 2],
    [-40, 40]
  );

  // 3D tilt on tags
  const tilt = (event, setX, setY) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setX(x * 15);
    setY(y * -15);
  };

  /** Framer Motion variants **/
  const tagContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const tagVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 250, damping: 20 },
    },
    hover: {
      scale: 1.1,
      backgroundColor: '#F97316', // orange on hover
      color: '#fff',
      transition: { duration: 0.2 },
    },
  };
  const underlineVariants = {
    hidden: { width: 0 },
    visible: { width: '100%', transition: { duration: 0.8, ease: 'easeInOut' } },
  };
  const searchBarVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.5, duration: 0.5 } },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  return (
    <section
      className="relative bg-[#0a0f2c] overflow-hidden"
      onMouseMove={(e) => {
        mouseX.set(e.clientX - window.innerWidth / 2);
        mouseY.set(e.clientY - window.innerHeight / 2);
      }}
      style={{ minHeight: '100vh' }}
    >
      {/* Parallax Background Circles */}
      <motion.div
        className="absolute w-[300px] h-[300px] bg-blue-700 opacity-25 rounded-full blur-3xl"
        style={{ x: parallaxX1, y: parallaxY1 }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] bg-teal-700 opacity-20 rounded-full blur-3xl"
        style={{ x: parallaxX2, y: parallaxY2 }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-white px-6 py-24">
        {/* Floating Icons */}
        <motion.div
          className="absolute top-16 left-8 text-blue-400 opacity-60"
          animate={floatControls}
        >
          <FiBriefcase size={40} />
        </motion.div>
        <motion.div
          className="absolute bottom-24 right-8 text-teal-400 opacity-60"
          animate={floatControls}
          transition={{ delay: 1.5, duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiMapPin size={44} />
        </motion.div>

        {/* Keyword Tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          variants={tagContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {keywords.map((kw, idx) => {
            const xTilt = useMotionValue(0);
            const yTilt = useMotionValue(0);
            return (
              <motion.div
                key={idx}
                className="bg-[#1e2347] text-[#cbd5e1] border border-[#334155] rounded-full px-3 py-1 shadow-md cursor-pointer select-none"
                style={{ rotateX: yTilt, rotateY: xTilt, perspective: 500 }}
                variants={tagVariants}
                whileHover="hover"
                onMouseMove={(e) => tilt(e, xTilt, yTilt)}
                onMouseLeave={() => {
                  xTilt.set(0);
                  yTilt.set(0);
                }}
                onClick={() => {
                  setSearchInput(kw);
                  dispatch(updateSearchTerm(kw));
                  navigate('/browse');
                }}
              >
                #{kw}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Heading with Animated Gradient “Dream Job” */}
        <div className="text-center mb-6">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Land Your{' '}
            <span
              className="relative inline-block px-1"
              style={{
                backgroundImage: gradientBackgrounds[gradIndex],
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                backgroundSize: '400% 400%',
                animation: `gradientAnimation ${gradientDuration}s ease infinite`,
              }}
            >
              Dream Job
            </span>{' '}
            Faster
          </motion.h1>
          <motion.div
            className="h-1 bg-[#F97316] mt-1 mx-auto"
            variants={underlineVariants}
            initial="hidden"
            animate="visible"
          />
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-[#cbd5e1] mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Explore 1000+ jobs tailored to your skills and interests — updated daily.
        </motion.p>

        {/* Search Bar */}
        <AnimatePresence>
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={searchBarVariants}
            whileHover="hover"
          >
            <div className="relative w-full sm:w-[400px]">
              <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-[#94a3b8] text-2xl" />
              <input
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search job titles, skills, or companies"
                className="w-full pl-12 pr-4 py-3 rounded-full border border-[#334155] shadow-md focus:ring-4 focus:ring-[#475569] focus:outline-none bg-[#1e2347] text-[#e2e8f0] placeholder-[#94a3b8] transition-all duration-300"
              />
            </div>
            <button
              onClick={applySearch}
              className="bg-gradient-to-r from-[#F97316] to-[#3B82F6] text-white px-6 py-3 rounded-full hover:from-[#FB923C] hover:to-[#2563EB] transition duration-300 shadow-lg"
            >
              Search
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hard-coded footer text to replace SVG wave */}
      <div className="absolute bottom-0 left-0 w-full bg-[#0f1437] py-6">
        <p className="text-center text-[#94a3b8]">
          JobPortal — Connecting Talent with Opportunity © {new Date().getFullYear()}
        </p>
      </div>

      {/* Extra CSS for gradient animation */}
      <style>
        {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
