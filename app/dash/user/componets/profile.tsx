import React, { useState, useEffect, useRef } from 'react';
import { Camera, User as UserIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import ChangePassword from './changePassword';
import { useAuth } from '@/app/context/AuthContext';

const API_BASE = 'http://localhost:3002';

const UserProfile = () => {
    const { user, token, logout, setUserData } = useAuth();
    const [activeTab, setActiveTab] = useState<'info' | 'password' | 'delete'>('info');

    // State for update form
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone_number: ''
    });

    // State for delete form
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
                full_name: user.fullName || '',
                email: user.email || '',
                phone_number: user.phone || user.phone_number || ''
            }));
        }
    }, [user]);

    const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setStatus('Updating...');

        // Send all fields, allowing empty strings to clear values (except password if empty)
        const updates = { full_name: formData.full_name, phone_number: formData.phone_number };

        try {
            const res = await fetch(`${API_BASE}/users/${user.userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
            if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.message || 'Update failed'); }
            setStatus('Profile updated successfully!');
            if (user) {
                setUserData({
                    ...user,
                    fullName: updates.full_name,
                    phone: updates.phone_number
                });
            }
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
        formData.append('role', 'user');
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
            // Update auth token local storage (optional depending on how user data is persisted but setUserData does it)
        } catch (err: unknown) {
            setStatus(`Upload Error: ${(err as Error).message}`);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };


    const handleDeleteSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        if (deleteEmail !== user.email) {
            setStatus('Delete Error: The entered email does not match your account email.');
            return;
        }
        if (!window.confirm('Are you sure you want to permanently delete your account?')) return;

        setStatus('Deleting account...');
        try {
            const res = await fetch(`${API_BASE}/delete_user`, {
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
            // Add your logout logic here (e.g., clear local storage, redirect)
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
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'info' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    Profile Info
                </button>
                <button
                    onClick={() => setActiveTab('password')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'password' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
                    <div className="bg-white p-6 rounded-lg shadow-md">
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
                                    <div className="w-32 h-32 rounded-full border-4 border-gray-100 bg-gray-50 flex items-center justify-center">
                                        <UserIcon className="w-16 h-16 text-gray-300" />
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                    className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
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

                        <form onSubmit={handleUpdateSubmit} className="space-y-4">
                            <input className="w-full p-2 border rounded" name="full_name" value={formData.full_name} onChange={handleUpdateChange} placeholder="Full Name" />
                            <input className="w-full p-2 border rounded bg-gray-100" name="email" type="email" value={formData.email} readOnly placeholder="Email" />
                            <input className="w-full p-2 border rounded" name="phone_number" value={formData.phone_number} onChange={handleUpdateChange} placeholder="Phone Number" />
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update Profile</button>
                            {status && !status.includes('Delete') && <p className="mt-4 font-semibold">{status}</p>}
                        </form>
                    </div>
                )}

                {activeTab === 'password' && (<ChangePassword user={user} token={token} />)}


                {activeTab === 'delete' && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4 text-red-600">Delete Your Account</h2>
                        <form onSubmit={handleDeleteSubmit} className="space-y-4">
                            <p className="text-gray-700">This action is irreversible. Please enter your password to confirm.</p>
                            <input
                                type="password"
                                className="w-full p-2 border rounded"
                                value={deletePassword}
                                onChange={(e) => setDeletePassword(e.target.value)}
                                placeholder="Enter your current password"
                                required
                            />
                            <input
                                type="email"
                                className="w-full p-2 border rounded"
                                value={deleteEmail}
                                onChange={(e) => setDeleteEmail(e.target.value)}
                                placeholder="Enter your email to confirm"
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

export default UserProfile;