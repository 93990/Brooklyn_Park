import { Button, Container, Typography, Box, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock authentication
    if (username && passcode) {
      navigate('/quality');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Quality Team Login
        </Typography>

        <Box 
          component="form" 
          sx={{ mt: 4, width: '100%' }}
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Passcode"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            disabled={!username || !passcode}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginScreen;
