
"use client"
import { useState } from 'react';
import Image from 'next/image';
import { 
  MapPin,
  Star,
  
} from 'lucide-react';






const mockLawyers = [
  {
    id: '1',
    name: 'Sarah Banda',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300',
    province: 'Lusaka',
    district: 'Lusaka',
    specialization: 'Corporate Law',
    rating: 4.8,
    email: 'sarah.banda@legal.zm',
    phone: '+260 966 789 012',
  },
  {
    id: '2',
    name: 'James Phiri',
    photo: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=300',
    province: 'Lusaka',
    district: 'Chilanga',
    specialization: 'Family Law',
    rating: 4.6,
    email: 'james.phiri@legal.zm',
    phone: '+260 977 456 789',
  },
  {
    id: '3',
    name: 'Grace Mwape',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300',
    province: 'Copperbelt',
    district: 'Ndola',
    specialization: 'Criminal Law',
    rating: 4.9,
    email: 'grace.mwape@legal.zm',
    phone: '+260 955 123 456',
  },
  {
    id: '4',
    name: 'Peter Sichone',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    province: 'Southern',
    district: 'Livingstone',
    specialization: 'Property Law',
    rating: 4.7,
    email: 'peter.sichone@legal.zm',
    phone: '+260 966 234 567',
  },
];
export default function Searchs() {
    const [filters, setFilters] = useState({
        province: '',
        district: '',
        specialization: '',
    });

    const filteredLawyers = mockLawyers.filter(lawyer => {
        if (filters.province && lawyer.province !== filters.province) return false;
        if (filters.district && lawyer.district !== filters.district) return false;
        if (filters.specialization && lawyer.specialization !== filters.specialization) return false;
        return true;
    });

    const handleContactLawyer = (lawyer: typeof mockLawyers[0]) => {
        alert(`Contacting ${lawyer.name}...\nEmail: ${lawyer.email}\nPhone: ${lawyer.phone}`);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Search Lawyers</h2>
            
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                        <select
                            aria-label="Province filter"
                            value={filters.province}
                            onChange={(e) => setFilters({ ...filters, province: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">All Provinces</option>
                            <option value="Lusaka">Lusaka</option>
                            <option value="Copperbelt">Copperbelt</option>
                            <option value="Southern">Southern</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                        <select
                            aria-label="District filter"
                            value={filters.district}
                            onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">All Districts</option>
                            <option value="Lusaka">Lusaka</option>
                            <option value="Chilanga">Chilanga</option>
                            <option value="Ndola">Ndola</option>
                            <option value="Livingstone">Livingstone</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                        <select
                            aria-label="Specialization filter"
                            value={filters.specialization}
                            onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">All Specializations</option>
                            <option value="Corporate Law">Corporate Law</option>
                            <option value="Family Law">Family Law</option>
                            <option value="Criminal Law">Criminal Law</option>
                            <option value="Property Law">Property Law</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLawyers.map((lawyer) => (
                    <div key={lawyer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                        <Image 
                            src={lawyer.photo} 
                            alt={lawyer.name}
                            width={300}
                            height={192}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{lawyer.name}</h3>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span>{lawyer.district}, {lawyer.province}</span>
                            </div>
                            <p className="text-sm text-blue-600 mb-2">{lawyer.specialization}</p>
                            <div className="flex items-center mb-4">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                                <span className="text-sm font-semibold">{lawyer.rating}</span>
                            </div>
                            <button
                                onClick={() => handleContactLawyer(lawyer)}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Contact
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredLawyers.length === 0 && (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <p className="text-gray-600">No lawyers found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}