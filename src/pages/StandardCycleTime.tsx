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

const StandardCycleTime = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCycle, setEditingCycle] = useState<any>(null);

  // Mock data
  const cycles = [
    { id: 1, model: 'Model A', operation: 'Assembly', standardTime: '120', units: 'seconds' },
    { id: 2, model: 'Model B', operation: 'Testing', standardTime: '90', units: 'seconds' },
    { id: 3, model: 'Model C', operation: 'Packaging', standardTime: '60', units: 'seconds' },
  ];

  const handleAddCycle = () => {
    setEditingCycle({ id: null, model: '', operation: '', standardTime: '', units: 'seconds' });
    setOpenDialog(true);
  };

  const handleEditCycle = (cycle: any) => {
    setEditingCycle(cycle);
    setOpenDialog(true);
  };

  const handleDeleteCycle = (id: number) => {
    // Mock delete
    console.log('Deleted cycle with id:', id);
  };

  const handleSaveCycle = () => {
    // Mock save
    console.log('Saved cycle:', editingCycle);
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Standard Cycle Times
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Button variant="contained" onClick={handleAddCycle}>
            Add Cycle Time
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Model</TableCell>
                <TableCell>Operation</TableCell>
                <TableCell>Standard Time</TableCell>
                <TableCell>Units</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cycles.map((cycle) => (
                <TableRow key={cycle.id}>
                  <TableCell>{cycle.model}</TableCell>
                  <TableCell>{cycle.operation}</TableCell>
                  <TableCell>{cycle.standardTime}</TableCell>
                  <TableCell>{cycle.units}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => handleEditCycle(cycle)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => handleDeleteCycle(cycle.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editingCycle?.id ? 'Edit Cycle Time' : 'Add New Cycle Time'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Model"
              value={editingCycle?.model || ''}
              onChange={(e) => setEditingCycle({...editingCycle, model: e.target.value})}
            />
            <TextField
              label="Operation"
              value={editingCycle?.operation || ''}
              onChange={(e) => setEditingCycle({...editingCycle, operation: e.target.value})}
            />
            <TextField
              label="Standard Time"
              type="number"
              value={editingCycle?.standardTime || ''}
              onChange={(e) => setEditingCycle({...editingCycle, standardTime: e.target.value})}
            />
            <TextField
              label="Units"
              value={editingCycle?.units || ''}
              onChange={(e) => setEditingCycle({...editingCycle, units: e.target.value})}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveCycle}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StandardCycleTime;
