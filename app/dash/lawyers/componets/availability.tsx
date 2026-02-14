"use client"
import { XCircle } from 'lucide-react';

interface AvailabilityProps {
  unavailableDates: string[];
  newUnavailableDate: string;
  onNewDateChange: (date: string) => void;
  onAddDate: () => void;
  onRemoveDate: (date: string) => void;
}

export default function Availability({
  unavailableDates,
  newUnavailableDate,
  onNewDateChange,
  onAddDate,
  onRemoveDate,
}: AvailabilityProps) {
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
            onChange={(e) => onNewDateChange(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <button
            onClick={onAddDate}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            title="Add unavailable date"
          >
            Add
          </button>
        </div>
      </div>

      {/* Unavailable Dates List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Unavailable Dates</h3>
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
                  onClick={() => onRemoveDate(date)}
                  className="text-red-600 hover:text-red-700"
                  title="Remove date"
                >
                  <XCircle className="w-5 h-5" />
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
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Monday - Friday</span>
            <span className="font-semibold text-gray-900">9:00 AM - 5:00 PM</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Saturday</span>
            <span className="font-semibold text-gray-900">10:00 AM - 2:00 PM</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Sunday</span>
            <span className="font-semibold text-gray-900">Closed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
