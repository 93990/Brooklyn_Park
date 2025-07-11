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
  IconButton
} from '@mui/material';
import Grid from '@mui/material/Grid';
import EnhancedDialog from '../components/EnhancedDialog';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { commonStyles } from '../theme/AppTheme';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

interface MachineData {
  id: number;
  workArea: string;
  station: string;
  model: string;
  details: string;
}

const MachineInformation = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'delete'>('add');
  const [selectedMachine, setSelectedMachine] = useState<MachineData | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  
  // Form state
  const [formData, setFormData] = useState({
    workArea: '',
    station: '',
    model: '',
    details: ''
  });

  // Sample machine data
  const [machines, setMachines] = useState<MachineData[]>([
    {
      id: 1,
      workArea: 'Production Line A',
      station: 'Station 01',
      model: 'CAT-3516B',
      details: 'Primary assembly unit for heavy-duty components'
    },
    {
      id: 2,
      workArea: 'Production Line A',
      station: 'Station 02',
      model: 'CAT-3512C',
      details: 'Secondary processing unit with automated controls'
    },
    {
      id: 3,
      workArea: 'Production Line B',
      station: 'Station 03',
      model: 'CAT-C32',
      details: 'Quality control and testing station'
    },
    {
      id: 4,
      workArea: 'Production Line B',
      station: 'Station 04',
      model: 'CAT-C18',
      details: 'Final assembly and packaging unit'
    },
    {
      id: 5,
      workArea: 'Quality Control',
      station: 'QC-01',
      model: 'CAT-C15',
      details: 'Precision measurement and validation equipment'
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

  const handleOpenDialog = (mode: 'add' | 'edit' | 'delete', machine?: MachineData) => {
    setDialogMode(mode);
    setSelectedMachine(machine || null);
    
    if (mode === 'edit' && machine) {
      setFormData({
        workArea: machine.workArea,
        station: machine.station,
        model: machine.model,
        details: machine.details
      });
    } else if (mode === 'add') {
      setFormData({
        workArea: '',
        station: '',
        model: '',
        details: ''
      });
    }
    
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMachine(null);
    setFormData({
      workArea: '',
      station: '',
      model: '',
      details: ''
    });
  };

  const handleSave = () => {
    if (dialogMode === 'add') {
      const newMachine: MachineData = {
        id: machines.length + 1,
        workArea: formData.workArea,
        station: formData.station,
        model: formData.model,
        details: formData.details
      };
      setMachines([...machines, newMachine]);
      setSnackbar({ open: true, message: 'Machine added successfully!', severity: 'success' });
    } else if (dialogMode === 'edit' && selectedMachine) {
      const updatedMachines = machines.map(machine =>
        machine.id === selectedMachine.id
          ? {
              ...machine,
              workArea: formData.workArea,
              station: formData.station,
              model: formData.model,
              details: formData.details
            }
          : machine
      );
      setMachines(updatedMachines);
      setSnackbar({ open: true, message: 'Machine updated successfully!', severity: 'success' });
    } else if (dialogMode === 'delete' && selectedMachine) {
      const filteredMachines = machines.filter(machine => machine.id !== selectedMachine.id);
      setMachines(filteredMachines);
      setSnackbar({ open: true, message: 'Machine deleted successfully!', severity: 'success' });
    }
    
    handleCloseDialog();
  };


  return (
    <MainLayout>
      <Container {...commonStyles.mainContent}>
        {/* Main Content */}
        <Box sx={commonStyles.contentWrapper}>
          {/* Header Section */}
          <Fade in={loaded} timeout={1000}>
            <Box sx={commonStyles.pageHeader}>
              <Typography variant="h4" component="h1" sx={commonStyles.pageTitle}>
                Machine Information Management
              </Typography>
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
                Add Machine
              </Button>
            </Box>
          </Grow>

          {/* Data Table */}
          <Grow in={loaded} timeout={1400}>
            <TableContainer component={Paper} sx={commonStyles.dataTable}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Work Area</TableCell>
                    <TableCell>Station</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Details</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {machines.map((machine, index) => (
                    <TableRow
                      key={machine.id}
                      onClick={() => setSelectedMachine(machine)}
                      sx={{
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        backgroundColor: selectedMachine?.id === machine.id ? 'rgba(26, 54, 93, 0.08)' : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(26, 54, 93, 0.05)',
                          transform: 'scale(1.01)',
                        },
                        '& td': {
                          borderBottom: '1px solid rgba(224, 224, 224, 0.5)'
                        }
                      }}
                    >
                      <TableCell sx={{ fontWeight: 500 }}>{machine.workArea}</TableCell>
                      <TableCell sx={{ fontWeight: 500, color: theme.palette.primary.main }}>
                        {machine.station}
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                        {machine.model}
                      </TableCell>
                      <TableCell sx={{ maxWidth: 300 }}>
                        <Typography variant="body2" sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {machine.details}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <Tooltip title="Edit Machine">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDialog('edit', machine);
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
                          <Tooltip title="Delete Machine">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDialog('delete', machine);
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


      {/* Enhanced Dialog for Add/Edit/Delete */}
      <EnhancedDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleSave}
        mode={dialogMode}
        title={`${dialogMode === 'add' ? 'Add New' : dialogMode === 'edit' ? 'Edit' : 'Delete'} Machine`}
        maxWidth="md"
        color="primary"
        saveButtonText={
          dialogMode === 'add' ? 'Add Machine' :
          dialogMode === 'edit' ? 'Update Machine' :
          'Delete Machine'
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
              Confirm Machine Deletion
            </Typography>
            <Typography variant="body1">
              Are you sure you want to permanently delete machine <strong>"{selectedMachine?.station}"</strong> from <strong>"{selectedMachine?.workArea}"</strong>?
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
              This action cannot be undone and will remove all associated data.
            </Typography>
          </Alert>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Work Area"
                  value={formData.workArea}
                  onChange={(e) => setFormData({ ...formData, workArea: e.target.value })}
                  variant="outlined"
                  placeholder="e.g., Production Line A, Quality Control"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Station"
                  value={formData.station}
                  onChange={(e) => setFormData({ ...formData, station: e.target.value })}
                  variant="outlined"
                  placeholder="e.g., Station 01, QC-01"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  label="Model"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  variant="outlined"
                  placeholder="e.g., CAT-3516B, CAT-C32"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      fontFamily: 'monospace',
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  label="Details"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  variant="outlined"
                  multiline
                  rows={4}
                  placeholder="Provide detailed description of the machine, its purpose, specifications, and any relevant operational information..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>
              
              {/* Preview Section for Edit/Add */}
              {(dialogMode === 'add' || dialogMode === 'edit') && formData.workArea && formData.station && (
                <Grid xs={12}>
                  <Box sx={{
                    p: 3,
                    backgroundColor: 'rgba(26, 54, 93, 0.05)',
                    borderRadius: 2,
                    border: '1px solid rgba(26, 54, 93, 0.1)',
                    mt: 1
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: theme.palette.primary.main }}>
                      <PrecisionManufacturingIcon sx={{ fontSize: '1.2rem', mr: 1, verticalAlign: 'middle' }} />
                      Machine Preview
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid xs={6}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Work Area:</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{formData.workArea || 'Not specified'}</Typography>
                      </Grid>
                      <Grid xs={6}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Station:</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>{formData.station || 'Not specified'}</Typography>
                      </Grid>
                      {formData.model && (
                        <Grid xs={12}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Model:</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>{formData.model}</Typography>
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

    </MainLayout>
  );
};

export default MachineInformation;
