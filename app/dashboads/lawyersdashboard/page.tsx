"use client"
import { useState } from 'react';
import Home from './componets/home';
import Clients from './componets/clients';
import Availability from './componets/availability';
import Profile from './componets/profile';
import Messages from './componets/messages';
import { 
  Home as HomeIcon, 
  Users, 
  Calendar, 
  UserCircle, 
  LogOut, 
  Menu, 
  X,
  MessageSquare
} from 'lucide-react';

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

type Section = 'home' | 'clients' | 'availability' | 'messages' | 'profile';

// Mock client requests
const mockRequests = [
  {
    id: '1',
    clientName: 'John Mwansa',
    requestDetails: 'Need consultation for corporate contract review',
    date: '2026-01-28',
    status: 'pending',
  },
  {
    id: '2',
    clientName: 'Mary Lungu',
    requestDetails: 'Family law matter - divorce proceedings',
    date: '2026-01-27',
    status: 'pending',
  },
  {
    id: '3',
    clientName: 'David Tembo',
    requestDetails: 'Property dispute consultation',
    date: '2026-01-26',
    status: 'pending',
  },
];

export default function LawyerDashboard() {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileData, setProfileData] = useState<User | null>({
    id: '1',
    email: 'lawyer@example.com',
    fullName: 'Sarah Banda',
    phone: '+260 966 789 012',
    gender: 'female',
    role: 'lawyer',
    province: 'Lusaka',
    district: 'Lusaka',
    specialization: 'Corporate Law',
    status: 'verified',
    certificates: ['Law Degree - University of Zambia', 'Bar License - 2020'],
  });
  const [requests, setRequests] = useState(mockRequests);
  
  // Messages state (shared with clients action)
  const [clientMessages, setClientMessages] = useState([
    {
      id: '1',
      clientName: 'John Mwansa',
      clientEmail: 'john@example.com',
      content: 'Need consultation for corporate contract review',
      date: '2026-01-28',
      status: 'received',
      replies: [],
    },
    {
      id: '2',
      clientName: 'Mary Lungu',
      clientEmail: 'mary@example.com',
      content: 'Family law matter - divorce proceedings',
      date: '2026-01-27',
      status: 'received',
      replies: [],
    },
  ]);
  
  // Availability state
  const [unavailableDates, setUnavailableDates] = useState<string[]>([
    '2026-02-15',
    '2026-02-20',
  ]);

  const [newUnavailableDate, setNewUnavailableDate] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('lawyerToken');
    window.location.href = '/lawyerslogin';
  };

  const handleRequestAction = (requestId: string, action: 'accept' | 'reject') => {
    const request = requests.find(r => r.id === requestId);
    
    if (action === 'accept' && request) {
      // Create a message from the accepted client
      const newMessage = {
        id: Date.now().toString(),
        clientName: request.clientName,
        clientEmail: `${request.clientName.toLowerCase().replace(' ', '.')}@example.com`,
        content: request.requestDetails,
        date: new Date().toISOString().split('T')[0],
        status: 'received',
        replies: [],
      };
      setClientMessages((prev) => [newMessage, ...prev]);
    }
    
    setRequests(requests.filter(req => req.id !== requestId));
    alert(`Request ${action}ed successfully!`);
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const handleAddUnavailableDate = () => {
    if (newUnavailableDate && !unavailableDates.includes(newUnavailableDate)) {
      setUnavailableDates([...unavailableDates, newUnavailableDate]);
      setNewUnavailableDate('');
    }
  };

  const handleRemoveUnavailableDate = (date: string) => {
    setUnavailableDates(unavailableDates.filter(d => d !== date));
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return <Home user={profileData} requests={requests} />;
      case 'clients':
        return <Clients requests={requests} onRequestAction={handleRequestAction} />;
      case 'availability':
        return (
          <Availability
            unavailableDates={unavailableDates}
            newUnavailableDate={newUnavailableDate}
            onNewDateChange={setNewUnavailableDate}
            onAddDate={handleAddUnavailableDate}
            onRemoveDate={handleRemoveUnavailableDate}
          />
        );
      case 'messages':
        return <Messages messages={clientMessages} onMessagesChange={setClientMessages} />;
      case 'profile':
        return (
          <Profile
            profileData={profileData}
            onProfileChange={setProfileData}
            onProfileUpdate={handleProfileUpdate}
          />
        );
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
            {requests.length > 0 && (
              <span className="ml-auto bg-purple-600 text-white text-xs rounded-full px-2 py-1">
                {requests.length}
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
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            onClick={handleLogout}
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
              <span className="text-gray-700">{profileData?.fullName || 'Lawyer'}</span>
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {profileData?.fullName?.charAt(0) || 'L'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
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
