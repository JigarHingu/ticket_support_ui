import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ContactUsCard = () => (
  <Box
    mt={2}
    p={2}
    sx={{ backgroundColor: "background.default", borderRadius: 2, px: 2, py: 1 }}
  >
    <Typography variant="h7" fontWeight={600} gutterBottom>
      Contact Us
    </Typography>
    <Typography variant="body2" color="text.secondary" mt={1}
    mb={2}>
      If you can't find the answer you're looking for, you can contact our
      support team directly.
    </Typography>
    <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
      <Button
        component={Link}
        to="/create"
        variant="contained"
        color="primary"
        sx={{
          textTransform: "none",
          fontWeight: 550,
          px: 2,
          py: 0,
          minHeight: "32px",
          fontSize: "0.85rem",
        }}
      >
        Create Ticket
      </Button>
      <Button
        component={Link}
        to="/"
        variant="outlined"
        sx={{
          textTransform: "none",
          fontWeight: 550,
          px: 2,
          py: 0,
          minHeight: "32px",
          fontSize: "0.85rem",
          borderColor: "#334155",
          color: "text.primary",
        }}
      >
        View My Tickets
      </Button>
    </Box>
  </Box>
);

export default ContactUsCard;
