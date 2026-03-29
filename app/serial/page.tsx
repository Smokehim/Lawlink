"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Key, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';


type AuthUser = {
  userId: number;
  email: string;
  fullName: string;
  serialCode: string;
  serialCodeExpiresAt: string;
};
type VerifyResponse = { token: string; user: AuthUser };
type UserType = 'user' | 'lawyer' | 'admin';

export default function VerifyCodePage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<UserType>('user');
  const [isManual, setIsManual] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const userEmail = localStorage.getItem('user_email');
    const lawyerEmail = localStorage.getItem('lawyer_email');
    const adminEmail = localStorage.getItem('admin_email');

    if (userEmail) {
      setEmail(userEmail);
      setUserType('user');
    } else if (lawyerEmail) {
      setEmail(lawyerEmail);
      setUserType('lawyer');
    } else if (adminEmail) {
      setEmail(adminEmail);
      setUserType('admin');
    } else {
      setIsManual(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) return setError('Email is required');
    if (code.length !== 6) return setError('Code must be 6 digits');
    setLoading(true);

    try {
      const endpoint = userType === 'user' ? '/verify_user' : userType === 'lawyer' ? '/verify_lawyer' : '/verify_admin';
      const redirectPath = userType === 'user' ? '/dash/user' : userType === 'lawyer' ? '/dash/lawyers' : '/dash/admin';
      const res = await fetch(`http://localhost:3002${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, verificationCode: code }),
      });
      const data: VerifyResponse = await res.json();
      if (!res.ok) throw new Error((data as { message?: string }).message || 'Verification failed');
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

  const handleResendCode = async () => {
    if (!email) return setError('Please enter your email first');
    setResendLoading(true);
    setResendMessage('');
    setError('');

    try {
      const endpoint = userType === 'user' ? '/resend_verification_user' : userType === 'lawyer' ? '/resend_verification_lawyer' : '/resend_verification_admin';
      const res = await fetch(`http://localhost:3002${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to resend code');
      setResendMessage('A new code has been sent to your email.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend code');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="flex justify-between items-center mb-4 text-sm">
          <button onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>
          <button onClick={() => router.push('/')} className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            Go back home
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Key className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-gray-900">Verify Email</h2>
            <p className="text-gray-600 text-sm">
              {isManual ? 'Enter your details to verify' : `Verifying ${email}`}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isManual && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition mb-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Account Type</label>
                  <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value as UserType)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition bg-white"
                  >
                    <option value="user">User</option>
                    <option value="lawyer">Lawyer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </>
            )}
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Verification Code</label>
              <input
                type="text"
                placeholder="000000"
                maxLength={6}
                inputMode="numeric"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-center text-2xl font-mono tracking-widest"
              />
            </div>

            {error && <div className="bg-red-50 text-red-700 px-3 py-2 rounded text-sm">{error}</div>}
            {resendMessage && <div className="bg-green-50 text-green-700 px-3 py-2 rounded text-sm">{resendMessage}</div>}

            <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold shadow-md transition">
              {loading ? 'Verifying...' : 'Verify Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={handleResendCode}
              disabled={resendLoading || !email}
              className="text-sm text-green-600 hover:text-green-700 font-medium transition disabled:opacity-50"
            >
              {resendLoading ? 'Sending...' : "Didn't receive a code? Resend"}
            </button>
            <div className="mt-2">
              <button
                onClick={() => setIsManual(!isManual)}
                className="text-xs text-gray-500 hover:text-gray-700 underline"
              >
                {isManual ? 'Use saved email' : 'Different email?'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
