'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from '@/components/custom/Navbar';
import { useNavigate } from 'react-router-dom';
import { EndPointUserURLCOMPANY } from '@/utils/constant';
import axios from 'axios';

const industryOptions = [
  'Information Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Manufacturing',
  'Retail',
  'Construction',
  'Energy',
  'Transportation',
  'Media',
  'Others',
];

const CompanyRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    size: '',
    founded: '',
    description: '',
    website: '',
    logo: null,
  });

  const [locationFields, setLocationFields] = useState({
    houseNo: '',
    area: '',
    landmark: '',
    type: 'Office',
  });

  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocationFields(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const location = `House No: ${locationFields.houseNo}, Area: ${locationFields.area}, Landmark: ${locationFields.landmark}, Type: ${locationFields.type}`;

    const payload = new FormData();
    payload.append('name', formData.companyName); // backend expects 'name'
    payload.append('industry', formData.industry);
    payload.append('size', formData.size);
    payload.append('founded', formData.founded);
    payload.append('description', formData.description);
    payload.append('website', formData.website);
    payload.append('location', location);
    if (formData.logo) payload.append('logo', formData.logo);

    try {
      const response = await axios.post(
        `${EndPointUserURLCOMPANY}/register`,
        payload,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success('Company registered successfully!');
      }

      setFormData({
        companyName: '',
        industry: '',
        size: '',
        founded: '',
        description: '',
        website: '',
        logo: null,
      });

      setLocationFields({
        houseNo: '',
        area: '',
        landmark: '',
        type: 'Office',
      });

      setPreview(null);
      navigate('/companies');

    } catch (error) {
      console.error(error);
      const errMsg =
        error.response?.data?.message ||
        'Failed to register company';
      toast.error(`Error: ${errMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster />

      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 py-12 px-4">
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-3xl shadow-xl">
          <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 mb-8">
            Register Your Company
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="industry">Industry</Label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Industry</option>
                  {industryOptions.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="size">Company Size</Label>
                <Input
                  id="size"
                  name="size"
                  placeholder="e.g. 50-200"
                  value={formData.size}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="founded">Founded Year</Label>
                <Input
                  id="founded"
                  name="founded"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.founded}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                type="url"
                placeholder="https://example.com"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="houseNo">House No.</Label>
                <Input
                  id="houseNo"
                  name="houseNo"
                  value={locationFields.houseNo}
                  onChange={handleLocationChange}
                />
              </div>
              <div>
                <Label htmlFor="area">Area</Label>
                <Input
                  id="area"
                  name="area"
                  value={locationFields.area}
                  onChange={handleLocationChange}
                />
              </div>
              <div>
                <Label htmlFor="landmark">Landmark</Label>
                <Input
                  id="landmark"
                  name="landmark"
                  value={locationFields.landmark}
                  onChange={handleLocationChange}
                />
              </div>
              <div>
                <Label htmlFor="type">Location Type</Label>
                <select
                  id="type"
                  name="type"
                  value={locationFields.type}
                  onChange={handleLocationChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Office">Office</option>
                  <option value="Headquarters">Headquarters</option>
                  <option value="Factory">Factory</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="logo">Company Logo</Label>
              <div className="mt-1 flex items-center gap-4">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Logo Preview"
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg rounded-xl transition duration-300"
            >
              {isSubmitting ? 'Submitting...' : 'Register Company'}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompanyRegister;
