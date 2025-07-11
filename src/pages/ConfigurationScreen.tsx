import {
  Container,
  Typography,
  Box,
  Paper,
  useTheme,
  Fade,
  Zoom,
  Chip,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { commonStyles } from '../theme/AppTheme';
import SettingsIcon from '@mui/icons-material/Settings';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TimerIcon from '@mui/icons-material/Timer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ConfigurationScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setLoaded(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
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
    <MainLayout>
      <Container {...commonStyles.mainContent}>
        <Box sx={commonStyles.contentWrapper}>
          <Fade in={loaded} timeout={1000}>
            <Box sx={commonStyles.pageHeader}>
              <Typography variant="h4" component="h1" sx={commonStyles.pageTitle}>
                System Configuration
              </Typography>
              <Typography variant="h6" sx={commonStyles.pageSubtitle}>
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
            gap: 4,
            width: '100%',
            height: '100%',
            minHeight: 'calc(100vh - 300px)',
            alignContent: 'center',
            py: 4
          }}>
            {configButtons.map((button, index) => (
              <Zoom key={button.path} in={loaded} timeout={800 + index * 200}>
                <Paper 
                  elevation={0}
                  onMouseEnter={() => handleCardHover(button.id)}
                  onMouseLeave={() => handleCardHover(null)}
                  onClick={() => handleNavigation(button.path)}
                  sx={{ 
                    p: 4,
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    border: '1px solid',
                    borderColor: 'divider',
                    minHeight: 280,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(20px)',
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
    </MainLayout>
  );
};

export default ConfigurationScreen;
