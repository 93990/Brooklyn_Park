import { 
  Container, 
  Typography, 
  Box, 
  AppBar, 
  Toolbar, 
  IconButton, 
  useTheme,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Card,
  CardContent,
  Grid,
  Stack,
  Tooltip,
  Fade,
  Slide,
  createTheme,
  ThemeProvider,
  Alert,
  Divider
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

interface DowntimeRecord {
  id: number;
  model: string;
  startDate: string;
  finishTime: string;
  totalDowntime: number; // in minutes
  downtimeType: string;
  downtimeReason: string;
  details: string;
}

const OperatorInterfaceWorking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  let selectedMachine = location.state?.selectedMachine;
  
  // Enhanced theme for interactive elements
  const enhancedTheme = createTheme({
    ...theme,
    components: {
      ...theme.components,
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(26, 54, 93, 0.15)',
              },
              '&.Mui-focused': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(26, 54, 93, 0.25)',
              },
              '& input[type="datetime-local"]::-webkit-calendar-picker-indicator': {
                filter: 'invert(22%) sepia(95%) saturate(1552%) hue-rotate(197deg) brightness(93%) contrast(87%)',
                cursor: 'pointer',
                fontSize: '18px',
                padding: '4px',
                '&:hover': {
                  filter: 'invert(16%) sepia(100%) saturate(1552%) hue-rotate(197deg) brightness(73%) contrast(97%)',
                }
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 12px 35px rgba(0,0,0,0.2)',
            },
            '&:active': {
              transform: 'translateY(-1px)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.2) rotate(5deg)',
              backgroundColor: 'rgba(26, 54, 93, 0.1)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            },
          },
        },
      },
    },
  });
  
  console.log('OperatorInterface loading...');
  
  // Fallback machine if none is selected
  if (!selectedMachine) {
    selectedMachine = {
      value: 'demo',
      label: 'Demo Machine',
      description: 'Demo Machine for Testing',
      status: 'Online',
      color: theme.palette.primary.main
    };
  }

  // Filters state
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  
  // Table state
  const [records, setRecords] = useState<DowntimeRecord[]>([]);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Dropdown options
  const models = [
    'Model A-100',
    'Model B-200', 
    'Model C-300',
    'Model D-400',
    'Custom Model'
  ];

  const downtimeTypes = [
    'Mechanical Failure',
    'Electrical Issue',
    'Operational Delay',
    'Maintenance',
    'Setup/Changeover',
    'Material Shortage',
    'Quality Issue'
  ];

  const downtimeReasons = {
    'Mechanical Failure': ['Motor Failure', 'Bearing Issue', 'Hydraulic Problem', 'Spindle Issue'],
    'Electrical Issue': ['Power Failure', 'Control System', 'Sensor Malfunction', 'Wiring Problem'],
    'Operational Delay': ['Operator Absence', 'Training', 'Break Extension', 'Shift Change'],
    'Maintenance': ['Preventive Maintenance', 'Repair', 'Calibration', 'Cleaning'],
    'Setup/Changeover': ['Tool Change', 'Program Setup', 'Fixture Change', 'Material Setup'],
    'Material Shortage': ['Raw Material', 'Tools', 'Consumables', 'Packaging'],
    'Quality Issue': ['Dimensional Issue', 'Surface Finish', 'Material Defect', 'Process Problem']
  };

  // Load demo data on component mount
  useEffect(() => {
    // Set sample data immediately to show in the table
    const sampleData = [
      {
        id: 1,
        model: 'Model A-100',
        startDate: '2024-01-15T08:00',
        finishTime: '2024-01-15T10:30',
        totalDowntime: 150,
        downtimeType: 'Mechanical Failure',
        downtimeReason: 'Motor Failure',
        details: 'Main spindle motor overheated and required replacement'
      },
      {
        id: 2,
        model: 'Model B-200',
        startDate: '2024-01-16T14:00',
        finishTime: '2024-01-16T15:45',
        totalDowntime: 105,
        downtimeType: 'Setup/Changeover',
        downtimeReason: 'Tool Change',
        details: 'Scheduled tool replacement and calibration'
      },
      {
        id: 3,
        model: 'Model C-300',
        startDate: '2024-01-17T09:15',
        finishTime: '2024-01-17T11:00',
        totalDowntime: 105,
        downtimeType: 'Electrical Issue',
        downtimeReason: 'Power Failure',
        details: 'Power outage caused system shutdown for 1 hour 45 minutes'
      },
      {
        id: 4,
        model: 'Model D-400',
        startDate: '2024-01-18T13:30',
        finishTime: '2024-01-18T14:15',
        totalDowntime: 45,
        downtimeType: 'Maintenance',
        downtimeReason: 'Preventive Maintenance',
        details: 'Routine maintenance and lubrication'
      }
    ];
    
    console.log('Setting sample records:', sampleData);
    setRecords(sampleData);
  }, []);

  const handleFilter = () => {
    console.log('Filter applied:', { fromDate, toDate, selectedModel });
  };

  const handleAddRecord = () => {
    const newRecord: DowntimeRecord = {
      id: Date.now(),
      model: '',
      startDate: '',
      finishTime: '',
      totalDowntime: 0,
      downtimeType: '',
      downtimeReason: '',
      details: ''
    };
    setRecords([...records, newRecord]);
    setEditingRow(newRecord.id);
    setIsEditMode(true);
  };

  const handleEdit = (id: number) => {
    setEditingRow(id);
  };

  const handleSave = (record: DowntimeRecord) => {
    console.log('Saving record:', record);
    setEditingRow(null);
  };

  const handleCancel = () => {
    setEditingRow(null);
  };

  const handleDelete = (id: number) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const handleRecordChange = (id: number, field: keyof DowntimeRecord, value: any) => {
    setRecords(records.map(record => {
      if (record.id === id) {
        return { ...record, [field]: value };
      }
      return record;
    }));
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleBack = () => {
    navigate('/operator-input');
  };

  return (
    <ThemeProvider theme={enhancedTheme}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh',
        width: '100vw',
        bgcolor: 'background.default',
        backgroundImage: `url(/bgformain.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <AppBar position="fixed" sx={{ 
          background: 'linear-gradient(135deg, #FFC500 0%, #FFD700 50%, #FFC500 100%)',
          boxShadow: '0 4px 20px rgba(255, 197, 0, 0.3)',
          height: 70,
          zIndex: 1100
        }}>
          <Container maxWidth="xl" disableGutters>
            <Toolbar sx={{ 
              justifyContent: 'space-between',
              height: '100%',
              px: { xs: 2, md: 4 }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton 
                  color="inherit" 
                  onClick={handleBack}
                  sx={{ 
                    mr: 2,
                    color: '#1a365d',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.3)'
                    }
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <PrecisionManufacturingIcon sx={{ mr: 1, color: '#1a365d', fontSize: 28 }} />
                <Box>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 700,
                    color: '#1a365d',
                    fontSize: '1.3rem',
                    lineHeight: 1
                  }}>
                    {selectedMachine.label} - Data Entry
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: 'rgba(26, 54, 93, 0.7)',
                    fontSize: '0.75rem'
                  }}>
                    {selectedMachine.description}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip 
                  label={selectedMachine.status} 
                  color="success" 
                  size="small"
                  sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                />
                {selectedMachine.value === 'demo' && (
                  <Chip 
                    label="Demo Mode" 
                    color="warning" 
                    size="small"
                    sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                  />
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Main Content */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          pt: '90px',
          height: 'calc(100vh - 70px)'
        }}>
          {/* Background overlay */}
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 0
          }} />
          
          <Box sx={{ 
            position: 'relative', 
            zIndex: 1,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            p: 3,
            pt: 1
          }}>
            {/* Filters Section */}
            <Fade in timeout={800}>
              <Card sx={{ 
                mb: 2, 
                overflow: 'visible',
                background: 'linear-gradient(135deg, rgba(26, 54, 93, 0.05) 0%, rgba(45, 127, 249, 0.05) 100%)',
                border: '1px solid rgba(26, 54, 93, 0.1)'
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <FilterListIcon sx={{ 
                      mr: 1, 
                      color: theme.palette.primary.main,
                      fontSize: 28
                    }} />
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      background: 'linear-gradient(45deg, #1a365d, #2d7ff9)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      Data Filters
                    </Typography>
                  </Box>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="From Date"
                        type="datetime-local"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        fullWidth
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="To Date"
                        type="datetime-local"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        fullWidth
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Model</InputLabel>
                        <Select
                          value={selectedModel}
                          label="Model"
                          onChange={(e) => setSelectedModel(e.target.value)}
                          sx={{
                            '&:hover': {
                              transform: 'translateY(-1px)',
                              boxShadow: '0 4px 12px rgba(26, 54, 93, 0.1)',
                            }
                          }}
                        >
                          <MenuItem value="">All Models</MenuItem>
                          {models.map((model) => (
                            <MenuItem key={model} value={model}>{model}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={handleFilter}
                        sx={{ 
                          height: '40px',
                          background: 'linear-gradient(45deg, #1a365d, #2d7ff9)',
                          boxShadow: '0 3px 10px rgba(26, 54, 93, 0.3)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #2d7ff9, #1a365d)',
                            boxShadow: '0 6px 20px rgba(26, 54, 93, 0.4)',
                          }
                        }}
                        disabled={loading}
                      >
                        {loading ? 'Loading...' : 'Apply Filters'}
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Fade>

            {/* Action Buttons */}
            <Slide direction="up" in timeout={1000}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => setIsEditMode(!isEditMode)}
                  sx={{
                    background: isEditMode 
                      ? 'linear-gradient(45deg, #2d7ff9, #5a9cff)' 
                      : 'linear-gradient(45deg, #1a365d, #2a4a7a)',
                    boxShadow: isEditMode 
                      ? '0 3px 10px rgba(45, 127, 249, 0.3)' 
                      : '0 3px 10px rgba(26, 54, 93, 0.3)',
                    '&:hover': {
                      background: isEditMode 
                        ? 'linear-gradient(45deg, #5a9cff, #2d7ff9)' 
                        : 'linear-gradient(45deg, #2a4a7a, #1a365d)',
                      boxShadow: isEditMode 
                        ? '0 6px 20px rgba(45, 127, 249, 0.4)' 
                        : '0 6px 20px rgba(26, 54, 93, 0.4)',
                    }
                  }}
                >
                  {isEditMode ? 'Exit Edit Mode' : 'Edit Mode'}
                </Button>
                
                {isEditMode && (
                  <Fade in timeout={500}>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={handleAddRecord}
                      sx={{
                        borderColor: theme.palette.success.main,
                        color: theme.palette.success.main,
                        '&:hover': {
                          borderColor: theme.palette.success.dark,
                          backgroundColor: theme.palette.success.light,
                          color: theme.palette.success.contrastText,
                        }
                      }}
                    >
                      Add Record
                    </Button>
                  </Fade>
                )}
              </Box>
            </Slide>

            {/* Data Table */}
            <Fade in timeout={1200}>
              <Card sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                border: '1px solid rgba(26, 54, 93, 0.1)',
                boxShadow: '0 8px 32px rgba(26, 54, 93, 0.12)'
              }}>
                <TableContainer sx={{ 
                  flex: 1,
                  overflow: 'auto',
                  '&::-webkit-scrollbar': {
                    width: 8,
                    height: 8,
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    borderRadius: 4,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 4,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  },
                }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ 
                          fontWeight: 700,
                          backgroundColor: 'rgba(26, 54, 93, 0.08)',
                          color: theme.palette.primary.main,
                          borderBottom: `2px solid ${theme.palette.primary.main}`
                        }}>Model</TableCell>
                        <TableCell sx={{ 
                          fontWeight: 700,
                          backgroundColor: 'rgba(26, 54, 93, 0.08)',
                          color: theme.palette.primary.main,
                          borderBottom: `2px solid ${theme.palette.primary.main}`
                        }}>Start Date</TableCell>
                        <TableCell sx={{ 
                          fontWeight: 700,
                          backgroundColor: 'rgba(26, 54, 93, 0.08)',
                          color: theme.palette.primary.main,
                          borderBottom: `2px solid ${theme.palette.primary.main}`
                        }}>Finish Time</TableCell>
                        <TableCell sx={{ 
                          fontWeight: 700,
                          backgroundColor: 'rgba(26, 54, 93, 0.08)',
                          color: theme.palette.primary.main,
                          borderBottom: `2px solid ${theme.palette.primary.main}`
                        }}>Total Downtime</TableCell>
                        <TableCell sx={{ 
                          fontWeight: 700,
                          backgroundColor: 'rgba(26, 54, 93, 0.08)',
                          color: theme.palette.primary.main,
                          borderBottom: `2px solid ${theme.palette.primary.main}`
                        }}>Downtime Type</TableCell>
                        <TableCell sx={{ 
                          fontWeight: 700,
                          backgroundColor: 'rgba(26, 54, 93, 0.08)',
                          color: theme.palette.primary.main,
                          borderBottom: `2px solid ${theme.palette.primary.main}`
                        }}>Downtime Reason</TableCell>
                        <TableCell sx={{ 
                          fontWeight: 700,
                          backgroundColor: 'rgba(26, 54, 93, 0.08)',
                          color: theme.palette.primary.main,
                          borderBottom: `2px solid ${theme.palette.primary.main}`
                        }}>Details</TableCell>
                        {isEditMode && <TableCell sx={{ 
                          fontWeight: 700,
                          backgroundColor: 'rgba(26, 54, 93, 0.08)',
                          color: theme.palette.primary.main,
                          borderBottom: `2px solid ${theme.palette.primary.main}`
                        }}>Actions</TableCell>}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {records.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={isEditMode ? 8 : 7} sx={{ textAlign: 'center', py: 4 }}>
                            <Typography color="text.secondary">No records found</Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        records.map((record, index) => (
                          <TableRow 
                            key={record.id} 
                            sx={{
                              '&:hover': {
                                backgroundColor: 'rgba(26, 54, 93, 0.04)',
                                transform: 'scale(1.001)',
                                transition: 'all 0.2s ease-in-out',
                              },
                              '&:nth-of-type(even)': {
                                backgroundColor: 'rgba(248, 250, 252, 0.5)',
                              },
                              cursor: editingRow === record.id ? 'default' : 'pointer',
                            }}
                          >
                            {/* Model */}
                            <TableCell sx={{ 
                              borderBottom: '1px solid rgba(26, 54, 93, 0.1)',
                              fontWeight: editingRow === record.id ? 600 : 400
                            }}>
                              {editingRow === record.id ? (
                                <FormControl fullWidth size="small">
                                  <Select
                                    value={record.model}
                                    onChange={(e) => handleRecordChange(record.id, 'model', e.target.value)}
                                  >
                                    {models.map((model) => (
                                      <MenuItem key={model} value={model}>{model}</MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              ) : (
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {record.model}
                                </Typography>
                              )}
                            </TableCell>
                            
                            {/* Start Date */}
                            <TableCell sx={{ 
                              borderBottom: '1px solid rgba(26, 54, 93, 0.1)',
                              fontWeight: editingRow === record.id ? 600 : 400
                            }}>
                              {editingRow === record.id ? (
                                <TextField
                                  type="datetime-local"
                                  value={record.startDate}
                                  onChange={(e) => handleRecordChange(record.id, 'startDate', e.target.value)}
                                  size="small"
                                  fullWidth
                                />
                              ) : (
                                <Typography variant="body2">
                                  {record.startDate ? new Date(record.startDate).toLocaleString() : '-'}
                                </Typography>
                              )}
                            </TableCell>
                            
                            {/* Finish Time */}
                            <TableCell sx={{ 
                              borderBottom: '1px solid rgba(26, 54, 93, 0.1)',
                              fontWeight: editingRow === record.id ? 600 : 400
                            }}>
                              {editingRow === record.id ? (
                                <TextField
                                  type="datetime-local"
                                  value={record.finishTime}
                                  onChange={(e) => handleRecordChange(record.id, 'finishTime', e.target.value)}
                                  size="small"
                                  fullWidth
                                />
                              ) : (
                                <Typography variant="body2">
                                  {record.finishTime ? new Date(record.finishTime).toLocaleString() : '-'}
                                </Typography>
                              )}
                            </TableCell>
                            
                            {/* Total Downtime */}
                            <TableCell sx={{ 
                              borderBottom: '1px solid rgba(26, 54, 93, 0.1)'
                            }}>
                              <Chip 
                                label={formatDuration(record.totalDowntime)}
                                color={record.totalDowntime > 180 ? 'error' : record.totalDowntime > 60 ? 'warning' : 'success'}
                                size="small"
                              />
                            </TableCell>
                            
                            {/* Downtime Type */}
                            <TableCell sx={{ 
                              borderBottom: '1px solid rgba(26, 54, 93, 0.1)',
                              fontWeight: editingRow === record.id ? 600 : 400
                            }}>
                              {editingRow === record.id ? (
                                <FormControl fullWidth size="small">
                                  <Select
                                    value={record.downtimeType}
                                    onChange={(e) => {
                                      handleRecordChange(record.id, 'downtimeType', e.target.value);
                                      handleRecordChange(record.id, 'downtimeReason', '');
                                    }}
                                  >
                                    {downtimeTypes.map((type) => (
                                      <MenuItem key={type} value={type}>{type}</MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              ) : (
                                <Typography variant="body2">
                                  {record.downtimeType}
                                </Typography>
                              )}
                            </TableCell>
                            
                            {/* Downtime Reason */}
                            <TableCell sx={{ 
                              borderBottom: '1px solid rgba(26, 54, 93, 0.1)',
                              fontWeight: editingRow === record.id ? 600 : 400
                            }}>
                              {editingRow === record.id ? (
                                <FormControl fullWidth size="small">
                                  <Select
                                    value={record.downtimeReason}
                                    onChange={(e) => handleRecordChange(record.id, 'downtimeReason', e.target.value)}
                                    disabled={!record.downtimeType}
                                  >
                                    {record.downtimeType && downtimeReasons[record.downtimeType as keyof typeof downtimeReasons]?.map((reason) => (
                                      <MenuItem key={reason} value={reason}>{reason}</MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              ) : (
                                <Typography variant="body2">
                                  {record.downtimeReason}
                                </Typography>
                              )}
                            </TableCell>
                            
                            {/* Details */}
                            <TableCell sx={{ 
                              borderBottom: '1px solid rgba(26, 54, 93, 0.1)',
                              fontWeight: editingRow === record.id ? 600 : 400
                            }}>
                              {editingRow === record.id ? (
                                <TextField
                                  fullWidth
                                  size="small"
                                  multiline
                                  rows={2}
                                  value={record.details}
                                  onChange={(e) => handleRecordChange(record.id, 'details', e.target.value)}
                                  placeholder="Enter details..."
                                />
                              ) : (
                                <Tooltip title={record.details} arrow>
                                  <Typography 
                                    variant="body2" 
                                    sx={{ 
                                      maxWidth: 200,
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    {record.details || '-'}
                                  </Typography>
                                </Tooltip>
                              )}
                            </TableCell>
                            
                            {/* Actions */}
                            {isEditMode && (
                              <TableCell sx={{ 
                                borderBottom: '1px solid rgba(26, 54, 93, 0.1)'
                              }}>
                                {editingRow === record.id ? (
                                  <Stack direction="row" spacing={1}>
                                    <Tooltip title="Save">
                                      <IconButton 
                                        size="small" 
                                        color="primary"
                                        onClick={() => handleSave(record)}
                                      >
                                        <SaveIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Cancel">
                                      <IconButton 
                                        size="small" 
                                        color="secondary"
                                        onClick={handleCancel}
                                      >
                                        <CancelIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </Stack>
                                ) : (
                                  <Stack direction="row" spacing={1}>
                                    <Tooltip title="Edit">
                                      <IconButton 
                                        size="small" 
                                        color="primary"
                                        onClick={() => handleEdit(record.id)}
                                      >
                                        <EditIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                      <IconButton 
                                        size="small" 
                                        color="error"
                                        onClick={() => handleDelete(record.id)}
                                      >
                                        <DeleteIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </Stack>
                                )}
                              </TableCell>
                            )}
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Fade>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default OperatorInterfaceWorking;
