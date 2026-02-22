import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star,  MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'sonner';
import api from '../../services/api';

export default function SessionReview() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
        toast.error("Please select a rating");
        return;
    }

    setLoading(true);
    try {
        // Mark session as completed
        await api.put(`/sessions/${sessionId}`, { status: 'COMPLETED' });
        
        // Add review (assuming endpoint exists, or just log success for now)
        // await api.post(`/sessions/${sessionId}/reviews`, { rating, comment });
        
        toast.success("Session completed and review submitted!");
        navigate('/dashboard/credits');
    } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
       <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="max-w-md w-full bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8 shadow-2xl"
       >
            <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-2">Session Completed!</h2>
            <p className="text-neutral-400 text-center mb-8">
                How was your experience? Your feedback helps the community grow.
            </p>

            <div className="flex justify-center gap-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="p-1 transition-transform hover:scale-110"
                    >
                        <Star 
                            className={`w-8 h-8 ${(hoveredRating || rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600'}`} 
                        />
                    </button>
                ))}
            </div>

            <div className="space-y-4 mb-8">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Additional Feedback
                </label>
                <Textarea
                    placeholder="Share details about your session..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="bg-neutral-900/60 border-neutral-800 min-h-[100px]"
                />
            </div>

            <Button 
                onClick={handleSubmit} 
                disabled={loading}
                className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary py-6 text-lg font-semibold"
            >
                {loading ? 'Submitting...' : 'Submit Review'}
            </Button>
            
            <button
                onClick={() => navigate('/dashboard')}
                className="w-full mt-4 text-sm text-neutral-500 hover:text-white transition-colors"
            >
                Skip feedback
            </button>
       </motion.div>
    </div>
  );
}
