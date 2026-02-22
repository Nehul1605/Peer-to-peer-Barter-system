import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api'; // Import api to fetch user profile

export default function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      
      // Fetch user profile immediately after setting token
      api.get('/users/profile')
        .then(response => {
            if(response.data.success) {
                setUser(response.data.data);
                navigate('/dashboard');
            }
        })
        .catch(err => {
            console.error(err);
            navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate, setUser]);

  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-neutral-950">
      <p>Processing login...</p>
    </div>
  );
}
