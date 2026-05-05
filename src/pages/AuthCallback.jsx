// pages/AuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/');  // redirect to home
    } else {
      navigate('/signin?error=google_failed');
    }
  },[navigate]);

  return <p>Signing you in...</p>;
}

export default AuthCallback;