"use client"

interface Lawyer {
  id: string;
  status: 'verified' | 'pending' | 'rejected';
}

interface Client {
  id: string;
}

interface HomeProps {
  lawyers: Lawyer[];
  clients: Client[];
}

export default function Home({ lawyers, clients }: HomeProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Lawyers</h3>
          <p className="text-3xl font-bold text-blue-600">{lawyers.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Lawyers</h3>
          <p className="text-3xl font-bold text-green-600">
            {lawyers.filter((l) => l.status === 'verified').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-600">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Verification</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {lawyers.filter((l) => l.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Clients</h3>
          <p className="text-3xl font-bold text-purple-600">{clients.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-700">New lawyer registration</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-700">Client sign up</span>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">Lawyer verification completed</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">System Status</span>
              <span className="text-green-600 font-semibold">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Database</span>
              <span className="text-green-600 font-semibold">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Last Backup</span>
              <span className="text-gray-600">Today, 3:00 AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
