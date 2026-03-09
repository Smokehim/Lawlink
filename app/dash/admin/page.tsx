"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { 
  Home, 
  Users, 
  Scale, 
  MapPin, 
  LogOut, 
  Menu, 
  X,
  ShieldAlert,
  Settings
} from 'lucide-react';
import Clients from './componets/clients';
import Homes from './componets/home';
import Lawyers from './componets/lawyers';
import Locations from './componets/locations';
import Support from './componets/support';
import Profile from './componets/profile';
import Image from 'next/image';

const API_BASE = 'http://localhost:3002';

interface DashboardLawyer {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  status: 'verified' | 'pending' | 'rejected' | 'unverified';
  specialization?: string;
  province?: string;
  district?: string;
  licenseUrl: string;
}

interface DashboardClient {
  id: string;
  name: string;
  email: string;
  phone: string;
}


type Section = 'home' | 'lawyers' | 'clients' | 'locations' | 'support' | 'profile';

// Mock locations data
const mockLocations = [
  { id: '1', province: 'Lusaka', districts: ['Lusaka', 'Chilanga', 'Kafue'] },
  { id: '2', province: 'Copperbelt', districts: ['Ndola', 'Kitwe', 'Chingola'] },
  { id: '3', province: 'Southern', districts: ['Livingstone', 'Choma', 'Mazabuka'] },
  { id: '4', province: 'Eastern', districts: ['Chipata', 'Lundazi', 'Petauke'] },
  { id: '5', province: 'Western', districts: ['Mongu', 'Kaoma', 'Senanga'] },
];

export default function AdminDashboard() {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lawyers, setLawyers] = useState<DashboardLawyer[]>([]);
  const [clients, setClients] = useState<DashboardClient[]>([]);
  const { user, logout, isLoading, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await fetch('http://localhost:3002/getlawyers', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch lawyers');
        
        const data = await response.json();
        const mappedLawyers = data.map((l: { lawyer_id: number; full_name?: string; email?: string; phone_number?: string; verification_status?: DashboardLawyer['status']; specialization?: string; province?: string; district?: string }): DashboardLawyer => ({
          id: l.lawyer_id.toString(),
          name: l.full_name,
          email: l.email,
          phone: l.phone_number,
          status: l.verification_status || 'unverified',
          specialization: l.specialization,
          province: l.province,
          district: l.district,
          licenseUrl: 'https://placehold.co/600x400/EEE/31343C?text=License' // Placeholder
        }));
        setLawyers(mappedLawyers);
      } catch (error) {
        console.error("Failed to fetch lawyers", error);
      }
    };

    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:3002/getUsers', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch clients');
        
        const data = await response.json();
        const users = Array.isArray(data.users) ? data.users : [];
        setClients(users
          .filter((u: { user_id?: number }) => u && u.user_id !== undefined && u.user_id !== null)
          .map((u: { user_id: number; full_name?: string; email?: string; phone_number?: string }) => ({
            id: u.user_id.toString(),
            name: u.full_name || 'Unknown User',
            email: u.email || 'No Email',
            phone: u.phone_number || ''
          })));
      } catch (error) {
        console.error("Failed to fetch clients", error);
      }
    };

    // Redirect if not authenticated
    if (!isLoading && !user) {
      router.push('/logins/admin');
    } else if (user) {
      fetchLawyers();
      fetchClients();
    }
  }, [user, isLoading, router, token]);



  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return <Homes lawyers={lawyers} clients={clients} />;

      case 'lawyers':
        return <Lawyers />;

      case 'clients':
        return <Clients />;

      case 'locations':
        return <Locations locations={mockLocations} />;
      case 'support':
        return <Support />;
      case 'profile':
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
          <button 
           onClick={() => setSidebarOpen(false)} 
          className="lg:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          <button
            onClick={() => {
              setCurrentSection('home');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentSection === 'home'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>
          
          <button
            onClick={() => {
              setCurrentSection('clients');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentSection === 'clients'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Manage Clients</span>
          </button>
          
          <button
            onClick={() => {
              setCurrentSection('lawyers');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentSection === 'lawyers'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Scale className="w-5 h-5" />
            <span>Manage Lawyers</span>
            {lawyers.filter((l) => l.status === 'pending').length > 0 && (
              <span className="ml-auto bg-yellow-600 text-white text-xs rounded-full px-2 py-1">
                {lawyers.filter((l) => l.status === 'pending').length}
              </span>
            )}
          </button>
          
          <button
            onClick={() => {
              setCurrentSection('locations');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentSection === 'locations'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span>Manage Locations</span>
          </button>

          <button
            onClick={() => {
              setCurrentSection('support');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentSection === 'support'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ShieldAlert className="w-5 h-5" />
            <span>Support Inbox</span>
          </button>

          <button
            onClick={() => {
              setCurrentSection('profile');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentSection === 'profile'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Admin Settings</span>
          </button>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            onClick={() => {
              logout();
              router.push('/logins/admin');
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user?.fullName || 'Admin'}</span>
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-700 relative">
                {user?.profile_picture ? (
                  <Image 
                    src={`${API_BASE}${user.profile_picture}`} 
                    alt="Profile" 
                    fill 
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="text-white font-semibold">
                    {user?.fullName?.charAt(0).toUpperCase() || 'A'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : (
            renderContent()
          )}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
