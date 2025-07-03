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

const OperatorInput = () => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [shift, setShift] = useState('');
  const [editingRow, setEditingRow] = useState<number | null>(null);

  const shifts = ['Morning', 'Afternoon', 'Night'];
  const downtimeTypes = ['Mechanical', 'Electrical', 'Operational'];
  const downtimeReasons = ['Breakdown', 'Maintenance', 'Setup'];

  // Mock data
  const rows = [
    { id: 1, date: '2023-05-01', shift: 'Morning', type: 'Mechanical', reason: 'Breakdown', details: 'Motor failure' },
    { id: 2, date: '2023-05-02', shift: 'Afternoon', type: 'Electrical', reason: 'Maintenance', details: 'Wiring check' },
    { id: 3, date: '2023-05-03', shift: 'Night', type: 'Operational', reason: 'Setup', details: 'Changeover' },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Operator Input
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
                <TableCell>Downtime Type</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.shift}</TableCell>
                  <TableCell>
                    {editingRow === row.id ? (
                      <FormControl fullWidth size="small">
                        <Select
                          value={row.type}
                          onChange={(e) => console.log(e.target.value)}
                        >
                          {downtimeTypes.map((t) => (
                            <MenuItem key={t} value={t}>{t}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      row.type
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow === row.id ? (
                      <FormControl fullWidth size="small">
                        <Select
                          value={row.reason}
                          onChange={(e) => console.log(e.target.value)}
                        >
                          {downtimeReasons.map((r) => (
                            <MenuItem key={r} value={r}>{r}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      row.reason
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow === row.id ? (
                      <TextField 
                        size="small" 
                        defaultValue={row.details} 
                        onChange={(e) => console.log(e.target.value)}
                      />
                    ) : (
                      row.details
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow === row.id ? (
                      <>
                        <Button size="small" onClick={() => setEditingRow(null)}>Save</Button>
                        <Button size="small" onClick={() => setEditingRow(null)}>Cancel</Button>
                      </>
                    ) : (
                      <Button size="small" onClick={() => setEditingRow(row.id)}>Edit</Button>
                    )}
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

export default OperatorInput;
