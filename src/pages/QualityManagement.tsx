import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Badge,
  useTheme,
  Card,
  CardContent,
  Grid,
  Fade,
  Slide,
  Alert,
  Divider,
  createTheme,
  ThemeProvider,
  Tooltip
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SecurityIcon from '@mui/icons-material/Security';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import QualityIcon from '@mui/icons-material/HighQuality';

interface RowData {
  model: string;
  partNumber: string;
  startTime: string;
  endTime: string;
  quality: string;
  reason: string;
  userDetails: string;
  isEditing: boolean;
}

const QualityManagement = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  
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
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(26, 54, 93, 0.15)',
              },
              '&.Mui-focused': {
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(26, 54, 93, 0.25)',
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
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
            },
          },
        },
      },
    },
  });
  
  // State variables
  const [filterFromDate, setFilterFromDate] = useState('');
  const [filterToDate, setFilterToDate] = useState('');
  const [shift, setShift] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [notifications] = useState<number>(2);
  
  const [rows, setRows] = useState<RowData[]>([
    {
      model: 'Model A-100',
      partNumber: 'BP-A100-001',
      startTime: '08:00',
      endTime: '16:00',
      quality: 'Pass',
      reason: 'Met all quality specifications',
      userDetails: 'John Doe',
      isEditing: false
    },
    {
      model: 'Model B-200',
      partNumber: 'BP-B200-002',
      startTime: '16:00',
      endTime: '00:00',
      quality: 'Fail',
      reason: 'Surface finish below standard',
      userDetails: 'Jane Smith',
      isEditing: false
    }
  ]);
  
  // Dropdown options
  const models = [
    'Model A-100',
    'Model B-200',
    'Model C-300',
    'Model D-400',
    'Custom Model'
  ];
  
  const shifts = ['Morning', 'Afternoon', 'Night'];
  const qualityOptions = ['Pass', 'Fail', 'Pending Review'];

  useEffect(() => {
    const userData = localStorage.getItem('qualityUser');
    const user = userData ? JSON.parse(userData) : null;
    if (user) {
      setRows(prevRows => prevRows.map(row => ({ ...row, userDetails: user.name })));
    }
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  const handleFilterChange = (event: any) => {
    setShift(event.target.value);
  };

  const handleFilter = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Filter logic would go here
    }, 1000);
  };

  const handleEditToggle = (index: number) => {
    if (editingRow === index) {
      setEditingRow(null);
      setRows(rows.map((row, i) => i === index ? { ...row, isEditing: false } : row));
    } else {
      setEditingRow(index);
      setRows(rows.map((row, i) => i === index ? { ...row, isEditing: true } : { ...row, isEditing: false }));
    }
  };

  const handleRowChange = (index: number, key: keyof RowData, value: any) => {
    setRows(rows.map((row, i) => i === index ? { ...row, [key]: value } : row));
  };

  const handleAddRecord = () => {
    const newRecord: RowData = {
      model: '',
      partNumber: '',
      startTime: '',
      endTime: '',
      quality: 'Pass',
      reason: '',
      userDetails: location.state?.user?.name || 'Current User',
      isEditing: true
    };
    setRows([...rows, newRecord]);
    setEditingRow(rows.length);
  };

  const handleDeleteRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
    if (editingRow === index) {
      setEditingRow(null);
    }
  };

  const getQualityChipColor = (quality: string) => {
    switch (quality) {
      case 'Pass': return 'success';
      case 'Fail': return 'error';
      case 'Pending Review': return 'warning';
      default: return 'default';
    }
  };

  return (
    <ThemeProvider theme={enhancedTheme}>
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
        {/* Header */}
        <AppBar position="fixed" sx={{ 
          background: 'linear-gradient(135deg, #FFC500 0%, #FFD700 50%, #FFC500 100%)',
          boxShadow: '0 4px 20px rgba(255, 197, 0, 0.3)',
          height: 70
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
                      backgroundColor: 'rgba(255,255,255,0.3)',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <QualityIcon sx={{ mr: 1, color: '#1a365d', fontSize: 28 }} />
                  <Typography variant="h6" sx={{ 
                    fontWeight: 700,
                    color: '#1a365d',
                    fontSize: '1.3rem'
                  }}>
                    Quality Management
                  </Typography>
                </Box>
              </Box>
              <Chip 
                label="Quality Control" 
                color="primary" 
                variant="outlined"
                size="small"
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderColor: '#1a365d',
                  color: '#1a365d',
                  fontWeight: 600
                }}
              />
            </Toolbar>
          </Container>
        </AppBar>

        {/* Main Content */}
        <Container 
          component="main" 
          maxWidth="xl" 
          sx={{
            flex: 1,
            pt: 10,
            pb: 3,
            px: { xs: 2, md: 3 },
            display: 'flex',
            flexDirection: 'column',
            minHeight: 'calc(100vh - 70px)'
          }}
        >
          {/* Background overlay */}
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 0
          }} />
          
          <Box sx={{ 
            position: 'relative', 
            zIndex: 1,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Filters Section */}
            <Fade in timeout={800}>
              <Card sx={{ 
                mb: 2, 
                background: 'linear-gradient(135deg, rgba(26, 54, 93, 0.05) 0%, rgba(45, 127, 249, 0.05) 100%)',
                border: '1px solid rgba(26, 54, 93, 0.1)',
                borderRadius: 2
              }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <FilterListIcon sx={{ 
                      mr: 1, 
                      color: theme.palette.primary.main,
                      fontSize: 24
                    }} />
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      color: theme.palette.primary.main
                    }}>
                      Quality Data Filters
                    </Typography>
                  </Box>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={2.4}>
                      <TextField
                        label="From Date"
                        type="date"
                        value={filterFromDate}
                        onChange={(e) => setFilterFromDate(e.target.value)}
                        fullWidth
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                      <TextField
                        label="To Date"
                        type="date"
                        value={filterToDate}
                        onChange={(e) => setFilterToDate(e.target.value)}
                        fullWidth
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Model</InputLabel>
                        <Select
                          value={selectedModel}
                          label="Model"
                          onChange={(e) => setSelectedModel(e.target.value)}
                        >
                          <MenuItem value="">All Models</MenuItem>
                          {models.map((model) => (
                            <MenuItem key={model} value={model}>{model}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Shift</InputLabel>
                        <Select
                          value={shift}
                          label="Shift"
                          onChange={handleFilterChange}
                        >
                          <MenuItem value="">All Shifts</MenuItem>
                          {shifts.map((s) => (
                            <MenuItem key={s} value={s}>{s}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
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
                        }}>Quality Status</TableCell>
                        <TableCell sx={{ 
                          fontWeight: 700,
                          backgroundColor: 'rgba(26, 54, 93, 0.08)',
                          color: theme.palette.primary.main,
                          borderBottom: `2px solid ${theme.palette.primary.main}`
                        }}>Reason/Notes</TableCell>
                        <TableCell sx={{ 
                          fontWeight: 700,
                          backgroundColor: 'rgba(26, 54, 93, 0.08)',
                          color: theme.palette.primary.main,
                          borderBottom: `2px solid ${theme.palette.primary.main}`
                        }}>Inspector</TableCell>
                        {isEditMode && (
                          <TableCell sx={{ 
                            fontWeight: 700,
                            backgroundColor: 'rgba(26, 54, 93, 0.08)',
                            color: theme.palette.primary.main,
                            borderBottom: `2px solid ${theme.palette.primary.main}`
                          }}>Actions</TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => (
                        <TableRow 
                          key={index}
                          sx={{
                            '&:hover': {
                              backgroundColor: 'rgba(26, 54, 93, 0.04)',
                              transform: 'scale(1.01)',
                              transition: 'all 0.2s ease-in-out'
                            },
                            borderLeft: row.isEditing ? `4px solid ${theme.palette.warning.main}` : 'none'
                          }}
                        >
                          <TableCell>
                            {row.isEditing ? (
                              <Select
                                value={row.model}
                                onChange={(e) => handleRowChange(index, 'model', e.target.value)}
                                size="small"
                                fullWidth
                              >
                                {models.map(model => (
                                  <MenuItem key={model} value={model}>{model}</MenuItem>
                                ))}
                              </Select>
                            ) : (
                              <Typography variant="body2" fontWeight={500}>
                                {row.model}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            {row.isEditing ? (
                              <TextField
                                value={row.partNumber}
                                onChange={(e) => handleRowChange(index, 'partNumber', e.target.value)}
                                size="small"
                                fullWidth
                              />
                            ) : (
                              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                {row.partNumber}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            {row.isEditing ? (
                              <TextField
                                type="time"
                                value={row.startTime}
                                onChange={(e) => handleRowChange(index, 'startTime', e.target.value)}
                                size="small"
                                fullWidth
                              />
                            ) : (
                              <Typography variant="body2">
                                {row.startTime}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            {row.isEditing ? (
                              <TextField
                                type="time"
                                value={row.endTime}
                                onChange={(e) => handleRowChange(index, 'endTime', e.target.value)}
                                size="small"
                                fullWidth
                              />
                            ) : (
                              <Typography variant="body2">
                                {row.endTime}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            {row.isEditing ? (
                              <Select
                                value={row.quality}
                                onChange={(e) => handleRowChange(index, 'quality', e.target.value)}
                                size="small"
                                fullWidth
                              >
                                {qualityOptions.map(q => (
                                  <MenuItem key={q} value={q}>{q}</MenuItem>
                                ))}
                              </Select>
                            ) : (
                              <Chip 
                                label={row.quality}
                                color={getQualityChipColor(row.quality) as any}
                                size="small"
                                icon={row.quality === 'Pass' ? <CheckCircleIcon /> : undefined}
                                sx={{ fontWeight: 600 }}
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            {row.isEditing ? (
                              <TextField
                                value={row.reason}
                                onChange={(e) => handleRowChange(index, 'reason', e.target.value)}
                                size="small"
                                fullWidth
                                multiline
                                rows={1}
                              />
                            ) : (
                              <Typography variant="body2" sx={{ 
                                maxWidth: 200,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}>
                                <Tooltip title={row.reason} arrow>
                                  <span>{row.reason}</span>
                                </Tooltip>
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
                              {row.userDetails}
                            </Typography>
                          </TableCell>
                          {isEditMode && (
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                {row.isEditing ? (
                                  <Tooltip title="Save Changes">
                                    <Button
                                      onClick={() => handleEditToggle(index)}
                                      size="small"
                                      variant="contained"
                                      color="success"
                                      sx={{ minWidth: 'auto', p: 1 }}
                                    >
                                      <SaveIcon fontSize="small" />
                                    </Button>
                                  </Tooltip>
                                ) : (
                                  <Tooltip title="Edit Record">
                                    <Button
                                      onClick={() => handleEditToggle(index)}
                                      size="small"
                                      variant="outlined"
                                      color="primary"
                                      sx={{ minWidth: 'auto', p: 1 }}
                                    >
                                      <EditIcon fontSize="small" />
                                    </Button>
                                  </Tooltip>
                                )}
                                <Tooltip title="Delete Record">
                                  <Button
                                    onClick={() => handleDeleteRow(index)}
                                    size="small"
                                    variant="outlined"
                                    color="error"
                                    sx={{ minWidth: 'auto', p: 1 }}
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </Button>
                                </Tooltip>
                              </Box>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Fade>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default QualityManagement;

