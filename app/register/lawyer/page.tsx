"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, UserPlus } from 'lucide-react';
import Image from 'next/image';




export default function LawyerRegistration() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    province: '',
    district: '',
    specialization: '',
    barNumber: '',
    lawyer_type: 'lawyer',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError('');

    try {
      const fd = new FormData();
      fd.append('full_name', formData.fullName);
      fd.append('email', formData.email);
      fd.append('phone_number', formData.phone);
      fd.append('province', formData.province);
      fd.append('district', formData.district);
      fd.append('specialization', formData.specialization);
      fd.append('bar_number', formData.barNumber);
      fd.append('lawyer_type', formData.lawyer_type);
      fd.append('password', formData.password);
      
      if (profilePic) fd.append('profile_picture', profilePic);
      if (licenseFile) fd.append('license_file', licenseFile);

      const res = await fetch('http://localhost:3002/registration_Lawyer', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      localStorage.setItem('lawyer_email', data.email);
      router.push('/serial');
      
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'profilePicture' && e.target.files) {
        const file = e.target.files[0];
        setProfilePic(file);
        setProfilePreview(URL.createObjectURL(file));
    } else {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => router.push('/logins/lawyer')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            Go back home
          </button>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <UserPlus className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Lawyer Registration</h2>
            <p className="text-gray-600">Join our legal network</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-2">
                Province
              </label>
              <input
                type="text"
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange}
                placeholder="Enter your province"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
                District
              </label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="Enter your district"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div className="flex flex-col items-center mb-6">
                {profilePreview ? (
                    <Image 
                        src={profilePreview} 
                        alt="preview" 
                        width={96} 
                        height={96} 
                        className="rounded-full object-cover border-4 border-blue-50 shadow-md mb-2" 
                        unoptimized
                    />
                ) : (
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <UserPlus className="w-10 h-10 text-blue-600" />
                    </div>
                )}
                <label className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                    Choose Profile Picture
                    <input
                        type="file"
                        name="profilePicture"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                    />
                </label>
            </div>

            <div>
              <label htmlFor="lawyer_type" className="block text-sm font-medium text-gray-700 mb-2">
                Professional Role
              </label>
              <select
                id="lawyer_type"
                name="lawyer_type"
                value={formData.lawyer_type}
                onChange={(e) => setFormData({ ...formData, lawyer_type: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
              >
                <option value="lawyer">Lawyer</option>
                <option value="attorney">Attorney</option>
              </select>
            </div>
            ...
            <div>
              <label htmlFor="license" className="block text-sm font-medium text-gray-700 mb-2">
                Upload License
              </label>
              <input
                type="file"
                id="license"
                name="license"
                accept=".pdf,image/*"
                onChange={(e) => setLicenseFile(e.target.files ? e.target.files[0] : null)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
                Specialization
              </label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="e.g. Criminal Law, Family Law"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="barNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Bar Association Number
              </label>
              <input
                type="text"
                id="barNumber"
                name="barNumber"
                value={formData.barNumber}
                onChange={handleChange}
                placeholder="Enter Bar ID"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <button
              type="submit"
               disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a
                href="/logins/lawyer"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
