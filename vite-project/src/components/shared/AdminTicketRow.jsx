import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

// A map to determine chip colors based on ticket status
const statusColors = {
  'Awaiting Agent': 'warning',
  'Awaiting User': 'info',
  'Pending': 'secondary',
  'Resolved': 'success',
};

const AdminTicketRow = ({ ticket }) => {
  if (!ticket) {
    return null; // Don't render if no ticket is provided
  }

  return (
    <Box
      component={Link}
      to={`/ticket/${ticket._id}`}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        width: '100%',
        textDecoration: 'none',
        color: 'inherit',
        gap: 2,
      }}
    >
      {/* Left Side: Ticket ID and Title */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" color="text.secondary">
          {ticket.ticketId}
        </Typography>
        <Typography
          fontWeight={600}
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {ticket.title}
        </Typography>
      </Box>

      {/* Right Side: User Name and Status */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', md: 'block' } }}>
          by {ticket.user?.name || 'N/A'}
        </Typography>
        <Chip
          label={ticket.status}
          color={statusColors[ticket.status] || 'default'}
          size="small"
        />
      </Box>
    </Box>
  );
};

export default AdminTicketRow;
