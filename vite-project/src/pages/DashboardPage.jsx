import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchTickets } from "../store/slices/ticketsSlice";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { Link } from "react-router-dom";

// A reusable component for displaying a single statistic
const StatCard = ({ title, value, icon, color }) => (
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    <Paper
      sx={{
        p: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "background.paper",
        borderRadius: 3,
      }}
    >
      <Box>
        <Typography color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" fontWeight={600}>
          {value}
        </Typography>
      </Box>
      <Box sx={{ color: color, fontSize: "3rem" }}>{icon}</Box>
    </Paper>
  </Grid>
);

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { tickets, status } = useSelector((state) => state.tickets);
  const { user } = useSelector((state) => state.auth); // Get user for token
  const [totalUsers, setTotalUsers] = useState(0);

  // Fetch tickets and user stats when the component loads
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTickets());
    }

    const fetchUserStats = async () => {
      if (user) {
        const response = await fetch("http://localhost:5000/api/users/stats", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        setTotalUsers(data.totalUsers);
      }
    };
    fetchUserStats();
  }, [status, dispatch, user]);

  const totalTickets = tickets.length;
  const awaitingAgentTickets = tickets.filter(
    (ticket) => ticket.status === "Awaiting Agent"
  ).length;
  const awaitingUserTickets = tickets.filter(
    (ticket) => ticket.status === "Awaiting User"
  ).length;
  const pendingTickets = tickets.filter(
    (ticket) => ticket.status === "Pending"
  ).length;
  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;
  const recentTickets = tickets.slice(0, 5); // Get the 5 most recent tickets

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={2}>
        <StatCard
          title="Total Tickets"
          value={totalTickets}
          icon={<ConfirmationNumberIcon sx={{ fontSize: "inherit" }} />}
          color="primary.main"
        />
        <StatCard
          title="Awaiting Agent"
          value={awaitingAgentTickets}
          icon={<RadioButtonUncheckedIcon sx={{ fontSize: "inherit" }} />}
          color="#FFB800"
        />
        <StatCard
          title="Awaiting User"
          value={awaitingUserTickets}
          icon={<PersonIcon sx={{ fontSize: "inherit" }} />}
          color="#246AED" 
        />
        <StatCard
          title="Pending"
          value={pendingTickets}
          icon={<HourglassTopIcon sx={{ fontSize: "inherit" }} />}
          color="#9b59b6"
        />
        <StatCard
          title="Resolved"
          value={resolvedTickets}
          icon={<CheckCircleOutlineIcon sx={{ fontSize: "inherit" }} />}
          color="#34C759"
        />
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={<PeopleAltIcon sx={{ fontSize: "inherit" }} />}
          color="#38bdf8"
        />
      </Grid>

      {/* Recent Tickets Section */}
      <Paper
        sx={{
          p: 3,
          mt: 4,
          backgroundColor: "background.paper",
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={2}>
          Recent Tickets
        </Typography>
        <List disablePadding>
          {recentTickets.map((ticket, index) => (
            <Box key={ticket._id}>
              <ListItem
                component={Link}
                to={`/ticket/${ticket._id}`}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderRadius: 2,
                  textDecoration: "none",
                  // color: 'inherit',
                  color: "#246aed",
                  transition: "color 0.2s ease, text-decoration 0.2s ease",
                  "&:hover": {
                    color: "#9bbbefff", // slightly darker blue
                    // textDecoration: "underline",
                  },
                }}
              >
                <ListItemText
                  primary={ticket.title}
                  secondary={`#${ticket.ticketId}`}
                />
                <Typography variant="body2" color="text.secondary">
                  {new Date(ticket.createdAt).toLocaleDateString("en-IN")}
                </Typography>
              </ListItem>
              {index < recentTickets.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default DashboardPage;
