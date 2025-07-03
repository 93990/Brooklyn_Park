import { Container, Typography, Box, AppBar, Toolbar, IconButton, Paper, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SettingsIcon from '@mui/icons-material/Settings';

const HomeScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const navButtons = [
    { 
      label: 'Operator Input', 
      path: '/operator-input', 
      icon: <DashboardIcon sx={{ fontSize: 40, mb: 1 }} />,
      color: theme.palette.primary.main
    },
    { 
      label: 'Quality', 
      path: '/quality', 
      icon: <AssessmentIcon sx={{ fontSize: 40, mb: 1 }} />,
      color: theme.palette.success.main
    },
    { 
      label: 'Supervisor', 
      path: '/shifts', 
      icon: <SupervisorAccountIcon sx={{ fontSize: 40, mb: 1 }} />,
      color: theme.palette.warning.main
    },
    { 
      label: 'Configuration', 
      path: '/cycle-times', 
      icon: <SettingsIcon sx={{ fontSize: 40, mb: 1 }} />,
      color: theme.palette.secondary.main
    },
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <AppBar position="fixed" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ 
              bgcolor: 'white', 
              p: 1, 
              borderRadius: 2, 
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <DashboardIcon color="primary" sx={{ fontSize: 32 }} />
            </Box>
            <Typography variant="h6" component="div" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(90deg, #1a365d 0%, #2d7ff9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: { xs: 'none', sm: 'block' }
            }}>
              BROOKLYNE PARK CAT
            </Typography>
          </Box>
          <Box>
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <Box sx={{ 
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  width: 8,
                  height: 8,
                  bgcolor: 'error.main',
                  borderRadius: '50%',
                }
              }}>
                <NotificationsIcon />
              </Box>
            </IconButton>
            <IconButton color="inherit" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}>
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ 
        flex: '1 0 auto',
        width: '100%',
        p: { xs: 2, md: 4 },
        pt: { xs: 9, sm: 10 },
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Container maxWidth="xl" sx={{ 
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          py: 2
        }}>
          <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
            <Typography variant="h4" component="h1" sx={{ 
              mb: 6, 
              fontWeight: 700,
              color: 'text.primary',
              textAlign: 'center'
            }}>
              Production Dashboard
            </Typography>
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' },
              gap: 3,
              width: '100%',
              maxWidth: 1200,
              mx: 'auto',
              my: 'auto',
              flex: '1 0 auto',
              py: 2
            }}>
              {navButtons.map((button) => (
                <Paper 
                  key={button.path}
                  elevation={0}
                  onClick={() => navigate(button.path)}
                  sx={{ 
                    p: 3,
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: '1px solid',
                    borderColor: 'divider',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    '&:hover': { 
                      transform: 'translateY(-4px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                      borderColor: 'transparent',
                      background: `linear-gradient(135deg, ${button.color}10 0%, ${button.color}05 100%)`,
                    },
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: button.color,
                    }
                  }}
                >
                  <Box sx={{ 
                    color: button.color,
                    mb: 2
                  }}>
                    {button.icon}
                  </Box>
                  <Typography variant="h6" component="h2" sx={{ 
                    fontWeight: 600,
                    mb: 1,
                    color: 'text.primary'
                  }}>
                    {button.label}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: 'text.secondary',
                    maxWidth: 300,
                    mx: 'auto',
                    mb: 2
                  }}>
                    Access and manage {button.label.toLowerCase()} related operations and settings
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ 
        flexShrink: 0,
        py: 2,
        px: { xs: 2, md: 4 },
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        width: '100%',
        position: 'sticky',
        bottom: 0,
        zIndex: theme.zIndex.appBar - 1
      }}>
        <Container maxWidth="xl" sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant="body2" sx={{ 
            color: 'text.secondary',
            fontSize: '0.875rem',
            fontWeight: 500
          }}>
            {new Date().getFullYear()} Brooklyne Park CAT System
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomeScreen;
