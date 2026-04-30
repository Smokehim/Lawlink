"use client"
import { useState, useEffect } from 'react';
import { MapPin, Edit, Trash2, Plus, X, Check, Loader2 } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

interface Province {
  province_id: number;
  province_name: string;
}

interface District {
  district_id: number;
  district_name: string;
  province_id: number;
}

export default function Locations() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [isAddingProvince, setIsAddingProvince] = useState(false);
  const [newProvinceName, setNewProvinceName] = useState('');
  
  const [addingDistrictTo, setAddingDistrictTo] = useState<number | null>(null);
  const [newDistrictName, setNewDistrictName] = useState('');

  const [editingProvince, setEditingProvince] = useState<{id: number, name: string} | null>(null);
  const [editingDistrict, setEditingDistrict] = useState<{id: number, name: string} | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [provRes, distRes] = await Promise.all([
        fetch(`${API_BASE}/provinces`),
        fetch(`${API_BASE}/districts`)
      ]);

      if (!provRes.ok || !distRes.ok) throw new Error('Failed to fetch data');

      const provData = await provRes.json();
      const distData = await distRes.json();

      setProvinces(provData);
      setDistricts(distData);
      setError(null);
    } catch (err) {
      console.error('Error fetching locations:', err);
      setError('Could not load locations. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Province Actions
  const handleAddProvince = async () => {
    if (!newProvinceName.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/provinces`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ province_name: newProvinceName })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to add province');
      }
      setNewProvinceName('');
      setIsAddingProvince(false);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleUpdateProvince = async () => {
    if (!editingProvince || !editingProvince.name.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/provinces/${editingProvince.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ province_name: editingProvince.name })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to update province');
      }
      setEditingProvince(null);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteProvince = async (id: number) => {
    if (!confirm('Are you sure you want to delete this province? This will only work if it has no districts.')) return;
    try {
      const res = await fetch(`${API_BASE}/provinces/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to delete province');
      }
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // District Actions
  const handleAddDistrict = async (provinceId: number) => {
    if (!newDistrictName.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/districts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ district_name: newDistrictName, province_id: provinceId })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to add district');
      }
      setNewDistrictName('');
      setAddingDistrictTo(null);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleUpdateDistrict = async () => {
    if (!editingDistrict || !editingDistrict.name.trim()) return;
    // We need to find the province_id for this district
    const district = districts.find(d => d.district_id === editingDistrict.id);
    if (!district) return;

    try {
      const res = await fetch(`${API_BASE}/districts/${editingDistrict.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          district_name: editingDistrict.name,
          province_id: district.province_id 
        })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to update district');
      }
      setEditingDistrict(null);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteDistrict = async (id: number) => {
    if (!confirm('Are you sure you want to delete this district?')) return;
    try {
      const res = await fetch(`${API_BASE}/districts/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to delete district');
      }
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading && provinces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500">Loading locations...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Manage Locations</h2>
          <p className="text-gray-500 mt-1">Configure provinces and their respective districts</p>
        </div>
        {!isAddingProvince && (
          <button
            onClick={() => setIsAddingProvince(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Province</span>
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <X className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {isAddingProvince && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex-1 max-w-md">
            <label className="block text-sm font-medium text-blue-900 mb-1">New Province Name</label>
            <input
              type="text"
              value={newProvinceName}
              onChange={(e) => setNewProvinceName(e.target.value)}
              placeholder="e.g. Copperbelt"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleAddProvince()}
            />
          </div>
          <div className="flex space-x-2 ml-4">
            <button
              onClick={handleAddProvince}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Province
            </button>
            <button
              onClick={() => setIsAddingProvince(false)}
              className="px-4 py-2 bg-white text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {provinces.map((province) => (
          <div key={province.province_id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="p-5 border-b border-gray-50 bg-gray-50/50 group-hover:bg-white transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  {editingProvince?.id === province.province_id ? (
                    <input
                      type="text"
                      value={editingProvince.name}
                      onChange={(e) => setEditingProvince({...editingProvince, name: e.target.value})}
                      className="flex-1 px-2 py-1 border border-blue-300 rounded outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && handleUpdateProvince()}
                    />
                  ) : (
                    <h3 className="text-lg font-bold text-gray-900 truncate">{province.province_name}</h3>
                  )}
                </div>
                <div className="flex space-x-1 ml-2">
                  {editingProvince?.id === province.province_id ? (
                    <>
                      <button
                        onClick={handleUpdateProvince}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Save"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingProvince(null)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingProvince({id: province.province_id, name: province.province_name})}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        title="Edit province"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProvince(province.province_id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete province"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Districts</p>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {districts.filter(d => d.province_id === province.province_id).length} Total
                </span>
              </div>
              
              <div className="space-y-2 min-h-[100px]">
                {districts
                  .filter(d => d.province_id === province.province_id)
                  .map((district) => (
                    <div
                      key={district.district_id}
                      className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg group/item hover:bg-gray-100 transition-colors"
                    >
                      {editingDistrict?.id === district.district_id ? (
                        <input
                          type="text"
                          value={editingDistrict.name}
                          onChange={(e) => setEditingDistrict({...editingDistrict, name: e.target.value})}
                          className="flex-1 px-1 border border-blue-300 rounded outline-none"
                          autoFocus
                          onKeyDown={(e) => e.key === 'Enter' && handleUpdateDistrict()}
                        />
                      ) : (
                        <span className="truncate">{district.district_name}</span>
                      )}
                      
                      <div className="flex items-center space-x-1 ml-2">
                         {editingDistrict?.id === district.district_id ? (
                           <>
                              <button onClick={handleUpdateDistrict} className="text-green-600 hover:text-green-700">
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => setEditingDistrict(null)} className="text-red-600 hover:text-red-700">
                                <X className="w-3.5 h-3.5" />
                              </button>
                           </>
                         ) : (
                           <>
                              <button 
                                onClick={() => setEditingDistrict({id: district.district_id, name: district.district_name})}
                                className="text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteDistrict(district.district_id)}
                                className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                           </>
                         )}
                      </div>
                    </div>
                  ))}
                
                {addingDistrictTo === province.province_id ? (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <input
                      type="text"
                      value={newDistrictName}
                      onChange={(e) => setNewDistrictName(e.target.value)}
                      placeholder="District name..."
                      className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && handleAddDistrict(province.province_id)}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAddDistrict(province.province_id)}
                        className="flex-1 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setAddingDistrictTo(null)}
                        className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddingDistrictTo(province.province_id)}
                    className="w-full mt-2 text-sm text-blue-600 hover:text-blue-700 py-2 border border-dashed border-blue-200 rounded-lg hover:bg-blue-50 transition-all flex items-center justify-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add District</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {provinces.length === 0 && !loading && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No locations found</h3>
          <p className="text-gray-500 mt-1">Get started by adding your first province.</p>
          <button
            onClick={() => setIsAddingProvince(true)}
            className="mt-6 inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Add First Province</span>
          </button>
        </div>
      )}
    </div>
  );
}
