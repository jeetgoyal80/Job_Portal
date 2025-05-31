import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { EndPointUserURLCOMPANY } from '@/utils/constant';

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

const CompanyProfile = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    logo: '',
    location: '',
    industry: '',
  });

  const [logoPreview, setLogoPreview] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${EndPointUserURLCOMPANY}/get/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          const data = res.data.company;
          setCompany(data);
          setFormData({
            name: data.name || '',
            description: data.description || '',
            website: data.website || '',
            logo: data.logo || '',
            location: data.location || '',
            industry: data.industry || '',
          });
          setLogoPreview(data.logo);
        }
      } catch (err) {
        console.error('Failed to fetch company:', err);
      }
    };

    fetchCompany();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`${EndPointUserURLCOMPANY}/update/${id}`, formData, {
        withCredentials: true,
      });
      if (res.data.success) {
        setCompany(formData);
        setEditMode(false);
      }
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update company.');
    }
  };

  if (!company) return <div className="p-6 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 sm:gap-0">
        <h2 className="text-3xl font-bold text-gray-800">Company Profile</h2>
        {editMode ? (
          <div className="flex gap-3">
            <Button className="bg-[#d05d28] hover:bg-[#b74c1f] text-white" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outline" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button onClick={() => setEditMode(true)}>Edit</Button>
        )}
      </div>

      {/* Responsive layout: stack vertically on mobile, horizontal on sm+ */}
      <div className="flex flex-col sm:flex-row gap-8 items-start">
        <div className="flex flex-col items-center sm:items-start">
          <img
            src={logoPreview || 'https://via.placeholder.com/120'}
            alt="Company Logo"
            className="w-32 h-32 rounded-lg object-cover border"
          />
          {editMode && (
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="mt-2 text-sm text-gray-600"
            />
          )}
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            {editMode ? (
              <Input name="name" value={formData.name} onChange={handleChange} />
            ) : (
              <p className="text-lg font-medium text-gray-800">{company.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-500">Industry</label>
            {editMode ? (
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md p-2 text-gray-700"
              >
                <option value="">Select Industry</option>
                {industryOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-lg text-gray-700">{company.industry}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-500">Website</label>
            {editMode ? (
              <Input name="website" value={formData.website} onChange={handleChange} />
            ) : (
              <a
                href={company.website}
                className="text-blue-600 hover:underline break-words"
                target="_blank"
                rel="noopener noreferrer"
              >
                {company.website}
              </a>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-500">Location</label>
            {editMode ? (
              <Input name="location" value={formData.location} onChange={handleChange} />
            ) : (
              <p className="text-lg text-gray-700">{company.location}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <label className="text-sm text-gray-500">Description</label>
        {editMode ? (
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full border border-gray-300 rounded-md p-2 resize-none"
          />
        ) : (
          <p className="mt-2 text-gray-700 leading-relaxed whitespace-pre-wrap">{company.description}</p>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
