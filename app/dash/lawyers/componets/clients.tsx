import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';

const API_BASE = 'http://localhost:3002';
import { 
  User, 
  Clock, 
  CheckCircle, 
  XCircle, 
  MessageSquare,
  Mail,
  FileText,
  Phone,
  Send,
  X
} from 'lucide-react';

interface Request {
  request_id: number;
  client_id: number;
  client_name: string;
  client_email: string;
  client_phone: string;
  request_details: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

interface ClientsProps {
  onRequestsUpdate?: (count: number) => void;
  onViewMessages: () => void;
}

export default function Clients({ onRequestsUpdate, onViewMessages }: ClientsProps) {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [initialMessage, setInitialMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchRequests();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchRequests = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}/client-requests/lawyer/${user.userId}`);
      const data: Request[] = await res.json();
      if (!res.ok) throw new Error('Failed to fetch requests');
      setRequests(data);
      onRequestsUpdate?.(data.filter(r => r.status === 'pending').length);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestAction = async (requestId: number, action: 'accepted' | 'rejected', message?: string) => {
    try {
      setIsSubmitting(true);
      const res = await fetch(`${API_BASE}/client-requests/${requestId}/action`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, initial_message: message })
      });
      if (!res.ok) throw new Error('Action failed');
      
      // Update local state
      const updatedRequests = requests.map(req => 
        req.request_id === requestId ? { ...req, status: action } : req
      );
      setRequests(updatedRequests);
      onRequestsUpdate?.(updatedRequests.filter(r => r.status === 'pending').length);

      if (action === 'accepted') {
        alert('Request accepted! Your message has been sent.');
        setSelectedRequest(null);
        setInitialMessage('');
        onViewMessages();
      } else {
        alert('Request rejected.');
      }
    } catch (error) {
      console.error(`Error ${action} request:`, error);
      alert(`Failed to ${action} request. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Client Management</h2>
          <p className="text-gray-500 mt-1">Review and manage incoming legal requests.</p>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-16 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No requests yet</h3>
          <p className="text-gray-500 max-w-xs mx-auto mt-2">
            Incoming requests from potential clients will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((request) => (
            <div 
              key={request.request_id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-lg">
                      {request.client_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{request.client_name}</h3>
                      <div className="grid grid-cols-1 gap-1 mt-1">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Mail className="w-3.5 h-3.5 mr-1.5" />
                          {request.client_email}
                        </div>
                        {request.client_phone && (
                          <div className="flex items-center text-gray-500 text-sm">
                            <Phone className="w-3.5 h-3.5 mr-1.5" />
                            {request.client_phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex items-start space-x-2">
                    <FileText className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {request.request_details}
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-gray-400 text-xs">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  Received on {formatDate(request.created_at)}
                </div>
              </div>

              <div className="mt-auto px-6 pb-6 pt-2">
                {request.status === 'pending' ? (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedRequest(request)}
                      disabled={isSubmitting}
                      className="flex items-center justify-center space-x-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors font-medium shadow-sm disabled:opacity-50"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => handleRequestAction(request.request_id, 'rejected')}
                      disabled={isSubmitting}
                      className="flex items-center justify-center space-x-2 py-2.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-xl transition-colors font-medium disabled:opacity-50"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                ) : request.status === 'accepted' ? (
                  <button
                    onClick={onViewMessages}
                    className="w-full flex items-center justify-center space-x-2 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors font-medium shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                ) : (
                  <div className="w-full py-2.5 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center font-medium border border-gray-100 italic">
                    Request Rejected
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Acceptance Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-900">Accept Legal Request</h3>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider font-semibold">Client Details</p>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                  <p className="font-bold text-gray-900">{selectedRequest.client_name}</p>
                  <p className="text-sm text-gray-600">{selectedRequest.client_email}</p>
                  {selectedRequest.client_phone && (
                    <p className="text-sm text-gray-600">{selectedRequest.client_phone}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Initial Message (Optional)
                </label>
                <textarea
                  value={initialMessage}
                  onChange={(e) => setInitialMessage(e.target.value)}
                  placeholder="e.g. Hello, I have reviewed your request and would like to help... "
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none h-32 text-sm"
                />
                <p className="mt-2 text-xs text-gray-500">
                  This message will be sent immediately after acceptance.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleRequestAction(selectedRequest.request_id, 'accepted', initialMessage)}
                  disabled={isSubmitting}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 shadow-lg shadow-purple-200 disabled:opacity-50"
                  title="Confirm"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Confirm & Send Message</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setSelectedRequest(null)}
                  disabled={isSubmitting}
                  className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
                  title="Cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
