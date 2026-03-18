"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, ToggleLeft, ToggleRight, User, Phone, Mail } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

const API_BASE = 'http://localhost:3002';

interface Appointment {
  id: number;
  user_id: number;
  lawyer_id: number;
  appointment_date: string;
  appointment_time: string;
  reason: string | null;
  status: 'pending' | 'accepted' | 'declined' | 'cancelled';
  created_at: string;
  user_name: string;
  user_email: string;
  user_phone: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending:  'bg-yellow-50 text-yellow-700 border-yellow-200',
  accepted: 'bg-green-50 text-greengreen-700 border-green-200',
  declined: 'bg-red-50 text-red-700 border-red-200',
  cancelled:'bg-gray-50 text-gray-500 border-gray-200',
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  declined: 'Declined',
  cancelled: 'Cancelled',
};

export default function LawyerAppointments() {
  const { user, token } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentsEnabled, setAppointmentsEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'declined'>('all');
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const headers = () => ({
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  });

  const fetchAppointments = useCallback(async () => {
    if (!user?.userId) return;
    setLoading(true);
    try {
      const [apptRes, statusRes] = await Promise.all([
        fetch(`${API_BASE}/appointments/lawyer/${user.userId}`, { headers: headers() }),
        fetch(`${API_BASE}/lawyers/appointments-status/${user.userId}`, { headers: headers() }),
      ]);
      if (!apptRes.ok) throw new Error('Failed to fetch appointments');
      const apptData = await apptRes.json() as Appointment[];
      setAppointments(apptData);
      if (statusRes.ok) {
        const statusData = await statusRes.json() as { appointments_enabled: boolean };
        setAppointmentsEnabled(statusData.appointments_enabled);
      }
    } catch (err) {
      console.error(err);
      showToast('Could not load appointments', false);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token]);

  useEffect(() => { fetchAppointments(); }, [fetchAppointments]);

  const handleToggle = async () => {
    if (!user?.userId) return;
    setToggling(true);
    const newVal = !appointmentsEnabled;
    try {
      const res = await fetch(`${API_BASE}/appointments/toggle/${user.userId}`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({ appointments_enabled: newVal }),
      });
      if (!res.ok) throw new Error('Toggle failed');
      setAppointmentsEnabled(newVal);
      showToast(`Appointments ${newVal ? 'enabled' : 'disabled'}`);
    } catch {
      showToast('Failed to update appointment status', false);
    } finally {
      setToggling(false);
    }
  };

  const handleStatusUpdate = async (id: number, status: 'accepted' | 'declined') => {
    try {
      const res = await fetch(`${API_BASE}/appointments/${id}/status`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      setAppointments(prev =>
        prev.map(a => (a.id === id ? { ...a, status } : a))
      );
      showToast(`Appointment ${status}`);
    } catch {
      showToast('Failed to update appointment', false);
    }
  };

  const filtered = appointments.filter(a => filter === 'all' || a.status === filter);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

  const formatTime = (t: string) => {
    const [h, m] = t.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    return `${hour % 12 || 12}:${m} ${ampm}`;
  };

  return (
    <div className="relative">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all ${toast.ok ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Appointments</h2>
          <p className="text-gray-500 mt-1">Manage your client appointment requests</p>
        </div>

        {/* Toggle appointments on/off */}
        <button
          onClick={handleToggle}
          disabled={toggling}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm shadow transition-all ${
            appointmentsEnabled
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          {appointmentsEnabled
            ? <><ToggleRight className="w-5 h-5" /> Accepting Appointments</>
            : <><ToggleLeft className="w-5 h-5" /> Appointments Off</>
          }
        </button>
      </div>

      {/* Status banner */}
      {!appointmentsEnabled && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-5 py-3 mb-6 text-sm">
          🚫 You are <strong>not accepting</strong> new appointments. Clients cannot book with you right now.
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {(['all', 'pending', 'accepted', 'declined'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              filter === f
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f}
            {f === 'pending' && (
              <span className="ml-2 bg-yellow-400 text-yellow-900 rounded-full text-xs px-1.5 py-0.5">
                {appointments.filter(a => a.status === 'pending').length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Appointments list */}
      {loading ? (
        <div className="flex items-center justify-center h-48 text-gray-500">Loading appointments…</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No {filter !== 'all' ? filter : ''} appointments</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(appt => (
            <div key={appt.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Date / time */}
              <div className="flex-shrink-0 w-24 text-center bg-purple-50 rounded-xl p-3">
                <div className="text-purple-700 font-bold text-lg leading-tight">
                  {new Date(appt.appointment_date).toLocaleDateString('en-US', { day: '2-digit' })}
                </div>
                <div className="text-purple-500 text-xs font-medium">
                  {new Date(appt.appointment_date).toLocaleDateString('en-US', { month: 'short' })}
                </div>
                <div className="flex items-center justify-center gap-1 mt-1 text-gray-500 text-xs">
                  <Clock className="w-3 h-3" />
                  {formatTime(appt.appointment_time)}
                </div>
              </div>

              {/* Client info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold text-gray-900">{appt.user_name}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{appt.user_email}</span>
                  {appt.user_phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{appt.user_phone}</span>}
                </div>
                {appt.reason && (
                  <p className="mt-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                    <span className="font-medium">Reason:</span> {appt.reason}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">{formatDate(appt.appointment_date)}</p>
              </div>

              {/* Status / actions */}
              <div className="flex flex-col items-end gap-2">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border capitalize ${STATUS_COLORS[appt.status]}`}>
                  {STATUS_LABELS[appt.status]}
                </span>
                {appt.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusUpdate(appt.id, 'accepted')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" /> Accept
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(appt.id, 'declined')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 text-xs rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <XCircle className="w-4 h-4" /> Decline
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
