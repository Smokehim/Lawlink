"use client"

interface Request {
  id: string;
  clientName: string;
  requestDetails: string;
  date: string;
  status: string;
}

interface ClientsProps {
  requests: Request[];
  onRequestAction: (requestId: string, action: 'accept' | 'reject') => void;
}

export default function Clients({ requests, onRequestAction }: ClientsProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Client Requests</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Request Details</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{request.clientName}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{request.requestDetails}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{request.date}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onRequestAction(request.id, 'accept')}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => onRequestAction(request.id, 'reject')}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <div className="p-12 text-center text-gray-600">
            No pending requests at this time.
          </div>
        )}
      </div>
    </div>
  );
}
