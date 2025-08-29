import { Box, Grid } from "@mui/material";
import GridHeaderCell from "./shared/GridHeaderCell";

const TicketListHeader = ({ showRepliedBy = true }) => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        p: 1.6,
        borderRadius: 1,
        mb: 2,
        display: { xs: "none", sm: "block" }, // Hide header on mobile
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={2.2}
      >
        <GridHeaderCell size={3.4}>Ticket</GridHeaderCell>

        {showRepliedBy && (
          <GridHeaderCell size={{ sm: 2.2, lg: 2.1 }} center>
            Replied By
          </GridHeaderCell>
        )}
        
        <GridHeaderCell size={{ sm: 2.2, lg: 2.1 }} center>
          Date
        </GridHeaderCell>
        <GridHeaderCell size={{ sm: 2.2, lg: 2.1 }} center>
          Status
        </GridHeaderCell>
        <GridHeaderCell size={{ sm: 2.2, lg: 2.1 }} center>
          Next Action
        </GridHeaderCell>
      </Grid>
    </Box>
  );
};

export default TicketListHeader;
