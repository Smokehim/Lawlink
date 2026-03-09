"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';


type AuthUser = {
  userId: number;
  email: string;
  fullName: string;
  serialCode: string;
  serialCodeExpiresAt: string;
};
type LoginResponse = { token: string; user: AuthUser };



export default function ClientLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3002/login_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data: LoginResponse = await res.json();
      if (!res.ok) throw new Error((data as { message?: string }).message || 'Login failed');
      login(data.token, data.user);
      router.push('/dash/user');
      
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="container max-w-md w-full" data-sr>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Client Login</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div className="flex justify-between items-center">
              <a href="/serial" className="text-sm text-blue-600 hover:text-blue-700">Verify Code</a>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3  rounded-lg font-semibold shadow-lg hover:shadow-2xl hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
          </form>
          <div id="divider" className="my-6" />
          <div className="mt-2 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{' '}
              <a href="/register/user" className="text-blue-600 hover:text-blue-700 font-semibold">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
