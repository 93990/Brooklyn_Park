import { Container, Typography, Box, AppBar, Toolbar, IconButton, Paper, useTheme, Badge, Fade, Grow, Zoom, Card, CardContent, LinearProgress, Chip, Button, Avatar, Tooltip, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SettingsIcon from '@mui/icons-material/Settings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RefreshIcon from '@mui/icons-material/Refresh';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CelebrationIcon from '@mui/icons-material/Celebration';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import VerifiedIcon from '@mui/icons-material/Verified';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const HomeScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);
  const [productionData, setProductionData] = useState({
    efficiency: 87,
    quality: 94,
    uptime: 92,
    throughput: 245
  });
  const [animateStats, setAnimateStats] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [shiftStatus, setShiftStatus] = useState({ active: true, shift: 'Day', operator: 'John Smith' });
  const [dailyGoal, setDailyGoal] = useState({ target: 1000, current: 687 });



  const refreshData = useCallback(() => {
    setIsDataLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setProductionData(prev => ({
        efficiency: Math.max(0, Math.min(100, prev.efficiency + (Math.random() - 0.5) * 5)),
        quality: Math.max(0, Math.min(100, prev.quality + (Math.random() - 0.5) * 3)),
        uptime: Math.max(0, Math.min(100, prev.uptime + (Math.random() - 0.5) * 4)),
        throughput: Math.max(0, prev.throughput + (Math.random() - 0.5) * 25)
      }));
      setIsDataLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setLoaded(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Simulate subtle real-time data updates
    const dataUpdateTimer = setInterval(() => {
      setProductionData(prev => ({
        efficiency: Math.max(0, Math.min(100, prev.efficiency + (Math.random() - 0.5) * 1)),
        quality: Math.max(0, Math.min(100, prev.quality + (Math.random() - 0.5) * 0.5)),
        uptime: Math.max(0, Math.min(100, prev.uptime + (Math.random() - 0.5) * 0.8)),
        throughput: Math.max(0, prev.throughput + (Math.random() - 0.5) * 5)
      }));
    }, 8000);
    
    return () => {
      clearInterval(timer);
      clearInterval(dataUpdateTimer);
    };
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const handleCardHover = (cardId: string | null) => {
    setHoveredCard(cardId);
  };

  const navButtons = [
    { 
      id: 'operator',
      label: 'Operator Input', 
      path: '/operator-input', 
      icon: <DashboardIcon sx={{ fontSize: 40, mb: 1 }} />, 
      color: theme.palette.primary.main,
      description: 'Monitor and input production data',
      badge: 'Active'
    },
    { 
      id: 'quality',
      label: 'Quality', 
      path: '/quality', 
      icon: <AssessmentIcon sx={{ fontSize: 40, mb: 1 }} />, 
      color: theme.palette.success.main,
      description: 'Track quality metrics and analysis',
      badge: 'New'
    },
    { 
      id: 'supervisor',
      label: 'Supervisor', 
      path: '/supervisor', 
      icon: <SupervisorAccountIcon sx={{ fontSize: 40, mb: 1 }} />, 
      color: theme.palette.warning.main,
      description: 'Access supervisor panel and shift management',
      badge: null
    },
    { 
      id: 'config',
      label: 'Configuration', 
      path: '/configuration', 
      icon: <SettingsIcon sx={{ fontSize: 40, mb: 1 }} />, 
      color: theme.palette.secondary.main,
      description: 'Access system configuration and management tools',
      badge: null
    },
  ];

  const statsCards = [
    {
      title: 'Efficiency',
      value: productionData.efficiency,
      unit: '%',
      icon: <SpeedIcon sx={{ fontSize: 24 }} />, 
      color: theme.palette.primary.main,
      trend: '+2.5%'
    },
    {
      title: 'Quality',
      value: productionData.quality,
      unit: '%',
      icon: <CheckCircleIcon sx={{ fontSize: 24 }} />, 
      color: theme.palette.success.main,
      trend: '+1.2%'
    },
    {
      title: 'Uptime',
      value: productionData.uptime,
      unit: '%',
      icon: <TimelapseIcon sx={{ fontSize: 24 }} />, 
      color: theme.palette.warning.main,
      trend: '+0.8%'
    },
    {
      title: 'Throughput',
      value: productionData.throughput,
      unit: '/hr',
      icon: <TrendingUpIcon sx={{ fontSize: 24 }} />, 
      color: theme.palette.secondary.main,
      trend: '+5.3%'
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
      {/* Enhanced Header */}
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
                  Production Management System
                </Typography>
              </Box>
            </Box>

            {/* Center Section - Status Indicator */}
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
                <Box sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  mr: 1,
                  animation: 'pulse 2s infinite',
                  boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
                }} />
                <Typography variant="body2" sx={{ 
                  color: '#1a365d',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}>
                  System Online
                </Typography>
              </Box>
            </Box>

            {/* Right Section - Professional Controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Refresh Data Button */}
              <Tooltip title="Refresh Production Data">
                <IconButton 
                  onClick={refreshData}
                  disabled={isDataLoading}
                  sx={{ 
                    color: '#1a365d',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.3)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    },
                    '&:disabled': {
                      opacity: 0.6
                    }
                  }}
                >
                  <RefreshIcon sx={{ 
                    fontSize: '1.3rem',
                    animation: isDataLoading ? 'spin 1s linear infinite' : 'none',
                    '@keyframes spin': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' }
                    }
                  }} />
                </IconButton>
              </Tooltip>
              
              {/* User Profile */}
              <Tooltip title={`${shiftStatus.operator} - ${shiftStatus.shift} Shift`}>
                <IconButton 
                  sx={{ 
                    color: '#1a365d',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.3)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <Avatar sx={{ 
                    width: 24, 
                    height: 24, 
                    bgcolor: theme.palette.primary.main,
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {shiftStatus.operator.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                </IconButton>
              </Tooltip>
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
                Production Dashboard
              </Typography>
              
              {/* Simple Time Display */}
              <Typography variant="h6" sx={{ 
                color: 'text.secondary',
                fontWeight: 400,
                mb: 2,
                fontFamily: 'monospace'
              }}>
                {currentTime.toLocaleString()}
              </Typography>
              
              {/* Status Chips Row */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <Chip 
                  label={`${shiftStatus.shift} Shift`}
                  color="primary" 
                  variant="filled"
                  icon={<TimelapseIcon />}
                  sx={{ fontWeight: 600 }}
                />
              </Box>
              
            </Box>
          </Fade>

          {/* Stats Cards */}
          <Fade in={loaded} timeout={1500}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
              gap: 2,
              mb: 4
            }}>
              {statsCards.map((stat, index) => (
                <Grow key={stat.title} in={loaded} timeout={1000 + index * 200}>
                  <Card 
                    sx={{ 
                      background: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        borderColor: stat.color
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        background: stat.color
                      }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        mb: 1, 
                        color: stat.color
                      }}>
                        {stat.icon}
                      </Box>
                      
                      {isDataLoading ? (
                        <Skeleton variant="text" width={80} height={40} sx={{ mx: 'auto', mb: 0.5 }} />
                      ) : (
                        <Typography 
                          variant="h4" 
                          sx={{ 
                            fontWeight: 700, 
                            color: stat.color, 
                            mb: 0.5,
                            fontFamily: 'monospace'
                          }}
                        >
                          {typeof stat.value === 'number' ? Math.round(stat.value) : stat.value}{stat.unit}
                        </Typography>
                      )}
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                        {stat.title}
                      </Typography>
                      
                      {isDataLoading ? (
                        <Skeleton variant="rectangular" width="100%" height={4} sx={{ borderRadius: 2 }} />
                      ) : (
                        <LinearProgress 
                          variant="determinate" 
                          value={typeof stat.value === 'number' ? Math.min(100, stat.value) : 0} 
                          sx={{ 
                            height: 6, 
                            borderRadius: 3,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: stat.color,
                              borderRadius: 3
                            }
                          }} 
                        />
                      )}
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: stat.trend.startsWith('+') ? 'success.main' : 'error.main', 
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                          }}
                        >
                          {stat.trend.startsWith('+') ? 
                            <TrendingUpIcon sx={{ fontSize: '0.9rem' }} /> : 
                            <TrendingDownIcon sx={{ fontSize: '0.9rem' }} />
                          }
                          {stat.trend}
                        </Typography>
                        
                        <Box sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: stat.color
                        }} />
                      </Box>
                    </CardContent>
                  </Card>
                </Grow>
              ))}
            </Box>
          </Fade>


          {/* Navigation Cards */}
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
            {navButtons.map((button, index) => (
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
                    '&:active': {
                      transform: 'translateY(-8px) scale(0.98)'
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: `linear-gradient(90deg, ${button.color}, ${button.color}80)`,
                      transform: hoveredCard === button.id ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.4s ease'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `
                        radial-gradient(circle at 20% 20%, ${button.color}15, transparent 50%),
                        linear-gradient(135deg, ${button.color}08, transparent)
                      `,
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
                        transform: hoveredCard === button.id ? 'scale(1.15) rotate(8deg)' : 'scale(1)',
                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: -8,
                          left: -8,
                          right: -8,
                          bottom: -8,
                          borderRadius: '50%',
                          background: `radial-gradient(circle, ${button.color}20, transparent 70%)`,
                          opacity: hoveredCard === button.id ? 1 : 0,
                          transform: hoveredCard === button.id ? 'scale(1)' : 'scale(0.8)',
                          transition: 'all 0.3s ease'
                        },
                        filter: hoveredCard === button.id ? `drop-shadow(0 0 8px ${button.color}60)` : 'none'
                      }}>
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          animation: hoveredCard === button.id ? 'iconPulse 2s ease-in-out infinite' : 'none',
                          '@keyframes iconPulse': {
                            '0%, 100%': { transform: 'scale(1)' },
                            '50%': { transform: 'scale(1.05)' }
                          }
                        }}>
                          {button.icon}
                        </Box>
                      </Box>
                      {button.badge && (
                        <Chip 
                          label={button.badge} 
                          size="small" 
                          color={button.badge === 'Active' ? 'success' : 'primary'}
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
                    zIndex: 1,
                    mt: 2
                  }}>
                    <Button 
                      variant="text" 
                      color="primary"
                      endIcon={
                        <ArrowForwardIcon sx={{
                          transform: hoveredCard === button.id ? 'translateX(4px)' : 'translateX(0)',
                          transition: 'transform 0.3s ease'
                        }} />
                      }
                      sx={{ 
                        textTransform: 'none',
                        fontWeight: 600,
                        color: button.color,
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          backgroundColor: `${button.color}15`,
                          transform: 'scale(1.02)'
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: `linear-gradient(90deg, transparent, ${button.color}30, transparent)`,
                          transition: 'left 0.5s ease',
                        },
                        '&:hover::before': {
                          left: '100%'
                        }
                      }}
                    >
                      Access
                    </Button>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ 
                        width: hoveredCard === button.id ? 50 : 30,
                        height: 3,
                        backgroundColor: button.color,
                        borderRadius: 2,
                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: `linear-gradient(90deg, ${button.color}, transparent, ${button.color})`,
                          animation: hoveredCard === button.id ? 'shimmer 2s ease-in-out infinite' : 'none',
                          '@keyframes shimmer': {
                            '0%': { transform: 'translateX(-100%)' },
                            '50%': { transform: 'translateX(100%)' },
                            '100%': { transform: 'translateX(-100%)' }
                          }
                        }
                      }} />
                      
                      <Tooltip title="Click to navigate">
                        <Box sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: button.color,
                          transform: hoveredCard === button.id ? 'scale(1.3)' : 'scale(1)',
                          transition: 'transform 0.3s ease',
                          animation: hoveredCard === button.id ? 'glow 1.5s ease-in-out infinite' : 'none',
                          '@keyframes glow': {
                            '0%, 100%': { boxShadow: `0 0 0 0 ${button.color}40` },
                            '50%': { boxShadow: `0 0 0 8px ${button.color}00` }
                          }
                        }} />
                      </Tooltip>
                    </Box>
                  </Box>
                </Paper>
              </Zoom>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Footer - Exact same width as header */}
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

export default HomeScreen;
