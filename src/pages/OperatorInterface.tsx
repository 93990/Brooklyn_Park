import { 
  Container, 
  Typography, 
  Box, 
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
  Alert,
  Card,
  CardContent,
  Grid,
  Stack,
  Tooltip,
  Divider,
  Fade,
  Slide,
  Paper,
  createTheme,
  ThemeProvider
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import CloudSyncIcon from '@mui/icons-material/CloudSync';

interface DowntimeRecord {
  id: number;
  model: string;
  startDate: Date | null;
  finishTime: Date | null;
  totalDowntime: number; // in minutes
  downtimeType: string;
  downtimeReason: string;
  details: string;
}

interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
}

const OperatorInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  let selectedMachine = location.state?.selectedMachine;
  
  // Enhanced theme for DatePicker and interactive elements
  const enhancedTheme = createTheme({
    ...theme,
    components: {
      ...theme.components,
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(26, 54, 93, 0.1)',
              },
              '&.Mui-focused': {
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(26, 54, 93, 0.2)',
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: 'rgba(26, 54, 93, 0.1)',
            },
          },
        },
      },
      // Fix DatePicker calendar icon visibility
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            '&.MuiSvgIcon-root': {
              color: theme.palette.primary.main,
            },
          },
        },
      },
      MuiPickersCalendarHeader: {
        styleOverrides: {
          root: {
            '& .MuiIconButton-root': {
              color: theme.palette.primary.main,
            },
          },
        },
      },
      MuiDateCalendar: {
        styleOverrides: {
          root: {
            '& .MuiPickersDay-root': {
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
              },
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              },
            },
          },
        },
      },
    },
  });
  
  // Debug logging
  console.log('OperatorInterface loaded');
  console.log('Location state:', location.state);
  console.log('Selected machine:', selectedMachine);
  
  // Fallback machine if none is selected
  if (!selectedMachine) {
    selectedMachine = {
      value: 'demo',
      label: 'Demo Machine',
      description: 'Demo Machine for Testing',
      status: 'Online',
      color: theme.palette.primary.main
    };
    console.log('Using fallback machine:', selectedMachine);
  }

  // Filters state - Change 2: Set default dates to current date/time
  const [fromDate, setFromDate] = useState<Date | null>(new Date());
  const [toDate, setToDate] = useState<Date | null>(new Date());
  const [selectedShift, setSelectedShift] = useState('');
  
  // Table state
  const [records, setRecords] = useState<DowntimeRecord[]>([]);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  
  // Change 8: Sorting state
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Dropdown options - Change 4: Add Shift options instead of Model
  const shifts = [
    'Day Shift (6AM - 2PM)',
    'Afternoon Shift (2PM - 10PM)', 
    'Night Shift (10PM - 6AM)'
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

  // API Service Functions
  const apiService = {
    // Base URL - Update this when you get your .NET API
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',

    // Get all downtime records
    async getDowntimeRecords(machineId: string, fromDate?: Date, toDate?: Date, shift?: string): Promise<ApiResponse> {
      try {
        const params = new URLSearchParams();
        params.append('machineId', machineId);
        if (fromDate) params.append('fromDate', fromDate.toISOString());
        if (toDate) params.append('toDate', toDate.toISOString());
        if (shift) params.append('shift', shift);

        const response = await fetch(`${this.baseUrl}/downtime?${params}`);
        const data = await response.json();
        return { success: response.ok, data };
      } catch (error) {
        console.error('API Error:', error);
        return { success: false, message: 'Failed to fetch records' };
      }
    },

    // Create new downtime record
    async createDowntimeRecord(record: Omit<DowntimeRecord, 'id'>): Promise<ApiResponse> {
      try {
        const response = await fetch(`${this.baseUrl}/downtime`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...record,
            machineId: selectedMachine?.value,
            machineName: selectedMachine?.label
          })
        });
        const data = await response.json();
        return { success: response.ok, data };
      } catch (error) {
        console.error('API Error:', error);
        return { success: false, message: 'Failed to create record' };
      }
    },

    // Update downtime record
    async updateDowntimeRecord(id: number, record: Partial<DowntimeRecord>): Promise<ApiResponse> {
      try {
        const response = await fetch(`${this.baseUrl}/downtime/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(record)
        });
        const data = await response.json();
        return { success: response.ok, data };
      } catch (error) {
        console.error('API Error:', error);
        return { success: false, message: 'Failed to update record' };
      }
    },

    // Delete downtime record
    async deleteDowntimeRecord(id: number): Promise<ApiResponse> {
      try {
        const response = await fetch(`${this.baseUrl}/downtime/${id}`, {
          method: 'DELETE'
        });
        return { success: response.ok };
      } catch (error) {
        console.error('API Error:', error);
        return { success: false, message: 'Failed to delete record' };
      }
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!selectedMachine) return;
    
    setLoading(true);
    const result = await apiService.getDowntimeRecords(
      selectedMachine.value,
      fromDate || undefined,
      toDate || undefined,
      selectedShift || undefined
    );

    if (result.success) {
      setRecords(result.data || []);
    } else {
      // For demo purposes, use mock data
      setRecords([
        {
          id: 1,
          model: 'Model A-100',
          startDate: new Date('2024-01-15T08:00:00'),
          finishTime: new Date('2024-01-15T10:30:00'),
          totalDowntime: 150,
          downtimeType: 'Mechanical Failure',
          downtimeReason: 'Motor Failure',
          details: 'Main spindle motor overheated and required replacement'
        },
        {
          id: 2,
          model: 'Model B-200',
          startDate: new Date('2024-01-16T14:00:00'),
          finishTime: new Date('2024-01-16T15:45:00'),
          totalDowntime: 105,
          downtimeType: 'Setup/Changeover',
          downtimeReason: 'Tool Change',
          details: 'Scheduled tool replacement and calibration'
        }
      ]);
    }
    setLoading(false);
  };

  const handleFilter = () => {
    loadData();
  };


  const handleEdit = (id: number) => {
    setEditingRow(id);
  };

  const handleSave = async (record: DowntimeRecord) => {
    setSaveStatus('saving');
    
    try {
      let result;
      if (record.id > 1000000) { // New record (temporary ID)
        const { id, ...recordData } = record;
        result = await apiService.createDowntimeRecord(recordData);
      } else {
        result = await apiService.updateDowntimeRecord(record.id, record);
      }

      if (result.success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 2000);
        loadData(); // Reload data
      } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
    
    setEditingRow(null);
  };

  const handleCancel = () => {
    setEditingRow(null);
    loadData(); // Reload to discard changes
  };

  const handleDelete = async (id: number) => {
    const result = await apiService.deleteDowntimeRecord(id);
    if (result.success) {
      setRecords(records.filter(r => r.id !== id));
    }
  };

  // Change 8: Sorting functionality
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedRecords = [...records].sort((a, b) => {
    if (!sortColumn) return 0;
    
    let aValue: any;
    let bValue: any;
    
    switch (sortColumn) {
      case 'model':
        aValue = a.model;
        bValue = b.model;
        break;
      case 'startDate':
        aValue = a.startDate?.getTime() || 0;
        bValue = b.startDate?.getTime() || 0;
        break;
      case 'finishTime':
        aValue = a.finishTime?.getTime() || 0;
        bValue = b.finishTime?.getTime() || 0;
        break;
      case 'totalDowntime':
        aValue = a.totalDowntime;
        bValue = b.totalDowntime;
        break;
      default:
        return 0;
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleRecordChange = (id: number, field: keyof DowntimeRecord, value: any) => {
    setRecords(records.map(record => {
      if (record.id === id) {
        const updatedRecord = { ...record, [field]: value };
        
        // Auto-calculate total downtime if both dates are present
        if (field === 'startDate' || field === 'finishTime') {
          if (updatedRecord.startDate && updatedRecord.finishTime) {
            const diff = updatedRecord.finishTime.getTime() - updatedRecord.startDate.getTime();
            updatedRecord.totalDowntime = Math.floor(diff / (1000 * 60)); // Convert to minutes
          }
        }
        
        return updatedRecord;
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

  // Always show the interface - no conditional rendering

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
      {/* Header - Change 3: Match Home Screen header exactly */}
      <AppBar position="static" sx={{ 
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
              {/* Enhanced Logo Container */}
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
                },
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, transparent, rgba(255, 215, 0, 0.3), transparent)',
                  animation: 'logoGlow 3s ease-in-out infinite',
                  '@keyframes logoGlow': {
                    '0%, 100%': { opacity: 0, transform: 'scale(1)', filter: 'blur(2px)' },
                    '50%': { opacity: 1, transform: 'scale(1.15)', filter: 'blur(0px)' }
                  }
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 50%)',
                  zIndex: 2
                }
              }}>
                <img 
                  src="/Logoforcat.png" 
                  alt="Brooklyne Park CAT Logo" 
                  style={{ 
                    width: '70%', 
                    height: '70%', 
                    objectFit: 'contain',
                    filter: 'brightness(1.1) contrast(1.1) drop-shadow(0 2px 6px rgba(0,0,0,0.3))',
                    zIndex: 3,
                    position: 'relative'
                  }}
                />
              </Box>
              
              {/* Enhanced Brand Text */}
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="h5" component="div" sx={{ 
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #1a365d, #2d7ff9, #1a365d)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '1.4rem',
                  letterSpacing: '0.5px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
                  Operator Interface
                </Typography>
              </Box>
            </Box>

            {/* Right Section - Navigation */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton 
                color="inherit" 
                onClick={handleBack}
                sx={{ 
                  color: '#1a365d',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              
              {saveStatus !== 'idle' && (
                <Chip 
                  icon={<CloudSyncIcon />}
                  label={
                    saveStatus === 'saving' ? 'Saving...' :
                    saveStatus === 'success' ? 'Saved' : 'Error'
                  }
                  color={
                    saveStatus === 'saving' ? 'info' :
                    saveStatus === 'success' ? 'success' : 'error'
                  }
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
        mt: '80px'
      }}>
        {/* Background overlay */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(5px)',
          zIndex: 0
        }} />
        
        <Box sx={{ 
          position: 'relative', 
          zIndex: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          p: 3
        }}>
          {/* Filters Section - Task 1: Keep only date picker visible for filtering */}
          <Fade in timeout={800}>
            <Card sx={{ 
              mb: 3, 
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
                    Date Filter
                  </Typography>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <DatePicker
                      label="From Date"
                      value={fromDate}
                      onChange={setFromDate}
                      slotProps={{ 
                        textField: { 
                          fullWidth: true, 
                          size: 'small',
                          sx: {
                            '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                              color: theme.palette.primary.main,
                            }
                          }
                        },
                        openPickerIcon: {
                          sx: {
                            color: theme.palette.primary.main,
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <DatePicker
                      label="To Date"
                      value={toDate}
                      onChange={setToDate}
                      slotProps={{ 
                        textField: { 
                          fullWidth: true, 
                          size: 'small',
                          sx: {
                            '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                              color: theme.palette.primary.main,
                            }
                          }
                        },
                        openPickerIcon: {
                          sx: {
                            color: theme.palette.primary.main,
                          }
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Fade>

          {/* Action Buttons - Change 6: Remove Add functionality */}
          <Slide direction="up" in timeout={1000}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
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
                        borderBottom: `2px solid ${theme.palette.primary.main}`,
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: 'rgba(26, 54, 93, 0.12)' }
                      }} onClick={() => handleSort('model')}>Model</TableCell>
                      <TableCell sx={{ 
                        fontWeight: 700,
                        backgroundColor: 'rgba(26, 54, 93, 0.08)',
                        color: theme.palette.primary.main,
                        borderBottom: `2px solid ${theme.palette.primary.main}`,
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: 'rgba(26, 54, 93, 0.12)' }
                      }} onClick={() => handleSort('startDate')}>Start Time</TableCell>
                      <TableCell sx={{ 
                        fontWeight: 700,
                        backgroundColor: 'rgba(26, 54, 93, 0.08)',
                        color: theme.palette.primary.main,
                        borderBottom: `2px solid ${theme.palette.primary.main}`,
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: 'rgba(26, 54, 93, 0.12)' }
                      }} onClick={() => handleSort('finishTime')}>End Time</TableCell>
                      <TableCell sx={{ 
                        fontWeight: 700,
                        backgroundColor: 'rgba(26, 54, 93, 0.08)',
                        color: theme.palette.primary.main,
                        borderBottom: `2px solid ${theme.palette.primary.main}`,
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: 'rgba(26, 54, 93, 0.12)' }
                      }} onClick={() => handleSort('totalDowntime')}>Total Downtime</TableCell>
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
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={isEditMode ? 8 : 7} sx={{ textAlign: 'center', py: 4 }}>
                        <Typography>Loading...</Typography>
                      </TableCell>
                    </TableRow>
                  ) : records.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={isEditMode ? 8 : 7} sx={{ textAlign: 'center', py: 4 }}>
                        <Typography color="text.secondary">No records found</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedRecords.map((record, index) => (
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
                                sx={{
                                  '&:hover': {
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 4px 12px rgba(26, 54, 93, 0.1)',
                                  }
                                }}
                              >
                                <MenuItem value="Model A-100">Model A-100</MenuItem>
                                <MenuItem value="Model B-200">Model B-200</MenuItem>
                                <MenuItem value="Model C-300">Model C-300</MenuItem>
                                <MenuItem value="Model D-400">Model D-400</MenuItem>
                                <MenuItem value="Custom Model">Custom Model</MenuItem>
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
                            <DatePicker
                              value={record.startDate}
                              onChange={(date) => handleRecordChange(record.id, 'startDate', date)}
                              slotProps={{ 
                                textField: { 
                                  size: 'small', 
                                  fullWidth: true,
                                  sx: {
                                    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                                      color: theme.palette.primary.main,
                                    }
                                  }
                                },
                                openPickerIcon: {
                                  sx: {
                                    color: theme.palette.primary.main,
                                  }
                                }
                              }}
                            />
                          ) : (
                            <Typography variant="body2">
                              {record.startDate?.toLocaleString() || '-'}
                            </Typography>
                          )}
                        </TableCell>
                        
                        {/* Finish Time */}
                        <TableCell sx={{ 
                          borderBottom: '1px solid rgba(26, 54, 93, 0.1)',
                          fontWeight: editingRow === record.id ? 600 : 400
                        }}>
                          {editingRow === record.id ? (
                            <DatePicker
                              value={record.finishTime}
                              onChange={(date) => handleRecordChange(record.id, 'finishTime', date)}
                              slotProps={{ 
                                textField: { 
                                  size: 'small', 
                                  fullWidth: true,
                                  sx: {
                                    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                                      color: theme.palette.primary.main,
                                    }
                                  }
                                },
                                openPickerIcon: {
                                  sx: {
                                    color: theme.palette.primary.main,
                                  }
                                }
                              }}
                            />
                          ) : (
                            <Typography variant="body2">
                              {record.finishTime?.toLocaleString() || '-'}
                            </Typography>
                          )}
                        </TableCell>
                        
                        {/* Total Downtime */}
                        <TableCell>
                          <Chip 
                            label={formatDuration(record.totalDowntime)}
                            color={record.totalDowntime > 180 ? 'error' : record.totalDowntime > 60 ? 'warning' : 'success'}
                            size="small"
                          />
                        </TableCell>
                        
                        {/* Downtime Type */}
                        <TableCell>
                          {editingRow === record.id ? (
                            <FormControl fullWidth size="small">
                              <Select
                                value={record.downtimeType}
                                onChange={(e) => {
                                  handleRecordChange(record.id, 'downtimeType', e.target.value);
                                  handleRecordChange(record.id, 'downtimeReason', ''); // Reset reason
                                }}
                              >
                                {downtimeTypes.map((type) => (
                                  <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          ) : (
                            record.downtimeType
                          )}
                        </TableCell>
                        
                        {/* Downtime Reason */}
                        <TableCell>
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
                            record.downtimeReason
                          )}
                        </TableCell>
                        
                        {/* Details */}
                        <TableCell>
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
                          <TableCell>
                            {editingRow === record.id ? (
                              <Stack direction="row" spacing={1}>
                                <Tooltip title="Save">
                                  <IconButton 
                                    size="small" 
                                    color="primary"
                                    onClick={() => handleSave(record)}
                                    disabled={saveStatus === 'saving'}
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

        {/* API Connection Status */}
        <Fade in timeout={1500}>
          <Card sx={{ 
            mt: 3,
            background: 'linear-gradient(135deg, rgba(26, 54, 93, 0.02) 0%, rgba(45, 127, 249, 0.02) 100%)',
            border: '1px solid rgba(26, 54, 93, 0.1)'
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{
                color: theme.palette.primary.main,
                fontWeight: 600
              }}>
                API Configuration
              </Typography>
              <Divider sx={{ mb: 2, borderColor: theme.palette.primary.light }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Base URL:</strong> {apiService.baseUrl}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Machine ID:</strong> {selectedMachine.value}
                  </Typography>
                </Grid>
              </Grid>
              <Alert 
                severity="info" 
                sx={{ 
                  mt: 2,
                  backgroundColor: 'rgba(45, 127, 249, 0.1)',
                  borderColor: theme.palette.secondary.main,
                  '& .MuiAlert-icon': {
                    color: theme.palette.secondary.main
                  }
                }}
              >
                <Typography variant="body2">
                  <strong>API Endpoints Ready:</strong><br/>
                  • GET /api/downtime - Fetch records<br/>
                  • POST /api/downtime - Create record<br/>
                  • PUT /api/downtime/:id - Update record<br/>
                  • DELETE /api/downtime/:id - Delete record<br/>
                  Update REACT_APP_API_URL environment variable with your .NET API URL.
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Fade>
        </Box>
      </Box>
      
      {/* Footer - Change 3: Match Home Screen footer exactly */}
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
          <Typography variant="body2" sx={{
            color: 'text.secondary',
            fontSize: '0.85rem',
            opacity: 0.8
          }}>
            2025 Caterpillar Confidential
          </Typography>
        </Container>
      </Box>
    </Box>
  </ThemeProvider>
  );
};

export default OperatorInterface;
