import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Linkedin, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const user = useSelector((store) => store.auth.user);
  const userrole = user?.role || "guest";

  const isGuest = userrole === "guest";

  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <h3 className="text-2xl font-semibold text-white">
              CareerBridge India
            </h3>

            <p className="text-slate-400 text-sm mt-4 leading-relaxed">
              Connecting students and professionals with top companies
              across India. Discover opportunities in technology, finance,
              design, and emerging industries.
            </p>

            <div className="mt-6 text-sm text-slate-400 space-y-1">
              <p>Bengaluru, Karnataka, India</p>
              <p>support@careerbridge.in</p>
              <p>+91 80456 77890</p>
            </div>
          </div>

          {/* JOB SEEKERS */}
          <div>
            <h4 className="text-white font-semibold mb-5">
              Job Seekers
            </h4>

            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/jobs" className="hover:text-white transition">Browse Jobs</Link></li>
              <li><Link to="/browse" className="hover:text-white transition">Smart Discovery</Link></li>
              <li><Link to="/companies" className="hover:text-white transition">Top Companies</Link></li>
              <li><Link to="/career-advice" className="hover:text-white transition">Career Advice</Link></li>

              {isGuest && (
                <>
                  <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
                  <li><Link to="/signup" className="hover:text-white transition">Create Account</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* EMPLOYERS */}
          <div>
            <h4 className="text-white font-semibold mb-5">
              Employers
            </h4>

            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/post-job" className="hover:text-white transition">Post a Job</Link></li>
              <li><Link to="/talent-search" className="hover:text-white transition">Search Candidates</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition">Pricing Plans</Link></li>
              <li><Link to="/recruiter-login" className="hover:text-white transition">Recruiter Login</Link></li>
            </ul>
          </div>

          {/* CITIES + SOCIAL */}
          <div>
            <h4 className="text-white font-semibold mb-5">
              Popular Cities
            </h4>

            <ul className="space-y-3 text-sm text-slate-400">
              <li>Bengaluru</li>
              <li>Mumbai</li>
              <li>Delhi NCR</li>
              <li>Hyderabad</li>
              <li>Pune</li>
              <li>Chennai</li>
            </ul>

            <div className="mt-6 flex gap-5 text-slate-400">
              <a href="#" className="hover:text-white transition">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} CareerBridge India Pvt. Ltd. All rights reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-white transition">
              Cookie Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;