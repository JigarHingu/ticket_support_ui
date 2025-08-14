import { Box, Typography, Chip } from "@mui/material";
import StatusChip from "./StatusChip";

const TicketInfoBlock = ({ title, id, date, tags, status }) => {
  // A helper function to format the date string from the database
  const formattedDate = new Date(date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <Box>
      {/* Line 1: Title and Status Chip */}
      <Box display="flex" alignItems="center" gap={1.5} mb={0.5}>
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
        {status && <StatusChip status={status} />}
      </Box>
      {/* Line 2: ID and Tags */}
      <Box display="flex" alignItems="center" gap={1.5} mb={0.5}>
        <Typography variant="body2" color="text.secondary" fontWeight="600">
          #{id}
        </Typography>
        {tags &&
          tags.length > 0 &&
          tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              sx={{
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                height: "24px",
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            />
          ))}
      </Box>
      {/* Line 3: Date */}
      <Typography ml={2} variant="body2" color="text.secondary">
        {/* Displaying the newly formatted date */}
        {formattedDate}
      </Typography>
    </Box>
  );
};

export default TicketInfoBlock;
