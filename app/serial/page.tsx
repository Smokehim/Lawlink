"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Key, ArrowLeft } from 'lucide-react';

type UserType = 'user' | 'lawyer' | 'admin' | null;

export default function VerifyCodePage() {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for user_id, lawyer_id, or admin_id in localStorage
    const storedUserId = localStorage.getItem('user_id');
    const storedLawyerId = localStorage.getItem('lawyer_id');
    const storedAdminId = localStorage.getItem('admin_id');

    if (storedUserId) {
      setUserId(storedUserId);
      setUserType('user');
    } else if (storedLawyerId) {
      setUserId(storedLawyerId);
      setUserType('lawyer');
    } else if (storedAdminId) {
      setUserId(storedAdminId);
      setUserType('admin');
    } else {
      setError('No user ID found. Please complete registration first.');
      router.push('/register/user');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value.toUpperCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!verificationCode.trim()) {
      setError('Please enter the verification code');
      return;
    }

    if (verificationCode.length !== 6) {
      setError('Verification code must be 6 digits');
      return;
    }

    if (!userId || !userType) {
      setError('User ID not found. Please register again.');
      return;
    }

    setLoading(true);
    try {
      // Determine which endpoint to use based on user type
      let endpoint = '/verify_user';
      let bodyKey = 'user_id';
      let redirectPath = '/dash/user';

      switch (userType) {
        case 'lawyer':
          endpoint = '/verify_lawyer';
          bodyKey = 'lawyer_id';
          redirectPath = '/dash/lawyers';
          break;
        case 'admin':
          endpoint = '/verify_admin';
          bodyKey = 'admin_id';
          redirectPath = '/dash/admin';
          break;
      }

      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [bodyKey]: userId, verificationCode: verificationCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid verification code.');
      }

      // Clear localStorage after successful verification
      localStorage.removeItem('user_id');
      localStorage.removeItem('lawyer_id');
      localStorage.removeItem('admin_id');
      localStorage.removeItem('user_email');

      // On successful verification, redirect to appropriate dashboard
      router.push(redirectPath);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Key className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Email</h2>
            <p className="text-gray-600">Enter the 6-digit code sent to your email.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code (6 digits)
              </label>
              <input
                id="verification-code"
                type="text"
                placeholder="Enter 6-digit code"
                maxLength={6}
                inputMode="numeric"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-center text-2xl font-mono tracking-widest"
                value={verificationCode}
                onChange={handleChange}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
