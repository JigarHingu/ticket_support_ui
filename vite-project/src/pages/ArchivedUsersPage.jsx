import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArchivedUsersAPI, restoreUserAPI } from "../store/slices/usersSlice";
import {
  Box,
  Typography,
  Paper,
  Stack,
  IconButton,
  Tooltip,
  Container, 
  Alert,     
} from "@mui/material";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import SearchBar from "../components/shared/SearchBar"; 

const ArchivedUsersPage = () => {
  const dispatch = useDispatch();
  const { archivedUsers } = useSelector((state) => state.users);

  // --- State for search and filtering ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchArchivedUsersAPI());
  }, [dispatch]);

  // --- Effect to filter users when search query or master list changes ---
  useEffect(() => {
    if (archivedUsers) {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = archivedUsers.filter((user) => {
            // Search by name, email, or user ID for a comprehensive search
            return (
                user.name.toLowerCase().includes(lowercasedQuery) ||
                user.email.toLowerCase().includes(lowercasedQuery) ||
                user.userId.toLowerCase().includes(lowercasedQuery)
            );
        });
        setFilteredUsers(filtered);
    }
  }, [searchQuery, archivedUsers]);

  const handleRestore = (id) => {
    dispatch(restoreUserAPI(id));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* --- UPDATED HEADER SECTION --- */}
       <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Archived Users
        </Typography>

        <Box sx={{ width: { xs: '100%', sm: '320px' } }}>
          <SearchBar 
              onSearch={setSearchQuery}
              placeholder="Search by name, email, or ID..."
          />
        </Box>
      </Box>

      {/* Map over the FILTERED list of users */}
      {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Paper key={user._id} sx={{ p: 2, mb: 2, backgroundColor: 'background.paper' }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography fontWeight={600}>{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
                <Tooltip title="Restore user">
                  <IconButton
                    aria-label="restore user"
                    color="success"
                    onClick={() => handleRestore(user._id)}
                    sx={{
                      border: "1px solid",
                      borderColor: "success.main",
                      p: 1,
                    }}
                  >
                    <RestoreFromTrashIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Paper>
          ))
      ) : (
        <Alert severity="info" sx={{ mt: 3 }}>
            {searchQuery ? `No archived users found for "${searchQuery}".` : "No users have been archived."}
        </Alert>
      )}
    </Container>
  );
};

export default ArchivedUsersPage;

