"use client"
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  gender: string;
  role: 'client' | 'lawyer' | 'admin';
}

export default function Profile() {
    const [profileData, setProfileData] = useState<User | null>(null);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const { user, token } = useAuth();

    useEffect(() => {
        if (user) {
            const userData: User = {
                id: user.userId?.toString() || 'default-user-id',
                email: user.email || '',
                fullName: user.fullName || '',
                phone: '',
                gender: 'Not specified',
                role: 'client',
            };
            setProfileData(userData);
        }
    }, [user]);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        if (!profileData || !user) {
            setError('Profile data not loaded');
            setLoading(false);
            return;
        }

        const updatePayload: {
            full_name: string;
            email: string;
            phone_number: string;
            gender: string;
            password?: string;
            user_id: number
        } = {
            full_name: profileData.fullName,
            email: profileData.email,
            phone_number: profileData.phone,
            gender: profileData.gender,
            user_id: user.userId 
        };

        if (password) {
            updatePayload.password = password;
        }

        try {
            const response = await fetch(`http://localhost:3002/updateUser/:user_id`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatePayload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update profile');
            }

            setSuccess(true);
            setPassword('');
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Profile Settings</h2>
            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    {error}
                </div>
            )}
            {success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                    Profile updated successfully!
                </div>
            )}
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
                                placeholder="Enter new password (leave blank to keep current)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </form>
                ) : (
                    <p className="text-gray-600">Loading profile data...</p>
                )}
            </div>
        </div>
    );
}