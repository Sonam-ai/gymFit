import { createTheme } from '@mui/material/styles';

const shared = {
  typography: {
    fontFamily: '"DM Sans", "Segoe UI", Roboto, sans-serif',
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          backgroundColor: theme.palette.background.default,
          transition: 'background-color 0.35s ease, color 0.35s ease',
        },
        '*::-webkit-scrollbar': { width: 8, height: 8 },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.primary.main,
          borderRadius: 20,
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.mode === 'light' ? '#E8ECF4' : '#2A2A38',
        },
      }),
    },
  },
};

export const getTheme = (mode) => createTheme({
  ...shared,
  palette: {
    mode,
    primary: { main: '#FF2625', light: '#FF5C52', dark: '#D91E1E' },
    secondary: { main: mode === 'light' ? '#3A1212' : '#FFB4B0' },
    background: {
      default: mode === 'light' ? '#F4F6FB' : '#0D0D12',
      paper: mode === 'light' ? '#FFFFFF' : '#18181F',
    },
    text: {
      primary: mode === 'light' ? '#1A1D2E' : '#F2F3F7',
      secondary: mode === 'light' ? '#5C6178' : '#A0A4B8',
    },
    divider: mode === 'light' ? '#E8ECF4' : '#2A2A38',
    action: {
      hover: mode === 'light' ? 'rgba(255, 38, 37, 0.06)' : 'rgba(255, 77, 77, 0.1)',
    },
  },
});
