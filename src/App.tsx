import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import OperatorInterface from './pages/OperatorInterface';
import OperatorInput from './pages/OperatorInput';
import LoginScreen from './pages/LoginScreen';
import QualityScreen from './pages/QualityScreen';
import ShiftScreen from './pages/ShiftScreen';
import StandardCycleTime from './pages/StandardCycleTime';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a365d',  // Deep blue
      light: '#2a4a7a',
      dark: '#102a43',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2d7ff9',  // Bright blue
      light: '#5a9cff',
      dark: '#0054c6',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',  // Very light gray
      paper: '#ffffff',
    },
    success: {
      main: '#10b981',  // Emerald green
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      main: '#f59e0b',  // Amber
      light: '#fbbf24',
      dark: '#d97706',
    },
    error: {
      main: '#ef4444',  // Red
      light: '#f87171',
      dark: '#dc2626',
    },
    text: {
      primary: '#1e293b',  // Dark gray
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.25,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/operator-input" element={<OperatorInput />} />
          <Route path="/quality" element={<QualityScreen />} />
          <Route path="/shifts" element={<ShiftScreen />} />
          <Route path="/cycle-times" element={<StandardCycleTime />} />
          {/* Keep old routes for backward compatibility */}
          <Route path="/operator-interface" element={<OperatorInterface />} />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
