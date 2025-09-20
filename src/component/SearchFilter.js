import React from 'react';
import { TextField, MenuItem, Box } from '@mui/material';

const SearchFilter = ({ searchTerm, setSearchTerm, roleFilter, setRoleFilter, roles }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
      <TextField
        label="Search by name"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ flexGrow: 1 }}
      />
      <TextField
        select
        label="Filter by role"
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        sx={{ minWidth: 150 }}
      >
        {roles.map(role => (
          <MenuItem key={role} value={role}>
            {role}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default SearchFilter;