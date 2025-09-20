import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Box
} from '@mui/material';

const MemberCard = ({ member, onClick }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
      onClick={() => onClick(member)}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          sx={{
            width: 64,
            height: 64,
            mb: 2,
            bgcolor: member.status === 'Active' ? 'primary.main' : 'grey.500'
          }}
        >
          {getInitials(member.name)}
        </Avatar>
        <Typography gutterBottom variant="h6" component="h2" align="center">
          {member.name}
        </Typography>
        <Typography color="textSecondary" align="center">
          {member.role}
        </Typography>
        <Chip 
          label={member.status} 
          color={member.status === 'Active' ? 'success' : 'default'}
          size="small"
          sx={{ mt: 1 }}
        />
      </CardContent>
    </Card>
  );
};

export default MemberCard;