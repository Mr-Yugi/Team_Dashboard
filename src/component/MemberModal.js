import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  AppBar,
  Tabs,
  Tab,
  Box,
  Avatar,
  Typography,
  IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';
import TabPanel from './TabPanel';

const MemberModal = ({ member, open, onClose, tabValue, handleTabChange }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  if (!member) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              mr: 2,
              bgcolor: member.status === 'Active' ? 'primary.main' : 'grey.500'
            }}
          >
            {getInitials(member.name)}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{member.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {member.role} • {member.status}
            </Typography>
          </Box>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: 'text.secondary' }}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <AppBar position="static" color="default" elevation={0}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Profile" />
            <Tab label="Projects" />
          </Tabs>
        </AppBar>
        <TabPanel value={tabValue} index={0}>
          <Typography variant="body1" paragraph>
            <strong>Email:</strong> {member.email}
          </Typography>
          <Typography variant="body1">
            <strong>Bio:</strong> {member.bio}
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Projects ({member.projects.length})
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            {member.projects.map((project, index) => (
              <Typography component="li" key={index} variant="body1">
                {project}
              </Typography>
            ))}
          </Box>
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};

export default MemberModal;
