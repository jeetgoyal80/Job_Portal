import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Navbar from '@/components/custom/Navbar';
import axios from 'axios';
import { EndPointUserURL } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authslice';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: 'student',
    profilePhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };
  const navigate = new useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(setLoading(true));

    const formDataToSend = new FormData();
    formDataToSend.append('fullname', formData.fullName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phoneNumber', formData.phone);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('role', formData.role);

    if (formData.profilePhoto) {
      formDataToSend.append('profilePhoto', formData.profilePhoto); // ✅ field name must match multer
    }



    try {
      const res = await axios.post(`${EndPointUserURL}/register`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        toast.success(res.data.message || "Registration successful");
        navigate('/login');
      }
    } catch (error) {
      console.error("Registration failed:", error);
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
    finally {
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
            Create an Account
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
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
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="mb-4">
            <span className="block text-sm font-medium text-black mb-1">You are a</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={formData.role === 'student'}
                  onChange={handleChange}
                />
                <span>Student</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={formData.role === 'recruiter'}
                  onChange={handleChange}
                />
                <span>Recruiter</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-1">Profile Photo</label>
            <label
              htmlFor="profilePhoto"
              className="flex items-center justify-center w-full p-2 border border-gray-300 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
            >
              {formData.profilePhoto ? 'Change Photo' : 'Upload Photo'}
            </label>
            <input
              type="file"
              id="profilePhoto"
              name="profilePhoto"
              onChange={handleChange}
              className="hidden"
              accept="image/*"
            />
            {formData.profilePhoto && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {formData.profilePhoto.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Signup'}

          </button>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-black underline hover:text-gray-700">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>

  );
};

export default Signup;
