"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Home from './componets/home';
import Clients from './componets/clients';
import Availability from './componets/availability';
import Profile from './componets/profile';
import Messages from './componets/messages';
import SupportForm from './componets/support';
import Appointments from './componets/appointments';
import Image from 'next/image';
import { 
  Home as HomeIcon, 
  Users, 
  Calendar, 
  CalendarCheck,
  UserCircle, 
  LogOut, 
  Menu, 
  X,
  MessageSquare,
  LifeBuoy
} from 'lucide-react';

const API_BASE = 'http://localhost:3002';

interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  gender: string;
  role: 'client' | 'lawyer' | 'admin';
  province?: string;
  district?: string;
  specialization?: string;
  status?: string;
  certificates?: string[];
}

type Section = 'home' | 'clients' | 'availability' | 'appointments' | 'messages' | 'profile' | 'support';

// Mock client requests removed - using real data from backend

export default function LawyerDashboard() {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileData, setProfileData] = useState<User | null>(null);
  const [requestsCount, setRequestsCount] = useState(0);
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    } else if (user) {
      setProfileData({
        id: user.userId.toString(),
        email: user.email,
        fullName: user.fullName,
        phone: user.phone || user.phone_number || user.number || '',
        gender: user.gender || '',
        role: 'lawyer',
        province: user.province,
        district: user.district,
        specialization: user.specialization,
        status: user.status,
        certificates: user.certificates,
      });
    }
  }, [user, isLoading, router]);
  



  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return <Home user={profileData} requestsCount={requestsCount} />;
      case 'clients':
        return <Clients 
          onRequestsUpdate={setRequestsCount} 
          onViewMessages={() => setCurrentSection('messages')}
        />;
      case 'availability':
        return <Availability />;
      case 'appointments':
        return <Appointments />;
      case 'messages':
        return <Messages />;
      case 'profile':
        return <Profile />;
      case 'support':
        return <SupportForm lawyerId={user?.userId || ''} authToken={''} />;
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
          <h1 className="text-xl font-bold text-gray-900">Lawyer Portal</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden" title="Close sidebar">
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
                ? 'bg-purple-50 text-purple-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            <span>Home</span>
          </button>
          
          <button
            onClick={() => {
              setCurrentSection('clients');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentSection === 'clients'
                ? 'bg-purple-50 text-purple-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Clients</span>
            {requestsCount > 0 && (
              <span className="ml-auto bg-purple-600 text-white text-xs rounded-full px-2 py-1">
                {requestsCount}
              </span>
            )}
          </button>
          
          <button
            onClick={() => {
              setCurrentSection('availability');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentSection === 'availability'
                ? 'bg-purple-50 text-purple-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Availability</span>
          </button>

          <button
            onClick={() => {
              setCurrentSection('appointments');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentSection === 'appointments'
                ? 'bg-purple-50 text-purple-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <CalendarCheck className="w-5 h-5" />
            <span>Appointments</span>
          </button>

          <button
            onClick={() => {
              setCurrentSection('messages');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentSection === 'messages'
                ? 'bg-purple-50 text-purple-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
          </button>
          
          <button
            onClick={() => {
              setCurrentSection('profile');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentSection === 'profile'
                ? 'bg-purple-50 text-purple-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <UserCircle className="w-5 h-5" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => {
              setCurrentSection('support');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentSection === 'support'
                ? 'bg-purple-50 text-purple-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LifeBuoy className="w-5 h-5" />
            <span>Support</span>
          </button>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            onClick={logout}
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
              title="Open sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user?.fullName || 'Lawyer'}</span>
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-purple-600 relative">
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
                    {user?.fullName?.charAt(0).toUpperCase() || 'L'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {isLoading || !profileData ? (
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
