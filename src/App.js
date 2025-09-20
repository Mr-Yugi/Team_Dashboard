import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  IconButton,
  Box,
  useTheme,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Card,
  CardContent,
  Chip,
  AvatarGroup,
  Avatar,
  LinearProgress
} from '@mui/material';
import { Brightness4, Brightness7, Groups, Engineering, DesignServices, ManageAccounts } from '@mui/icons-material';
import { members } from './component/data/members';
import MemberCard from './component/MemberCard';
import SearchFilter from './component/SearchFilter';
import MemberModal from './component/MemberModal';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedMember, setSelectedMember] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
    typography: {
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 600,
      },
    },
  });

  // Filter members based on search term and role filter
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setTabValue(0);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Get unique roles for filter dropdown
  const roles = ['All', ...new Set(members.map(member => member.role))];

  // Calculate team statistics for header card
  const activeMembers = members.filter(member => member.status === 'Active').length;
  const inactiveMembers = members.filter(member => member.status === 'Inactive').length;
  const developers = members.filter(member => member.role === 'Developer').length;
  const designers = members.filter(member => member.role === 'Designer').length;
  const managers = members.filter(member => member.role === 'Manager').length;

  // Get member avatars for header
  const memberAvatars = members.slice(0, 5).map(member => ({
    name: member.name,
    role: member.role,
    initials: member.name.split(' ').map(n => n[0]).join('').toUpperCase()
  }));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header Section with Stats Card */}
        <Card 
          sx={{ 
            mb: 4, 
            background: darkMode 
              ? 'linear-gradient(135deg, #2c387e 0%, #283593 50%, #1a237e 100%)' 
              : 'linear-gradient(135deg, #3f51b5 0%, #3949ab 50%, #303f9f 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: 3,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Box sx={{ p: 4, position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Box>
                <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'white' }}>
                  Team Dashboard
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
                  Manage your team members efficiently
                </Typography>
              </Box>
              <IconButton onClick={toggleDarkMode} sx={{ color: 'white' }}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                  <Chip 
                    icon={<Groups style={{ color: 'white' }} />} 
                    label={`${members.length} Total Members`} 
                    variant="outlined" 
                    sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} 
                  />
                  <Chip 
                    label={`${activeMembers} Active`} 
                    variant="outlined" 
                    sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} 
                  />
                  <Chip 
                    label={`${inactiveMembers} Inactive`} 
                    variant="outlined" 
                    sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} 
                  />
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
                    Team Composition
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Engineering sx={{ fontSize: 20, mr: 1, opacity: 0.8, color: 'white' }} />
                    <Box sx={{ flexGrow: 1, mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(developers / members.length) * 100} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: 'white'
                          }
                        }} 
                      />
                    </Box>
                    <Typography variant="body2" sx={{ minWidth: 40, color: 'white' }}>
                      {developers}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <DesignServices sx={{ fontSize: 20, mr: 1, opacity: 0.8, color: 'white' }} />
                    <Box sx={{ flexGrow: 1, mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(designers / members.length) * 100} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: 'white'
                          }
                        }} 
                      />
                    </Box>
                    <Typography variant="body2" sx={{ minWidth: 40, color: 'white' }}>
                      {designers}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <ManageAccounts sx={{ fontSize: 20, mr: 1, opacity: 0.8, color: 'white' }} />
                    <Box sx={{ flexGrow: 1, mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(managers / members.length) * 100} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: 'white'
                          }
                        }} 
                      />
                    </Box>
                    <Typography variant="body2" sx={{ minWidth: 40, color: 'white' }}>
                      {managers}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-end' } }}>
                  <Typography variant="body2" sx={{ mb: 2, opacity: 0.9, color: 'white' }}>
                    Recent Team Members
                  </Typography>
                  <AvatarGroup max={6} sx={{ justifyContent: 'flex-end' }}>
                    {memberAvatars.map((member, index) => (
                      <Avatar 
                        key={index}
                        sx={{ 
                          width: 56, 
                          height: 56, 
                          border: '2px solid white',
                          bgcolor: index % 2 === 0 ? 'secondary.main' : 'primary.light'
                        }}
                      >
                        {member.initials}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  
                  <Card 
                    sx={{ 
                      mt: 3, 
                      p: 2, 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="body2" sx={{ fontStyle: 'italic', textAlign: 'center', color: 'white' }}>
                      "Great things in business are never done by one person. They're done by a team of people."
                    </Typography>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Card>
        
        {/* Search and Filter Section */}
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          roles={roles}
        />

        {/* Members Grid */}
        {filteredMembers.length > 0 ? (
          <Grid container spacing={3}>
            {filteredMembers.map(member => (
              <Grid item key={member.id} xs={12} sm={6} md={4} lg={3}>
                <MemberCard member={member} onClick={handleMemberClick} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Card sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">
              No team members found matching your criteria.
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Try adjusting your search or filter parameters.
            </Typography>
          </Card>
        )}

        <MemberModal
          member={selectedMember}
          open={!!selectedMember}
          onClose={handleCloseModal}
          tabValue={tabValue}
          handleTabChange={handleTabChange}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;