import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { User, Lock, Save, Phone, Mail, FileText, Camera, Loader2 } from 'lucide-react';
import Image from 'next/image';

const API_BASE = 'http://localhost:3002';
export default function Profile() {
  const { user: admin, token, setUserData } = useAuth();

  // Profile Info State
  const [formData, setFormData] = useState({
    userId: admin?.userId || '',
    fullName: admin?.fullName || '',
    email: admin?.email || '',
    phone: admin?.phone_number || '',
    number: admin?.number || '',
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        userId: admin.userId || '',
        fullName: admin.fullName || '',
        email: admin.email || '',
        phone: admin.phone_number || '',
        number: admin.number || '',
      });
    }
  }, [admin]);
  const [activeTab, setActiveTab] = useState<'info' | 'security'>('info');

  // Password State
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });
  
  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setProfileMessage({ type: '', text: '' });

    try {
      const response = await fetch(`http://localhost:3002/adminsupdate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          admin_id: admin?.userId,
          full_name: formData.fullName,
          email: formData.email,
          phone_number: formData.phone,
          number: formData.number
        })
      });

      if (!response.ok) throw new Error('Failed to update profile');
      
      // Update local auth context so the header/sidebar name changes immediately
      if (setUserData && admin) {
        setUserData({
          ...admin,
          fullName: formData.fullName,
          email: formData.email,
          phone_number: formData.phone,
          number: formData.number
        });
      }

      setProfileMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error(error);
      setProfileMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
        setProfileMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !admin) return;

    setProfileMessage({ type: '', text: '' });
    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append('profile_picture', file);
    uploadData.append('userId', admin.userId.toString());
    uploadData.append('role', 'admin');

    try {
      const res = await fetch(`${API_BASE}/upload-profile-picture`, {
        method: 'POST',
        body: uploadData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');
      
      setProfileMessage({ type: 'success', text: 'Profile picture updated!' });
      if (setUserData) {
        setUserData({
          ...admin,
          profile_picture: data.profile_picture
        });
      }
    } catch (err: unknown) {
      setProfileMessage({ type: 'error', text: (err as Error).message || 'Failed to upload image' });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passwords.newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'New password must be at least 6 characters' });
      return;
    }

    setIsSavingPassword(true);
    setPasswordMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:3002/admins/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: admin?.email,
          current_password: passwords.currentPassword,
          new_password: passwords.newPassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update password');
      }

      setPasswordMessage({ type: 'success', text: 'Password updated successfully!' });
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: unknown) {
      setPasswordMessage({ type: 'error', text: (error as Error).message || 'Failed to update password' });
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Settings</h2>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 mb-8 bg-white rounded-t-lg overflow-hidden">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-4 px-6 text-center font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2 ${activeTab === 'info'
            ? 'bg-blue-600 text-white shadow-inner'
            : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'
            }`}
        >
          <User className={`w-4 h-4 ${activeTab === 'info' ? 'text-white' : 'text-gray-400'}`} />
          <span>Member Info</span>
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`flex-1 py-4 px-6 text-center font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2 ${activeTab === 'security'
            ? 'bg-blue-600 text-white shadow-inner'
            : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'
            }`}
        >
          <Lock className={`w-4 h-4 ${activeTab === 'security' ? 'text-white' : 'text-gray-400'}`} />
          <span>Security & Password</span>
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Profile Information Card */}
        {activeTab === 'info' && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8 space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                {admin?.profile_picture ? (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-gray-50 relative bg-gray-100 shadow-sm">
                    <Image 
                      src={`${API_BASE}${admin.profile_picture}`} 
                      alt="Profile" 
                      fill 
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-gray-50 bg-blue-50 flex items-center justify-center shadow-sm">
                    <User className="w-12 h-12 text-blue-500" />
                  </div>
                )}
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="absolute -bottom-2 -right-2 p-2.5 bg-blue-600 rounded-xl text-white hover:bg-blue-700 shadow-md transition-colors disabled:opacity-50"
                  title="Upload profile picture"
                >
                  {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/jpeg,image/png,image/jpg"
                  className="hidden"
                />
              </div>
              
              <div className="text-center sm:text-left pt-2">
                <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                <p className="text-sm text-gray-500 mt-1">Update your account details and contact info</p>
                <p className="text-xs text-gray-400 mt-2">Recommended: Square image, max 2MB (JPG/PNG)</p>
              </div>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="pl-11 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-11 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                    placeholder="admin@lawlink.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-11 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                    placeholder="+260 9xx xxx xxx"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ID Number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="pl-11 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter ID or staff number"
                  />
                </div>
              </div>

              {profileMessage.text && (
                <div className={`p-4 rounded-xl text-sm font-medium animate-in zoom-in-95 ${profileMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                  {profileMessage.text}
                </div>
              )}

              <button
                type="submit"
                disabled={isSavingProfile}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                <Save className="w-5 h-5" />
                <span>{isSavingProfile ? 'Saving Changes...' : 'Save Profile Changes'}</span>
              </button>
            </form>
          </div>
        )}

        {/* Change Password Card */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center mb-8">
              <div className="p-3 bg-purple-100 rounded-xl mr-4">
                <Lock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Security Settings</h3>
                <p className="text-sm text-gray-500">Keep your account secure with a strong password</p>
              </div>
            </div>

            <form onSubmit={handlePasswordUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    className="pl-11 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    className="pl-11 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 outline-none transition-all"
                    placeholder="Min. 6 characters"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    className="pl-11 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 outline-none transition-all"
                    placeholder="Verify your new password"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {passwordMessage.text && (
                <div className={`p-4 rounded-xl text-sm font-medium animate-in zoom-in-95 ${passwordMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                  {passwordMessage.text}
                </div>
              )}

              <button
                type="submit"

                className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 focus:ring-4 focus:ring-purple-100 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                <Save className="w-5 h-5" />
                <span>{isSavingPassword ? 'Updating Password...' : 'Update Password'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
