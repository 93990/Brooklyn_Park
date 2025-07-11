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
import EnhancedDialog from '../components/EnhancedDialog';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { commonStyles } from '../theme/AppTheme';
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
    details: ''
  });

  // Sample cycle time data
  const [cycleTimes, setCycleTimes] = useState<CycleTimeData[]>([
    {
      id: 1,
      model: 'CAT-3516B',
      standardCycleTime: '45 minutes',
      details: 'Complete assembly cycle for heavy-duty engine components including quality checks'
    },
    {
      id: 2,
      model: 'CAT-3512C',
      standardCycleTime: '38 minutes',
      details: 'Standard production cycle for mid-range power systems with automated testing'
    },
    {
      id: 3,
      model: 'CAT-C32',
      standardCycleTime: '120 seconds',
      details: 'Quality control inspection and validation process for precision components'
    },
    {
      id: 4,
      model: 'CAT-C18',
      standardCycleTime: '28 minutes',
      details: 'Final assembly and packaging cycle for compact power units'
    },
    {
      id: 5,
      model: 'CAT-C15',
      standardCycleTime: '52 minutes',
      details: 'Comprehensive testing and calibration cycle for performance validation'
    },
    {
      id: 6,
      model: 'CAT-3508B',
      standardCycleTime: '65 minutes',
      details: 'Legacy model production cycle - scheduled for process optimization review'
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
        details: cycleTime.details
      });
    } else if (mode === 'add') {
      setFormData({
        model: '',
        standardCycleTime: '',
        details: ''
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
      details: ''
    });
  };

  const handleSave = () => {
    if (dialogMode === 'add') {
      const newCycleTime: CycleTimeData = {
        id: cycleTimes.length + 1,
        model: formData.model,
        standardCycleTime: formData.standardCycleTime,
        details: formData.details
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
              details: formData.details
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


  return (
    <MainLayout>
      <Container {...commonStyles.mainContent}>
        <Box sx={commonStyles.contentWrapper}>
          {/* Header Section */}
          <Fade in={loaded} timeout={1000}>
            <Box sx={commonStyles.pageHeader}>
              <Typography variant="h4" component="h1" sx={{
                ...commonStyles.pageTitle,
                background: 'linear-gradient(45deg, #10b981, #059669)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Standard Cycle Time Management
              </Typography>
              <Typography variant="h6" sx={commonStyles.pageSubtitle}>
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
                  background: 'linear-gradient(45deg, #10b981, #059669)',
                  boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #059669, #10b981)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 25px rgba(16, 185, 129, 0.4)'
                  },
                  transition: 'all 0.3s ease',
                  px: 3,
                  py: 1.5
                }}
              >
                Add Cycle Time
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
                          {cycleTime.standardCycleTime}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 400 }}>
                        <Typography variant="body2" sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {cycleTime.details}
                        </Typography>
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

      {/* Enhanced Dialog for Add/Edit/Delete */}
      <EnhancedDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleSave}
        mode={dialogMode}
        title={`${dialogMode === 'add' ? 'Add New' : dialogMode === 'edit' ? 'Edit' : 'Delete'} Cycle Time Standard`}
        maxWidth="md"
        color="success"
        saveButtonText={
          dialogMode === 'add' ? 'Add Cycle Time' :
          dialogMode === 'edit' ? 'Update Cycle Time' :
          'Delete Cycle Time'
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
              Confirm Cycle Time Deletion
            </Typography>
            <Typography variant="body1">
              Are you sure you want to permanently delete the cycle time standard for <strong>"{selectedCycleTime?.model}"</strong>?
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
              This action cannot be undone and may affect production planning and scheduling.
            </Typography>
          </Alert>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Model"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  variant="outlined"
                  placeholder="e.g., CAT-3516B, CAT-3512C, CAT-C32"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      fontFamily: 'monospace',
                      '&:hover fieldset': {
                        borderColor: theme.palette.success.main,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Standard Cycle Time"
                  value={formData.standardCycleTime}
                  onChange={(e) => setFormData({ ...formData, standardCycleTime: e.target.value })}
                  variant="outlined"
                  placeholder="e.g., 45 minutes, 120 seconds, 2 hours"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: theme.palette.success.main,
                      },
                    },
                  }}
                />
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
                  placeholder="Detailed description of the cycle time standard, including processes, quality checks, and requirements..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: theme.palette.success.main,
                      },
                    },
                  }}
                />
              </Grid>
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

export default StandardCycleTime;
