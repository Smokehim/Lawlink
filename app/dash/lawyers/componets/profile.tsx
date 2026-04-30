"use client"
import React, { useState, useEffect, FormEvent, useRef } from 'react';
import { Upload, FileText, Camera, User as UserIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import ChangePassword from './changePassword';
import { useAuth } from '@/app/context/AuthContext';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

const Profile = () => {
  const { user, logout, setUserData } = useAuth();
  const [activeTab, setActiveTab] = useState<'info' | 'password' | 'delete'>('info');

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    gender: '',
    province: '',
    district: '',
    specialization: '',
    bio: '',
    lawyer_type: '',
    password: ''
  });

  const [deletePassword, setDeletePassword] = useState('');
  const [deleteEmail, setDeleteEmail] = useState('');
  const [status, setStatus] = useState('');
  
  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        userId: user.userId,
        full_name: user.fullName || '',
        email: user.email || '',
        phone_number: user.phone_number || user.phone || '',
        gender: user.gender || '',
        province: user.province || '',
        district: user.district || '',
        specialization: user.specialization || '',
        lawyer_type: user.lawyer_type || 'lawyer',
        bio: user.bio || '',
      }));
    }
  }, [user]);

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setStatus('Updating...');

    const updates = { ...formData };

    try {
      const res = await fetch(`${API_BASE}/updateLawyer/${user.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.message || 'Update failed'); }
      setStatus('Profile updated successfully!');
      // Update user data in context
      setUserData({
        ...user,
        userId: user.userId,
        fullName: updates.full_name,
        email: updates.email,
        phone: updates.phone_number,
        gender: updates.gender,
        province: updates.province,
        district: updates.district,
        specialization: updates.specialization,
        lawyer_type: updates.lawyer_type,
        bio: updates.bio,
      });
    } catch (error) {
      setStatus(`Update Error: ${error}`);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setStatus('');
    setIsUploading(true);
    const formData = new FormData();
    formData.append('userId', user.userId.toString());
    formData.append('role', 'lawyer');
    formData.append('profile_picture', file);

    try {
      const res = await fetch(`${API_BASE}/upload-profile-picture`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');
      
      setStatus('Profile picture updated!');
      setUserData({
        ...user,
        profile_picture: data.profile_picture
      });
    } catch (err: unknown) {
      setStatus(`Upload Error: ${(err as Error).message}`);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };


  const handleDeleteSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (deleteEmail !== user.email) {
      setStatus('Delete Error: The entered email does not match your account email.');
      return;
    }
    // if (!window.confirm('Are you sure you want to permanently delete your account?')) return;

    setStatus('Deleting account...');
    try {
      const res = await fetch(`${API_BASE}/lawyers/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.userId,
          email: user.email,
          password: deletePassword
        })
      });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.message || 'Delete failed'); }
      setStatus('Account deleted successfully. You will be logged out.');
      logout();
    } catch (error) {
      setStatus(`Delete Error: ${error}`);
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 border-b pb-4">
        <button
          onClick={() => setActiveTab('info')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'info' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          Profile Info
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'password' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          Change Password
        </button>
        <button
          onClick={() => setActiveTab('delete')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'delete' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          Delete Account
        </button>
      </div>

      <div>
        {activeTab === 'info' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Update Your Profile</h2>
            
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                {user?.profile_picture ? (
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 relative bg-gray-50">
                    <Image 
                      src={`${API_BASE}${user.profile_picture}`} 
                      alt="Profile" 
                      fill 
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-gray-100 bg-purple-600 flex items-center justify-center">
                    <span className="text-white text-5xl font-bold">{user?.fullName?.charAt(0).toUpperCase() || 'L'}</span>
                  </div>
                )}
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/jpeg,image/png,image/jpg"
                  className="hidden"
                />
              </div>
              <p className="text-sm text-gray-500 mt-3">Upload a new picture (JPG/PNG)</p>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Enter your full name"
                  value={formData.full_name}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone_number"
                  placeholder="+260 XXX XXX XXX"
                  value={formData.phone_number}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  aria-label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                <select
                  aria-label="Province"
                  name="province"
                  value={formData.province}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="">Select Province</option>
                  <option value="Lusaka">Lusaka</option>
                  <option value="Copperbelt">Copperbelt</option>
                  <option value="Southern">Southern</option>
                  <option value="Eastern">Eastern</option>
                  <option value="Western">Western</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                <select
                  aria-label="District"
                  name="district"
                  value={formData.district}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="">Select District</option>
                  <option value="Lusaka">Lusaka</option>
                  <option value="Chilanga">Chilanga</option>
                  <option value="Ndola">Ndola</option>
                  <option value="Livingstone">Livingstone</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <select
                  aria-label="Specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="">Select Specialization</option>
                  <option value="Corporate Law">Corporate Law</option>
                  <option value="Family Law">Family Law</option>
                  <option value="Criminal Law">Criminal Law</option>
                  <option value="Property Law">Property Law</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Professional Role</label>
                <select
                  aria-label="Professional Role"
                  name="lawyer_type"
                  value={formData.lawyer_type}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="lawyer">Lawyer</option>
                  <option value="attorney">Attorney</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  placeholder="Tell us about yourself"
                  value={formData.bio}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certificates</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload your certificates</p>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Choose Files
                  </button>
                </div>
                {user.certificates && user.certificates.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {user.certificates.map((cert: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                        <FileText className="w-4 h-4" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* License File Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Professional License</label>
                {user.license_file ? (
                  <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="w-6 h-6 text-purple-600 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Lawyer License Document</p>
                          <p className="text-xs text-gray-500">Uploaded during registration</p>
                        </div>
                      </div>
                      <a 
                        href={`${API_BASE}${user.license_file}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium"
                      >
                        View License
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">No license file found on your profile.</p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="New Password (optional)"
                  value={formData.password}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Update Profile
              </button>
              {status && !status.includes('Delete') && <p className="mt-4 font-semibold">{status}</p>}
            </form>
          </div>
        )}

        {activeTab === 'password' && (<ChangePassword user={user} />)}


        {activeTab === 'delete' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Delete Your Account</h2>
            <form onSubmit={handleDeleteSubmit} className="space-y-4">
              <p className="text-gray-700">This action is irreversible. Please enter your email and password to confirm.</p>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={deleteEmail}
                onChange={(e) => setDeleteEmail(e.target.value)}
                placeholder="Enter your email to confirm"
                required
              />
              <input
                type="password"
                className="w-full p-2 border rounded"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Enter your current password"
                required
              />
              <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete Account</button>
              {status && status.includes('Delete') && <p className="mt-4 font-semibold">{status}</p>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
