"use client"
import { useState, useEffect } from 'react';


interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  gender: string;
  role: 'client' | 'lawyer' | 'admin';
}

interface ProfileProps {
  onNavigate?: (section: 'home' | 'search' | 'messages' | 'profile') => void;
}

export default function Profile({ onNavigate }: ProfileProps) {
    const [profileData, setProfileData] = useState<User | null>(null);
    
    // Initialize with mock user data (no API call)
    useEffect(() => {
        const mockUser: User = {
            id: '1',
            email: 'client@example.com',
            fullName: 'John Doe',
            phone: '+260 977 123 456',
            gender: 'male',
            role: 'client',
        };
        setProfileData(mockUser);
    }, []);

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Profile updated successfully!');
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Profile Settings</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
                {profileData ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                title="Full Name"
                                value={profileData.fullName || ''}
                                onChange={(e) => setProfileData({ ...profileData, id: profileData.id, fullName: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                title="Email"
                                value={profileData.email || ''}
                                onChange={(e) => setProfileData({ ...profileData, id: profileData.id, email: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                            <input
                                type="tel"
                                title="Phone"
                                value={profileData.phone || ''}
                                onChange={(e) => setProfileData({ ...profileData, id: profileData.id, phone: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                            <select
                                aria-label="Gender"
                                title="Gender"
                                value={profileData.gender || ''}
                                onChange={(e) => setProfileData({ ...profileData, id: profileData.id, gender: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                title="Password"
                                placeholder="Enter new password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
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