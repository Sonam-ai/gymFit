import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import MyWorkout from './pages/MyWorkout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => (
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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-workout" element={<MyWorkout />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
      </Routes>
    </Box>
    <Footer />
  </Box>
);

export default App;
