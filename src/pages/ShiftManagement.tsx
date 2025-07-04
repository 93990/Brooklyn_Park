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
  Grid
} from '@mui/material';
import EnhancedDialog from '../components/EnhancedDialog';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

interface ShiftData {
  id: number;
  shiftName: string;
  shiftStartTime: string;
  shiftEndTime: string;
  duration: string;
  status: 'Active' | 'Inactive' | 'Scheduled';
  employeeCount: number;
  supervisor: string;
  createdDate: string;
}

const ShiftManagement = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(2);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'delete'>('add');
  const [selectedShift, setSelectedShift] = useState<ShiftData | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  
  // Form state
  const [formData, setFormData] = useState({
    shiftName: '',
    shiftStartTime: '',
    shiftEndTime: ''
  });

  // Sample shift data
  const [shifts, setShifts] = useState<ShiftData[]>([
    {
      id: 1,
      shiftName: 'Morning Shift',
      shiftStartTime: '06:00',
      shiftEndTime: '14:00',
      duration: '8 hours',
      status: 'Active',
      employeeCount: 45,
      supervisor: 'John Smith',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      shiftName: 'Afternoon Shift',
      shiftStartTime: '14:00',
      shiftEndTime: '22:00',
      duration: '8 hours',
      status: 'Active',
      employeeCount: 38,
      supervisor: 'Sarah Johnson',
      createdDate: '2024-01-15'
    },
    {
      id: 3,
      shiftName: 'Night Shift',
      shiftStartTime: '22:00',
      shiftEndTime: '06:00',
      duration: '8 hours',
      status: 'Active',
      employeeCount: 25,
      supervisor: 'Mike Wilson',
      createdDate: '2024-01-15'
    },
    {
      id: 4,
      shiftName: 'Weekend Morning',
      shiftStartTime: '08:00',
      shiftEndTime: '16:00',
      duration: '8 hours',
      status: 'Scheduled',
      employeeCount: 20,
      supervisor: 'Lisa Brown',
      createdDate: '2024-01-10'
    },
    {
      id: 5,
      shiftName: 'Maintenance Shift',
      shiftStartTime: '00:00',
      shiftEndTime: '08:00',
      duration: '8 hours',
      status: 'Inactive',
      employeeCount: 12,
      supervisor: 'David Chen',
      createdDate: '2024-01-08'
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

  const calculateDuration = (startTime: string, endTime: string): string => {
    if (!startTime || !endTime) return '0 hours';
    
    const start = new Date(`2000-01-01T${startTime}:00`);
    let end = new Date(`2000-01-01T${endTime}:00`);
    
    // Handle overnight shifts
    if (end <= start) {
      end = new Date(`2000-01-02T${endTime}:00`);
    }
    
    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    return `${diffHours} hours`;
  };

  const handleOpenDialog = (mode: 'add' | 'edit' | 'delete', shift?: ShiftData) => {
    setDialogMode(mode);
    setSelectedShift(shift || null);
    
    if (mode === 'edit' && shift) {
      setFormData({
        shiftName: shift.shiftName,
        shiftStartTime: shift.shiftStartTime,
        shiftEndTime: shift.shiftEndTime
      });
    } else if (mode === 'add') {
      setFormData({
        shiftName: '',
        shiftStartTime: '',
        shiftEndTime: ''
      });
    }
    
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedShift(null);
    setFormData({
      shiftName: '',
      shiftStartTime: '',
      shiftEndTime: ''
    });
  };

  const handleSave = () => {
    if (dialogMode === 'add') {
      const newShift: ShiftData = {
        id: shifts.length + 1,
        shiftName: formData.shiftName,
        shiftStartTime: formData.shiftStartTime,
        shiftEndTime: formData.shiftEndTime,
        duration: calculateDuration(formData.shiftStartTime, formData.shiftEndTime),
        status: 'Scheduled',
        employeeCount: 0,
        supervisor: 'To be assigned',
        createdDate: new Date().toISOString().split('T')[0]
      };
      setShifts([...shifts, newShift]);
      setSnackbar({ open: true, message: 'Shift added successfully!', severity: 'success' });
    } else if (dialogMode === 'edit' && selectedShift) {
      const updatedShifts = shifts.map(shift =>
        shift.id === selectedShift.id
          ? {
              ...shift,
              shiftName: formData.shiftName,
              shiftStartTime: formData.shiftStartTime,
              shiftEndTime: formData.shiftEndTime,
              duration: calculateDuration(formData.shiftStartTime, formData.shiftEndTime)
            }
          : shift
      );
      setShifts(updatedShifts);
      setSnackbar({ open: true, message: 'Shift updated successfully!', severity: 'success' });
    } else if (dialogMode === 'delete' && selectedShift) {
      const filteredShifts = shifts.filter(shift => shift.id !== selectedShift.id);
      setShifts(filteredShifts);
      setSnackbar({ open: true, message: 'Shift deleted successfully!', severity: 'success' });
    }
    
    handleCloseDialog();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Scheduled': return 'warning';
      case 'Inactive': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircleIcon sx={{ fontSize: '1rem' }} />;
      case 'Scheduled': return <ScheduleIcon sx={{ fontSize: '1rem' }} />;
      case 'Inactive': return <BusinessIcon sx={{ fontSize: '1rem' }} />;
      default: return <WorkIcon sx={{ fontSize: '1rem' }} />;
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
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
                  Shift Management System
                </Typography>
              </Box>
            </Box>

            {/* Center Section - Shift Title */}
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
                <ManageAccountsIcon sx={{ color: '#1a365d', mr: 1, fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{
                  color: '#1a365d',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}>
                  Shift Scheduler
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
                background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Shift Management
              </Typography>
              <Typography variant="h6" sx={{
                color: 'text.secondary',
                fontWeight: 400,
                mb: 2
              }}>
                {currentTime.toLocaleString()}
              </Typography>
              <Chip
                label={`${shifts.length} Shifts Configured`}
                color="warning"
                variant="outlined"
                icon={<ScheduleIcon />}
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
                boxShadow: '0 8px 32px rgba(245, 158, 11, 0.1)'
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
                        background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                        boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #d97706, #f59e0b)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 25px rgba(245, 158, 11, 0.4)'
                        },
                        transition: 'all 0.3s ease',
                        px: 3,
                        py: 1
                      }}
                    >
                      Add Shift
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      disabled={!selectedShift}
                      onClick={() => selectedShift && handleOpenDialog('edit', selectedShift)}
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
                      disabled={!selectedShift}
                      onClick={() => selectedShift && handleOpenDialog('delete', selectedShift)}
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
              boxShadow: '0 8px 32px rgba(245, 158, 11, 0.1)',
              overflow: 'hidden'
            }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    '& th': {
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderBottom: 'none'
                    }
                  }}>
                    <TableCell>Shift Name</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Employees</TableCell>
                    <TableCell>Supervisor</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shifts.map((shift, index) => (
                    <TableRow
                      key={shift.id}
                      onClick={() => setSelectedShift(shift)}
                      sx={{
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        backgroundColor: selectedShift?.id === shift.id ? 'rgba(245, 158, 11, 0.08)' : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(245, 158, 11, 0.05)',
                          transform: 'scale(1.01)',
                        },
                        '& td': {
                          borderBottom: '1px solid rgba(224, 224, 224, 0.5)'
                        }
                      }}
                    >
                      <TableCell sx={{ fontWeight: 600, color: theme.palette.warning.main }}>
                        {shift.shiftName}
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.9rem', fontWeight: 500 }}>
                        {formatTime(shift.shiftStartTime)}
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.9rem', fontWeight: 500 }}>
                        {formatTime(shift.shiftEndTime)}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>
                        {shift.duration}
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(shift.status)}
                          label={shift.status}
                          color={getStatusColor(shift.status) as any}
                          size="small"
                          sx={{ fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500, color: theme.palette.primary.main }}>
                        {shift.employeeCount}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>
                        {shift.supervisor}
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <Tooltip title="Edit Shift">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDialog('edit', shift);
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
                          <Tooltip title="Delete Shift">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDialog('delete', shift);
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
            background: 'linear-gradient(45deg, #f59e0b, #d97706)',
            '&:hover': {
              background: 'linear-gradient(45deg, #d97706, #f59e0b)',
              transform: 'scale(1.1)'
            },
            boxShadow: '0 8px 32px rgba(245, 158, 11, 0.3)'
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
        maxWidth="sm"
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
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: 'white',
          textAlign: 'center'
        }}>
          {dialogMode === 'add' && 'Add New Shift'}
          {dialogMode === 'edit' && 'Edit Shift'}
          {dialogMode === 'delete' && 'Delete Shift'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {dialogMode === 'delete' ? (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Are you sure you want to delete the shift "{selectedShift?.shiftName}"?
              This action cannot be undone and may affect current schedules.
            </Alert>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Shift Name"
                  value={formData.shiftName}
                  onChange={(e) => setFormData({ ...formData, shiftName: e.target.value })}
                  variant="outlined"
                  sx={{ mb: 2 }}
                  placeholder="e.g., Morning Shift, Night Shift, Weekend Shift"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Start Time"
                  type="time"
                  value={formData.shiftStartTime}
                  onChange={(e) => setFormData({ ...formData, shiftStartTime: e.target.value })}
                  variant="outlined"
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="End Time"
                  type="time"
                  value={formData.shiftEndTime}
                  onChange={(e) => setFormData({ ...formData, shiftEndTime: e.target.value })}
                  variant="outlined"
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              {formData.shiftStartTime && formData.shiftEndTime && (
                <Grid item xs={12}>
                  <Box sx={{
                    p: 2,
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderRadius: 2,
                    border: '1px solid rgba(245, 158, 11, 0.2)'
                  }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.warning.main }}>
                      <AccessTimeIcon sx={{ fontSize: '1rem', mr: 1, verticalAlign: 'middle' }} />
                      Duration: {calculateDuration(formData.shiftStartTime, formData.shiftEndTime)}
                    </Typography>
                  </Box>
                </Grid>
              )}
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
            color={dialogMode === 'delete' ? 'error' : 'warning'}
            sx={{
              background: dialogMode === 'delete'
                ? 'linear-gradient(45deg, #ef4444, #dc2626)'
                : 'linear-gradient(45deg, #f59e0b, #d97706)',
              '&:hover': {
                background: dialogMode === 'delete'
                  ? 'linear-gradient(45deg, #dc2626, #ef4444)'
                  : 'linear-gradient(45deg, #d97706, #f59e0b)'
              }
            }}
          >
            {dialogMode === 'add' && 'Add Shift'}
            {dialogMode === 'edit' && 'Update Shift'}
            {dialogMode === 'delete' && 'Delete Shift'}
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

export default ShiftManagement;
