"use client"
import { MapPin, Edit, Trash2 } from 'lucide-react';

interface Location {
  id: string;
  province: string;
  districts: string[];
}

interface LocationsProps {
  locations: Location[];
}

export default function Locations({ locations }: LocationsProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Manage Locations</h2>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          title="Add new province"
        >
          <span>+ Add Province</span>
        </button>
      </div>

      <div className="space-y-6">
        {locations.map((location) => (
          <div key={location.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">{location.province}</h3>
              </div>
              <div className="flex space-x-1">
                <button
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Edit province"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                  title="Delete province"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 mb-2">Districts:</p>
              {location.districts.map((district, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded"
                >
                  <span>{district}</span>
                  <button className="text-gray-400 hover:text-gray-600" title="Delete district">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                className="w-full mt-2 text-sm text-blue-600 hover:text-blue-700 py-2 border border-blue-200 rounded hover:bg-blue-50 transition-colors"
                title="Add district"
              >
                + Add District
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
