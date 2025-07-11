import {
  Container,
  Typography,
  Box,
  Paper,
  useTheme,
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  IconButton // Added IconButton import
} from '@mui/material';
import EnhancedDialog from '../components/EnhancedDialog';
import Header from '../components/Header'; // Added Header import
import Footer from '../components/Footer'; // Added Footer import
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface DowntimeData {
  id: number;
  downtimeType: string;
  downtimeReason: string;
  details: string;
}

const DowntimeList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'delete'>('add');
  const [selectedDowntime, setSelectedDowntime] = useState<DowntimeData | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  
  // Form state
  const [formData, setFormData] = useState({
    downtimeType: '',
    downtimeReason: '',
    details: ''
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
      details: 'Main conveyor belt motor failed during production shift. Requires immediate replacement of motor assembly.'
    },
    {
      id: 2,
      downtimeType: 'Maintenance',
      downtimeReason: 'Preventive Maintenance',
      details: 'Scheduled weekly maintenance on hydraulic systems and lubrication of moving parts.'
    },
    {
      id: 3,
      downtimeType: 'Electrical Issue',
      downtimeReason: 'Power Outage',
      details: 'Unexpected power failure in Section B causing production line shutdown. Grid power restored.'
    },
    {
      id: 4,
      downtimeType: 'Quality Issue',
      downtimeReason: 'Quality Inspection',
      details: 'Quality control identified dimensional variations requiring machine recalibration.'
    },
    {
      id: 5,
      downtimeType: 'Material Shortage',
      downtimeReason: 'Raw Material Delay',
      details: 'Critical raw material delivery delayed due to supplier logistics issues.'
    },
    {
      id: 6,
      downtimeType: 'Software Malfunction',
      downtimeReason: 'Software Update',
      details: 'Production control software experiencing compatibility issues after recent update.'
    }
  ]);

  useEffect(() => {
    setLoaded(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);


  const handleOpenDialog = (mode: 'add' | 'edit' | 'delete', downtime?: DowntimeData) => {
    setDialogMode(mode);
    setSelectedDowntime(downtime || null);
    
    if (mode === 'edit' && downtime) {
      setFormData({
        downtimeType: downtime.downtimeType,
        downtimeReason: downtime.downtimeReason,
        details: downtime.details
      });
    } else if (mode === 'add') {
      setFormData({
        downtimeType: '',
        downtimeReason: '',
        details: ''
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
      details: ''
    });
  };

  const handleSave = () => {
    if (dialogMode === 'add') {
      const newDowntime: DowntimeData = {
        id: downtimes.length + 1,
        downtimeType: formData.downtimeType,
        downtimeReason: formData.downtimeReason,
        details: formData.details
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
              details: formData.details
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


  return (
    <Box
      sx={{
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
      }}
    >
      <Header /> // Added Header component
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
                    justifyContent: 'flex-end',
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
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
  {downtimes.map((downtime) => (
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
                      <TableCell sx={{ maxWidth: 400 }}>
                        <Typography variant="body2" sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {downtime.details}
                        </Typography>
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
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Type:</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.error.main }}>{formData.downtimeType}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Reason:</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{formData.downtimeReason}</Typography>
                      </Grid>
                      {formData.details && (
                        <Grid item xs={12}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Details:</Typography>
                          <Typography variant="body2" sx={{ mt: 0.5, p: 1, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 1 }}>
                            {formData.details}
                          </Typography>
                        </Grid>
                      )}
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

      <Footer />
    </Box>
  );
};

export default DowntimeList;
