// import { Box } from "@mui/material";

// const GuideTable = () => (
//   <Box
//     display="grid"
//     gridTemplateColumns="30% 25% 35% 10%"
//     alignItems="center"
//     bgcolor="#A259FF"
//     px={1.5}
//     py={1.5}
//     borderRadius={1}
//     color="white"
//     fontWeight="600"
//     mb={2}
//   >
//     <Box display="flex" justifyContent="flex-start">Explore on</Box>
//     <Box display="flex" justifyContent="center">Guide by</Box>
//     <Box display="flex" justifyContent="center">Date</Box>
//     <Box display="flex" justifyContent="center">Links</Box>
//   </Box>
// );

// export default GuideTable;

// import { Box } from "@mui/material";

// const GuideTable = () => (
//   <Box
//     display={{ xs: 'none', sm: 'grid' }} // Hide on mobile (xs), display as grid on small screens and up (sm)
//     gridTemplateColumns="30% 25% 35% 10%"
//     alignItems="center"
//     bgcolor="#A259FF"
//     px={1.5}
//     py={1.5}
//     borderRadius={1}
//     color="white"
//     fontWeight="600"
//     mb={2}
//   >
//     <Box>Explore on</Box>
//     <Box textAlign="center">Guide by</Box>
//     <Box textAlign="center">Date</Box>
//     <Box textAlign="center">Links</Box>
//   </Box>
// );

// export default GuideTable;


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


