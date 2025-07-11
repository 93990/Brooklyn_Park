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
  TextField,
  Alert,
  Snackbar,
  Fab,
  Zoom,
  Tooltip,
  Card,
  CardContent,
  Grid,
  Chip
} from '@mui/material';
import EnhancedDialog from '../components/EnhancedDialog';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { commonStyles } from '../theme/AppTheme';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

interface ShiftData {
  id: number;
  shiftName: string;
  shiftStartTime: string;
  shiftEndTime: string;
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
      shiftEndTime: '14:00'
    },
    {
      id: 2,
      shiftName: 'Afternoon Shift',
      shiftStartTime: '14:00',
      shiftEndTime: '22:00'
    },
    {
      id: 3,
      shiftName: 'Night Shift',
      shiftStartTime: '22:00',
      shiftEndTime: '06:00'
    },
    {
      id: 4,
      shiftName: 'Weekend Morning',
      shiftStartTime: '08:00',
      shiftEndTime: '16:00'
    },
    {
      id: 5,
      shiftName: 'Maintenance Shift',
      shiftStartTime: '00:00',
      shiftEndTime: '08:00'
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
        shiftEndTime: formData.shiftEndTime
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
              shiftEndTime: formData.shiftEndTime
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


  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <MainLayout>
      <Container {...commonStyles.mainContent}>
        <Box sx={commonStyles.contentWrapper}>
          {/* Header Section */}
          <Fade in={loaded} timeout={1000}>
            <Box sx={commonStyles.pageHeader}>
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

          {/* Add Button */}
          <Grow in={loaded} timeout={1200}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              mb: 3 
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
                  py: 1.5
                }}
              >
                Add Shift
              </Button>
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
                  }} >
                    <TableCell>Shift Name</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
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

      {/* Enhanced Dialog for Add/Edit/Delete */}
      <EnhancedDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleSave}
        mode={dialogMode}
        title={`${dialogMode === 'add' ? 'Add New' : dialogMode === 'edit' ? 'Edit' : 'Delete'} Shift`}
        maxWidth="md"
        color="warning"
        saveButtonText={
          dialogMode === 'add' ? 'Add Shift' :
          dialogMode === 'edit' ? 'Update Shift' :
          'Delete Shift'
        }
      >
        {dialogMode === 'delete' ? (
          <Alert 
            severity="warning" 
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
              Confirm Shift Deletion
            </Typography>
            <Typography variant="body1">
              Are you sure you want to permanently delete the shift <strong>"{selectedShift?.shiftName}"</strong>?
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
              This action cannot be undone and may affect current schedules and employee assignments.
            </Typography>
          </Alert>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Shift Name"
                  value={formData.shiftName}
                  onChange={(e) => setFormData({ ...formData, shiftName: e.target.value })}
                  variant="outlined"
                  placeholder="e.g., Morning Shift, Night Shift, Weekend Shift"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: theme.palette.warning.main,
                      },
                    },
                  }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: theme.palette.warning.main,
                      },
                    },
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: theme.palette.warning.main,
                      },
                    },
                  }}
                />
              </Grid>
              
              {/* Shift Preview */}
              {formData.shiftStartTime && formData.shiftEndTime && (
                <Grid item xs={12}>
                  <Box sx={{
                    p: 3,
                    backgroundColor: 'rgba(245, 158, 11, 0.05)',
                    borderRadius: 2,
                    border: '1px solid rgba(245, 158, 11, 0.1)',
                    mt: 1
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: theme.palette.warning.main }}>
                      <ScheduleIcon sx={{ fontSize: '1.2rem', mr: 1, verticalAlign: 'middle' }} />
                      Shift Schedule Preview
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Shift Name:</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.warning.main }}>{formData.shiftName || 'Not specified'}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Start Time:</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          <AccessTimeIcon sx={{ fontSize: '1rem', mr: 0.5, verticalAlign: 'middle' }} />
                          {formatTime(formData.shiftStartTime)}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>End Time:</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          <AccessTimeIcon sx={{ fontSize: '1rem', mr: 0.5, verticalAlign: 'middle' }} />
                          {formatTime(formData.shiftEndTime)}
                        </Typography>
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

    </MainLayout>
  );
};

export default ShiftManagement;
