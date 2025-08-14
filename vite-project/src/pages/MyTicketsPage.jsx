import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Box, Tabs, Tab, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TicketCard from "../components/TicketCard";
import TicketListHeader from "../components/TicketListHeader";
import SearchBar from "../components/shared/SearchBar";
import { fetchTickets } from "../store/slices/ticketsSlice";

const MyTicketsPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const allTickets = useSelector((state) => state.tickets.tickets);
  const ticketStatus = useSelector((state) => state.tickets.status);
  const error = useSelector((state) => state.tickets.error);

  useEffect(() => {
    if (ticketStatus === "idle") {
      dispatch(fetchTickets());
    }
  }, [ticketStatus, dispatch]);

  // Filter tickets based on the search query
  const filteredTickets = useMemo(() => {
    if (!searchQuery) {
      return allTickets;
    }
    return allTickets.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.ticketId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allTickets, searchQuery]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const activeTickets = filteredTickets.filter(
    (ticket) => ticket.status === "Open"
  );
  const completedTickets = filteredTickets.filter(
    (ticket) => ticket.status === "Closed"
  );

  let content;

  if (ticketStatus === "loading") {
    content = (
      <Typography align="center" sx={{ mt: 4 }}>
        Loading tickets...
      </Typography>
    );
  } else if (ticketStatus === "succeeded") {
    content = (
      <Box>
        {(tabIndex === 0 ? activeTickets : completedTickets).map((ticket) => (
          <TicketCard key={ticket._id} {...ticket} />
        ))}
      </Box>
    );
  } else if (ticketStatus === "failed") {
    content = (
      <Typography align="center" color="error" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* This Box is now responsive */}
      <Box
        sx={{
          display: "flex",
          // On mobile (xs), stack them. On larger screens (sm), put them in a row.
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          gap: 2, // Adds a consistent gap between items
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            width: { xs: "100%", sm: "auto" }, // Take full width on mobile
            "& .MuiTabs-indicator": {
              backgroundColor: "primary.main",
              height: "4px",
              borderRadius: "2px",
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              color: "text.secondary",
              "&.Mui-selected": {
                color: "text.primary",
              },
            },
          }}
        >
          <Tab label={`Active Tickets (${activeTickets.length})`} />
          <Tab label={`Completed Tickets (${completedTickets.length})`} />
        </Tabs>

        <Box
          sx={{
            display: "flex",
            // This group also stacks on mobile and goes into a row on desktop
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 2,
            
            // Take full width on mobile to contain its full-width children
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {/* the SearchBar component to the page */}
          <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Search by Ticket Title or ID..."
            />
          </Box>

          <Button
            component={Link}
            to="/create"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              width: { xs: "100%", sm: "auto" }, // Take full width on mobile
              borderRadius: 1,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: "500",
              px: 2.5,
              py: 1,
            }}
          >
            Create New Ticket
          </Button>
        </Box>
      </Box>

      {/* Add the SearchBar component to the page * */}
      {/* <Box sx={{ mb: 2 }}>
        <SearchBar 
          onSearch={setSearchQuery} 
          placeholder="Search by Ticket Title or ID..." 
        />
      </Box> */}

      {/* Table Headers */}
      <TicketListHeader />

      {/* Render the content based on the status */}
      {content}
    </Container>
  );
};

export default MyTicketsPage;
