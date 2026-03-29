"use client";

import { useState, useEffect } from "react";
import { Check, XCircle, Edit, Trash2, Eye, Search, Clock, Mail, Phone, Briefcase, MapPin, Save, X } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";

interface Lawyer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'verified' | 'pending' | 'rejected' | 'unverified';
  specialization: string;
  province: string;
  district: string;
  licenseUrl: string;
}

export default function Lawyers() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [viewingLicense, setViewingLicense] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editing, setEditing] = useState<Lawyer | null>(null);
  const [saving, setSaving] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    const fetchLawyers = async () => {
      try {
        const response = await fetch('http://localhost:3002/getlawyers', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch lawyers');
        }
        const data = await response.json();
        const mappedLawyers = data.map((l: { lawyer_id: number; full_name?: string; email?: string; phone_number?: string; verification_status?: Lawyer['status']; specialization?: string; province?: string; district?: string }) => ({
          id: l.lawyer_id.toString(),
          name: l.full_name || '',
          email: l.email || '',
          phone: l.phone_number || '',
          status: l.verification_status || 'unverified',
          specialization: l.specialization || '',
          province: l.province || '',
          district: l.district || '',
          licenseUrl: `https://placehold.co/600x400/EEE/31343C?text=License+${encodeURIComponent(l.full_name || 'N/A')}`
        }));
        setLawyers(mappedLawyers);
      } catch (error) {
        console.error("Failed to fetch lawyers", error);
      }
    };
    fetchLawyers();
  }, [token]);

  const filteredLawyers = lawyers.filter((Userlawyer) =>
    Userlawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    Userlawyer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = async (id: string, status: 'verified' | 'rejected') => {
    try {
      const response = await fetch(`http://localhost:3002/admin/lawyers/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) throw new Error('Failed to update status');

      setLawyers(current => current.map(l => l.id === id ? { ...l, status } : l));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    // Admin requested no alerts/confirms
    // if (!confirm('Are you sure you want to delete this lawyer?')) return;

    try {
      const response = await fetch(`http://localhost:3002/admin/lawyers/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to delete lawyer');

      setLawyers(current => current.filter(l => l.id !== id));
    } catch (error) {
      console.error('Failed to delete lawyer:', error);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const response = await fetch(`http://localhost:3002/admin/lawyers/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ full_name: editing.name, email: editing.email, phone_number: editing.phone, specialization: editing.specialization, province: editing.province, district: editing.district })
      });
      if (!response.ok) throw new Error('Failed to update lawyer');
      setLawyers(lawyers.map(l => l.id === editing.id ? editing : l));
      setEditing(null);
    } catch (error) { console.error('Failed to update lawyer:', error); }
    finally { setSaving(false); }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search lawyers by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

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

      {/* LAWYERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLawyers.map((lawyer) => (
          <div key={lawyer.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                {lawyer.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setViewingLicense(lawyer.licenseUrl)}
                  className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                  title="View License"
                >
                  <Eye className="w-4 h-4" />
                </button>
                {lawyer.status !== 'verified' && (
                  <button
                    onClick={() => handleStatusChange(lawyer.id, 'verified')}
                    className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Verify"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                {lawyer.status !== 'rejected' && (
                  <button
                    onClick={() => handleStatusChange(lawyer.id, 'rejected')}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Reject"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setEditing({ ...lawyer })}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(lawyer.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">{lawyer.name}</h3>

            <div className="mb-4">
              {lawyer.status === 'verified' && (
                <span className="inline-flex items-center px-2.5 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  <Check className="w-3 h-3 mr-1" />
                  Verified
                </span>
              )}
              {lawyer.status === 'pending' && (
                <span className="inline-flex items-center px-2.5 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                  Pending
                </span>
              )}
              {lawyer.status === 'unverified' && (
                <span className="inline-flex items-center px-2.5 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                  <Clock className="w-3 h-3 mr-1" />
                  Unverified
                </span>
              )}
              {lawyer.status === 'rejected' && (
                <span className="inline-flex items-center px-2.5 py-0.5 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                  <XCircle className="w-3 h-3 mr-1" />
                  Rejected
                </span>
              )}
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                <span className="truncate" title={lawyer.email}>{lawyer.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                <span>{lawyer.phone}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                <span>{lawyer.specialization}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span>{lawyer.district}, {lawyer.province}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredLawyers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No lawyers found matching your search.</p>
        </div>
      )}

      {viewingLicense && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full relative">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Lawyers License</h3>
              <button onClick={() => setViewingLicense(null)} className="text-gray-500 hover:text-gray-800">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 bg-gray-50 relative w-full h-[70vh]">
              <Image src={viewingLicense || ''} alt="Lawyer's License" fill className="rounded-lg object-contain" unoptimized />
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

      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Edit Lawyer</h3>
              <button onClick={() => setEditing(null)} className="text-gray-600 hover:text-gray-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" value={editing?.name || ''} onChange={(e) => editing && setEditing({ ...editing, name: e.target.value })} className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={editing?.email || ''} onChange={(e) => editing && setEditing({ ...editing, email: e.target.value })} className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={editing?.phone || ''} onChange={(e) => editing && setEditing({ ...editing, phone: e.target.value })} className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <input type="text" value={editing?.specialization || ''} onChange={(e) => editing && setEditing({ ...editing, specialization: e.target.value })} className="w-full px-3 py-2 border rounded" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                  <input type="text" value={editing?.province || ''} onChange={(e) => editing && setEditing({ ...editing, province: e.target.value })} className="w-full px-3 py-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  <input type="text" value={editing?.district || ''} onChange={(e) => editing && setEditing({ ...editing, district: e.target.value })} className="w-full px-3 py-2 border rounded" />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button onClick={() => setEditing(null)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancel</button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
