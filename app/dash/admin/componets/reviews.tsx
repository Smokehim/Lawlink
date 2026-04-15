import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Edit2, Save, X, Trash2, Search as SearchIcon, Star } from 'lucide-react';

interface Review {
  review_id: number;
  client_id: number;
  lawyer_id: number;
  client_name: string;
  lawyer_name: string;
  rating: number;
  review_text: string;
  created_at: string;
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { token } = useAuth();

  const fetchReviews = async () => {
    try {
      const res = await fetch('http://localhost:3002/api/reviews', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [token]);

  const handleUpdate = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3002/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ review_text: editText })
      });
      if (res.ok) {
        setReviews(reviews.map(r => r.review_id === id ? { ...r, review_text: editText } : r));
        setEditingId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`http://localhost:3002/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setReviews(reviews.filter(r => r.review_id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredReviews = reviews.filter(r => 
    r.lawyer_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.review_text?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Manage Reviews</h2>
          <p className="text-gray-500">Moderate and update client reviews.</p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
          />
          <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="p-6 overflow-x-auto">
        {loading ? (
          <p className="text-gray-500 text-center">Loading reviews...</p>
        ) : filteredReviews.length === 0 ? (
          <p className="text-gray-500 text-center">No reviews found.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 font-semibold text-gray-600">Lawyer</th>
                <th className="p-4 font-semibold text-gray-600">Client</th>
                <th className="p-4 font-semibold text-gray-600">Rating</th>
                <th className="p-4 font-semibold text-gray-600 w-1/3">Review Text</th>
                <th className="p-4 font-semibold text-gray-600">Date</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map(review => (
                <tr key={review.review_id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{review.lawyer_name}</td>
                  <td className="p-4">{review.client_name}</td>
                  <td className="p-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    {editingId === review.review_id ? (
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full border rounded p-2 text-sm focus:ring-blue-500"
                        rows={3}
                      />
                    ) : (
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{review.review_text}</p>
                    )}
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {editingId === review.review_id ? (
                      <>
                        <button onClick={() => handleUpdate(review.review_id)} className="text-green-600 hover:text-green-800" title="Save">
                          <Save className="w-5 h-5" />
                        </button>
                        <button onClick={() => setEditingId(null)} className="text-gray-600 hover:text-gray-800" title="Cancel">
                          <X className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => {
                            setEditingId(review.review_id);
                            setEditText(review.review_text);
                          }} 
                          className="text-blue-600 hover:text-blue-800" 
                          title="Edit"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(review.review_id)} className="text-red-600 hover:text-red-800" title="Delete">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
