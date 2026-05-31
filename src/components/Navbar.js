import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
  Button,
} from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'; // Clean logout icon

import Logo from '../assets/images/Logo.png';
import { useColorMode } from '../context/ColorModeContext';

const navLinkSx = {
  textDecoration: 'none',
  fontSize: { xs: '14px', sm: '16px', md: '20px' },
  fontWeight: 600,
  color: 'text.primary',
  pb: 0.5,
  borderBottom: '3px solid',
  borderColor: 'transparent', // Changed default to transparent so non-active links look uniform
  transition: 'all 0.2s ease',
  '&:hover': { 
    opacity: 0.75,
    borderColor: 'primary.main',
  },
};

// Accept user and handleLogout as props from App.js
const Navbar = ({ user, handleLogout }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { mode, toggleColorMode } = useColorMode();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        mt: { xs: 2, sm: 3 },
        mx: { xs: 1, sm: 0 },
        bgcolor: 'background.paper',
        borderRadius: 3,
        border: 1,
        borderColor: 'divider',
        backdropFilter: 'blur(12px)',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          py: 1,
          px: { xs: 2, sm: 3 },
          minHeight: { xs: 64, sm: 72 },
        }}
      >
        {/* Left Side: Logo and Title */}
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box component={RouterLink} to="/" sx={{ display: 'flex', lineHeight: 0 }}>
            <Box
              component="img"
              src={Logo}
              alt="logo"
              sx={{ width: 44, height: 44 }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Gym<span style={{ color: theme.palette.primary.main }}>Fit</span>
          </Typography>
        </Stack>

        {/* Right Side: Navigation Links & Auth Actions */}
        <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 3 }}>
          <Stack
            direction="row"
            spacing={{ xs: 1.5, sm: 2.5, md: 4 }}
            flexWrap="wrap"
            useFlexGap
            justifyContent="flex-end"
            alignItems="center"
          >
            <Link component={RouterLink} to="/" sx={{ ...navLinkSx, borderColor: 'primary.main' }}>
              Home
            </Link>
            <Link href="#fitness-calculator" sx={navLinkSx}>
              Calculator
            </Link>
            <Link href="#exercises" sx={navLinkSx}>
              Exercises
            </Link>
            <Link component={RouterLink} to="/my-workout" sx={navLinkSx}>
              My Workout
            </Link>

            {/* ========================================== */}
            {/* CONDITIONAL USER AUTH ROUTING LOGIC         */}
            {/* ========================================== */}
            {user ? (
              <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'primary.main', 
                    fontSize: { xs: '14px', sm: '16px', md: '18px' } 
                  }}
                >
                  Hi, {user.username}
                </Typography>
                <Tooltip title="Log Out">
                  <IconButton
                    onClick={() => {
                      handleLogout();
                      navigate('/login');
                    }}
                    size="small"
                    sx={{
                      color: 'error.main',
                      border: 1,
                      borderColor: 'divider',
                      bgcolor: 'action.hover',
                      '&:hover': { bgcolor: 'error.light', color: '#fff' }
                    }}
                  >
                    <LogoutOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                size="small"
                sx={{
                  bgcolor: 'primary.main',
                  color: '#fff',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: { xs: '12px', sm: '14px' },
                  px: { xs: 1.5, sm: 2.5 },
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
              >
                Sign In
              </Button>
            )}
          </Stack>

          {/* Theme Switcher Toggle */}
          <Tooltip title={mode === 'light' ? 'Dark mode' : 'Light mode'}>
            <IconButton
              onClick={toggleColorMode}
              aria-label="toggle theme"
              sx={{
                bgcolor: 'action.hover',
                border: 1,
                borderColor: 'divider',
                '&:hover': { bgcolor: 'action.selected' },
              }}
            >
              {mode === 'light' ? (
                <DarkModeOutlinedIcon sx={{ color: 'text.primary' }} />
              ) : (
                <LightModeOutlinedIcon sx={{ color: 'primary.main' }} />
              )}
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;