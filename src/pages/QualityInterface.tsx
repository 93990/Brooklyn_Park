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
  Avatar
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
import QualityAssuranceIcon from '@mui/icons-material/Verified';
import PersonIcon from '@mui/icons-material/Person';

interface QualityRecord {
  id: number;
  model: string;
  partNumber: string;
  startTime: string;
  endTime: string;
  quality: string;
  reason: string;
  userDetails: string;
}

const QualityInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  
  // Get user from location state or localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const stateUser = location.state?.user;
    const storedUser = localStorage.getItem('qualityUser');
    
    if (stateUser) {
      return stateUser;
    } else if (storedUser) {
      return JSON.parse(storedUser);
    } else {
      // Redirect to login if no user found
      navigate('/quality-login');
      return null;
    }
  });

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

  // Filters state
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  
  // Table state
  const [records, setRecords] = useState<QualityRecord[]>([]);
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

  const shifts = [
    'Day Shift (6AM - 2PM)',
    'Evening Shift (2PM - 10PM)',
    'Night Shift (10PM - 6AM)',
    'Weekend Shift',
    'Overtime Shift'
  ];

  const qualityOptions = [
    'Pass',
    'Fail',
    'Rework Required',
    'Hold for Review',
    'Conditional Pass',
    'Reject'
  ];

  const qualityReasons = {
    'Pass': ['Standard Quality', 'Exceeds Standards', 'Good Condition'],
    'Fail': ['Dimensional Issue', 'Surface Defect', 'Material Defect', 'Assembly Error'],
    'Rework Required': ['Minor Defect', 'Finish Issue', 'Tolerance Issue', 'Cosmetic Defect'],
    'Hold for Review': ['Borderline Quality', 'Documentation Missing', 'Process Deviation'],
    'Conditional Pass': ['Minor Non-conformance', 'Customer Approval Required', 'Special Use'],
    'Reject': ['Major Defect', 'Safety Issue', 'Critical Dimension', 'Material Failure']
  };

  // Load demo data on component mount
  useEffect(() => {
    if (!currentUser) return;

    // Set sample data immediately to show in the table
    const sampleData = [
      {
        id: 1,
        model: 'Model A-100',
        partNumber: 'PN-A100-001',
        startTime: '2024-01-15T08:00',
        endTime: '2024-01-15T08:45',
        quality: 'Pass',
        reason: 'Standard Quality',
        userDetails: currentUser.name
      },
      {
        id: 2,
        model: 'Model B-200',
        partNumber: 'PN-B200-002',
        startTime: '2024-01-16T09:30',
        endTime: '2024-01-16T10:15',
        quality: 'Fail',
        reason: 'Dimensional Issue',
        userDetails: 'Sarah Johnson'
      },
      {
        id: 3,
        model: 'Model C-300',
        partNumber: 'PN-C300-003',
        startTime: '2024-01-17T14:20',
        endTime: '2024-01-17T15:10',
        quality: 'Rework Required',
        reason: 'Surface Defect',
        userDetails: currentUser.name
      },
      {
        id: 4,
        model: 'Model D-400',
        partNumber: 'PN-D400-004',
        startTime: '2024-01-18T11:00',
        endTime: '2024-01-18T11:30',
        quality: 'Pass',
        reason: 'Exceeds Standards',
        userDetails: 'John Smith'
      }
    ];
    
    console.log('Setting sample quality records:', sampleData);
    setRecords(sampleData);
  }, [currentUser]);

  const handleFilter = () => {
    console.log('Filter applied:', { fromDate, toDate, selectedShift });
  };

  const handleAddRecord = () => {
    if (!currentUser) return;

    const newRecord: QualityRecord = {
      id: Date.now(),
      model: '',
      partNumber: '',
      startTime: '',
      endTime: '',
      quality: '',
      reason: '',
      userDetails: currentUser.name
    };
    setRecords([...records, newRecord]);
    setEditingRow(newRecord.id);
    setIsEditMode(true);
  };

  const handleEdit = (id: number) => {
    setEditingRow(id);
  };

  const handleSave = (record: QualityRecord) => {
    console.log('Saving quality record:', record);
    setEditingRow(null);
  };

  const handleCancel = () => {
    setEditingRow(null);
  };

  const handleDelete = (id: number) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const handleRecordChange = (id: number, field: keyof QualityRecord, value: any) => {
    setRecords(records.map(record => {
      if (record.id === id) {
        const updatedRecord = { ...record, [field]: value };
        
        // If quality is changed, reset reason
        if (field === 'quality') {
          updatedRecord.reason = '';
        }
        
        return updatedRecord;
      }
      return record;
    }));
  };

  const handleBack = () => {
    navigate('/quality-login');
  };

  const handleLogout = () => {
    localStorage.removeItem('qualityUser');
    navigate('/');
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Pass': return 'success';
      case 'Fail': return 'error';
      case 'Rework Required': return 'warning';
      case 'Hold for Review': return 'info';
      case 'Conditional Pass': return 'secondary';
      case 'Reject': return 'error';
      default: return 'default';
    }
  };

  if (!currentUser) {
    return null; // This will trigger navigation to login
  }

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
                <QualityAssuranceIcon sx={{ mr: 1, color: '#1a365d', fontSize: 28 }} />
                <Box>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 700,
                    color: '#1a365d',
                    fontSize: '1.3rem',
                    lineHeight: 1
                  }}>
                    Quality Control Interface
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: 'rgba(26, 54, 93, 0.7)',
                    fontSize: '0.75rem'
                  }}>
                    Quality Management System
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ 
                    width: 32, 
                    height: 32, 
                    bgcolor: '#1a365d',
                    fontSize: '0.875rem'
                  }}>
                    <PersonIcon fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ 
                      color: '#1a365d',
                      fontWeight: 600,
                      lineHeight: 1
                    }}>
                      {currentUser.name}
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      color: 'rgba(26, 54, 93, 0.7)',
                      fontSize: '0.7rem'
                    }}>
                      {currentUser.role}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleLogout}
                  sx={{
                    color: '#1a365d',
                    borderColor: '#1a365d',
                    '&:hover': {
                      backgroundColor: 'rgba(26, 54, 93, 0.1)',
                    }
                  }}
                >
                  Logout
                </Button>
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
                      Quality Filters
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
                        <InputLabel>Shift</InputLabel>
                        <Select
                          value={selectedShift}
                          label="Shift"
                          onChange={(e) => setSelectedShift(e.target.value)}
                          sx={{
                            '&:hover': {
                              transform: 'translateY(-1px)',
                              boxShadow: '0 4px 12px rgba(26, 54, 93, 0.1)',
                            }
                          }}
                        >
                          <MenuItem value="">All Shifts</MenuItem>
                          {shifts.map((shift) => (
                            <MenuItem key={shift} value={shift}>{shift}</MenuItem>
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
                      Add Quality Record
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
                        }}>Part Number</TableCell>
                        <TableCell sx={{ 
                          fontWeight: 700,
                          backgroundColor: 'rgba(26, 54, 93, 0.08)',
                          color: theme.palette.primary.main,
                          borderBottom: `2px solid ${theme.palette.primary.main}`
                        }}>Start Time</TableCell>
                        <TableCell sx={{ 
                          fontWeight: 700,
                          backgroundColor: 'rgba(26, 54, 93, 0.08)',
                          color: theme.palette.primary.main,
                          borderBottom: `2px solid ${theme.palette.primary.main}`
                        }}>End Time</TableCell>
                        <TableCell sx={{ 
                          fontWeight: 700,
                          backgroundColor: 'rgba(26, 54, 93, 0.08)',
                          color: theme.palette.primary.main,
                          borderBottom: `2px solid ${theme.palette.primary.main}`
                        }}>Quality</TableCell>
                        <TableCell sx={{ 
                          fontWeight: 700,
                          backgroundColor: 'rgba(26, 54, 93, 0.08)',
                          color: theme.palette.primary.main,
                          borderBottom: `2px solid ${theme.palette.primary.main}`
                        }}>Reason</TableCell>
                        <TableCell sx={{ 
                          fontWeight: 700,
                          backgroundColor: 'rgba(26, 54, 93, 0.08)',
                          color: theme.palette.primary.main,
                          borderBottom: `2px solid ${theme.palette.primary.main}`
                        }}>User Details</TableCell>
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
                            <Typography color="text.secondary">No quality records found</Typography>
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
                            
                            {/* Part Number */}
                            <TableCell sx={{ 
                              borderBottom: '1px solid rgba(26, 54, 93, 0.1)',
                              fontWeight: editingRow === record.id ? 600 : 400
                            }}>
                              {editingRow === record.id ? (
                                <TextField
                                  value={record.partNumber}
                                  onChange={(e) => handleRecordChange(record.id, 'partNumber', e.target.value)}
                                  size="small"
                                  fullWidth
                                  placeholder="Enter part number"
                                />
                              ) : (
                                <Typography variant="body2">
                                  {record.partNumber || '-'}
                                </Typography>
                              )}
                            </TableCell>
                            
                            {/* Start Time */}
                            <TableCell sx={{ 
                              borderBottom: '1px solid rgba(26, 54, 93, 0.1)',
                              fontWeight: editingRow === record.id ? 600 : 400
                            }}>
                              {editingRow === record.id ? (
                                <TextField
                                  type="datetime-local"
                                  value={record.startTime}
                                  onChange={(e) => handleRecordChange(record.id, 'startTime', e.target.value)}
                                  size="small"
                                  fullWidth
                                />
                              ) : (
                                <Typography variant="body2">
                                  {record.startTime ? new Date(record.startTime).toLocaleString() : '-'}
                                </Typography>
                              )}
                            </TableCell>
                            
                            {/* End Time */}
                            <TableCell sx={{ 
                              borderBottom: '1px solid rgba(26, 54, 93, 0.1)',
                              fontWeight: editingRow === record.id ? 600 : 400
                            }}>
                              {editingRow === record.id ? (
                                <TextField
                                  type="datetime-local"
                                  value={record.endTime}
                                  onChange={(e) => handleRecordChange(record.id, 'endTime', e.target.value)}
                                  size="small"
                                  fullWidth
                                />
                              ) : (
                                <Typography variant="body2">
                                  {record.endTime ? new Date(record.endTime).toLocaleString() : '-'}
                                </Typography>
                              )}
                            </TableCell>
                            
                            {/* Quality */}
                            <TableCell sx={{ 
                              borderBottom: '1px solid rgba(26, 54, 93, 0.1)'
                            }}>
                              {editingRow === record.id ? (
                                <FormControl fullWidth size="small">
                                  <Select
                                    value={record.quality}
                                    onChange={(e) => handleRecordChange(record.id, 'quality', e.target.value)}
                                  >
                                    {qualityOptions.map((quality) => (
                                      <MenuItem key={quality} value={quality}>{quality}</MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              ) : (
                                <Chip 
                                  label={record.quality}
                                  color={getQualityColor(record.quality) as any}
                                  size="small"
                                />
                              )}
                            </TableCell>
                            
                            {/* Reason */}
                            <TableCell sx={{ 
                              borderBottom: '1px solid rgba(26, 54, 93, 0.1)',
                              fontWeight: editingRow === record.id ? 600 : 400
                            }}>
                              {editingRow === record.id ? (
                                <FormControl fullWidth size="small">
                                  <Select
                                    value={record.reason}
                                    onChange={(e) => handleRecordChange(record.id, 'reason', e.target.value)}
                                    disabled={!record.quality}
                                  >
                                    {record.quality && qualityReasons[record.quality as keyof typeof qualityReasons]?.map((reason) => (
                                      <MenuItem key={reason} value={reason}>{reason}</MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              ) : (
                                <Typography variant="body2">
                                  {record.reason}
                                </Typography>
                              )}
                            </TableCell>
                            
                            {/* User Details */}
                            <TableCell sx={{ 
                              borderBottom: '1px solid rgba(26, 54, 93, 0.1)',
                              fontWeight: 500
                            }}>
                              <Typography variant="body2" sx={{ 
                                color: record.userDetails === currentUser.name ? theme.palette.primary.main : 'inherit',
                                fontWeight: record.userDetails === currentUser.name ? 600 : 400
                              }}>
                                {record.userDetails}
                              </Typography>
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

export default QualityInterface;
