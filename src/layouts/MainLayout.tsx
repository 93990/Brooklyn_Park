import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { commonStyles } from '../theme/AppTheme';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box sx={{
      ...commonStyles.pageContainer,
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 30%, #f1f5f9 100%)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(/bgformain.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        opacity: 0.05,
        zIndex: -2
      }
    }}>
      <Header />
      <Box sx={{ 
        position: 'relative',
        zIndex: 1,
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
