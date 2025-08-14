import { Box, Grid } from '@mui/material';
import GridHeaderCell from './shared/GridHeaderCell';

const TicketListHeader = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        p: 2,
        borderRadius: 1,
        mb: 2,
        display: { xs: 'none', sm: 'block' },
      }}
    >
      <Grid container alignItems="center" spacing={2}>
        <GridHeaderCell size={3.6}>Ticket</GridHeaderCell>
        <GridHeaderCell size={2.1} center>Replay by</GridHeaderCell>
        <GridHeaderCell size={2.1} center>Date</GridHeaderCell>
        <GridHeaderCell size={2.1} center>Status</GridHeaderCell>
        <GridHeaderCell size={2.1} center>Next Action</GridHeaderCell>
      </Grid>
    </Box>
  );
};

export default TicketListHeader;
