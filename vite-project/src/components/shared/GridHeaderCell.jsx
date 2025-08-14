import { Grid, Typography } from '@mui/material';

const GridHeaderCell = ({ children, size, center }) => (
  <Grid size={size} textAlign={center ? 'center' : 'left'}>
    <Typography variant="subtitle2" fontWeight="bold">
      {children}
    </Typography>
  </Grid>
);

export default GridHeaderCell;
