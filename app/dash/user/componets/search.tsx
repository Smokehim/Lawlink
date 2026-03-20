"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
    MapPin,
    Star,
    Mail,
    Phone,
    Send,
    X,
    ChevronRight,
    Briefcase
} from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

const API_BASE = 'http://localhost:3002';

interface SearchsProps {
    onNavigate?: (section: 'home' | 'search' | 'messages' | 'profile') => void;
}

interface Lawyer {
    id: string;
    name: string;
    photo: string;
    province: string;
    district: string;
    specialization: string;
    lawyer_type: string;
    rating: number;
    email: string;
    phone: string;
}

const mockLawyers: Lawyer[] = [
    {
        id: '1',
        name: 'Sarah Banda',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300',
        province: 'Lusaka',
        district: 'Lusaka',
        specialization: 'Corporate Law',
        lawyer_type: 'lawyer',
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
        lawyer_type: 'lawyer',
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
        lawyer_type: 'lawyer',
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
        lawyer_type: 'lawyer',
        rating: 4.7,
        email: 'peter.sichone@legal.zm',
        phone: '+260 966 234 567',
    },
];

const defaultLawyers = mockLawyers;

export default function Searchs({ onNavigate }: SearchsProps) {
    const [filters, setFilters] = useState({
        province: '',
        district: '',
        specialization: '',
        lawyer_type: '',
    });

    interface ProvinceItem { province_id: number; province_name: string; }
    interface DistrictItem { district_id: number; district_name: string; province_id?: number; province_name?: string; }

    const [provinces, setProvinces] = useState<ProvinceItem[]>([]);
    const [districts, setDistricts] = useState<DistrictItem[]>([]);
    const [allDistricts, setAllDistricts] = useState<DistrictItem[]>([]);
    const [lawyers, setLawyers] = useState<Lawyer[]>(defaultLawyers);
    const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
    const [detailLawyer, setDetailLawyer] = useState<Lawyer | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSending, setIsSending] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        fetch(`${API_BASE}/provinces`)
            .then(res => res.json())
            .then((data) => { if (Array.isArray(data)) setProvinces(data); })
            .catch((err) => { console.warn('Could not load provinces from API', err); });

        fetch(`${API_BASE}/districts`)
            .then(res => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setAllDistricts(data);
                    setDistricts(data);
                }
            })
            .catch((err) => { console.warn('Could not load districts from API', err); });

        fetch(`${API_BASE}/lawyers/verified`)
            .then(res => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const mapped: Lawyer[] = data.map((l: { lawyer_id: number; full_name: string; province: string; district: string; specialization: string; email: string; phone_number: string; }) => ({
                        id: l.lawyer_id.toString(),
                        name: l.full_name,
                        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300',
                        province: l.province,
                        district: l.district,
                        specialization: l.specialization,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        lawyer_type: (l as any).lawyer_type || 'lawyer',
                        rating: 4.5,
                        email: l.email,
                        phone: l.phone_number
                    }));
                    setLawyers(mapped);
                }
            })
            .catch((err) => {
                console.warn('Could not load lawyers from API, using defaults', err);
                setLawyers(defaultLawyers);
            });
    }, []);

    // When province filter changes, filter districts to show only relevant ones
    useEffect(() => {
        if (filters.province) {
            const selectedProv = provinces.find(p => p.province_name === filters.province);
            if (selectedProv) {
                const filtered = allDistricts.filter(d => d.province_id === selectedProv.province_id);
                setDistricts(filtered);
            } else {
                setDistricts(allDistricts);
            }
            // Reset district filter if current selection doesn't belong to new province
            setFilters(prev => ({ ...prev, district: '' }));
        } else {
            setDistricts(allDistricts);
        }
    }, [filters.province, provinces, allDistricts]);

    const filteredLawyers = lawyers.filter(lawyer => {
        if (filters.province && lawyer.province !== filters.province) return false;
        if (filters.district && lawyer.district !== filters.district) return false;
        if (filters.specialization && lawyer.specialization !== filters.specialization) return false;
        if (filters.lawyer_type && lawyer.lawyer_type !== filters.lawyer_type) return false;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            if (!lawyer.name.toLowerCase().includes(q) && !lawyer.specialization.toLowerCase().includes(q)) return false;
        }
        return true;
    });

    const handleSendRequest = async (details: string) => {
        if (!user) {
            alert('Please log in to contact a lawyer.');
            router.push('/logins/user');
            return;
        }
        if (!selectedLawyer) return;

        setIsSending(true);
        try {
            const res = await fetch(`${API_BASE}/client-requests`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    client_id: user.userId,
                    lawyer_id: parseInt(selectedLawyer.id),
                    request_details: details
                })
            });
            if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.message || 'Request failed'); }
            setSelectedLawyer(null);
            setDetailLawyer(null);
            // Navigate to messages so the client can see the request thread immediately
            if (onNavigate) {
                onNavigate('messages');
            }
        } catch (error) {
            console.error('Error sending request:', error);
            alert('Failed to send request. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Search Lawyers</h2>

            {/* Live Search Bar */}
            <div className="relative mb-5">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or case type (e.g. Criminal Law, Sarah...)"
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition-all bg-white"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
                        title="Clear search"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Lawyers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                        <select
                            aria-label="Province filter"
                            value={filters.province}
                            onChange={(e) => setFilters({ ...filters, province: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">All Provinces</option>
                            {provinces.map((item) => (
                                <option key={item.province_id} value={item.province_name}>{item.province_name}</option>
                            ))}
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
                            {districts.map((item) => (
                                <option key={item.district_id} value={item.district_name}>{item.district_name}</option>
                            ))}
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Professional Role</label>
                        <select
                            aria-label="Role filter"
                            value={filters.lawyer_type}
                            onChange={(e) => setFilters({ ...filters, lawyer_type: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">All Roles</option>
                            <option value="lawyer">Lawyer</option>
                            <option value="attorney">Attorney</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Lawyer Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLawyers.map((lawyer) => (
                    <div
                        key={lawyer.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 flex flex-col"
                    >
                        {/* Clickable top area — opens detail modal */}
                        <button
                            onClick={() => setDetailLawyer(lawyer)}
                            className="text-left w-full group"
                            title={`View ${lawyer.name}'s profile`}
                        >
                            <div className="relative overflow-hidden">
                                <Image
                                    src={lawyer.photo}
                                    alt={lawyer.name}
                                    width={300}
                                    height={192}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{lawyer.name}</h3>
                                <div className="flex items-center text-sm text-gray-500 mb-1">
                                    <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                                    <span>{lawyer.district}, {lawyer.province}</span>
                                </div>
                                <div className="flex items-center text-sm text-blue-600 font-medium mb-3">
                                    <Briefcase className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                                    <span>{lawyer.specialization} • <span className="capitalize">{lawyer.lawyer_type}</span></span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                                        <span className="text-sm font-semibold">{lawyer.rating}</span>
                                    </div>
                                    <span className="text-xs text-blue-500 flex items-center font-medium group-hover:underline">
                                        View Profile <ChevronRight className="w-3 h-3 ml-0.5" />
                                    </span>
                                </div>
                            </div>
                        </button>

                        {/* Send Request button — always visible at bottom of card */}
                        <div className="px-5 pb-5 mt-auto">
                            <button
                                onClick={() => setSelectedLawyer(lawyer)}
                                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl transition-colors font-semibold shadow-sm shadow-blue-100"
                                title={`Send a request to ${lawyer.name}`}
                            >
                                <Send className="w-4 h-4" />
                                <span>Send Request</span>
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

            {/* ── Lawyer Detail Modal ── */}
            {detailLawyer && !selectedLawyer && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="relative">
                            <Image
                                src={detailLawyer.photo}
                                alt={detailLawyer.name}
                                width={400}
                                height={200}
                                className="w-full h-52 object-cover"
                            />
                            <button
                                onClick={() => setDetailLawyer(null)}
                                className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 p-1.5 rounded-full text-white transition-colors"
                                title="Close"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-0.5">{detailLawyer.name}</h3>
                            <p className="text-blue-600 font-semibold text-sm mb-4 capitalize">{detailLawyer.lawyer_type} • {detailLawyer.specialization}</p>

                            <div className="space-y-2.5 mb-5">
                                <div className="flex items-center text-gray-600 text-sm">
                                    <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                                    {detailLawyer.district}, {detailLawyer.province}
                                </div>
                                {detailLawyer.email && (
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <Mail className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                                        {detailLawyer.email}
                                    </div>
                                )}
                                {detailLawyer.phone && (
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <Phone className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                                        {detailLawyer.phone}
                                    </div>
                                )}
                                <div className="flex items-center text-sm">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-2" />
                                    <span className="font-semibold text-gray-900">{detailLawyer.rating}</span>
                                    <span className="text-gray-400 ml-1">/ 5.0</span>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setDetailLawyer(null)}
                                    className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => setSelectedLawyer(detailLawyer)}
                                    className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-sm"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>Send Request</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Send Request Modal ── */}
            {selectedLawyer && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex items-start justify-between mb-1">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Request — {selectedLawyer.name}</h3>
                                <p className="text-blue-600 text-sm font-medium capitalize">{selectedLawyer.lawyer_type} • {selectedLawyer.specialization}</p>
                            </div>
                            <button
                                onClick={() => setSelectedLawyer(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors ml-2 mt-1"
                                title="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-gray-500 text-sm mb-5 mt-2">
                            Briefly describe your legal matter so the lawyer understands your needs before accepting.
                        </p>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            handleSendRequest(formData.get('details') as string);
                        }}>
                            <textarea
                                name="details"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-36 mb-4 resize-none text-sm"
                                placeholder="E.g., I need help with a property dispute in Lusaka. The case involves..."
                            ></textarea>

                            <div className="flex space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedLawyer(null)}
                                    className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 shadow-lg shadow-blue-100"
                                >
                                    {isSending ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            <span>Send Request</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}