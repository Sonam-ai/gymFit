import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert, Paper } from '@mui/material';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://gymfit-api.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Account created successfully! Proceeding to Sign In.');
        setFormData({ username: '', email: '', password: '' });
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setError('Cannot connect to server. Is your backend running?');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', px: 2 }}>
      <Paper elevation={4} sx={{ p: 4, maxWidth: 400, width: '100%', borderRadius: '12px' }}>
        <Typography variant="h4" fontWeight="bold" mb={1} color="#FF2625">Get Started</Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>Create an account to fully build personalized routines.</Typography>
        
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Username" name="username" variant="outlined" margin="normal" value={formData.username} onChange={handleChange} required />
          <TextField fullWidth label="Email Address" name="email" type="email" variant="outlined" margin="normal" value={formData.email} onChange={handleChange} required />
          <TextField fullWidth label="Password" name="password" type="password" variant="outlined" margin="normal" value={formData.password} onChange={handleChange} required />
          
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#FF2625', '&:hover': { bgcolor: '#e01f1e' }, py: 1.5, fontSize: '16px', fontWeight: 'bold' }}>
            Register
          </Button>
        </form>
        
        <Typography variant="body2" textAlign="center" mt={2}>
          Already have an account? <Link to="/login" style={{ color: '#FF2625', fontWeight: 'bold', textDecoration: 'none' }}>Sign In</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;