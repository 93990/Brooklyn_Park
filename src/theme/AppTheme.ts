import { createTheme } from '@mui/material/styles';

// Standardized color palette
const colors = {
  primary: {
    main: '#1a365d',
    light: '#2d4a7a',
    dark: '#0f2942',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#FFC500',
    light: '#FFD700',
    dark: '#E6B800',
    contrastText: '#1a365d',
  },
  success: {
    main: '#10b981',
    light: '#34d399',
    dark: '#059669',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
    contrastText: '#ffffff',
  },
  error: {
    main: '#ef4444',
    light: '#f87171',
    dark: '#dc2626',
    contrastText: '#ffffff',
  },
  info: {
    main: '#3b82f6',
    light: '#60a5fa',
    dark: '#2563eb',
    contrastText: '#ffffff',
  },
  grey: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  background: {
    default: '#f9fafb',
    paper: '#ffffff',
  },
  text: {
    primary: '#1f2937',
    secondary: '#6b7280',
  },
};

// Standardized typography
const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    color: colors.text.primary,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
    color: colors.text.primary,
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.3,
    color: colors.text.primary,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
    color: colors.text.primary,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.4,
    color: colors.text.primary,
  },
  h6: {
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.4,
    color: colors.text.primary,
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
    color: colors.text.secondary,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
    color: colors.text.secondary,
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    color: colors.text.primary,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5,
    color: colors.text.secondary,
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.4,
    color: colors.text.secondary,
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
    textTransform: 'none' as const,
  },
};

// Standardized spacing
const spacing = (factor: number) => `${0.25 * factor}rem`;

// Create the theme
export const AppTheme = createTheme({
  palette: {
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
    grey: colors.grey,
    background: colors.background,
    text: colors.text,
  },
  typography,
  spacing,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontSize: '0.875rem',
          fontWeight: 500,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid rgba(0,0,0,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover fieldset': {
              borderColor: colors.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary.main,
            },
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: colors.primary.main,
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '0.875rem',
            padding: '16px',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '12px 16px',
          fontSize: '0.875rem',
          borderBottom: `1px solid ${colors.grey[200]}`,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontSize: '0.75rem',
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: `linear-gradient(135deg, ${colors.secondary.main} 0%, ${colors.secondary.light} 50%, ${colors.secondary.main} 100%)`,
          boxShadow: '0 4px 20px rgba(255, 197, 0, 0.3), 0 2px 10px rgba(0,0,0,0.1)',
          height: 80,
          borderBottom: '2px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
});

// Common styles for consistent layout
export const commonStyles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '100vh',
    width: '100vw',
    overflowX: 'hidden' as const,
    bgcolor: 'background.default',
    backgroundImage: `url(/bgformain.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed' as const,
  },
  
  mainContent: {
    component: 'main' as const,
    maxWidth: 'xl' as const,
    disableGutters: true,
    sx: {
      flex: 1,
      pt: { xs: 12, sm: 13 },
      pb: 6,
      px: { xs: 3, md: 5 },
      width: '100%',
      minHeight: 'calc(100vh - 180px)',
      display: 'flex',
      flexDirection: 'column' as const,
      position: 'relative' as const,
      '&::before': {
        content: '""',
        position: 'absolute' as const,
        top: '16px',
        left: '16px',
        right: '16px',
        bottom: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(15px)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        zIndex: 0,
      },
    },
  },
  
  contentWrapper: {
    maxWidth: 1400,
    mx: 'auto',
    width: '100%',
    position: 'relative' as const,
    zIndex: 1,
    p: { xs: 2, md: 3 },
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 3,
  },
  
  pageHeader: {
    textAlign: 'center' as const,
    mb: 4,
    py: 2,
  },
  
  pageTitle: {
    mb: 2,
    fontWeight: 700,
    color: 'text.primary',
    background: `linear-gradient(45deg, ${colors.primary.main}, ${colors.primary.light})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  
  pageSubtitle: {
    color: 'text.secondary',
    fontWeight: 400,
    mb: 2,
  },
  
  actionCard: {
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0,0,0,0.08)',
    borderRadius: 3,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    mb: 3,
  },
  
  dataTable: {
    background: 'rgba(255,255,255,0.98)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0,0,0,0.08)',
    borderRadius: 3,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    overflow: 'hidden' as const,
    mb: 2,
  },
  
  fab: {
    position: 'fixed' as const,
    bottom: 32,
    right: 32,
    background: `linear-gradient(45deg, ${colors.primary.main}, ${colors.primary.light})`,
    '&:hover': {
      background: `linear-gradient(45deg, ${colors.primary.light}, ${colors.primary.main})`,
      transform: 'scale(1.1)',
    },
    boxShadow: '0 8px 32px rgba(26, 54, 93, 0.3)',
  },
};

export default AppTheme;
