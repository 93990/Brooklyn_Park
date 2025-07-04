import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  useTheme,
  Badge,
  Fade,
  Grow,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar,
  Fab,
  Zoom,
  Tooltip,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TimerIcon from '@mui/icons-material/Timer';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ScheduleIcon from '@mui/icons-material/Schedule';

interface CycleTimeData {
  id: number;
  model: string;
  standardCycleTime: string;
  details: string;
  timeUnit: 'seconds' | 'minutes' | 'hours';
  status: 'Active' | 'Under Review' | 'Deprecated';
  efficiency: number;
  lastUpdated: string;
  category: string;
}

const StandardCycleTime = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'delete'>('add');
  const [selectedCycleTime, setSelectedCycleTime] = useState<CycleTimeData | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  
  // Form state
  const [formData, setFormData] = useState({
    model: '',
    standardCycleTime: '',
    details: '',
    timeUnit: 'minutes' as 'seconds' | 'minutes' | 'hours'
  });

  // Sample cycle time data
  const [cycleTimes, setCycleTimes] = useState<CycleTimeData[]>([
    {
      id: 1,
      model: 'CAT-3516B',
      standardCycleTime: '45',
      timeUnit: 'minutes',
      details: 'Complete assembly cycle for heavy-duty engine components including quality checks',
      status: 'Active',
      efficiency: 92,
      lastUpdated: '2024-01-15',
      category: 'Assembly'
    },
    {
      id: 2,
      model: 'CAT-3512C',
      standardCycleTime: '38',
      timeUnit: 'minutes',
      details: 'Standard production cycle for mid-range power systems with automated testing',
      status: 'Active',
      efficiency: 88,
      lastUpdated: '2024-01-14',
      category: 'Assembly'
    },
    {
      id: 3,
      model: 'CAT-C32',
      standardCycleTime: '120',
      timeUnit: 'seconds',
      details: 'Quality control inspection and validation process for precision components',
      status: 'Active',
      efficiency: 95,
      lastUpdated: '2024-01-12',
      category: 'Quality Control'
    },
    {
      id: 4,
      model: 'CAT-C18',
      standardCycleTime: '28',
      timeUnit: 'minutes',
      details: 'Final assembly and packaging cycle for compact power units',
      status: 'Under Review',
      efficiency: 85,
      lastUpdated: '2024-01-10',
      category: 'Packaging'
    },
    {
      id: 5,
      model: 'CAT-C15',
      standardCycleTime: '52',
      timeUnit: 'minutes',
      details: 'Comprehensive testing and calibration cycle for performance validation',
      status: 'Active',
      efficiency: 90,
      lastUpdated: '2024-01-08',
      category: 'Testing'
    },
    {
      id: 6,
      model: 'CAT-3508B',
      standardCycleTime: '65',
      timeUnit: 'minutes',
      details: 'Legacy model production cycle - scheduled for process optimization review',
      status: 'Deprecated',
      efficiency: 78,
      lastUpdated: '2024-01-05',
      category: 'Assembly'
    }
  ]);

  useEffect(() => {
    setLoaded(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleBack = () => {
    navigate('/configuration');
  };

  const handleOpenDialog = (mode: 'add' | 'edit' | 'delete', cycleTime?: CycleTimeData) => {
    setDialogMode(mode);
    setSelectedCycleTime(cycleTime || null);
    
    if (mode === 'edit' && cycleTime) {
      setFormData({
        model: cycleTime.model,
        standardCycleTime: cycleTime.standardCycleTime,
        details: cycleTime.details,
        timeUnit: cycleTime.timeUnit
      });
    } else if (mode === 'add') {
      setFormData({
        model: '',
        standardCycleTime: '',
        details: '',
        timeUnit: 'minutes'
      });
    }
    
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCycleTime(null);
    setFormData({
      model: '',
      standardCycleTime: '',
      details: '',
      timeUnit: 'minutes'
    });
  };

  const handleSave = () => {
    if (dialogMode === 'add') {
      const newCycleTime: CycleTimeData = {
        id: cycleTimes.length + 1,
        model: formData.model,
        standardCycleTime: formData.standardCycleTime,
        details: formData.details,
        timeUnit: formData.timeUnit,
        status: 'Active',
        efficiency: 100,
        lastUpdated: new Date().toISOString().split('T')[0],
        category: 'General'
      };
      setCycleTimes([...cycleTimes, newCycleTime]);
      setSnackbar({ open: true, message: 'Cycle time added successfully!', severity: 'success' });
    } else if (dialogMode === 'edit' && selectedCycleTime) {
      const updatedCycleTimes = cycleTimes.map(cycleTime =>
        cycleTime.id === selectedCycleTime.id
          ? {
              ...cycleTime,
              model: formData.model,
              standardCycleTime: formData.standardCycleTime,
              details: formData.details,
              timeUnit: formData.timeUnit,
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : cycleTime
      );
      setCycleTimes(updatedCycleTimes);
      setSnackbar({ open: true, message: 'Cycle time updated successfully!', severity: 'success' });
    } else if (dialogMode === 'delete' && selectedCycleTime) {
      const filteredCycleTimes = cycleTimes.filter(cycleTime => cycleTime.id !== selectedCycleTime.id);
      setCycleTimes(filteredCycleTimes);
      setSnackbar({ open: true, message: 'Cycle time deleted successfully!', severity: 'success' });
    }
    
    handleCloseDialog();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Under Review': return 'warning';
      case 'Deprecated': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircleIcon sx={{ fontSize: '1rem' }} />;
      case 'Under Review': return <WarningIcon sx={{ fontSize: '1rem' }} />;
      case 'Deprecated': return <ErrorIcon sx={{ fontSize: '1rem' }} />;
      default: return <CheckCircleIcon sx={{ fontSize: '1rem' }} />;
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return theme.palette.success.main;
    if (efficiency >= 80) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const formatCycleTime = (time: string, unit: string) => {
    return `${time} ${unit}`;
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
                  Cycle Time Management
                </Typography>
              </Box>
            </Box>

            {/* Center Section - Cycle Time Title */}
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
                <ScheduleIcon sx={{ color: '#1a365d', mr: 1, fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{
                  color: '#1a365d',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}>
                  Cycle Time Standards
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
          maxWidth: 1400,
          mx: 'auto',
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Header Section */}
          <Fade in={loaded} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" component="h1" sx={{
                mb: 2,
                fontWeight: 700,
                color: 'text.primary',
                background: 'linear-gradient(45deg, #10b981, #059669)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Standard Cycle Time Management
              </Typography>
              <Typography variant="h6" sx={{
                color: 'text.secondary',
                fontWeight: 400,
                mb: 2
              }}>
                {currentTime.toLocaleString()}
              </Typography>
              <Chip
                label={`${cycleTimes.length} Cycle Time Standards`}
                color="success"
                variant="outlined"
                icon={<TimerIcon />}
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

          {/* Action Buttons */}
          <Grow in={loaded} timeout={1200}>
            <Box sx={{ mb: 4 }}>
              <Card sx={{
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)'
              }}>
                <CardContent>
                  <Box sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                  }}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => handleOpenDialog('add')}
                      sx={{
                        background: 'linear-gradient(45deg, #10b981, #059669)',
                        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #059669, #10b981)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 25px rgba(16, 185, 129, 0.4)'
                        },
                        transition: 'all 0.3s ease',
                        px: 3,
                        py: 1
                      }}
                    >
                      Add Cycle Time
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      disabled={!selectedCycleTime}
                      onClick={() => selectedCycleTime && handleOpenDialog('edit', selectedCycleTime)}
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: `${theme.palette.primary.main}10`,
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease',
                        px: 3,
                        py: 1
                      }}
                    >
                      Update Selected
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      disabled={!selectedCycleTime}
                      onClick={() => selectedCycleTime && handleOpenDialog('delete', selectedCycleTime)}
                      sx={{
                        borderColor: theme.palette.error.main,
                        color: theme.palette.error.main,
                        '&:hover': {
                          backgroundColor: `${theme.palette.error.main}10`,
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease',
                        px: 3,
                        py: 1
                      }}
                    >
                      Delete Selected
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grow>

          {/* Data Table */}
          <Grow in={loaded} timeout={1400}>
            <TableContainer component={Paper} sx={{
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)',
              overflow: 'hidden'
            }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    '& th': {
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderBottom: 'none'
                    }
                  }}>
                    <TableCell>Model</TableCell>
                    <TableCell>Standard Cycle Time</TableCell>
                    <TableCell>Details</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Efficiency</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Last Updated</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cycleTimes.map((cycleTime, index) => (
                    <TableRow
                      key={cycleTime.id}
                      onClick={() => setSelectedCycleTime(cycleTime)}
                      sx={{
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        backgroundColor: selectedCycleTime?.id === cycleTime.id ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(16, 185, 129, 0.05)',
                          transform: 'scale(1.01)',
                        },
                        '& td': {
                          borderBottom: '1px solid rgba(224, 224, 224, 0.5)'
                        }
                      }}
                    >
                      <TableCell sx={{ fontWeight: 600, color: theme.palette.success.main, fontFamily: 'monospace' }}>
                        {cycleTime.model}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500, fontSize: '1rem' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <SpeedIcon sx={{ fontSize: '1rem', mr: 1, color: theme.palette.success.main }} />
                          {formatCycleTime(cycleTime.standardCycleTime, cycleTime.timeUnit)}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 300 }}>
                        <Typography variant="body2" sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {cycleTime.details}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(cycleTime.status)}
                          label={cycleTime.status}
                          color={getStatusColor(cycleTime.status) as any}
                          size="small"
                          sx={{ fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              color: getEfficiencyColor(cycleTime.efficiency)
                            }}
                          >
                            {cycleTime.efficiency}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>
                        {cycleTime.category}
                      </TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                        {cycleTime.lastUpdated}
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <Tooltip title="Edit Cycle Time">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDialog('edit', cycleTime);
                              }}
                              sx={{
                                color: theme.palette.primary.main,
                                '&:hover': {
                                  backgroundColor: `${theme.palette.primary.main}15`,
                                  transform: 'scale(1.1)'
                                }
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Cycle Time">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDialog('delete', cycleTime);
                              }}
                              sx={{
                                color: theme.palette.error.main,
                                '&:hover': {
                                  backgroundColor: `${theme.palette.error.main}15`,
                                  transform: 'scale(1.1)'
                                }
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grow>
        </Box>
      </Container>

      {/* Floating Action Button */}
      <Zoom in={loaded} timeout={1600}>
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            background: 'linear-gradient(45deg, #10b981, #059669)',
            '&:hover': {
              background: 'linear-gradient(45deg, #059669, #10b981)',
              transform: 'scale(1.1)'
            },
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)'
          }}
          onClick={() => handleOpenDialog('add')}
        >
          <AddIcon />
        </Fab>
      </Zoom>

      {/* Dialog for Add/Edit/Delete */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 3
          }
        }}
      >
        <DialogTitle sx={{
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          textAlign: 'center'
        }}>
          {dialogMode === 'add' && 'Add New Cycle Time Standard'}
          {dialogMode === 'edit' && 'Edit Cycle Time Standard'}
          {dialogMode === 'delete' && 'Delete Cycle Time Standard'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {dialogMode === 'delete' ? (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Are you sure you want to delete the cycle time standard for "{selectedCycleTime?.model}"?
              This action cannot be undone and may affect production planning.
            </Alert>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Model"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  variant="outlined"
                  sx={{ mb: 2 }}
                  placeholder="e.g., CAT-3516B, CAT-C32"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    label="Standard Cycle Time"
                    type="number"
                    value={formData.standardCycleTime}
                    onChange={(e) => setFormData({ ...formData, standardCycleTime: e.target.value })}
                    variant="outlined"
                    sx={{ flex: 2, mb: 2 }}
                    placeholder="45"
                  />
                  <FormControl sx={{ flex: 1, mb: 2 }}>
                    <InputLabel>Unit</InputLabel>
                    <Select
                      value={formData.timeUnit}
                      onChange={(e) => setFormData({ ...formData, timeUnit: e.target.value as any })}
                      label="Unit"
                    >
                      <MenuItem value="seconds">Seconds</MenuItem>
                      <MenuItem value="minutes">Minutes</MenuItem>
                      <MenuItem value="hours">Hours</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Details"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  variant="outlined"
                  multiline
                  rows={4}
                  placeholder="Detailed description of the cycle time standard, including processes, quality checks, and any special requirements..."
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={handleCloseDialog}
            startIcon={<CancelIcon />}
            variant="outlined"
            sx={{
              borderColor: theme.palette.grey[400],
              color: theme.palette.grey[600]
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            startIcon={<SaveIcon />}
            variant="contained"
            color={dialogMode === 'delete' ? 'error' : 'success'}
            sx={{
              background: dialogMode === 'delete'
                ? 'linear-gradient(45deg, #ef4444, #dc2626)'
                : 'linear-gradient(45deg, #10b981, #059669)',
              '&:hover': {
                background: dialogMode === 'delete'
                  ? 'linear-gradient(45deg, #dc2626, #ef4444)'
                  : 'linear-gradient(45deg, #059669, #10b981)'
              }
            }}
          >
            {dialogMode === 'add' && 'Add Cycle Time'}
            {dialogMode === 'edit' && 'Update Cycle Time'}
            {dialogMode === 'delete' && 'Delete Cycle Time'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Footer */}
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

export default StandardCycleTime;
