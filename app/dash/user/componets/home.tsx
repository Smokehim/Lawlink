import { useState, useEffect } from 'react';
import { 
  Search, 
  MessageSquare, 
  
  
} from 'lucide-react';

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
    const [lawyerCount, setLawyerCount] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3002/lawyers/verified')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setLawyerCount(data.length);
                }
            })
            .catch(err => console.error('Failed to fetch verified lawyer count', err));
    }, []);

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
                    <p className="text-3xl font-bold text-blue-600">{lawyerCount}</p>
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