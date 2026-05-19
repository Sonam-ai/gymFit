import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
} from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

import Logo from '../assets/images/Logo.png';
import { useColorMode } from '../context/ColorModeContext';

const navLinkSx = {
  textDecoration: 'none',
  fontSize: { xs: '18px', sm: '20px' },
  fontWeight: 600,
  color: 'text.primary',
  pb: 0.5,
  borderBottom: '3px solid',
  borderColor: 'primary.main',
  transition: 'opacity 0.2s ease',
  '&:hover': { opacity: 0.75 },
};

const Navbar = () => {
  const theme = useTheme();
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

        <Stack direction="row" alignItems="center" spacing={{ xs: 2, sm: 4 }}>
          <Stack direction="row" spacing={{ xs: 2.5, sm: 4 }}>
            <Link component={RouterLink} to="/" sx={navLinkSx}>
              Home
            </Link>
            <Link href="#fitness-calculator" sx={navLinkSx}>
              Calculator
            </Link>
            <Link href="#exercises" sx={navLinkSx}>
              Exercises
            </Link>
          </Stack>

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
