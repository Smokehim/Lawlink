"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Homes from './componets/home';
import Message from './componets/message';
import Profile from './componets/profile';
import Image from 'next/image';
import Searchs from './componets/search';
import SupportForm from './componets/support';
import UserAppointments from './componets/appointments';
import NotificationBell from '@/app/components/NotificationBell';
import { useAuth } from '@/app/context/AuthContext';
import {
  Home,
  Search,
  MessageSquare,
  UserCircle,
  LogOut,
  Menu,
  X,
  LifeBuoy,
  CalendarCheck
} from 'lucide-react';

const API_BASE = 'http://localhost:3002';

type Section = 'home' | 'search' | 'messages' | 'profile' | 'support' | 'appointments';



export default function ClientDashboard() {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);
  
  

  
  

  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return <Homes onNavigate={(section) => setCurrentSection(section)} />;
      case 'search':
        return <Searchs onNavigate={(section) => setCurrentSection(section)} />;
      case 'messages':
        return <Message />;

      case 'profile':
        return <Profile />;
      case 'support':
        return <SupportForm />;
      case 'appointments':
        return <UserAppointments />;
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
          <h1 className="text-xl font-bold text-gray-900">Client Portal</h1>
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
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>
          
          <button
            onClick={() => {
              setCurrentSection('search');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentSection === 'search'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Search className="w-5 h-5" />
            <span>Search Lawyers</span>
          </button>
          
          <button
            onClick={() => {
              setCurrentSection('messages');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentSection === 'messages'
                ? 'bg-blue-50 text-blue-600'
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
                ? 'bg-blue-50 text-blue-600'
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
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LifeBuoy className="w-5 h-5" />
            <span>Support</span>
          </button>

          <button
            onClick={() => {
              setCurrentSection('appointments');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentSection === 'appointments'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <CalendarCheck className="w-5 h-5" />
            <span>Appointments</span>
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
            <div className="flex items-center space-x-6 lg:ml-auto">
              <NotificationBell role="client" />
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 font-medium hidden sm:block">{user?.fullName || 'User'}</span>
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-blue-600 relative shadow-sm">
                  {user?.profile_picture ? (
                    <Image 
                      src={`${API_BASE}${user.profile_picture}`} 
                      alt="Profile" 
                      fill 
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="text-white font-semibold">{user?.fullName?.charAt(0).toUpperCase() || 'U'}</span>
                  )}
                </div>
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
