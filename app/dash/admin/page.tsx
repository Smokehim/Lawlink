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
  
} from 'lucide-react';
import Clients from './componets/clients';
import Homes from './componets/home';
import Lawyers from './componets/lawyers';
import Locations from './componets/locations';

interface User {
  fullName: string;
  email: string;
  phone: string;
  specialization: string;
  province: string;
  district: string;
  status: 'verified' | 'pending' | 'rejected';
}

type Section = 'home' | 'lawyers' | 'clients' | 'locations';

// Mock data for lawyers
const mockLawyers = [
  {
    id: '1',
    name: 'Sarah Banda',
    email: 'sarah.banda@legal.zm',
    phone: '+260 966 789 012',
    status: 'verified' as const,
    specialization: 'Corporate Law',
    province: 'Lusaka',
    district: 'Lusaka',
    licenseUrl: 'https://placehold.co/600x400/EEE/31343C?text=License+Sarah',
  },
  {
    id: '2',
    name: 'James Phiri',
    email: 'james.phiri@legal.zm',
    phone: '+260 977 456 789',
    status: 'pending' as const,
    specialization: 'Family Law',
    province: 'Lusaka',
    district: 'Chilanga',
    licenseUrl: 'https://placehold.co/600x400/EEE/31343C?text=License+James',
  },
  {
    id: '3',
    name: 'Grace Mwape',
    email: 'grace.mwape@legal.zm',
    phone: '+260 955 123 456',
    status: 'pending' as const,
    specialization: 'Criminal Law',
    province: 'Copperbelt',
    district: 'Ndola',
    licenseUrl: 'https://placehold.co/600x400/EEE/31343C?text=License+Grace',
  },
  {
    id: '4',
    name: 'Peter Sichone',
    email: 'peter.sichone@legal.zm',
    phone: '+260 966 234 567',
    status: 'rejected' as const,
    specialization: 'Property Law',
    province: 'Southern',
    district: 'Livingstone',
    licenseUrl: 'https://placehold.co/600x400/EEE/31343C?text=License+Peter',
  },
];

// Mock data for clients
const mockClients = [
  {
    id: '1',
    name: 'John Mwansa',
    email: 'john.mwansa@email.com',
    phone: '+260 977 123 456',
  },
  {
    id: '2',
    name: 'Mary Lungu',
    email: 'mary.lungu@email.com',
    phone: '+260 966 654 321',
  },
  {
    id: '3',
    name: 'David Tembo',
    email: 'david.tembo@email.com',
    phone: '+260 955 987 654',
  },
];

// Mock locations data
const mockLocations = [
  { id: '1', province: 'Lusaka', districts: ['Lusaka', 'Chilanga', 'Kafue'] },
  { id: '2', province: 'Copperbelt', districts: ['Ndola', 'Kitwe', 'Chingola'] },
  { id: '3', province: 'Southern', districts: ['Livingstone', 'Choma', 'Mazabuka'] },
  { id: '4', province: 'Eastern', districts: ['Chipata', 'Lundazi', 'Petauke'] },
  { id: '5', province: 'Western', districts: ['Mongu', 'Kaoma', 'Senanga'] },
];

// Mock user for the dashboard
const mockUser: User = {
  fullName: 'Admin User',
  email: 'admin@lawlink.com',
  phone: '123-456-7890',
  specialization: 'System Administration',
  province: 'Lusaka',
  district: 'Lusaka',
  status: 'verified',
};

const mockOnLogout = () => {
  alert('Logged out!');
};

export default function AdminDashboard() {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lawyers, setLawyers] = useState(mockLawyers);
  const [clients, setClients] = useState(mockClients);
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isLoading && !user) {
      router.push('/logins/admin');
    }
  }, [user, isLoading, router]);

  const handleLawyerStatusChange = (lawyerId: string, newStatus: 'verified' | 'rejected') => {
    setLawyers(lawyers.map(lawyer => 
      lawyer.id === lawyerId ? { ...lawyer, status: newStatus } : lawyer
    ));
    alert(`Lawyer ${newStatus} successfully!`);
  };

  const handleDeleteLawyer = (lawyerId: string) => {
    if (window.confirm('Are you sure you want to delete this lawyer?')) {
      setLawyers(lawyers.filter(lawyer => lawyer.id !== lawyerId));
      alert('Lawyer deleted successfully!');
    }
  };

  const handleEditLawyer = (lawyerId: string) => {
    alert(`Edit functionality for lawyer ${lawyerId} is not yet implemented.`);
  };

  const handleDeleteClient = (clientId: string) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(client => client.id !== clientId));
      alert('Client deleted successfully!');
    }
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return <Homes lawyers={lawyers} clients={clients} />;

      case 'lawyers':
        return <Lawyers lawyers={lawyers} onStatusChange={handleLawyerStatusChange} onDelete={handleDeleteLawyer} onEdit={handleEditLawyer} />;

      case 'clients':
        return <Clients clients={clients} onDelete={handleDeleteClient} />;

      case 'locations':
        return <Locations locations={mockLocations} />;
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
            {lawyers.filter(l => l.status === 'pending').length > 0 && (
              <span className="ml-auto bg-yellow-600 text-white text-xs rounded-full px-2 py-1">
                {lawyers.filter(l => l.status === 'pending').length}
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
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.fullName?.charAt(0).toUpperCase() || 'A'}
                </span>
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
