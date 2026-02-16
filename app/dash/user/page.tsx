"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Homes from './componets/home';
import Message from './componets/message';
import Profile from './componets/profile';
import Searchs from './componets/search';
import { useAuth } from '@/app/context/AuthContext';
import { 
  Home, 
  Search, 
  MessageSquare, 
  UserCircle, 
  LogOut, 
  Menu, 
  X
  
} from 'lucide-react';

type Section = 'home' | 'search' | 'messages' | 'profile';

// Mock data for lawyers

const mockMessages = [
  {
    id: '1',
    lawyerName: 'Sarah Banda',
    content: 'Thank you for reaching out. I have reviewed your case and I am available to discuss it further.',
    date: '2026-01-28',
    lawyerId: '1',
  },
  {
    id: '2',
    lawyerName: 'James Phiri',
    content: 'I would be happy to help you with your family law matter. Please schedule a consultation.',
    date: '2026-01-27',
    lawyerId: '2',
  },
];

export default function ClientDashboard() {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isLoading && !user) {
      router.push('/logins/user');
    }
  }, [user, isLoading, router]);
  
  

  
  

  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return <Homes onNavigate={(section) => setCurrentSection(section)} />;
      case 'search':
        return <Searchs onNavigate={(section) => setCurrentSection(section)} />;
      case 'messages':
        return <Message onNavigate={(section) => setCurrentSection(section)} />;

      case 'profile':
        return <Profile onNavigate={(section) => setCurrentSection(section)} />;
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
            {mockMessages.length > 0 && (
              <span className="ml-auto bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                {mockMessages.length}
              </span>
            )}
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
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            onClick={() => {
              logout();
              router.push('/logins/user');
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
              title="Open sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user?.fullName || 'User'}</span>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">{user?.fullName?.charAt(0).toUpperCase() || 'U'}</span>
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
