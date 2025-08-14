import { Button } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Link } from 'react-router-dom';

const TicketActionButton = ({ to }) => (
  <Button
    component={Link}
    to={to}
    variant="contained"
    startIcon={<VisibilityOutlinedIcon />}
    sx={{
      backgroundColor: 'rgba(162, 89, 255, 0.3)',
      color: '#E2E8F0',
      border: '1px solid #a259ff',
      fontWeight: '500',
      borderRadius: 1,
      px: 3.5,
      py: 0.4,
      textTransform: 'none',
      fontSize: '1rem',
      '&.Mui-disabled': {
        backgroundColor: 'rgba(52, 199, 89, 0.1)',
        color: '#a259ff',
        border: '1px solid #a259ff',
      },
    }}
    onClick={to}
  >
    View
  </Button>
);

export default TicketActionButton;
