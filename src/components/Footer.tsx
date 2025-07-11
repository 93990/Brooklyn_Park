import { Box, Typography, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();
  
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: 2,
        px: { xs: 2, md: 4 },
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      }}
    >
      <Container maxWidth="xl" disableGutters sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography variant="body2" sx={{
          fontSize: '0.875rem',
          fontWeight: 400,
          opacity: 0.9
        }}>
          © {new Date().getFullYear()} Brooklyne Park CAT. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
