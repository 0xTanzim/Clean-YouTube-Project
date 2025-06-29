import { createTheme } from '@mui/material/styles';

// Light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#dc2626',
    },
    background: {
      default: '#ffffff',
      paper: '#f8fafc',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
    },
  },
});

// Dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
    },
    secondary: {
      main: '#ef4444',
    },
    background: {
      default: '#111827',
      paper: '#1f2937',
    },
    text: {
      primary: '#f9fafb',
      secondary: '#d1d5db',
    },
  },
});
