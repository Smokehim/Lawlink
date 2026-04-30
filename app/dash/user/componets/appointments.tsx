"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Clock, User, XCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

interface Lawyer {
  lawyer_id: number;
  full_name: string;
  specialization: string;
  province: string;
  district: string;
  email: string;
}

interface Appointment {
  id: number;
  lawyer_id: number;
  appointment_date: string;
  appointment_time: string;
  reason: string | null;
  status: 'pending' | 'accepted' | 'declined' | 'cancelled';
  created_at: string;
  lawyer_name: string;
  lawyer_email: string;
  specialization: string;
  lawyer_phone: string;
}

const STATUS_CONFIG = {
  pending:   { color: 'bg-yellow-50 border-yellow-200 text-yellow-700', icon: <Clock className="w-4 h-4" /> },
  accepted:  { color: 'bg-green-50 border-green-200 text-green-700',   icon: <CheckCircle className="w-4 h-4" /> },
  declined:  { color: 'bg-red-50 border-red-200 text-red-700',         icon: <XCircle className="w-4 h-4" /> },
  cancelled: { color: 'bg-gray-50 border-gray-200 text-gray-500',      icon: <AlertCircle className="w-4 h-4" /> },
};

export default function UserAppointments() {
  const { user, token } = useAuth();

  // Form state
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [selectedLawyer, setSelectedLawyer] = useState<number | ''>('');
  const [lawyerEnabled, setLawyerEnabled] = useState<boolean | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // My appointments
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppts, setLoadingAppts] = useState(true);

  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [activeTab, setActiveTab] = useState<'book' | 'mine'>('book');

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  });

  // Fetch lawyers who have accepted a request from this client
  useEffect(() => {
    if (!user?.userId) return;
    fetch(`${API_BASE}/client-requests/accepted/${user.userId}`)
      .then(r => r.json())
      .then((data: Lawyer[]) => setLawyers(data))
      .catch(console.error);
  }, [user]);

  // When a lawyer is selected, check if they accept appointments
  useEffect(() => {
    if (!selectedLawyer) { setLawyerEnabled(null); return; }
    fetch(`${API_BASE}/lawyers/appointments-status/${selectedLawyer}`, { headers: authHeaders() })
      .then(r => r.json())
      .then((d: { appointments_enabled: boolean }) => setLawyerEnabled(d.appointments_enabled))
      .catch(() => setLawyerEnabled(null));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLawyer]);

  const fetchMyAppointments = useCallback(async () => {
    if (!user?.userId) return;
    setLoadingAppts(true);
    try {
      const res = await fetch(`${API_BASE}/appointments/user/${user.userId}`, { headers: authHeaders() });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json() as Appointment[];
      setAppointments(data);
    } catch {
      showToast('Could not load your appointments', false);
    } finally {
      setLoadingAppts(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token]);

  useEffect(() => { fetchMyAppointments(); }, [fetchMyAppointments]);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.userId || !selectedLawyer || !date || !time) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          user_id: user.userId,
          lawyer_id: selectedLawyer,
          appointment_date: date,
          appointment_time: time,
          reason,
        }),
      });
      const body = await res.json() as { message: string };
      if (!res.ok) throw new Error(body.message);
      showToast('Appointment booked! Waiting for lawyer confirmation.');
      setSelectedLawyer('');
      setDate('');
      setTime('');
      setReason('');
      setLawyerEnabled(null);
      fetchMyAppointments();
      setActiveTab('mine');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Booking failed';
      showToast(msg, false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (id: number) => {
    if (!user?.userId) return;
    // if (!confirm('Cancel this appointment?')) return;
    try {
      const res = await fetch(`${API_BASE}/appointments/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
        body: JSON.stringify({ user_id: user.userId }),
      });
      if (!res.ok) throw new Error('Cannot cancel');
      setAppointments(prev => prev.filter(a => a.id !== id));
      showToast('Appointment cancelled');
    } catch {
      showToast('Failed to cancel appointment', false);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

  const formatTime = (t: string) => {
    const [h, m] = t.split(':');
    const hour = parseInt(h);
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="relative">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${toast.ok ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.msg}
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Appointments</h2>
        <p className="text-gray-500 mt-1">Book appointments with your lawyer</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {([['book', 'Book Appointment'], ['mine', 'My Appointments']] as const).map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {label}
            {tab === 'mine' && appointments.length > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-700 rounded-full text-xs px-1.5 py-0.5">
                {appointments.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Book Tab ── */}
      {activeTab === 'book' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Schedule an Appointment
          </h3>

          <form onSubmit={handleBook} className="space-y-5">
            {/* Lawyer selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Lawyer *</label>
              <select
                value={selectedLawyer}
                onChange={e => setSelectedLawyer(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900"
                required
              >
                <option value="">— Choose a lawyer —</option>
                {lawyers.map(l => (
                  <option key={l.lawyer_id} value={l.lawyer_id}>
                    {l.full_name}{l.specialization ? ` · ${l.specialization}` : ''}
                  </option>
                ))}
              </select>

              {/* Lawyer availability status */}
              {selectedLawyer && lawyerEnabled !== null && (
                <div className={`mt-2 flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${
                  lawyerEnabled ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {lawyerEnabled
                    ? <><CheckCircle className="w-4 h-4" /> This lawyer is accepting appointments</>
                    : <><XCircle className="w-4 h-4" /> This lawyer is <strong>not accepting</strong> appointments right now</>
                  }
                </div>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                min={today}
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time *</label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason / Notes</label>
              <textarea
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="Briefly describe what you need help with…"
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || lawyerEnabled === false}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? 'Booking…' : 'Book Appointment'}
            </button>
          </form>
        </div>
      )}

      {/* ── My Appointments Tab ── */}
      {activeTab === 'mine' && (
        <div>
          {loadingAppts ? (
            <div className="flex items-center justify-center h-48 text-gray-500">Loading…</div>
          ) : appointments.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No appointments yet</p>
              <button
                onClick={() => setActiveTab('book')}
                className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Book your first appointment
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map(appt => (
                <div key={appt.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Date block */}
                  <div className="flex-shrink-0 w-24 text-center bg-blue-50 rounded-xl p-3">
                    <div className="text-blue-700 font-bold text-xl leading-tight">
                      {new Date(appt.appointment_date).toLocaleDateString('en-US', { day: '2-digit' })}
                    </div>
                    <div className="text-blue-500 text-xs font-medium">
                      {new Date(appt.appointment_date).toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-1 text-gray-500 text-xs">
                      <Clock className="w-3 h-3" />
                      {formatTime(appt.appointment_time)}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold text-gray-900">{appt.lawyer_name}</span>
                      {appt.specialization && (
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{appt.specialization}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{formatDate(appt.appointment_date)}</p>
                    {appt.reason && (
                      <p className="mt-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                        <span className="font-medium">Reason:</span> {appt.reason}
                      </p>
                    )}
                  </div>

                  {/* Status + cancel */}
                  <div className="flex flex-col items-end gap-2">
                    <span className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border ${STATUS_CONFIG[appt.status].color}`}>
                      {STATUS_CONFIG[appt.status].icon}
                      <span className="capitalize">{appt.status}</span>
                    </span>
                    {appt.status === 'pending' && (
                      <button
                        onClick={() => handleCancel(appt.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
