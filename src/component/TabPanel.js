import React from 'react';
import { 
  Box, 
  Typography, 
  Fade,
  useTheme,
  keyframes
} from '@mui/material';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  const theme = useTheme();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`member-tabpanel-${index}`}
      aria-labelledby={`member-tab-${index}`}
      {...other}
    >
      <Fade in={value === index} timeout={300}>
        <Box 
          sx={{ 
            p: 3,
            minHeight: 200,
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
            borderRadius: 2,
            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            boxShadow: theme.palette.mode === 'dark' 
              ? '0 4px 20px rgba(0,0,0,0.3)'
              : '0 4px 20px rgba(0,0,0,0.05)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: theme.palette.primary.main,
              borderRadius: '2px 2px 0 0'
            }
          }}
        >
          {value === index && (
            <Box
              sx={{
                animation: `${fadeIn} 0.5s ease-out`
              }}
            >
              <Typography component="div" sx={{ color: 'text.primary' }}>
                {children}
              </Typography>
            </Box>
          )}
        </Box>
      </Fade>
    </div>
  );
};

export default TabPanel;