import { Container, Typography, Box, Paper, useTheme, Badge, Fade, Grow, Zoom, Card, CardContent, LinearProgress, Chip, Button, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import MainLayout from '../layouts/MainLayout';
import { commonStyles } from '../theme/AppTheme';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SettingsIcon from '@mui/icons-material/Settings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RefreshIcon from '@mui/icons-material/Refresh';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; // Added Footer import

const HomeScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);
  const [productionData, setProductionData] = useState({
    efficiency: 87,
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
    <MainLayout>
      <Container {...commonStyles.mainContent}>
        <Box sx={commonStyles.contentWrapper}>
          <Fade in={loaded} timeout={1000}>
            <Box sx={commonStyles.pageHeader}>
              <Typography variant="h4" component="h1" sx={commonStyles.pageTitle}>
                Production Dashboard
              </Typography>
            </Box>
          </Fade>

          {/* Unified Production Dashboard Section */}
          <Fade in={loaded} timeout={1500}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.97)',
              backdropFilter: 'blur(20px)',
              borderRadius: 3,
              padding: { xs: 3, sm: 4, md: 5 },
              mb: 5,
              width: '100%',
              minHeight: 'calc(100vh - 300px)',
              mx: 'auto',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)' 
            }}>
              {/* Time and Shift Details - Horizontal layout for better space utilization */}
              <Box sx={{ 
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
                mb: 3,
                px: { xs: 1, sm: 2 }
              }}>
                <Typography variant="h6" sx={{ 
                  color: 'text.secondary',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <span style={{ fontWeight: 700, color: theme.palette.primary.main }}>Shift:</span>
                  <Chip 
                    label={shiftStatus.shift}
                    size="small"
                    sx={{ 
                      fontWeight: 700,
                      backgroundColor: shiftStatus.active ? theme.palette.success.light : theme.palette.error.light,
                      color: 'white'
                    }}
                  />
                </Typography>
                
                <Typography variant="h6" sx={{ 
                  color: 'text.secondary',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <span style={{ fontWeight: 700, color: theme.palette.primary.main }}>Operator:</span>
                  <span style={{ fontWeight: 700 }}>{shiftStatus.operator}</span>
                </Typography>
                
                <Typography variant="h6" sx={{ 
                  color: 'text.secondary',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <span style={{ fontWeight: 700, color: theme.palette.primary.main }}>Time:</span>
                  <span style={{ fontWeight: 700 }}>
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </Typography>
              </Box>
              
              {/* Daily Goal Progress */}
              <Box sx={{ 
                width: '100%',
                mb: 4,
                px: { xs: 1, sm: 2 }
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Daily Production Goal
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                    {dailyGoal.current} / {dailyGoal.target}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(dailyGoal.current / dailyGoal.target) * 100} 
                  sx={{ 
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 6,
                      backgroundColor: theme.palette.primary.main,
                      backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.3) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.3) 75%, transparent 75%, transparent)',
                      backgroundSize: '20px 20px'
                    }
                  }}
                />
              </Box>
              
              {/* Stats Cards */}
              <Box sx={{ 
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 3,
                width: '100%',
                mb: 4
              }}>
                {statsCards.map((stat, index) => (
                  <Grow 
                    in={loaded} 
                    timeout={1000 + index * 200} 
                    key={stat.title}
                    style={{ transformOrigin: 'bottom center' }}
                  >
                    <Card sx={{ 
                      minWidth: 250, 
                      flex: 1,
                      borderRadius: 3,
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                      background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                      position: 'relative',
                      overflow: 'visible',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: -2,
                        left: -2,
                        right: -2,
                        bottom: -2,
                        background: `linear-gradient(45deg, ${stat.color}, ${theme.palette.primary.light})`,
                        borderRadius: 4,
                        zIndex: -1,
                        opacity: hoveredCard === stat.title ? 0.7 : 0.3,
                        transition: 'opacity 0.3s ease'
                      }
                    }}
                    onMouseEnter={() => handleCardHover(stat.title)}
                    onMouseLeave={() => handleCardHover(null)}
                    >
                      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                              {stat.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 0.5 }}>
                              <Typography variant="h4" sx={{ fontWeight: 800, color: stat.color, mr: 1 }}>
                                {stat.value}
                              </Typography>
                              <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                {stat.unit}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ 
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            backgroundColor: `${stat.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {stat.icon}
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <TrendingUpIcon sx={{ fontSize: 16, color: theme.palette.success.main, mr: 0.5 }} />
                          <Typography variant="caption" sx={{ color: theme.palette.success.main, fontWeight: 600 }}>
                            {stat.trend}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grow>
                ))}
              </Box>
              
              {/* Navigation Cards */}
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: 4,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'stretch'
              }}>
                {navButtons.map((button, index) => (
                  <Zoom 
                    in={loaded} 
                    timeout={800 + index * 300} 
                    key={button.id}
                    style={{ transformOrigin: 'bottom' }}
                  >
                    <Paper 
                      elevation={hoveredCard === button.id ? 8 : 4}
                      sx={{
                        width: '100%',
                        minHeight: 240,
                        borderRadius: 4,
                        overflow: 'hidden',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        transform: hoveredCard === button.id ? 'translateY(-8px)' : 'none',
                        background: `linear-gradient(135deg, ${button.color} 0%, ${theme.palette.primary.light} 100%)`,
                        boxShadow: `0 8px 24px ${button.color}40`,
                        '&:hover': {
                          boxShadow: `0 12px 32px ${button.color}60`
                        }
                      }}
                      onClick={() => handleNavigation(button.path)}
                      onMouseEnter={() => handleCardHover(button.id)}
                      onMouseLeave={() => handleCardHover(null)}
                    >
                      <Box sx={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 3,
                        textAlign: 'center',
                        color: 'white'
                      }}>
                        {button.icon}
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, mt: 1, color: 'white' }}>
                          {button.label}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.9)' }}>
                          {button.description}
                        </Typography>
                        {button.badge && (
                          <Chip 
                            label={button.badge}
                            size="small"
                            sx={{ 
                              backgroundColor: 'rgba(255,255,255,0.2)',
                              color: 'white',
                              fontWeight: 700,
                              backdropFilter: 'blur(10px)'
                            }}
                          />
                        )}
                        <Button 
                          variant="outlined"
                          endIcon={<ArrowForwardIcon />}
                          sx={{ 
                            mt: 2,
                            color: 'white',
                            borderColor: 'rgba(255,255,255,0.5)',
                            '&:hover': {
                              borderColor: 'white',
                              backgroundColor: 'rgba(255,255,255,0.1)'
                            }
                          }}
                        >
                          Go to
                        </Button>
                      </Box>
                    </Paper>
                  </Zoom>
                ))}
              </Box>
            </Box>
          </Fade>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default HomeScreen;
