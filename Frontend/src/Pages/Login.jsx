import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/custom/Navbar';
import axios from 'axios';
import { EndPointUserURL } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/authslice'; // Adjust path if needed

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: 'student',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const payload = new FormData();
    payload.append('email', loginData.email);
    payload.append('password', loginData.password);
    payload.append('role', loginData.role);

    try {
      const res = await axios.post(`${EndPointUserURL}/login`, payload, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || 'Login successful');

        // Save user info in Redux state
        dispatch(setUser(res.data.user));

        // Redirect to home page
        navigate('/');
      } else {
        toast.error(res.data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      const msg = err.response?.data?.message || 'Network or server error';
      toast.error(msg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            Login to Your Account
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="mb-6">
            <span className="block text-sm font-medium text-black mb-1">I am a</span>
            <div className="flex gap-4">
              {['student', 'recruiter'].map((r) => (
                <label key={r} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    checked={loginData.role === r}
                    onChange={handleChange}
                    className="accent-black"
                  />
                  <span className="capitalize">{r}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-black underline hover:text-gray-700">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
