import { Box, Typography } from "@mui/material";

const InfoSection = ({ title, content }) => (
  <Box mt={2}>
    <Typography
      variant="subtitle2"
      fontWeight="600"
      sx={{ mb: 1.5, color: "text.primary" }}
    >
      {title}
    </Typography>
    <Box sx={{ backgroundColor: "background.default", p: 2, borderRadius: 2 }}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ lineHeight: 1.2 }}
      >
        {content}
      </Typography>
    </Box>
  </Box>
);

export default InfoSection;
