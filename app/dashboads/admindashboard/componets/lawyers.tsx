"use client";

import { useState } from "react";
import { Check, XCircle, Edit, Trash2, Eye } from "lucide-react";

interface Lawyer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'verified' | 'pending' | 'rejected';
  specialization: string;
  province: string;
  district: string;
  licenseUrl: string;
}

interface LawyersProps {
  lawyers: Lawyer[];
  onStatusChange: (id: string, status: 'verified' | 'rejected') => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function Lawyers({ lawyers, onStatusChange, onDelete, onEdit }: LawyersProps) {
  const [viewingLicense, setViewingLicense] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-6">
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Total Lawyers
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {lawyers.length}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Verified Lawyers
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {lawyers.filter((l) => l.status === 'verified').length}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-600">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Pending Lawyers
          </h3>
          <p className="text-3xl font-bold text-yellow-600">
            {lawyers.filter((l) => l.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* LAWYERS TABLE */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Specialization</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {lawyers.map((lawyer) => (
                <tr key={lawyer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{lawyer.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div>{lawyer.email}</div>
                    <div>{lawyer.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{lawyer.specialization}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{lawyer.district}, {lawyer.province}</td>
                  <td className="px-6 py-4">
                    {lawyer.status === 'verified' && (
                      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        <Check className="w-3 h-3 mr-1" />
                        Verified
                      </span>
                    )}
                    {lawyer.status === 'pending' && (
                      <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                        Pending
                      </span>
                    )}
                    {lawyer.status === 'rejected' && (
                      <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                        <XCircle className="w-3 h-3 mr-1" />
                        Rejected
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setViewingLicense(lawyer.licenseUrl)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                        title="View License"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {lawyer.status !== 'verified' && (
                        <button
                          onClick={() => onStatusChange(lawyer.id, 'verified')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Verify"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      {lawyer.status !== 'rejected' && (
                        <button
                          onClick={() => onStatusChange(lawyer.id, 'rejected')}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Reject"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => onEdit(lawyer.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(lawyer.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {viewingLicense && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full relative">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Lawyers License</h3>
              <button onClick={() => setViewingLicense(null)} className="text-gray-500 hover:text-gray-800">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 bg-gray-50">
              <img src={viewingLicense} alt="Lawyer's License" className="w-full h-auto rounded-lg max-h-[70vh] object-contain" />
            </div>
            <div className="p-4 border-t flex justify-end items-center space-x-2">
              <a href={viewingLicense} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                Open in new tab
              </a>
              <button onClick={() => setViewingLicense(null)} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
