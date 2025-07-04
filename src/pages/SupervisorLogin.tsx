import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Alert,
  Fade,
  useTheme,
  AppBar,
  Toolbar,
  Paper,
  Divider,
  Grow,
  Slide,
  Badge,
  Chip
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import SecurityIcon from '@mui/icons-material/Security';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const SupervisorLogin = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications] = useState(3);

  useEffect(() => {
    setLoaded(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Demo users for supervisor authentication
  const demoUsers = [
    { username: 'supervisor1', password: 'super123', name: 'Mike Johnson', role: 'Production Supervisor' },
    { username: 'supervisor2', password: 'super123', name: 'Lisa Chen', role: 'Shift Supervisor' },
    { username: 'manager', password: 'mgr123', name: 'David Wilson', role: 'Production Manager' },
    { username: 'admin', password: 'admin123', name: 'Admin User', role: 'System Administrator' },
  ];

  const handleLogin = () => {
    setLoading(true);
    setError('');

    // Simple validation
    if (!username || !password) {
      setError('Please enter both username and password');
      setLoading(false);
      return;
    }

    // Check credentials
    const user = demoUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
      // Store user info in localStorage for the supervisor interface
      localStorage.setItem('supervisorUser', JSON.stringify({
        username: user.username,
        name: user.name,
        role: user.role,
        loginTime: new Date().toISOString()
      }));

      setTimeout(() => {
        setLoading(false);
        navigate('/shifts', { 
          state: { 
            user: {
              username: user.username,
              name: user.name,
              role: user.role
            }
          } 
        });
      }, 1000);
    } else {
      setTimeout(() => {
        setError('Invalid username or password');
        setLoading(false);
      }, 1000);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: '100vw',
      overflowX: 'hidden',
      bgcolor: 'background.default',
      backgroundImage: `url(/bgformain.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
      {/* Header - Same as HomeScreen */}
      <AppBar position="fixed" sx={{ 
        width: '100%',
        maxWidth: '100vw',
        left: 0,
        right: 0,
        background: 'linear-gradient(135deg, #FFC500 0%, #FFD700 50%, #FFC500 100%)',
        boxShadow: '0 4px 20px rgba(255, 197, 0, 0.3), 0 2px 10px rgba(0,0,0,0.1)',
        height: 80,
        borderBottom: '2px solid rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        <Container maxWidth="xl" disableGutters>
          <Toolbar sx={{ 
            px: { xs: 2, md: 4 },
            justifyContent: 'space-between',
            height: '100%',
            position: 'relative'
          }}>
            {/* Left Section - Logo and Brand */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              height: '100%',
              position: 'relative'
            }}>
              {/* Back Button */}
              <IconButton 
                onClick={handleBack}
                sx={{ 
                  mr: 2,
                  color: '#1a365d',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              
              {/* Logo Container */}
              <Box sx={{ 
                mr: 3,
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: 'linear-gradient(145deg, #1a365d, #2d4a7a)',
                boxShadow: '0 8px 32px rgba(26, 54, 93, 0.4), inset 0 2px 4px rgba(255,255,255,0.2)',
                border: '3px solid #FFD700',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 12px 40px rgba(26, 54, 93, 0.6), inset 0 2px 6px rgba(255,255,255,0.3)'
                }
              }}>
                <img 
                  src="/Logoforcat.png" 
                  alt="Brooklyne Park CAT Logo" 
                  style={{ 
                    width: '70%', 
                    height: '70%', 
                    objectFit: 'contain',
                    filter: 'brightness(1.1) contrast(1.1) drop-shadow(0 2px 6px rgba(0,0,0,0.3))'
                  }}
                />
              </Box>
              
              {/* Brand Text */}
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="h5" component="div" sx={{ 
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #1a365d, #2d7ff9, #1a365d)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '1.4rem',
                  letterSpacing: '0.5px',
                  mb: 0.2
                }}>
                  BROOKLYNE PARK CAT
                </Typography>
                <Typography variant="caption" sx={{ 
                  color: 'rgba(26, 54, 93, 0.8)',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  Supervisor Access Portal
                </Typography>
              </Box>
            </Box>

            {/* Center Section - Supervisor Login Title */}
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '8px 16px',
                border: '1px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)'
              }}>
                <ManageAccountsIcon sx={{ color: '#1a365d', mr: 1, fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{ 
                  color: '#1a365d',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}>
                  Supervisor Login
                </Typography>
              </Box>
            </Box>

            {/* Right Section - User Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton 
                sx={{ 
                  color: '#1a365d',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <Badge 
                  badgeContent={notifications} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.7rem',
                      minWidth: '18px',
                      height: '18px'
                    }
                  }}
                >
                  <NotificationsIcon sx={{ fontSize: '1.3rem' }} />
                </Badge>
              </IconButton>
              
              <IconButton 
                sx={{ 
                  color: '#1a365d',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <AccountCircleIcon sx={{ fontSize: '1.4rem' }} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Container 
        component="main" 
        maxWidth="xl" 
        disableGutters
        sx={{
          flex: 1,
          pt: { xs: 11, sm: 12 },
          pb: 4,
          px: { xs: 2, md: 4 },
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            zIndex: 0,
          }
        }}
      >
        <Box sx={{ 
          maxWidth: 500, 
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Welcome Header */}
          <Fade in={loaded} timeout={800}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" component="h1" sx={{ 
                mb: 1, 
                fontWeight: 700,
                color: 'text.primary',
                background: 'linear-gradient(45deg, #1a365d, #2d7ff9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Supervisor Access
              </Typography>
              <Typography variant="h6" sx={{ 
                color: 'text.secondary',
                fontWeight: 400,
                mb: 2
              }}>
                {currentTime.toLocaleString()}
              </Typography>
              <Chip 
                label="Supervisor Login Required" 
                color="warning" 
                variant="outlined"
                icon={<SecurityIcon />}
                sx={{ 
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.7 },
                    '100%': { opacity: 1 }
                  }
                }}
              />
            </Box>
          </Fade>

          {/* Login Card */}
          <Grow in={loaded} timeout={1000}>
            <Paper sx={{
              p: 4,
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 4,
              boxShadow: '0 20px 60px rgba(26, 54, 93, 0.15)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 25px 80px rgba(26, 54, 93, 0.2)'
              }
            }}>
              {/* Login Header */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  mb: 2,
                  boxShadow: '0 8px 32px rgba(245, 158, 11, 0.3)',
                  animation: 'float 3s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' }
                  }
                }}>
                  <SupervisorAccountIcon sx={{ 
                    fontSize: 40, 
                    color: 'white'
                  }} />
                </Box>
                <Typography variant="h5" sx={{ 
                  fontWeight: 600,
                  color: theme.palette.warning.main,
                  mb: 1
                }}>
                  Supervisor Login
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enter your credentials to access supervisor functions and shift management
                </Typography>
              </Box>

              {/* Login Form */}
              <Box sx={{ mb: 3 }}>
                <Slide direction="right" in={loaded} timeout={1200}>
                  <TextField
                    fullWidth
                    label="Supervisor ID"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(26, 54, 93, 0.15)'
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 35px rgba(26, 54, 93, 0.25)'
                        }
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" sx={{ fontSize: '1.3rem' }} />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Enter your supervisor ID"
                  />
                </Slide>

                <Slide direction="left" in={loaded} timeout={1400}>
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(26, 54, 93, 0.15)'
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 35px rgba(26, 54, 93, 0.25)'
                        }
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" sx={{ fontSize: '1.3rem' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                transform: 'scale(1.1)',
                                color: theme.palette.primary.main
                              }
                            }}
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Enter your password"
                  />
                </Slide>

                {error && (
                  <Fade in>
                    <Alert 
                      severity="error" 
                      sx={{ 
                        mb: 2,
                        borderRadius: 3,
                        animation: 'shake 0.5s ease-in-out',
                        '@keyframes shake': {
                          '0%, 100%': { transform: 'translateX(0)' },
                          '25%': { transform: 'translateX(-5px)' },
                          '75%': { transform: 'translateX(5px)' }
                        }
                      }}
                    >
                      {error}
                    </Alert>
                  </Fade>
                )}

                <Grow in={loaded} timeout={1600}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleLogin}
                    disabled={loading}
                    startIcon={<LoginIcon />}
                    sx={{
                      py: 2,
                      borderRadius: 3,
                      background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                      boxShadow: '0 8px 32px rgba(245, 158, 11, 0.3)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #d97706, #f59e0b)',
                        boxShadow: '0 12px 40px rgba(245, 158, 11, 0.4)',
                        transform: 'translateY(-3px)'
                      },
                      '&:disabled': {
                        background: 'linear-gradient(45deg, #94a3b8, #cbd5e1)',
                        transform: 'none'
                      },
                      '&:active': {
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    {loading ? 'Authenticating...' : 'Access Supervisor Panel'}
                  </Button>
                </Grow>
              </Box>

              {/* Demo Credentials */}
              <Fade in={loaded} timeout={1800}>
                <Box sx={{ 
                  mt: 4, 
                  p: 3, 
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(217, 119, 6, 0.05))', 
                  borderRadius: 3,
                  border: '1px solid rgba(245, 158, 11, 0.1)',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #f59e0b, #d97706, #f59e0b)'
                  }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CheckCircleIcon sx={{ 
                      color: theme.palette.success.main, 
                      mr: 1, 
                      fontSize: '1.2rem'
                    }} />
                    <Typography variant="subtitle2" sx={{ 
                      fontWeight: 600, 
                      color: theme.palette.warning.main
                    }}>
                      Demo Supervisor Credentials
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'grid', 
                    gap: 1,
                    '& .credential-row': {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1,
                      borderRadius: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        transform: 'translateX(5px)'
                      }
                    }
                  }}>
                    <Box className="credential-row">
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        Supervisor:
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        supervisor1 / super123
                      </Typography>
                    </Box>
                    <Box className="credential-row">
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        Shift Supervisor:
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        supervisor2 / super123
                      </Typography>
                    </Box>
                    <Box className="credential-row">
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        Manager:
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        manager / mgr123
                      </Typography>
                    </Box>
                    <Box className="credential-row">
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        Admin:
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        admin / admin123
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </Paper>
          </Grow>
        </Box>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{
        width: '100%',
        py: 2,
        px: { xs: 2, md: 4 },
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)'
      }}>
        <Container maxWidth="xl" disableGutters sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="body2" color="text.secondary">
            {new Date().getFullYear()} Brooklyne Park CAT - Supervisor Management System
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip 
              label="Secure" 
              size="small" 
              color="success" 
              icon={<SecurityIcon sx={{ fontSize: '0.8rem' }} />}
            />
            <Chip 
              label="v2.1.0" 
              size="small" 
              variant="outlined"
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default SupervisorLogin;
