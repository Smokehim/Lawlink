"use client"
import { Trash2 } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ClientsProps {
  clients: Client[];
  onDelete: (clientId: string) => void;
}

export default function Clients({ clients, onDelete }: ClientsProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Manage Clients</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{client.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{client.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{client.phone}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onDelete(client.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete client"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
