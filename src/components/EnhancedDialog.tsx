import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  useTheme,
  Slide,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const Transition = React.forwardRef(function Transition(
  props: React.ComponentProps<typeof Slide> & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface EnhancedDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  mode: 'add' | 'edit' | 'delete';
  title: string;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  saveButtonText?: string;
  cancelButtonText?: string;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}

const EnhancedDialog: React.FC<EnhancedDialogProps> = ({
  open,
  onClose,
  onSave,
  mode,
  title,
  children,
  maxWidth = 'sm',
  saveButtonText,
  cancelButtonText = 'Cancel',
  color = 'primary'
}) => {
  const theme = useTheme();

  const getColorGradient = () => {
    switch (color) {
      case 'primary':
        return 'linear-gradient(135deg, #1a365d, #2d4a7a)';
      case 'success':
        return 'linear-gradient(135deg, #10b981, #059669)';
      case 'error':
        return 'linear-gradient(135deg, #ef4444, #dc2626)';
      case 'warning':
        return 'linear-gradient(135deg, #f59e0b, #d97706)';
      case 'info':
        return 'linear-gradient(135deg, #3b82f6, #2563eb)';
      default:
        return 'linear-gradient(135deg, #1a365d, #2d4a7a)';
    }
  };

  const getModeIcon = () => {
    switch (mode) {
      case 'add':
        return <AddIcon sx={{ fontSize: '1.2rem' }} />;
      case 'edit':
        return <EditIcon sx={{ fontSize: '1.2rem' }} />;
      case 'delete':
        return <DeleteIcon sx={{ fontSize: '1.2rem' }} />;
      default:
        return <SaveIcon sx={{ fontSize: '1.2rem' }} />;
    }
  };

  const getDefaultSaveButtonText = () => {
    if (saveButtonText) return saveButtonText;
    switch (mode) {
      case 'add':
        return 'Add';
      case 'edit':
        return 'Update';
      case 'delete':
        return 'Delete';
      default:
        return 'Save';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 4,
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)'
          }
        }
      }}
    >
      {/* Enhanced Header */}
      <DialogTitle
        sx={{
          background: getColorGradient(),
          color: 'white',
          p: 0,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent, rgba(255, 255, 255, 0.1))',
            animation: 'shimmer 3s ease-in-out infinite',
            '@keyframes shimmer': {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(100%)' }
            }
          }
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 3,
          position: 'relative',
          zIndex: 1
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
              }
            }}>
              {getModeIcon()}
            </Box>
            <Box>
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  mb: 0.5,
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
              >
                {title}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  opacity: 0.9,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: 500
                }}
              >
                {mode === 'add' && 'Create New Record'}
                {mode === 'edit' && 'Modify Existing Record'}
                {mode === 'delete' && 'Remove Record'}
              </Typography>
            </Box>
          </Box>
          
          <IconButton
            onClick={onClose}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.05)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider sx={{ 
        background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent)',
        height: '1px'
      }} />

      {/* Enhanced Content */}
      <DialogContent 
        sx={{ 
          p: 4,
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95))',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 20,
            right: 20,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)'
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {children}
        </Box>
      </DialogContent>

      <Divider sx={{ 
        background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent)',
        height: '1px'
      }} />

      {/* Enhanced Actions */}
      <DialogActions 
        sx={{ 
          p: 3,
          background: 'rgba(248, 250, 252, 0.8)',
          backdropFilter: 'blur(10px)',
          gap: 2,
          position: 'relative'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          width: '100%',
          justifyContent: 'flex-end'
        }}>
          <Button
            onClick={onClose}
            startIcon={<CancelIcon />}
            variant="outlined"
            sx={{
              borderColor: theme.palette.grey[300],
              color: theme.palette.grey[700],
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              px: 3,
              py: 1.5,
              fontWeight: 600,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: theme.palette.grey[400],
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            {cancelButtonText}
          </Button>
          
          <Button
            onClick={onSave}
            startIcon={mode === 'delete' ? <DeleteIcon /> : <SaveIcon />}
            variant="contained"
            sx={{
              background: mode === 'delete' 
                ? 'linear-gradient(45deg, #ef4444, #dc2626)'
                : getColorGradient(),
              color: 'white',
              borderRadius: 2,
              px: 3,
              py: 1.5,
              fontWeight: 600,
              boxShadow: mode === 'delete'
                ? '0 4px 20px rgba(239, 68, 68, 0.3)'
                : `0 4px 20px ${theme.palette[color]?.main || theme.palette.primary.main}40`,
              transition: 'all 0.3s ease',
              '&:hover': {
                background: mode === 'delete'
                  ? 'linear-gradient(45deg, #dc2626, #ef4444)'
                  : getColorGradient(),
                transform: 'translateY(-2px)',
                boxShadow: mode === 'delete'
                  ? '0 6px 25px rgba(239, 68, 68, 0.4)'
                  : `0 6px 25px ${theme.palette[color]?.main || theme.palette.primary.main}50`,
                filter: 'brightness(1.05)'
              },
              '&:active': {
                transform: 'translateY(0px)'
              }
            }}
          >
            {getDefaultSaveButtonText()}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EnhancedDialog;
