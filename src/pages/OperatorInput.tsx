import { 
  Button, 
  Container, 
  Typography, 
  Box, 
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Fade,
  Chip,
  Alert,
  useTheme,
  Badge
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BuildIcon from '@mui/icons-material/Build';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const OperatorInput = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedMachine, setSelectedMachine] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications] = useState(2);

  useEffect(() => {
    setLoaded(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const machines = [
    { 
      value: 'mazak', 
      label: 'Mazak', 
      description: 'CNC Turning Center',
      status: 'Online',
      color: theme.palette.primary.main
    },
    { 
      value: 'gl', 
      label: 'G & L', 
      description: 'Horizontal Machining Center',
      status: 'Online',
      color: theme.palette.success.main
    }
  ];

  const handleSubmit = () => {
    if (!selectedMachine) return;
    
    setIsSubmitting(true);
    // Find the selected machine
    const machineData = machines.find(m => m.value === selectedMachine);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Navigate immediately with machine data
      setTimeout(() => {
        console.log('Navigating with machine data:', machineData);
        navigate('/operator-interface', { 
          state: { 
            selectedMachine: machineData
          },
          replace: false
        });
      }, 500);
    }, 300);
  };

  const handleBack = () => {
    navigate('/');
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
                  transform: 'scale(1.08) rotate(8deg)',
                  boxShadow: '0 12px 40px rgba(26, 54, 93, 0.6), inset 0 2px 6px rgba(255,255,255,0.3)',
                  border: '3px solid #FFC500'
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
                  Operator Input System
                </Typography>
              </Box>
            </Box>

            {/* Center Section - Machine Selection */}
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
                <PrecisionManufacturingIcon sx={{ color: '#1a365d', mr: 1, fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{ 
                  color: '#1a365d',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}>
                  Machine Selection
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
        maxWidth="md" 
        sx={{
          flex: 1,
          pt: 12,
          pb: 4,
          px: { xs: 2, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 3,
            zIndex: 0,
          }
        }}
      >
        <Box sx={{ 
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 600
        }}>
          <Fade in timeout={1000}>
            <Card sx={{ 
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 4,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              <Box sx={{
                background: 'linear-gradient(135deg, #1a365d, #2d7ff9)',
                color: 'white',
                p: 3,
                textAlign: 'center'
              }}>
                <BuildIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                <Typography variant="h4" sx={{ 
                  fontWeight: 700,
                  mb: 1
                }}>
                  Select Machine
                </Typography>
                <Typography variant="body1" sx={{ 
                  opacity: 0.9,
                  fontSize: '1.1rem'
                }}>
                  Choose the machine you want to operate
                </Typography>
              </Box>
              
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ 
                    mb: 3,
                    color: 'text.primary',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <PrecisionManufacturingIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    Machine:
                  </Typography>
                  
                  <FormControl fullWidth size="large">
                    <InputLabel 
                      id="machine-select-label"
                      sx={{ 
                        fontSize: '1.1rem',
                        fontWeight: 500
                      }}
                    >
                      Select Machine
                    </InputLabel>
                    <Select
                      labelId="machine-select-label"
                      value={selectedMachine}
                      label="Select Machine"
                      onChange={(e) => setSelectedMachine(e.target.value)}
                      sx={{ 
                        fontSize: '1.1rem',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2,
                          borderColor: selectedMachine ? theme.palette.primary.main : 'divider'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main
                        }
                      }}
                    >
                      {machines.map((machine) => (
                        <MenuItem 
                          key={machine.value} 
                          value={machine.value}
                          sx={{ 
                            py: 2,
                            '&:hover': {
                              backgroundColor: `${machine.color}10`
                            }
                          }}
                        >
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%'
                          }}>
                            <Box>
                              <Typography variant="h6" sx={{ 
                                color: 'text.primary',
                                fontWeight: 600
                              }}>
                                {machine.label}
                              </Typography>
                              <Typography variant="body2" sx={{ 
                                color: 'text.secondary'
                              }}>
                                {machine.description}
                              </Typography>
                            </Box>
                            <Chip 
                              label={machine.status}
                              size="small"
                              color="success"
                              icon={<CheckCircleIcon />}
                              sx={{ ml: 2 }}
                            />
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {selectedMachine && (
                  <Fade in timeout={500}>
                    <Alert 
                      severity="info" 
                      sx={{ 
                        mb: 3,
                        backgroundColor: 'rgba(45, 127, 249, 0.1)',
                        border: '1px solid rgba(45, 127, 249, 0.3)'
                      }}
                    >
                      <Typography variant="body2">
                        You have selected: <strong>
                          {machines.find(m => m.value === selectedMachine)?.label}
                        </strong>
                      </Typography>
                    </Alert>
                  </Fade>
                )}

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={!selectedMachine || isSubmitting}
                  sx={{ 
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    background: selectedMachine ? 
                      'linear-gradient(135deg, #1a365d, #2d7ff9)' : 
                      'rgba(0,0,0,0.12)',
                    '&:hover': {
                      background: selectedMachine ? 
                        'linear-gradient(135deg, #102a43, #0054c6)' : 
                        'rgba(0,0,0,0.12)',
                      transform: selectedMachine ? 'translateY(-2px)' : 'none',
                      boxShadow: selectedMachine ? 
                        '0 8px 20px rgba(26, 54, 93, 0.3)' : 'none'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>

                {showSuccess && (
                  <Fade in timeout={300}>
                    <Alert 
                      severity="success" 
                      sx={{ 
                        mt: 2,
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      Machine selected successfully! Redirecting...
                    </Alert>
                  </Fade>
                )}
              </CardContent>
            </Card>
          </Fade>
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

export default OperatorInput;
