"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Key, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

type UserType = 'user' | 'lawyer' | 'admin' | null;

export default function VerifyCodePage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const userEmail = localStorage.getItem('user_email') || localStorage.getItem('lawyer_email') || localStorage.getItem('admin_email');
    const type = localStorage.getItem('user_email') ? 'user' : localStorage.getItem('lawyer_email') ? 'lawyer' : 'admin';
    if (userEmail) {
      setEmail(userEmail);
      setUserType(type);
    } else {
      router.push('/register/user');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (code.length !== 6) return setError('Code must be 6 digits');
    setLoading(true);

    try {
      const endpoint = userType === 'user' ? '/verify_user' : userType === 'lawyer' ? '/verify_lawyer' : '/verify_admin';
      const redirectPath = userType === 'user' ? '/dash/user' : userType === 'lawyer' ? '/dash/lawyers' : '/dash/admin';

      const res = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, verificationCode: code }),
      });

      if (!res.ok) throw new Error('Invalid verification code');

      const data = await res.json();
      // Save token and user data from verification response
      login(data.token, data.user);

      localStorage.removeItem('user_email');
      localStorage.removeItem('lawyer_email');
      localStorage.removeItem('admin_email');
      router.push(redirectPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button onClick={() => router.back()} className="mb-4 flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Key className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-gray-900">Verify Email</h2>
            <p className="text-gray-600 text-sm">Enter the 6-digit code</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter 6-digit code"
              maxLength={6}
              inputMode="numeric"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-center text-2xl font-mono tracking-widest"
            />
            {error && <div className="bg-red-50 text-red-700 px-3 py-2 rounded text-sm">{error}</div>}
            <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
              {loading ? 'Verifying...' : 'Verify Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
