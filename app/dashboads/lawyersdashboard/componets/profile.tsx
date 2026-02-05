"use client"
import { Upload, FileText } from 'lucide-react';

interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  gender: string;
  role: 'client' | 'lawyer' | 'admin';
  province?: string;
  district?: string;
  specialization?: string;
  status?: string;
  certificates?: string[];
}

interface ProfileProps {
  profileData: User | null;
  onProfileChange: (data: User) => void;
  onProfileUpdate: (e: React.FormEvent) => void;
}

export default function Profile({ profileData, onProfileChange, onProfileUpdate }: ProfileProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Profile Settings</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        {profileData ? (
          <form onSubmit={onProfileUpdate} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={profileData.fullName || ''}
                onChange={(e) => onProfileChange({ ...profileData, fullName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={profileData.email || ''}
                onChange={(e) => onProfileChange({ ...profileData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                placeholder="+260 XXX XXX XXX"
                value={profileData.phone || ''}
                onChange={(e) => onProfileChange({ ...profileData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                aria-label="Gender"
                value={profileData.gender || ''}
                onChange={(e) => onProfileChange({ ...profileData, gender: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
              <select
                aria-label="Province"
                value={profileData.province || ''}
                onChange={(e) => onProfileChange({ ...profileData, province: e.target.value })}
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
                value={profileData.district || ''}
                onChange={(e) => onProfileChange({ ...profileData, district: e.target.value })}
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
                value={profileData.specialization || ''}
                onChange={(e) => onProfileChange({ ...profileData, specialization: e.target.value })}
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
              {profileData.certificates && profileData.certificates.length > 0 && (
                <div className="mt-3 space-y-2">
                  {profileData.certificates.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                      <FileText className="w-4 h-4" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Update Profile
            </button>
          </form>
        ) : (
          <p className="text-gray-600">Loading profile data...</p>
        )}
      </div>
    </div>
  );
}
