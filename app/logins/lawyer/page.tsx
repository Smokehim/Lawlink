"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Scale, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';


type AuthUser = {
  userId: number;
  email: string;
  fullName: string;
  serialCode: string;
  serialCodeExpiresAt: string;
};
type LoginResponse = { token: string; user: AuthUser };
export default function LawyerLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3002/login_lawyer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data: LoginResponse = await res.json();
      if (!res.ok) throw new Error((data as { message?: string }).message || 'Login failed');
      login(data.token, data.user);
      router.push("/dash/lawyers"); // AuthContext/Dashboard useEffect will handle redirect
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message.includes('not verified')) {
        setError('Your account is not verified yet.');
      } else {
        setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoToVerification = () => {
    localStorage.setItem('lawyer_email', formData.email);
    router.push('/serial');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="container max-w-md w-full" data-sr>
        <Link
          href="/"
          className="mb-4 inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go back home
        </Link>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <Scale className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Lawyer Login</h2>
            <p className="text-gray-600">Access your professional dashboard</p>
          </div>
          <form onSubmit={handleSubmit}  className="space-y-5">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
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
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div className="flex justify-between items-center text-sm">
              <Link href="/serial" className="text-purple-600 hover:text-purple-700">
                Verify Email
              </Link>
              <Link href="/logins/lawyer/forgot-password" className="text-purple-600 hover:text-purple-700">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex flex-col items-center">
                <span>{error}</span>
                {error.includes('not verified') && (
                  <button 
                    type="button"
                    onClick={handleGoToVerification}
                    className="mt-2 text-purple-700 font-bold underline hover:text-purple-800"
                  >
                    Verify Now
                  </button>
                )}
              </div>
            )}
          </form>
          <div id="divider" className="my-6" />
          <div className="mt-2 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{' '}
              <a
                href="/register/lawyer"
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
