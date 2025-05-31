import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setUser } from '@/redux/authslice';
import { EndPointUserURL } from '@/utils/constant';

const Profilebox = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const defaultAvatar =
    'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    skills: '',
    bio: '',
    resume: '',
    profilePhoto: '',
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        skills: user.profile?.skills?.join(', ') || '',
        bio: user.profile?.bio || '',
        resume: user.profile?.resume || '',
        profilePhoto: user.profile?.profilePhoto || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhotoFile(file);
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePhoto: URL.createObjectURL(file),
      }));
    }
  };

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append('fullname', formData.fullname);
      data.append('phoneNumber', formData.phoneNumber);
      data.append('skills', formData.skills);
      data.append('bio', formData.bio);

      if (resumeFile) data.append('resume', resumeFile);
      if (profilePhotoFile) data.append('profilePhoto', profilePhotoFile);

      const res = await axios.put(`${EndPointUserURL}/update`, data, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        toast.success('Profile updated');
        dispatch(setUser(res.data.user));
        setEditing(false);
      } else {
        toast.error('Update failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating profile');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 relative bg-white rounded-xl shadow-md">
      <button
        onClick={editing ? handleSave : handleEditClick}
        className="absolute top-4 left-4 px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-900"
      >
        {editing ? 'Save' : 'Edit'}
      </button>

      <div className="flex flex-col items-center gap-4 mb-6">
        <img
          src={formData.profilePhoto || defaultAvatar}
          alt="Profile"
          className="w-28 h-28 object-cover rounded-full border border-gray-300"
        />
        {editing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePhotoChange}
            className="text-sm"
          />
        )}
        {editing ? (
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="text-xl font-semibold text-center border-b border-gray-300"
          />
        ) : (
          <h2 className="text-2xl font-semibold">
            {formData.fullname || 'N/A'}
          </h2>
        )}
        <p className="text-gray-600">{formData.email}</p>
      </div>

      <div className="space-y-4 text-sm">
        <div>
          <p className="text-gray-500 font-medium">Phone</p>
          {editing ? (
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border-b border-gray-300"
            />
          ) : (
            <p>{formData.phoneNumber || 'Not Provided'}</p>
          )}
        </div>

        <div>
          <p className="text-gray-500 font-medium">Bio</p>
          {editing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border border-gray-300 p-1 rounded"
              rows={3}
            />
          ) : (
            <p>{formData.bio || 'Not Provided'}</p>
          )}
        </div>

        <div>
          <p className="text-gray-500 font-medium">Skills</p>
          {editing ? (
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Comma-separated skills"
              className="w-full border-b border-gray-300"
            />
          ) : (
            <p>{formData.skills || 'Not Provided'}</p>
          )}
        </div>

        <div>
          <p className="text-gray-500 font-medium">Resume</p>
          {formData.resume ? (
            <a
              href={formData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Resume
            </a>
          ) : (
            <p>Not Uploaded</p>
          )}
          {editing && (
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="mt-2 text-sm"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profilebox;
