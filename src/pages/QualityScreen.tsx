import { 
  Button, 
  Container, 
  Typography, 
  Box, 
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';

const QualityScreen = () => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [shift, setShift] = useState('');
  const [quality, setQuality] = useState('');

  const shifts = ['Morning', 'Afternoon', 'Night'];
  const qualityOptions = ['Pass', 'Fail', 'Pending'];

  // Mock data
  const rows = [
    { id: 1, date: '2023-05-01', shift: 'Morning', user: 'John Doe', quality: 'Pass', reason: 'Met all specs' },
    { id: 2, date: '2023-05-02', shift: 'Afternoon', user: 'Jane Smith', quality: 'Fail', reason: 'Dimensional issue' },
    { id: 3, date: '2023-05-03', shift: 'Night', user: 'Mike Johnson', quality: 'Pending', reason: 'Awaiting test' },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Quality Screen
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <DatePicker
            label="From Date"
            value={fromDate}
            onChange={(newValue) => setFromDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="To Date"
            value={toDate}
            onChange={(newValue) => setToDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Shift</InputLabel>
            <Select
              value={shift}
              label="Shift"
              onChange={(e) => setShift(e.target.value)}
            >
              {shifts.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Shift</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Quality</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.shift}</TableCell>
                  <TableCell>{row.user}</TableCell>
                  <TableCell>
                    <FormControl fullWidth size="small">
                      <Select
                        value={row.quality}
                        onChange={(e) => setQuality(e.target.value)}
                      >
                        {qualityOptions.map((q) => (
                          <MenuItem key={q} value={q}>{q}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <TextField 
                      size="small" 
                      defaultValue={row.reason} 
                      onChange={(e) => console.log(e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="contained">Save</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default QualityScreen;
