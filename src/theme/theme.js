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
    primary: { main: '#2F8F83', light: '#74C7BA', dark: '#1E655D' },
    secondary: { main: mode === 'light' ? '#516B5F' : '#BFE3DA' },
    background: {
      default: mode === 'light' ? '#F5F8F6' : '#0D1416',
      paper: mode === 'light' ? '#FFFFFF' : '#162022',
    },
    text: {
      primary: mode === 'light' ? '#203532' : '#EFF7F4',
      secondary: mode === 'light' ? '#60736E' : '#A9BDB7',
    },
    divider: mode === 'light' ? '#DDE9E5' : '#263839',
    action: {
      hover: mode === 'light' ? 'rgba(47, 143, 131, 0.08)' : 'rgba(116, 199, 186, 0.12)',
    },
  },
});
