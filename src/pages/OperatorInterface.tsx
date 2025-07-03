import { Button, Container, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useState } from 'react';

const OperatorInterface = () => {
  const [machine, setMachine] = useState('');
  const [model, setModel] = useState('');

  const machines = ['Machine 1', 'Machine 2', 'Machine 3'];
  const models = ['Model A', 'Model B', 'Model C'];

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Operator Interface
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Machine</InputLabel>
            <Select
              value={machine}
              label="Machine"
              onChange={(e) => setMachine(e.target.value)}
            >
              {machines.map((m) => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Model</InputLabel>
            <Select
              value={model}
              label="Model"
              onChange={(e) => setModel(e.target.value)}
            >
              {models.map((m) => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button 
            variant="contained" 
            size="large"
            disabled={!machine || !model}
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default OperatorInterface;
