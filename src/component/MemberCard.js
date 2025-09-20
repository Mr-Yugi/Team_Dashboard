import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Box,
  Stack
} from '@mui/material';
import { 
  Code, 
  Palette, 
  BusinessCenter,
  Circle
} from '@mui/icons-material';

const MemberCard = ({ member, onClick }) => {
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
        return <Code sx={{ fontSize: 18 }} />;
      case 'Designer':
        return <Palette sx={{ fontSize: 18 }} />;
      case 'Manager':
        return <BusinessCenter sx={{ fontSize: 18 }} />;
      default:
        return <BusinessCenter sx={{ fontSize: 18 }} />;
    }
  };

  // Get gradient based on role
  const getCardGradient = (role) => {
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

  return (
    <Card 
      sx={{ 
        height: 280, // Fixed height
        width: 260,  // Fixed width
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        borderRadius: 3,
        overflow: 'hidden',
        background: getCardGradient(member.role),
        color: 'white',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          '& .member-actions': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        }
      }}
      onClick={() => onClick(member)}
    >
      {/* Status indicator */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: 16,
          right: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5
        }}
      >
        <Circle 
          sx={{ 
            fontSize: 12,
            color: member.status === 'Active' ? '#4caf50' : '#9e9e9e'
          }} 
        />
        <Chip 
          label={member.status} 
          size="small"
          sx={{ 
            backgroundColor: member.status === 'Active' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(158, 158, 158, 0.2)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            fontWeight: 600,
            fontSize: '0.7rem'
          }}
        />
      </Box>

      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        textAlign: 'center'
      }}>
        {/* Avatar with shadow */}
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mb: 2,
            border: '3px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            fontSize: '1.8rem',
            fontWeight: 'bold'
          }}
        >
          {getInitials(member.name)}
        </Avatar>

        {/* Name with better typography */}
        <Typography 
          variant="h6" 
          component="h3" 
          sx={{ 
            fontWeight: 700,
            mb: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          {member.name}
        </Typography>

        {/* Role with icon */}
        <Stack 
          direction="row" 
          alignItems="center" 
          spacing={1}
          sx={{ 
            mb: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            px: 2,
            py: 0.5,
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          {getRoleIcon(member.role)}
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            {member.role}
          </Typography>
        </Stack>

        {/* Project count */}
        <Typography 
          variant="caption" 
          sx={{ 
            opacity: 0.9,
            fontSize: '0.8rem',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            px: 2,
            py: 0.5,
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {member.projects.length} Project{member.projects.length !== 1 ? 's' : ''}
        </Typography>
      </CardContent>

      {/* Hover action overlay */}
      <Box 
        className="member-actions"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 2,
          opacity: 0,
          transform: 'translateY(20px)',
          transition: 'all 0.3s ease-in-out',
          textAlign: 'center'
        }}
      >
        <Typography variant="caption" sx={{ color: 'white', fontWeight: 600 }}>
          Click to view details
        </Typography>
      </Box>
    </Card>
  );
};

export default MemberCard;