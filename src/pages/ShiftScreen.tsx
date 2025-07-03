import { 
  Button, 
  Container, 
  Typography, 
  Box, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { useState } from 'react';

const ShiftScreen = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingShift, setEditingShift] = useState<any>(null);

  // Mock data
  const shifts = [
    { id: 1, name: 'Morning', startTime: '06:00', endTime: '14:00' },
    { id: 2, name: 'Afternoon', startTime: '14:00', endTime: '22:00' },
    { id: 3, name: 'Night', startTime: '22:00', endTime: '06:00' },
  ];

  const handleAddShift = () => {
    setEditingShift({ id: null, name: '', startTime: '', endTime: '' });
    setOpenDialog(true);
  };

  const handleEditShift = (shift: any) => {
    setEditingShift(shift);
    setOpenDialog(true);
  };

  const handleDeleteShift = (id: number) => {
    // Mock delete
    console.log('Deleted shift with id:', id);
  };

  const handleSaveShift = () => {
    // Mock save
    console.log('Saved shift:', editingShift);
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Shift Management
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Button variant="contained" onClick={handleAddShift}>
            Add Shift
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Shift Name</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shifts.map((shift) => (
                <TableRow key={shift.id}>
                  <TableCell>{shift.name}</TableCell>
                  <TableCell>{shift.startTime}</TableCell>
                  <TableCell>{shift.endTime}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => handleEditShift(shift)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => handleDeleteShift(shift.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editingShift?.id ? 'Edit Shift' : 'Add New Shift'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Shift Name"
              value={editingShift?.name || ''}
              onChange={(e) => setEditingShift({...editingShift, name: e.target.value})}
            />
            <TextField
              label="Start Time"
              type="time"
              value={editingShift?.startTime || ''}
              onChange={(e) => setEditingShift({...editingShift, startTime: e.target.value})}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Time"
              type="time"
              value={editingShift?.endTime || ''}
              onChange={(e) => setEditingShift({...editingShift, endTime: e.target.value})}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveShift}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ShiftScreen;
