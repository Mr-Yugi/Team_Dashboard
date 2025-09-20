import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  Avatar,
  Typography,
  IconButton,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme
} from '@mui/material';
import { 
  Close, 
  Email, 
  Description, 
  Code, 
  Palette, 
  BusinessCenter,
  Circle,
  Work
} from '@mui/icons-material';
import TabPanel from './TabPanel';

const MemberModal = ({ member, open, onClose, tabValue, handleTabChange }) => {
  const theme = useTheme();
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  // Get role icon
  const getRoleIcon = (role) => {
    switch(role) {
      case 'Developer':
        return <Code sx={{ fontSize: 20 }} />;
      case 'Designer':
        return <Palette sx={{ fontSize: 20 }} />;
      case 'Manager':
        return <BusinessCenter sx={{ fontSize: 20 }} />;
      default:
        return <BusinessCenter sx={{ fontSize: 20 }} />;
    }
  };

  // Get gradient based on role
  const getGradient = (role) => {
    switch(role) {
      case 'Developer':
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'Designer':
        return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      case 'Manager':
        return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
      default:
        return 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)';
    }
  };

  if (!member) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }
      }}
    >
      {/* Header with gradient background */}
      <Box
        sx={{
          background: getGradient(member.role),
          color: 'white',
          position: 'relative',
          p: 3,
          pt: 4
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.3)'
            }
          }}
        >
          <Close />
        </IconButton>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mr: 3,
              border: '3px solid rgba(255, 255, 255, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              fontSize: '2rem',
              fontWeight: 'bold'
            }}
          >
            {getInitials(member.name)}
          </Avatar>
          
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {member.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
              <Chip 
                icon={getRoleIcon(member.role)}
                label={member.role}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  fontWeight: 600
                }}
              />
              
              <Chip 
                icon={<Circle sx={{ fontSize: 12 }} />}
                label={member.status}
                sx={{ 
                  backgroundColor: member.status === 'Active' 
                    ? 'rgba(76, 175, 80, 0.3)' 
                    : 'rgba(158, 158, 158, 0.3)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  fontWeight: 600
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        {/* Custom Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                py: 2,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none'
              },
              '& .Mui-selected': {
                color: theme.palette.primary.main
              }
            }}
          >
            <Tab icon={<Description sx={{ mb: 0.5 }} />} iconPosition="start" label="Profile" />
            <Tab icon={<Work sx={{ mb: 0.5 }} />} iconPosition="start" label="Projects" />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 3 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                mb: 3, 
                borderRadius: 2,
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(0, 0, 0, 0.03)'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Description sx={{ mr: 1, color: 'primary.main' }} />
                Bio
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                "{member.bio}"
              </Typography>
            </Paper>
            
            <List disablePadding>
              <ListItem>
                <ListItemIcon>
                  <Email color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Email" 
                  secondary={member.email}
                  secondaryTypographyProps={{ 
                    sx: { 
                      color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                      fontSize: '1rem'
                    } 
                  }}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemIcon>
                  <Work color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Project Count" 
                  secondary={member.projects.length}
                  secondaryTypographyProps={{ 
                    sx: { 
                      color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                      fontSize: '1rem'
                    } 
                  }}
                />
              </ListItem>
            </List>
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Work sx={{ mr: 1, color: 'primary.main' }} />
              Projects ({member.projects.length})
            </Typography>
            
            {member.projects.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {member.projects.map((project, index) => (
                  <Paper 
                    key={index}
                    elevation={1}
                    sx={{ 
                      p: 2.5, 
                      borderRadius: 2,
                      borderLeft: `4px solid ${theme.palette.primary.main}`,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateX(4px)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        backgroundColor: theme.palette.primary.main,
                        mr: 2,
                        flexShrink: 0
                      }} />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {project}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', py: 4 }}>
                No projects assigned to this team member.
              </Typography>
            )}
          </Box>
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};

export default MemberModal;