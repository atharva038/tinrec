import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getRecyclerProfile } from '../services/recyclerApi';
import { Box, CircularProgress, Typography } from '@mui/material';

// This component checks if the recycler is already registered
// If yes, redirects to update services page
// If no, allows access to registration form

const RecyclerRegistrationGuard = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        setLoading(true);
        await getRecyclerProfile(token);
        // If successful (no error), profile exists
        setIsRegistered(true);
      } catch (error) {
        // If error, profile doesn't exist
        setIsRegistered(false);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      checkRegistrationStatus();
    } else {
      // No token, redirect to login
      navigate('/login');
    }
  }, [token, navigate]);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '70vh' 
      }}>
        <CircularProgress sx={{ color: '#00897b', mb: 2 }} />
        <Typography variant="body1" color="text.secondary">
          Checking registration status...
        </Typography>
      </Box>
    );
  }

  if (isRegistered) {
    // Already registered, redirect to service management
    return <Navigate to="/dashboard/recycler/update-services" replace />;
  }

  // Not registered, allow access to registration form
  return children;
};

export default RecyclerRegistrationGuard;