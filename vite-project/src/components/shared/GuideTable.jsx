import { Box, Grid, Typography } from "@mui/material";

const GuideTable = () => (
  <Box
    // Hide on mobile (xs), display as block on small screens and up (sm)
    display={{ xs: 'none', sm: 'block' }} 
    sx={{
      backgroundColor: "primary.main",
      color: "white",
      p: 2,
      borderRadius: 2,
      mb: 2,
    }}
  >
    <Grid container alignItems="center">
      <Grid size={{ xs: 5}}>
        <Typography fontWeight="600">Explore on</Typography>
      </Grid>
      <Grid size={{ xs: 2}} textAlign="center">
        <Typography fontWeight="600">Guide by</Typography>
      </Grid>
      <Grid size={{ xs: 3}} textAlign="center">
        <Typography fontWeight="600">Date</Typography>
      </Grid>
      <Grid size={{ xs: 2}} textAlign="center">
        <Typography fontWeight="600">Links</Typography>
      </Grid>
    </Grid>
  </Box>
);

export default GuideTable;


