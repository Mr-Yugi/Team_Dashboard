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
  CssBaseline
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { members } from '../src/component/data/members';
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Team Dashboard
          </Typography>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
        
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
              <Grid item key={member.id} xs={12} sm={6} md={4}>
                <MemberCard member={member} onClick={handleMemberClick} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" align="center" sx={{ py: 4 }}>
            No team members found matching your criteria.
          </Typography>
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