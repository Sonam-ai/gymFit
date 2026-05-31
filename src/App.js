import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Imported Google Provider

import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import MyWorkout from './pages/MyWorkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const [authUser, setAuthUser] = useState(null);

  // Check if user is already authenticated on app launch
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setAuthUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthUser(null);
  };

  return (
    // Wrapped the entire layout with GoogleOAuthProvider
    <GoogleOAuthProvider
       clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    >
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: { xl: 1488 },
            mx: 'auto',
            px: { xs: 0, sm: 2 },
            flex: 1,
          }}
        >
          {/* Pass user profile and logout handler to the existing Navbar */}
          <Navbar user={authUser} handleLogout={handleLogout} />

          <Routes>
            {/* Protected Main App Routes */}
            <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
            <Route path="/my-workout" element={authUser ? <MyWorkout /> : <Navigate to="/login" />} />
            <Route path="/exercise/:id" element={authUser ? <ExerciseDetail /> : <Navigate to="/login" />} />

            {/* Authentication Routes */}
            <Route path="/login" element={!authUser ? <Login setAuthUser={setAuthUser} /> : <Navigate to="/" />} />
            {/* Added setAuthUser prop to Signup so Google Sign-Up can update state instantly */}
            <Route path="/signup" element={!authUser ? <Signup setAuthUser={setAuthUser} /> : <Navigate to="/" />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </GoogleOAuthProvider>
  );
};

export default App;