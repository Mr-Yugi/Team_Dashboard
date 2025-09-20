import React from 'react';
import {
  TextField,
  MenuItem,
  Box,
  Paper,
  InputAdornment,
  Chip,
  useTheme,
  Fade,
  Typography,
  IconButton
} from '@mui/material';
import {
  Search,
  FilterList,
  Clear
} from '@mui/icons-material';

const SearchFilter = ({ searchTerm, setSearchTerm, roleFilter, setRoleFilter, roles }) => {
  const theme = useTheme();
  
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleClearFilter = () => {
    setRoleFilter('All');
  };

  return (
    <Paper 
      elevation={2}
      sx={{ 
        p: 3, 
        mb: 4,
        borderRadius: 3,
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(to right, #2c387e, #283593)' 
          : 'linear-gradient(to right, #f3f4f6, #e5e7eb)',
        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 2,
          gap: 1
        }}
      >
        <FilterList color="primary" />
        <Box>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            Filter Team Members
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Find specific team members by name or role
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' }
      }}>
        {/* Search Input */}
        <TextField
          placeholder="Search team members..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            flexGrow: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              },
              '&.Mui-focused': {
                boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`
              }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="primary" />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleClearSearch}
                  sx={{ color: 'text.secondary' }}
                >
                  <Clear fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        
        {/* Role Filter */}
        <TextField
          select
          label="Filter by role"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          sx={{ 
            minWidth: 180,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              },
              '&.Mui-focused': {
                boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`
              }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterList color="primary" fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: roleFilter !== 'All' && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleClearFilter}
                  sx={{ color: 'text.secondary' }}
                >
                  <Clear fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }}
        >
          {roles.map(role => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      
      {/* Active filters indicator */}
      <Fade in={searchTerm || roleFilter !== 'All'}>
        <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
          {searchTerm && (
            <Chip
              label={`Search: "${searchTerm}"`}
              onDelete={handleClearSearch}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          {roleFilter !== 'All' && (
            <Chip
              label={`Role: ${roleFilter}`}
              onDelete={handleClearFilter}
              size="small"
              color="secondary"
              variant="outlined"
            />
          )}
        </Box>
      </Fade>
    </Paper>
  );
};

export default SearchFilter;