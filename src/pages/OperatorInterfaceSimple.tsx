import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OperatorInterfaceSimple = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: '#f5f5f5'
    }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 4, color: '#1a365d' }}>
          ✅ Data Entry Interface
        </Typography>
        
        <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
          The page is loading successfully!
        </Typography>

        <Box sx={{ 
          backgroundColor: 'white',
          p: 4,
          borderRadius: 2,
          boxShadow: 2,
          mb: 4
        }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            🎯 This confirms the navigation works
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            If you can see this page, the routing is working correctly.
            The black screen was likely caused by a component error.
          </Typography>

          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/operator-input')}
            sx={{ mr: 2 }}
          >
            Back to Machine Selection
          </Button>

          <Button 
            variant="outlined" 
            size="large"
            onClick={() => navigate('/')}
          >
            Home
          </Button>
        </Box>

        <Box sx={{ 
          backgroundColor: '#e3f2fd',
          p: 3,
          borderRadius: 2,
          border: '1px solid #2196f3'
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
            Next Steps:
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'left' }}>
            1. ✅ Navigation is working<br/>
            2. ✅ Page routing is functional<br/>
            3. 🔧 Now we need to fix the complex component<br/>
            4. 🚀 Then add your data entry features
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default OperatorInterfaceSimple;
