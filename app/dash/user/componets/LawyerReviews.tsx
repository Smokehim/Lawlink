import { useState, useEffect } from 'react';
import { Star, Send } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

interface Review {
  review_id: number;
  client_name: string;
  rating: number;
  review_text: string;
  created_at: string;
}

export default function LawyerReviews({ lawyerId }: { lawyerId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user, token } : any = useAuth();
  
  const fetchReviews = async () => {
    try {
      const res = await fetch(`http://localhost:3002/api/reviews/lawyer/${lawyerId}`);
      if (res.ok) {
        setReviews(await res.json());
      }
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [lawyerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || submitting) return;
    setSubmitting(true);
    try {
        const client_id = user?.userId || user?.user_id || user?.id;
        const res = await fetch('http://localhost:3002/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                client_id: client_id,
                lawyer_id: parseInt(lawyerId),
                rating,
                review_text: reviewText
            })
        });
        if (res.ok) {
            setReviewText('');
            setRating(5);
            fetchReviews();
        }
    } catch(err) {
        console.error(err);
    } finally {
        setSubmitting(false);
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="font-semibold text-gray-900 mb-3">Client Reviews ({reviews.length})</h4>
      
      <div className="max-h-40 overflow-y-auto mb-4 space-y-3 pr-2">
        {reviews.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map(r => (
            <div key={r.review_id} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-sm text-gray-800">{r.client_name}</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < r.rating ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">{r.review_text}</p>
            </div>
          ))
        )}
      </div>

      {user && (
        <form onSubmit={handleSubmit} className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Leave a Review</label>
          <div className="flex items-center mb-2">
            <span className="text-sm mr-2 text-gray-600">Rating:</span>
            {[1, 2, 3, 4, 5].map(star => (
              <button type="button" key={star} onClick={() => setRating(star)} className="focus:outline-none focus:scale-110 transition-transform">
                <Star className={`w-5 h-5 ${rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
              </button>
            ))}
          </div>
          <textarea
            required
            rows={2}
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            placeholder="Share your experience with this lawyer..."
            className="w-full text-sm p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-3 bg-white resize-none"
          />
          <button
            type="submit"
            disabled={submitting || !reviewText.trim()}
            className="w-full flex items-center justify-center space-x-1.5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? 'Submitting...' : 'Submit Review'}</span>
          </button>
        </form>
      )}
    </div>
  );
}
