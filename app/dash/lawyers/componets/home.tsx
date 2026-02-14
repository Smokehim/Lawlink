"use client"
import { Check, Calendar, XCircle } from 'lucide-react';

interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  gender: string;
  role: 'client' | 'lawyer' | 'admin';
  province?: string;
  district?: string;
  specialization?: string;
  status?: string;
  certificates?: string[];
}

interface Request {
  id: string;
  clientName: string;
  requestDetails: string;
  date: string;
  status: string;
}

interface HomeProps {
  user: User | null;
  requests: Request[];
}

export default function Home({ user, requests }: HomeProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome, {user?.fullName || 'Lawyer'}!</h2>
      
      {/* Status Badge */}
      <div className="mb-6">
        {user?.status === 'verified' && (
          <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
            <Check className="w-4 h-4 mr-2" />
            Verified Lawyer
          </span>
        )}
        {user?.status === 'pending' && (
          <span className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-semibold">
            <Calendar className="w-4 h-4 mr-2" />
            Verification Pending
          </span>
        )}
        {user?.status === 'rejected' && (
          <span className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full font-semibold">
            <XCircle className="w-4 h-4 mr-2" />
            Verification Rejected
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Requests</h3>
          <p className="text-3xl font-bold text-purple-600">{requests.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Clients</h3>
          <p className="text-3xl font-bold text-green-600">5</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Consultations This Month</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Information</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Specialization:</span>
            <span className="font-semibold text-gray-900">{user?.specialization}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Location:</span>
            <span className="font-semibold text-gray-900">{user?.district}, {user?.province}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className={`font-semibold ${
              user?.status === 'verified' ? 'text-green-600' :
              user?.status === 'pending' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {user?.status?.charAt(0).toUpperCase() + user?.status?.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
