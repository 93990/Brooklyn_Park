import { Container, Typography, Box, AppBar, Toolbar, IconButton, Paper, useTheme, Badge, Fade, Grow, Zoom, Card, CardContent, LinearProgress, Chip, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TimerIcon from '@mui/icons-material/Timer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BuildIcon from '@mui/icons-material/Build';

const ConfigurationScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(2);

  useEffect(() => {
    setLoaded(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleCardHover = (cardId: string | null) => {
    setHoveredCard(cardId);
  };

  const configButtons = [
    { 
      id: 'machine-info',
      label: 'Machine Information', 
      path: '/machine-info', 
      icon: <PrecisionManufacturingIcon sx={{ fontSize: 40, mb: 1 }} />, 
      color: theme.palette.primary.main,
      description: 'View and manage machine specifications and details',
      badge: 'Active'
    },
    { 
      id: 'downtime',
      label: 'List of Down Time', 
      path: '/downtime-list', 
      icon: <ReportProblemIcon sx={{ fontSize: 40, mb: 1 }} />, 
      color: theme.palette.error.main,
      description: 'Track and analyze machine downtime records',
      badge: 'Updated'
    },
    { 
      id: 'shift',
      label: 'Shift', 
      path: '/shifts', 
      icon: <ScheduleIcon sx={{ fontSize: 40, mb: 1 }} />, 
      color: theme.palette.warning.main,
      description: 'Configure shift schedules and management',
      badge: null
    },
    { 
      id: 'cycle-time',
      label: 'Standard Cycle Time', 
      path: '/cycle-times', 
      icon: <TimerIcon sx={{ fontSize: 40, mb: 1 }} />, 
      color: theme.palette.success.main,
      description: 'Set and manage standard production cycle times',
      badge: null
    },
  ];

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
      {/* Enhanced Header - Same as HomeScreen */}
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

              {/* Enhanced Logo Container */}
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
                  transform: 'scale(1.08) rotate(8deg)',
                  boxShadow: '0 12px 40px rgba(26, 54, 93, 0.6), inset 0 2px 6px rgba(255,255,255,0.3)',
                  border: '3px solid #FFC500'
                },
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, transparent, rgba(255, 215, 0, 0.3), transparent)',
                  animation: 'logoGlow 3s ease-in-out infinite',
                  '@keyframes logoGlow': {
                    '0%, 100%': { opacity: 0, transform: 'scale(1)', filter: 'blur(2px)' },
                    '50%': { opacity: 1, transform: 'scale(1.15)', filter: 'blur(0px)' }
                  }
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 50%)',
                  zIndex: 2
                }
              }}>
                <img 
                  src="/Logoforcat.png" 
                  alt="Brooklyne Park CAT Logo" 
                  style={{ 
                    width: '70%', 
                    height: '70%', 
                    objectFit: 'contain',
                    filter: 'brightness(1.1) contrast(1.1) drop-shadow(0 2px 6px rgba(0,0,0,0.3))',
                    zIndex: 3,
                    position: 'relative'
                  }}
                />
              </Box>
              
              {/* Enhanced Brand Text */}
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="h5" component="div" sx={{ 
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #1a365d, #2d7ff9, #1a365d)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '1.4rem',
                  letterSpacing: '0.5px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
                  System Configuration Center
                </Typography>
              </Box>
            </Box>

            {/* Center Section - Configuration Title */}
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' },
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
                <BuildIcon sx={{ color: '#1a365d', mr: 1, fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{ 
                  color: '#1a365d',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}>
                  Configuration Panel
                </Typography>
              </Box>
            </Box>

            {/* Right Section - User Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Enhanced Notifications */}
              <IconButton 
                sx={{ 
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
                <Badge 
                  badgeContent={notifications} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.7rem',
                      minWidth: '18px',
                      height: '18px',
                      animation: notifications > 0 ? 'bounce 2s infinite' : 'none',
                      '@keyframes bounce': {
                        '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                        '40%': { transform: 'translateY(-3px)' },
                        '60%': { transform: 'translateY(-2px)' }
                      }
                    }
                  }}
                >
                  <NotificationsIcon sx={{ fontSize: '1.3rem' }} />
                </Badge>
              </IconButton>
              
              {/* Enhanced User Profile */}
              <IconButton 
                sx={{ 
                  color: '#1a365d',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  },
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    width: 8,
                    height: 8,
                    backgroundColor: '#10b981',
                    borderRadius: '50%',
                    border: '1px solid white',
                    boxShadow: '0 0 6px rgba(16, 185, 129, 0.5)'
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
          maxWidth: 1200, 
          mx: 'auto',
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}>
          <Fade in={loaded} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h4" component="h1" sx={{ 
                mb: 2, 
                fontWeight: 700,
                color: 'text.primary',
                background: 'linear-gradient(45deg, #1a365d, #2d7ff9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                System Configuration
              </Typography>
              <Typography variant="h6" sx={{ 
                color: 'text.secondary',
                fontWeight: 400,
                mb: 2
              }}>
                {currentTime.toLocaleString()}
              </Typography>
              <Chip 
                label="Configuration Access" 
                color="primary" 
                variant="outlined"
                icon={<SettingsIcon />}
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

          {/* Configuration Cards */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' },
            gap: 3,
            width: '100%',
            maxWidth: 1200,
            mx: 'auto',
            my: 'auto',
            flex: '1 0 auto',
            py: 2,
            borderRadius: 3,
            padding: 3
          }}>
            {configButtons.map((button, index) => (
              <Zoom key={button.path} in={loaded} timeout={800 + index * 200}>
                <Paper 
                  elevation={0}
                  onMouseEnter={() => handleCardHover(button.id)}
                  onMouseLeave={() => handleCardHover(null)}
                  onClick={() => handleNavigation(button.path)}
                  sx={{ 
                    p: 3,
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    border: '1px solid',
                    borderColor: 'divider',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(10px)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': { 
                      transform: 'translateY(-12px) scale(1.02)',
                      boxShadow: `0 20px 40px rgba(0,0,0,0.15), 0 0 20px ${button.color}40`,
                      borderColor: button.color,
                      backgroundColor: 'rgba(255,255,255,0.95)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: `linear-gradient(90deg, ${button.color}, ${button.color}80)`
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(135deg, ${button.color}08, transparent)`,
                      opacity: hoveredCard === button.id ? 1 : 0,
                      transition: 'opacity 0.3s ease'
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      mb: 3
                    }}>
                      <Box sx={{ 
                        color: button.color,
                        transform: hoveredCard === button.id ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                        transition: 'transform 0.3s ease'
                      }}>
                        {button.icon}
                      </Box>
                      {button.badge && (
                        <Chip 
                          label={button.badge} 
                          size="small" 
                          color={button.badge === 'Active' ? 'success' : button.badge === 'Updated' ? 'error' : 'primary'}
                          sx={{ 
                            fontSize: '0.75rem',
                            height: 20,
                            animation: button.badge === 'Active' ? 'pulse 2s infinite' : 'none'
                          }}
                        />
                      )}
                    </Box>
                    
                    <Typography variant="h6" component="h2" sx={{ 
                      fontWeight: 600,
                      mb: 1,
                      color: 'text.primary',
                      transition: 'color 0.3s ease'
                    }}>
                      {button.label}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ 
                      color: 'text.secondary',
                      mb: 3,
                      lineHeight: 1.6
                    }}>
                      {button.description}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <Button 
                      variant="text" 
                      color="primary"
                      endIcon={<ArrowForwardIcon />}
                      sx={{ 
                        textTransform: 'none',
                        fontWeight: 500,
                        color: button.color,
                        '&:hover': {
                          backgroundColor: `${button.color}10`
                        }
                      }}
                    >
                      Configure
                    </Button>
                    
                    <Box sx={{ 
                      width: 40,
                      height: 2,
                      backgroundColor: button.color,
                      borderRadius: 1,
                      transform: hoveredCard === button.id ? 'scaleX(1.5)' : 'scaleX(1)',
                      transition: 'transform 0.3s ease'
                    }} />
                  </Box>
                </Paper>
              </Zoom>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Footer - Same as HomeScreen */}
      <Box component="footer" sx={{
        width: '100%',
        py: 2,
        px: { xs: 2, md: 4 },
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper'
      }}>
        <Container maxWidth="xl" disableGutters sx={{ 
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Typography variant="body2">
            {new Date().getFullYear()} Brooklyne Park CAT
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default ConfigurationScreen;
