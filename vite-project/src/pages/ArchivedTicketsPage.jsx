import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  IconButton,
  Tooltip,
  Alert,
} from "@mui/material";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import {
  fetchArchivedTicketsAPI,
  restoreTicketAPI,
} from "../store/slices/ticketsSlice";
import AdminTicketRow from "../components/shared/AdminTicketRow.jsx";
import SearchBar from "../components/shared/SearchBar";

const ArchivedTicketsPage = () => {
  const dispatch = useDispatch();
  const { archivedTickets, status, error } = useSelector(
    (state) => state.tickets
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    dispatch(fetchArchivedTicketsAPI());
  }, [dispatch]);
  
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = archivedTickets.filter((ticket) => {
        const titleMatch = ticket.title.toLowerCase().includes(lowercasedQuery);
        const idMatch = ticket.ticketId.toLowerCase().includes(lowercasedQuery);
        const userMatch = ticket.user?.name.toLowerCase().includes(lowercasedQuery);
        return titleMatch || idMatch || userMatch;
    });
    setFilteredTickets(filtered);
  }, [searchQuery, archivedTickets]);


  const handleRestore = (ticketId) => {
    dispatch(restoreTicketAPI(ticketId));
  };

  let content;

  if (status === "loading") {
    content = (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  } else if (
    status === "succeeded" ||
    (status === "idle" && archivedTickets.length > 0)
  ) {
    content = (
      <Box>
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <Box
              key={ticket._id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                backgroundColor: "background.paper",
                mb: 1.5,
                borderRadius: 2,
              }}
            >
              <AdminTicketRow ticket={ticket} />
              <Tooltip title="Restore Ticket">
                <IconButton
                  aria-label="restore ticket"
                  color="success"
                  onClick={() => handleRestore(ticket._id)}
                  sx={{
                    border: "1px solid",
                    borderColor: "success.main",
                    p: 1,
                    m: 2,
                  }}
                >
                  <RestoreFromTrashIcon />
                </IconButton>
              </Tooltip>
            </Box>
          ))
        ) : (
          <Alert severity="info" sx={{ mt: 3 }}>
             {searchQuery ? `No archived tickets found for "${searchQuery}".` : "No archived tickets found."}
          </Alert>
        )}
      </Box>
    );
  } else if (status === "failed") {
    content = (
      <Typography color="error" align="center" sx={{ my: 4 }}>
        Error: {error}
      </Typography>
    );
  } else {
    content = (
        <Alert severity="info" sx={{ mt: 3 }}>
             No archived tickets found.
        </Alert>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* ---  HEADER SECTION --- */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 3,
          flexDirection: { xs: 'column', sm: 'row' }, // Stacks on extra-small screens
          gap: 2, // Adds space between items
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Archived Tickets
        </Typography>

        <Box sx={{ width: { xs: '100%', sm: '320px' } }}>
          <SearchBar 
              onSearch={setSearchQuery}
              placeholder="Search by title, ID, or user..."
          />
        </Box>
      </Box>
      {/* --- END  --- */}

      {content}
    </Container>
  );
};

export default ArchivedTicketsPage;

