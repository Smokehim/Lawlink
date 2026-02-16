"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, ArrowLeft } from 'lucide-react';

export default function ClientRegister() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', gender: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/registration_User', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: form.fullName,
          email: form.email,
          phone_number: form.phone,
          password: form.password,
          gender: form.gender,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user_email', data.email);
        router.push('/serial');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button onClick={() => window.history.back()} className="mb-4 flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-gray-900">Client Registration</h2>
            <p className="text-gray-600 text-sm">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            <select name="gender" value={form.gender} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            {error && <div className="bg-red-50 text-red-700 px-3 py-2 rounded text-sm">{error}</div>}
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Have an account? <a href="/logins/userlogin" className="text-blue-600 font-semibold">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
