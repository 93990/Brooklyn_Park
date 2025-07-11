import { AppBar, Container, Toolbar, Box, Typography, IconButton, Avatar, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

interface HeaderProps {
  isDataLoading?: boolean;
  onRefresh?: () => void;
  shiftStatus?: {
    active: boolean;
    shift: string;
    operator: string;
  };
}

const Header = ({ isDataLoading = false, onRefresh, shiftStatus }: HeaderProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <AppBar position="fixed" sx={{ 
      width: '100%',
      maxWidth: '100vw',
      left: 0,
      right: 0,
      zIndex: 1300,
    }}>
      <Container maxWidth="xl" disableGutters>
        <Toolbar sx={{ 
          px: { xs: 2, md: 4 },
          justifyContent: 'space-between',
          height: '100%',
          position: 'relative'
        }}>
          {/* Left Section - Logo and Brand */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            height: '100%',
            position: 'relative'
          }}>
            <Box 
              sx={{ 
                mr: 3,
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: 'linear-gradient(145deg, #1a365d, #2d4a7a)',
                boxShadow: '0 8px 32px rgba(26, 54, 93, 0.4), inset 0 2px 4px rgba(255,255,255,0.2)',
                border: '3px solid #FFD700',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.08) rotate(8deg)',
                  boxShadow: '0 12px 40px rgba(26, 54, 93, 0.6), inset 0 2px 6px rgba(255,255,255,0.3)',
                  border: '3px solid #FFC500'
                },
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, transparent, rgba(255, 215, 0, 0.3), transparent)',
                  animation: 'logoGlow 3s ease-in-out infinite',
                  '@keyframes logoGlow': {
                    '0%, 100%': { opacity: 0, transform: 'scale(1)', filter: 'blur(2px)' },
                    '50%': { opacity: 1, transform: 'scale(1.15)', filter: 'blur(0px)' }
                  }
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 50%)',
                  zIndex: 2
                },
                cursor: 'pointer'
              }}
              onClick={handleLogoClick}
            >
              <img 
                src="/Logoforcat.png" 
                alt="Brooklyne Park CAT Logo" 
                style={{ 
                  width: '70%', 
                  height: '70%', 
                  objectFit: 'contain',
                  filter: 'brightness(1.1) contrast(1.1) drop-shadow(0 2px 6px rgba(0,0,0,0.3))',
                  zIndex: 3,
                  position: 'relative'
                }}
              />
            </Box>
            
            {/* Enhanced Brand Text */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="h5" component="div" sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(45deg, #1a365d, #2d7ff9, #1a365d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '1.4rem',
                letterSpacing: '0.5px',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                mb: 0.2
              }}>
                BROOKLYN PARK 
              </Typography>
              <Typography variant="caption" sx={{ 
                color: 'rgba(26, 54, 93, 0.8)',
                fontWeight: 500,
                fontSize: '0.75rem',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
              </Typography>
            </Box>
          </Box>

          {/* Right Section - Professional Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Refresh Data Button */}
            {onRefresh && (
              <Tooltip title="Refresh Production Data">
                <IconButton 
                  onClick={onRefresh}
                  disabled={isDataLoading}
                  sx={{ 
                    color: '#1a365d',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.3)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    },
                    '&:disabled': {
                      opacity: 0.6
                    }
                  }}
                >
                  <RefreshIcon sx={{ 
                    fontSize: '1.3rem',
                    animation: isDataLoading ? 'spin 1s linear infinite' : 'none',
                    '@keyframes spin': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' }
                    }
                  }} />
                </IconButton>
              </Tooltip>
            )}
            
            {/* User Profile */}
            {shiftStatus && (
              <Tooltip title={`${shiftStatus.operator} - ${shiftStatus.shift} Shift`}>
                <IconButton 
                  sx={{ 
                    color: '#1a365d',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.3)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <Avatar sx={{ 
                    width: 24, 
                    height: 24, 
                    bgcolor: theme.palette.primary.main,
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {shiftStatus.operator.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
