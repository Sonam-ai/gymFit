import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert, Paper, Divider } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';

const Login = ({ setAuthUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://gymfit-api.onrender.com/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setAuthUser(data.user);
        navigate('/');
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Cannot connect to server. Is your backend running?');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    try {
      const response = await fetch('https://gymfit-api.onrender.com/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setAuthUser(data.user);
        navigate('/');
      } else {
        setError(data.message || 'Google Sign-In failed.');
      }
    } catch (err) {
      setError('Backend connection failed during Google Sign-In.');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh', px: 2 }}>
      <Paper elevation={4} sx={{ p: 4, maxWidth: 400, width: '100%', borderRadius: '12px' }}>
        <Typography variant="h4" fontWeight="bold" mb={1} color="#FF2625">Sign In</Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>Welcome back! Log in to track your routine.</Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        {/* Main Manual Login Form */}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email Address" name="email" type="email" variant="outlined" margin="normal" value={formData.email} onChange={handleChange} required />
          <TextField fullWidth label="Password" name="password" type="password" variant="outlined" margin="normal" value={formData.password} onChange={handleChange} required />
          
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 1, bgcolor: '#FF2625', '&:hover': { bgcolor: '#e01f1e' }, py: 1.5, fontSize: '16px', fontWeight: 'bold' }}>
            Log In
          </Button>
        </form>

        {/* Clean Text Divider with Margin Spacing */}
        <Divider sx={{ my: 3, color: 'text.secondary', fontSize: '14px' }}>or</Divider>
        
        {/* Google Login Button shifted lower with a centered layout block */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google Sign-In Failed. Try again.')}
            theme="dark"
            shape="circle"
          />
        </Box>
        
        <Typography variant="body2" textAlign="center" mt={1}>
          Don't have an account? <Link to="/signup" style={{ color: '#FF2625', fontWeight: 'bold', textDecoration: 'none' }}>Sign Up</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;