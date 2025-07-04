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
import EnhancedDialog from '../components/EnhancedDialog';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import EngineeringIcon from '@mui/icons-material/Engineering';

interface DowntimeData {
  id: number;
  downtimeType: string;
  downtimeReason: string;
  details: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  dateReported: string;
  duration: string;
  status: 'Active' | 'Resolved' | 'In Progress';
}

const DowntimeList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'delete'>('add');
  const [selectedDowntime, setSelectedDowntime] = useState<DowntimeData | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  
  // Form state
  const [formData, setFormData] = useState({
    downtimeType: '',
    downtimeReason: '',
    details: '',
    severity: 'Medium' as 'Low' | 'Medium' | 'High' | 'Critical'
  });

  // Predefined downtime types and reasons
  const downtimeTypes = [
    'Mechanical Failure',
    'Electrical Issue',
    'Maintenance',
    'Material Shortage',
    'Quality Issue',
    'Operator Error',
    'Software Malfunction',
    'Safety Incident',
    'External Factors'
  ];

  const downtimeReasons = [
    'Equipment Breakdown',
    'Preventive Maintenance',
    'Emergency Repair',
    'Part Replacement',
    'Calibration Required',
    'Software Update',
    'Power Outage',
    'Raw Material Delay',
    'Quality Inspection',
    'Training Session',
    'Safety Protocol',
    'Weather Conditions'
  ];

  // Sample downtime data
  const [downtimes, setDowntimes] = useState<DowntimeData[]>([
    {
      id: 1,
      downtimeType: 'Mechanical Failure',
      downtimeReason: 'Equipment Breakdown',
      details: 'Main conveyor belt motor failed during production shift. Requires immediate replacement of motor assembly.',
      severity: 'High',
      dateReported: '2024-01-15',
      duration: '4.5 hours',
      status: 'Resolved'
    },
    {
      id: 2,
      downtimeType: 'Maintenance',
      downtimeReason: 'Preventive Maintenance',
      details: 'Scheduled weekly maintenance on hydraulic systems and lubrication of moving parts.',
      severity: 'Low',
      dateReported: '2024-01-14',
      duration: '2 hours',
      status: 'Resolved'
    },
    {
      id: 3,
      downtimeType: 'Electrical Issue',
      downtimeReason: 'Power Outage',
      details: 'Unexpected power failure in Section B causing production line shutdown. Grid power restored.',
      severity: 'Critical',
      dateReported: '2024-01-12',
      duration: '6 hours',
      status: 'Resolved'
    },
    {
      id: 4,
      downtimeType: 'Quality Issue',
      downtimeReason: 'Quality Inspection',
      details: 'Quality control identified dimensional variations requiring machine recalibration.',
      severity: 'Medium',
      dateReported: '2024-01-10',
      duration: '3 hours',
      status: 'In Progress'
    },
    {
      id: 5,
      downtimeType: 'Material Shortage',
      downtimeReason: 'Raw Material Delay',
      details: 'Critical raw material delivery delayed due to supplier logistics issues.',
      severity: 'High',
      dateReported: '2024-01-08',
      duration: '8 hours',
      status: 'Active'
    },
    {
      id: 6,
      downtimeType: 'Software Malfunction',
      downtimeReason: 'Software Update',
      details: 'Production control software experiencing compatibility issues after recent update.',
      severity: 'Medium',
      dateReported: '2024-01-06',
      duration: '1.5 hours',
      status: 'Resolved'
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

  const handleOpenDialog = (mode: 'add' | 'edit' | 'delete', downtime?: DowntimeData) => {
    setDialogMode(mode);
    setSelectedDowntime(downtime || null);
    
    if (mode === 'edit' && downtime) {
      setFormData({
        downtimeType: downtime.downtimeType,
        downtimeReason: downtime.downtimeReason,
        details: downtime.details,
        severity: downtime.severity
      });
    } else if (mode === 'add') {
      setFormData({
        downtimeType: '',
        downtimeReason: '',
        details: '',
        severity: 'Medium'
      });
    }
    
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDowntime(null);
    setFormData({
      downtimeType: '',
      downtimeReason: '',
      details: '',
      severity: 'Medium'
    });
  };

  const handleSave = () => {
    if (dialogMode === 'add') {
      const newDowntime: DowntimeData = {
        id: downtimes.length + 1,
        downtimeType: formData.downtimeType,
        downtimeReason: formData.downtimeReason,
        details: formData.details,
        severity: formData.severity,
        dateReported: new Date().toISOString().split('T')[0],
        duration: '0 hours',
        status: 'Active'
      };
      setDowntimes([...downtimes, newDowntime]);
      setSnackbar({ open: true, message: 'Downtime record added successfully!', severity: 'success' });
    } else if (dialogMode === 'edit' && selectedDowntime) {
      const updatedDowntimes = downtimes.map(downtime =>
        downtime.id === selectedDowntime.id
          ? {
              ...downtime,
              downtimeType: formData.downtimeType,
              downtimeReason: formData.downtimeReason,
              details: formData.details,
              severity: formData.severity
            }
          : downtime
      );
      setDowntimes(updatedDowntimes);
      setSnackbar({ open: true, message: 'Downtime record updated successfully!', severity: 'success' });
    } else if (dialogMode === 'delete' && selectedDowntime) {
      const filteredDowntimes = downtimes.filter(downtime => downtime.id !== selectedDowntime.id);
      setDowntimes(filteredDowntimes);
      setSnackbar({ open: true, message: 'Downtime record deleted successfully!', severity: 'success' });
    }
    
    handleCloseDialog();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'success';
      case 'Medium': return 'warning';
      case 'High': return 'error';
      case 'Critical': return 'error';
      default: return 'default';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Low': return <InfoIcon sx={{ fontSize: '1rem' }} />;
      case 'Medium': return <WarningIcon sx={{ fontSize: '1rem' }} />;
      case 'High': return <ErrorIcon sx={{ fontSize: '1rem' }} />;
      case 'Critical': return <PriorityHighIcon sx={{ fontSize: '1rem' }} />;
      default: return <InfoIcon sx={{ fontSize: '1rem' }} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'error';
      case 'In Progress': return 'warning';
      case 'Resolved': return 'success';
      default: return 'default';
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
                  Downtime Management System
                </Typography>
              </Box>
            </Box>

            {/* Center Section - Downtime Title */}
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
                <EngineeringIcon sx={{ color: '#1a365d', mr: 1, fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{
                  color: '#1a365d',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}>
                  Downtime Database
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
                background: 'linear-gradient(45deg, #ef4444, #dc2626)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Downtime Management
              </Typography>
              <Typography variant="h6" sx={{
                color: 'text.secondary',
                fontWeight: 400,
                mb: 2
              }}>
                {currentTime.toLocaleString()}
              </Typography>
              <Chip
                label={`${downtimes.length} Downtime Records`}
                color="error"
                variant="outlined"
                icon={<ReportProblemIcon />}
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
                boxShadow: '0 8px 32px rgba(239, 68, 68, 0.1)'
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
                        background: 'linear-gradient(45deg, #ef4444, #dc2626)',
                        boxShadow: '0 4px 20px rgba(239, 68, 68, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #dc2626, #ef4444)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 25px rgba(239, 68, 68, 0.4)'
                        },
                        transition: 'all 0.3s ease',
                        px: 3,
                        py: 1
                      }}
                    >
                      Add Downtime
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      disabled={!selectedDowntime}
                      onClick={() => selectedDowntime && handleOpenDialog('edit', selectedDowntime)}
                      sx={{
                        borderColor: theme.palette.warning.main,
                        color: theme.palette.warning.main,
                        '&:hover': {
                          backgroundColor: `${theme.palette.warning.main}10`,
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
                      disabled={!selectedDowntime}
                      onClick={() => selectedDowntime && handleOpenDialog('delete', selectedDowntime)}
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
              boxShadow: '0 8px 32px rgba(239, 68, 68, 0.1)',
              overflow: 'hidden'
            }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    '& th': {
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderBottom: 'none'
                    }
                  }}>
                    <TableCell>Downtime Type</TableCell>
                    <TableCell>Downtime Reason</TableCell>
                    <TableCell>Details</TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date Reported</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {downtimes.map((downtime, index) => (
                    <TableRow
                      key={downtime.id}
                      onClick={() => setSelectedDowntime(downtime)}
                      sx={{
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        backgroundColor: selectedDowntime?.id === downtime.id ? 'rgba(239, 68, 68, 0.08)' : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(239, 68, 68, 0.05)',
                          transform: 'scale(1.01)',
                        },
                        '& td': {
                          borderBottom: '1px solid rgba(224, 224, 224, 0.5)'
                        }
                      }}
                    >
                      <TableCell sx={{ fontWeight: 500, color: theme.palette.error.main }}>
                        {downtime.downtimeType}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>
                        {downtime.downtimeReason}
                      </TableCell>
                      <TableCell sx={{ maxWidth: 300 }}>
                        <Typography variant="body2" sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {downtime.details}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getSeverityIcon(downtime.severity)}
                          label={downtime.severity}
                          color={getSeverityColor(downtime.severity) as any}
                          size="small"
                          sx={{ fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={downtime.status}
                          color={getStatusColor(downtime.status) as any}
                          size="small"
                          sx={{ fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                        {downtime.dateReported}
                      </TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                        {downtime.duration}
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <Tooltip title="Edit Downtime">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDialog('edit', downtime);
                              }}
                              sx={{
                                color: theme.palette.warning.main,
                                '&:hover': {
                                  backgroundColor: `${theme.palette.warning.main}15`,
                                  transform: 'scale(1.1)'
                                }
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Downtime">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDialog('delete', downtime);
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
            background: 'linear-gradient(45deg, #ef4444, #dc2626)',
            '&:hover': {
              background: 'linear-gradient(45deg, #dc2626, #ef4444)',
              transform: 'scale(1.1)'
            },
            boxShadow: '0 8px 32px rgba(239, 68, 68, 0.3)'
          }}
          onClick={() => handleOpenDialog('add')}
        >
          <AddIcon />
        </Fab>
      </Zoom>

      {/* Enhanced Dialog for Add/Edit/Delete */}
      <EnhancedDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleSave}
        mode={dialogMode}
        title={`${dialogMode === 'add' ? 'Add New' : dialogMode === 'edit' ? 'Edit' : 'Delete'} Downtime Record`}
        maxWidth="lg"
        color="error"
        saveButtonText={
          dialogMode === 'add' ? 'Add Downtime' :
          dialogMode === 'edit' ? 'Update Downtime' :
          'Delete Downtime'
        }
      >
        {dialogMode === 'delete' ? (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2,
              borderRadius: 2,
              '& .MuiAlert-icon': {
                fontSize: '1.5rem'
              },
              '& .MuiAlert-message': {
                fontSize: '1rem',
                fontWeight: 500
              }
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Confirm Downtime Record Deletion
            </Typography>
            <Typography variant="body1">
              Are you sure you want to permanently delete the downtime record for <strong>"{selectedDowntime?.downtimeType}"</strong> - <strong>"{selectedDowntime?.downtimeReason}"</strong>?
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
              This action cannot be undone and will remove all associated downtime data and history.
            </Typography>
          </Alert>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl 
                  fullWidth 
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: theme.palette.error.main,
                      },
                    },
                  }}
                >
                  <InputLabel>Downtime Type</InputLabel>
                  <Select
                    value={formData.downtimeType}
                    onChange={(e) => setFormData({ ...formData, downtimeType: e.target.value })}
                    label="Downtime Type"
                  >
                    {downtimeTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        <ReportProblemIcon sx={{ fontSize: '1rem', mr: 1, color: theme.palette.error.main }} />
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl 
                  fullWidth 
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: theme.palette.error.main,
                      },
                    },
                  }}
                >
                  <InputLabel>Downtime Reason</InputLabel>
                  <Select
                    value={formData.downtimeReason}
                    onChange={(e) => setFormData({ ...formData, downtimeReason: e.target.value })}
                    label="Downtime Reason"
                  >
                    {downtimeReasons.map((reason) => (
                      <MenuItem key={reason} value={reason}>{reason}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl 
                  fullWidth 
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: theme.palette.error.main,
                      },
                    },
                  }}
                >
                  <InputLabel>Severity Level</InputLabel>
                  <Select
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value as any })}
                    label="Severity Level"
                  >
                    <MenuItem value="Low">
                      <Chip label="Low" color="success" size="small" sx={{ mr: 1 }} />
                      Low Impact
                    </MenuItem>
                    <MenuItem value="Medium">
                      <Chip label="Medium" color="warning" size="small" sx={{ mr: 1 }} />
                      Medium Impact
                    </MenuItem>
                    <MenuItem value="High">
                      <Chip label="High" color="error" size="small" sx={{ mr: 1 }} />
                      High Impact
                    </MenuItem>
                    <MenuItem value="Critical">
                      <Chip label="Critical" color="error" size="small" sx={{ mr: 1 }} />
                      Critical Impact
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{
                  p: 2,
                  backgroundColor: 'rgba(239, 68, 68, 0.05)',
                  borderRadius: 2,
                  border: '1px solid rgba(239, 68, 68, 0.1)'
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: theme.palette.error.main }}>
                    Current Status: Active
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    New downtime records are automatically set to "Active" status.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Detailed Description"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  variant="outlined"
                  multiline
                  rows={4}
                  placeholder="Provide comprehensive details about the downtime incident including root causes, impact assessment, corrective actions taken, and preventive measures for future incidents..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: theme.palette.error.main,
                      },
                    },
                  }}
                />
              </Grid>
              
              {/* Preview Section */}
              {(dialogMode === 'add' || dialogMode === 'edit') && formData.downtimeType && formData.downtimeReason && (
                <Grid item xs={12}>
                  <Box sx={{
                    p: 3,
                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                    borderRadius: 2,
                    border: '1px solid rgba(239, 68, 68, 0.1)',
                    mt: 1
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: theme.palette.error.main }}>
                      <ReportProblemIcon sx={{ fontSize: '1.2rem', mr: 1, verticalAlign: 'middle' }} />
                      Downtime Record Preview
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Type:</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.error.main }}>{formData.downtimeType}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Reason:</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{formData.downtimeReason}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Severity:</Typography>
                        <Chip 
                          label={formData.severity} 
                          color={formData.severity === 'Low' ? 'success' : formData.severity === 'Medium' ? 'warning' : 'error'} 
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        )}
      </EnhancedDialog>

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

export default DowntimeList;
