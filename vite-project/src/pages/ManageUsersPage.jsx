import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Grid,
  Chip,
} from '@mui/material';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user: authUser } = useSelector((state) => state.auth);
  const token = authUser?.token;

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        setError('Authentication token not found.');
        setLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get('/api/users', config);

        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.warn("API did not return an array for users:", data);
          setUsers([]);
        }
      } catch (err) {
        setError('Failed to fetch users. You might not have permission.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleRoleChange = async (userId, newRole) => {
    if (!window.confirm("Are you sure you want to change this user's role?")) {
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`/api/users/${userId}`, { role: newRole }, config);

      setUsers(currentUsers =>
        currentUsers.map(user =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
      // Using a more modern notification would be better than alert, but this works for now.
      alert('User role updated successfully!');
    } catch (err) {
      alert('Failed to update user role.');
      console.error(err);
    }
  };

  const getRoleChipColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'error';
      case 'Support Team':
        return 'primary';
      case 'Partner':
        return 'secondary';
      case 'Developer':
        return 'success';
      default:
        return 'default';
    }
  };


  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Manage Users
        </Typography>
        {/* Future Add User Button can go here */}
      </Box>

      <Grid container spacing={3}>
        {users.length > 0 ? (
          users.map((user) => (
            <Grid size={{xs:12, sm:6, md:4}}key={user.userId}>
              <Box
                elevation={3}
                sx={{
                  p: 2.5,
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  backgroundColor: '#1E293B',
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: '600', mb: 1 }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    ID: {user.userId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {user.email}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Chip
                    label={user.role}
                    color={getRoleChipColor(user.role)}
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  />
                  <Select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    size="small"
                    sx={{
                      minWidth: 140,
                      borderRadius: '8px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.23)',
                      },
                    }}
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Support Team">Support Team</MenuItem>
                    <MenuItem value="Partner">Partner</MenuItem>
                    <MenuItem value="Developer">Developer</MenuItem>
                  </Select>
                </Box>
              </Box>
            </Grid>
          ))
        ) : (
          <Grid size={{xs:12}}>
            <Alert severity="info" sx={{ mt: 4 }}>
              No users found.
            </Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ManageUsersPage;

