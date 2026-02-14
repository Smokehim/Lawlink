"use client"
import { 
  Search, 
  MessageSquare, 
  
  
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

interface HomesProps {
  onNavigate: (section: 'search' | 'messages') => void;
}

export default function Homes({ onNavigate }: HomesProps) {
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <button
                  onClick={() => onNavigate('search')}
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition-shadow text-left"
                  title="Navigate to search lawyers"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Available Lawyers</h3>
                    <p className="text-3xl font-bold text-blue-600">{mockLawyers.length}</p>
                </button>
                <button
                  onClick={() => onNavigate('messages')}
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600 hover:shadow-lg transition-shadow text-left"
                  title="Navigate to messages"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Messages</h3>
                    <p className="text-3xl font-bold text-green-600">{mockMessages.length}</p>
                </button>
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Consultations</h3>
                    <p className="text-3xl font-bold text-purple-600">0</p>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => onNavigate('search')}
                      className="p-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                      title="Navigate to search lawyers"
                    >
                        <Search className="w-5 h-5" />
                        <span>Search for Lawyers</span>
                    </button>
                    <button
                      onClick={() => onNavigate('messages')}
                      className="p-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center space-x-2"
                      title="Navigate to messages"
                    >
                        <MessageSquare className="w-5 h-5" />
                        <span>View Messages</span>
                    </button>
                </div>
            </div>
        </div>
    );
}