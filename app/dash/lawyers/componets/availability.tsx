"use client"
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

const API_BASE = 'http://localhost:3002';

interface WorkingHour {
  day_of_week: string;
  is_closed: boolean;
  start_time: string;
  end_time: string;
}

export default function Availability() {
  const { user, token } = useAuth();
  const [unavailableDates, setUnavailableDates] = useState<string[]>([]);
  const [newUnavailableDate, setNewUnavailableDate] = useState('');
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);

  const fetchAvailability = async () => {
    if (!user?.userId || !token) return;
    const lawyer_id = user.userId;
    try {
      const res = await fetch(`${API_BASE}/availability/${lawyer_id}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (!res.ok) throw new Error('Failed to fetch availability');
      const data = await res.json() as { unavailable_dates: string[]; working_hours?: WorkingHour[] };
      // Backend returns ISO strings, we just need the date part correctly
      const dates = data.unavailable_dates.map((d: string) => d.split('T')[0]);
      setUnavailableDates(dates);
      setWorkingHours(data.working_hours || []);
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  useEffect(() => {
    fetchAvailability();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token]);

  const handleAddUnavailableDate = async () => {
    if (!newUnavailableDate || !user?.userId || !token) return;
    const lawyer_id = user.userId;

    if (unavailableDates.includes(newUnavailableDate)) {
      console.warn('Date already marked as unavailable:', newUnavailableDate);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/availability/unavailable-dates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          lawyer_id,
          date: newUnavailableDate
        })
      });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.message || 'Failed to add'); }
      setUnavailableDates([...unavailableDates, newUnavailableDate]);
      setNewUnavailableDate('');
    } catch (error: unknown) {
      console.error("Error adding unavailable date:", error);
    }
  };

  const handleRemoveUnavailableDate = async (date: string) => {
    if (!user?.userId || !token) return;
    const lawyer_id = user.userId;

    try {
      const res = await fetch(`${API_BASE}/availability/unavailable-dates`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ lawyer_id, date })
      });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.message || 'Failed to remove'); }
      setUnavailableDates(unavailableDates.filter(d => d !== date));
    } catch (error: unknown) {
      console.error("Error removing unavailable date:", error);
    }
  };

  const handleClearAllUnavailableDates = async () => {
    if (!user?.userId || !token) return;
    const lawyer_id = user.userId;

    // Admin requested no alerts/confirms
    // if (!confirm("Are you sure you want to clear all unavailable dates?")) return;

    try {
      const res = await fetch(`${API_BASE}/availability/clear-all`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ lawyer_id })
      });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.message || 'Failed to clear'); }
      setUnavailableDates([]);
    } catch (error: unknown) {
      console.error("Error clearing unavailable dates:", error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Manage Availability</h2>

      {/* Add Unavailable Date */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Mark Unavailable Dates</h3>
        <div className="flex space-x-4">
          <input
            type="date"
            placeholder="Select a date"
            title="Select unavailable date"
            value={newUnavailableDate}
            onChange={(e) => setNewUnavailableDate(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <button
            onClick={handleAddUnavailableDate}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            title="Add unavailable date"
          >
            Add
          </button>
        </div>
      </div>

      {/* Unavailable Dates List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Unavailable Dates</h3>
          {unavailableDates.length > 0 && (
            <button
              onClick={handleClearAllUnavailableDates}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
              title="Clear all dates"
            >
              Clear All
            </button>
          )}
        </div>
        {unavailableDates.length > 0 ? (
          <div className="space-y-2">
            {unavailableDates.map((date) => (
              <div key={date} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-900">{new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
                <button
                  onClick={() => handleRemoveUnavailableDate(date)}
                  className="text-red-600 hover:text-red-700"
                  title="Remove date"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No unavailable dates marked.</p>
        )}
      </div>

      {/* Working Hours */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Working Hours</h3>
        <div className="space-y-4">
          {workingHours.length > 0 ? (
            workingHours.map((wh) => (
              <div key={wh.day_of_week} className="flex items-center justify-between border-b pb-2 last:border-0">
                <span className="text-gray-700 font-medium w-32">{wh.day_of_week}</span>
                {wh.is_closed ? (
                  <span className="text-red-500 font-semibold italic">Closed</span>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-900">{wh.start_time.slice(0, 5)}</span>
                    <span className="text-gray-400">-</span>
                    <span className="text-gray-900">{wh.end_time.slice(0, 5)}</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600 italic">No working hours set. Default: Mon-Fri 09:00 - 17:00</p>
          )}
        </div>
        <p className="mt-4 text-sm text-gray-500 italic">* To update working hours, please contact support or use the full settings page (coming soon).</p>
      </div>
    </div>
  );
}
