import { Box, Grid, Typography } from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import TicketTags from './shared/TicketTags';
import StatusChip from './shared/StatusChip';
import TicketActionButton from './shared/TicketActionButton';

// The component now accepts `_id` and `createdAt` from the database
const TicketCard = ({ _id, ticketId, title, tags, replies, createdAt, status }) => {
  
  // A helper function to format the date string from the database
  const formattedDate = new Date(createdAt).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  // Get the name of the first replier (the creator)
  const creatorName = replies && replies.length > 0 ? replies[0].name : 'N/A';

    console.log(`Rendering TicketCard with _id: ${_id}`);

  return (
    <Box sx={{ backgroundColor: 'background.paper', p: 2, borderRadius: 3, mb: 2 }}>
      {/* Reverted to your original Grid syntax */}
      <Grid container alignItems="center" justifyContent="space-between" spacing={2.2}>
        <Grid size={{ xs: 12, sm: 2.2, lg: 3.6 }} container spacing={2} alignItems="center">
          <Grid >
            <ArticleOutlinedIcon sx={{ color: 'primary.main'}} />
          </Grid>
          <Grid>
            <Typography variant="body1" fontWeight={600}>{title}</Typography>
            {/* Using the `_id` from MongoDB */}
            <Typography variant="caption" color="text.secondary" gutterBottom>#{ticketId}</Typography>
            <TicketTags tags={tags} />
          </Grid>
        </Grid>

        <Grid size={{ sm: 2.2, lg: 2.1 }} textAlign="center">
          <Typography variant="body2">{creatorName}</Typography>
        </Grid>

        <Grid size={{ sm: 2.2, lg: 2.1 }} textAlign="center">
          {/* Displaying the newly formatted date */}
          <Typography variant="body2">{formattedDate}</Typography>
        </Grid>

        <Grid size={{ sm: 2.2, lg: 2.1 }} textAlign="center">
          <StatusChip status={status} />
        </Grid>

        <Grid size={{ sm: 2.2, lg: 2.1 }} textAlign="center">
          {/* The link now uses the correct `_id` */}
          <TicketActionButton to={`/ticket/${_id}`} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TicketCard;
