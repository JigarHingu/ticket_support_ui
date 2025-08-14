import { Box, Typography } from "@mui/material";

const PageHeader = ({ title, subtitle }) => (
  <Box mb={2}>
    <Typography variant="h6" fontWeight="600" color="#fff">
      {title}
    </Typography>
    <Typography variant="body2" color="#A0AEC0">
      {subtitle}
    </Typography>
  </Box>
);

export default PageHeader;
