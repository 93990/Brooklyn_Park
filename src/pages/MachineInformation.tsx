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
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

interface MachineData {
  id: number;
  workArea: string;
  station: string;
  model: string;
  details: string;
  status: 'Active' | 'Maintenance' | 'Offline';
  lastUpdated: string;
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
      details: 'Primary assembly unit for heavy-duty components',
      status: 'Active',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      workArea: 'Production Line A',
      station: 'Station 02',
      model: 'CAT-3512C',
      details: 'Secondary processing unit with automated controls',
      status: 'Active',
      lastUpdated: '2024-01-14'
    },
    {
      id: 3,
      workArea: 'Production Line B',
      station: 'Station 03',
      model: 'CAT-C32',
      details: 'Quality control and testing station',
      status: 'Maintenance',
      lastUpdated: '2024-01-10'
    },
    {
      id: 4,
      workArea: 'Production Line B',
      station: 'Station 04',
      model: 'CAT-C18',
      details: 'Final assembly and packaging unit',
      status: 'Active',
      lastUpdated: '2024-01-12'
    },
    {
      id: 5,
      workArea: 'Quality Control',
      station: 'QC-01',
      model: 'CAT-C15',
      details: 'Precision measurement and validation equipment',
      status: 'Offline',
      lastUpdated: '2024-01-08'
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
        details: formData.details,
        status: 'Active',
        lastUpdated: new Date().toISOString().split('T')[0]
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
              details: formData.details,
              lastUpdated: new Date().toISOString().split('T')[0]
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Maintenance': return 'warning';
      case 'Offline': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircleIcon sx={{ fontSize: '1rem' }} />;
      case 'Maintenance': return <BuildIcon sx={{ fontSize: '1rem' }} />;
      case 'Offline': return <WarningIcon sx={{ fontSize: '1rem' }} />;
      default: return <InfoIcon sx={{ fontSize: '1rem' }} />;
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
                  Machine Information Management
                </Typography>
              </Box>
            </Box>

            {/* Center Section - Machine Info Title */}
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
                  Machine Database
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
                background: 'linear-gradient(45deg, #1a365d, #2d7ff9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Machine Information Management
              </Typography>
              <Typography variant="h6" sx={{
                color: 'text.secondary',
                fontWeight: 400,
                mb: 2
              }}>
                {currentTime.toLocaleString()}
              </Typography>
              <Chip
                label={`${machines.length} Machines Registered`}
                color="primary"
                variant="outlined"
                icon={<PrecisionManufacturingIcon />}
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
                boxShadow: '0 8px 32px rgba(26, 54, 93, 0.1)'
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
                      Add Machine
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      disabled={!selectedMachine}
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
                      disabled={!selectedMachine}
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
              boxShadow: '0 8px 32px rgba(26, 54, 93, 0.1)',
              overflow: 'hidden'
            }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{
                    background: 'linear-gradient(135deg, #1a365d, #2d4a7a)',
                    '& th': {
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderBottom: 'none'
                    }
                  }}>
                    <TableCell>Work Area</TableCell>
                    <TableCell>Station</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Details</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Last Updated</TableCell>
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
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(machine.status)}
                          label={machine.status}
                          color={getStatusColor(machine.status) as any}
                          size="small"
                          sx={{ fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                        {machine.lastUpdated}
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
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Work Area:</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{formData.workArea || 'Not specified'}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Station:</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>{formData.station || 'Not specified'}</Typography>
                      </Grid>
                      {formData.model && (
                        <Grid item xs={12}>
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

export default MachineInformation;
