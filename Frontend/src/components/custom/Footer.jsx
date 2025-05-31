import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Footer = () => {
  const user = useSelector(store => store.auth.user);
  const userrole = user?.role || 'guest';

  const showForStudent = userrole === 'student';
  const showForRecruiter = userrole === 'recruiter';
  const isGuest = userrole === 'guest';

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">Job Portal</h3>
          <p className="text-gray-400 text-sm">
            Your trusted platform to find the best job opportunities and connect with top companies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-orange-500 transition">Home</Link></li>

            {showForStudent && (
              <li><Link to="/job" className="hover:text-orange-500 transition">Jobs</Link></li>
            )}

            {(showForStudent || isGuest) && (
              <li><Link to="/browse" className="hover:text-orange-500 transition">Browse</Link></li>
            )}

            {showForRecruiter && (
              <li><Link to="/companies" className="hover:text-orange-500 transition">Companies</Link></li>
            )}

            {isGuest && (
              <>
                <li><Link to="/login" className="hover:text-orange-500 transition">Login</Link></li>
                <li><Link to="/signup" className="hover:text-orange-500 transition">Signup</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <p className="text-sm">
            123 Job St.<br />
            Career City, 456789<br />
            Email: support@jobportal.com<br />
            Phone: +91 98765 43210
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4 text-gray-400">
            {/* Social icons (unchanged) */}
            {/* Example for Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-orange-500 transition">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.326v21.348C0 23.411.59 24 1.326 24h11.495v-9.294h-3.123v-3.622h3.123v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.466.098 2.797.142v3.24l-1.919.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.59l-.467 3.622h-3.123V24h6.116C23.411 24 24 23.411 24 22.674V1.326C24 .59 23.411 0 22.675 0z" />
              </svg>
            </a>
            {/* Add other icons similarly... */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
