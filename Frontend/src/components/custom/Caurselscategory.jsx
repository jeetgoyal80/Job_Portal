import React from 'react';
import { motion } from 'framer-motion';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

const categories = [
  'Full Stack',
  'Data Science',
  'Graphic Designer',
  'Video Editor',
  'DevOps',
  'Cybersecurity',
  'AI/ML Engineer',
  'Mobile Developer',
  'UI/UX Designer',
  'Cloud Architect',
  'Backend Developer',
  'Frontend Developer',
  'Game Developer',
  'Blockchain Developer',
  'Product Manager',
  'QA Engineer',
];

const Caurselscategory = () => {
  return (
    
    <section className="px-4 py-10 md:px-12 lg:px-20">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
        Explore Job Categories
      </h2>

      <ScrollArea className="w-full whitespace-nowrap rounded-md  p-4">
        <div className="flex gap-4 overflow-x-auto no-scrollbar">

          {categories.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.0}}
              className="min-w-[180px] bg-white border border-gray-200 rounded-xl px-5 py-4 shadow hover:shadow-lg cursor-pointer transition"
            >
              <h3 className="text-md font-semibold text-gray-900 mb-1">{item}</h3>
              <p className="text-xs text-gray-600">Jobs in {item}</p>
            </motion.div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default Caurselscategory;
