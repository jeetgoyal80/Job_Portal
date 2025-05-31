import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authslice';
import { toast } from 'sonner';
import axios from 'axios';
import { EndPointUserURL } from '@/utils/constant';
import { setAppliedJobs, setjobs } from '@/redux/jobslice';
import { setcompanies } from '@/redux/companySlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector(store => store.auth.user);
  const userrole = user?.role || 'student';

  const logout = async () => {
    try {
      await axios.get(`${EndPointUserURL}/logout`, { withCredentials: true });
      dispatch(setUser(null));
      dispatch(setAppliedJobs([]));
      dispatch(setcompanies([]));
      dispatch(setjobs([]));
      navigate('/login');
      toast.success("Logout Successfully");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  };


  const showForStudent = userrole === 'student';
  const showForRecruiter = userrole === 'recruiter';

  const renderNavLinks = () => (
    <>
      {(!user || showForStudent) && (
        <Link to="/">
          <span className="hover:text-[#d05d28] transition-colors cursor-pointer">Home</span>
        </Link>
      )}
      {userrole==='student'?(<Link to='/job'>
        <span className="hover:text-[#d05d28] transition-colors cursor-pointer">Jobs</span>
      </Link>):''}
      
      {(!user || showForStudent) && (
        <Link to="/browse">
          <span className="hover:text-[#d05d28] transition-colors cursor-pointer">Browse</span>
        </Link>
      )}
      {showForRecruiter && (
        <Link to="/companies">
          <span className="hover:text-[#d05d28] transition-colors cursor-pointer">Companies</span>
        </Link>
      )}
    </>
  );

  const renderAuthButtons = () => (
    <>
      <Link to="/signup">
        <Button variant="outline">Signup</Button>
      </Link>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    </>
  );

  const renderUserPopover = () => (
    <Popover>
      <PopoverTrigger>
        <Avatar className="cursor-pointer hover:ring-2 hover:ring-[#d05d28] transition">
          <AvatarImage src={user.profile.profilePhoto || 'https://github.com/shadcn.png'} />
          <AvatarFallback>{user.fullname ? user.fullname[0].toUpperCase() : 'U'}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-4 space-y-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.profile.profilePhoto || 'https://github.com/shadcn.png'} />
            <AvatarFallback>{user.fullname ? user.fullname[0].toUpperCase() : 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-bold text-sm">{user.fullname}</h2>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {showForStudent && (
            <Link to="/profile">
              <Button variant="outline" className="w-full text-sm">
                View Profile
              </Button>
            </Link>
          )}
          <Button
            className="bg-[#d05d28] hover:bg-[#b74c1f] text-white w-full text-sm"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <header className="w-full px-6 py-4 z-50 bg-white shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-extrabold tracking-tight text-gray-900">
          Job <span className="text-[#d05d28]">Portal</span>
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6 z-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <nav className="hidden lg:flex gap-6 text-gray-700 font-medium">
          {renderNavLinks()}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          {!user ? renderAuthButtons() : renderUserPopover()}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 space-y-4 z-20">
          <nav className="flex flex-col gap-3 text-gray-700 font-medium">
            {renderNavLinks()}
          </nav>

          <div className="flex flex-col gap-3 mt-4">
            {!user ? (
              renderAuthButtons()
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.profile.profilePhoto || 'https://github.com/shadcn.png'} />
                    <AvatarFallback>{user.fullname ? user.fullname[0].toUpperCase() : 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-bold text-sm">{user.fullname}</h2>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                {showForStudent && (
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full text-sm">
                      View Profile
                    </Button>
                  </Link>
                )}
                <Button
                  className="bg-[#d05d28] hover:bg-[#b74c1f] text-white w-full text-sm"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
