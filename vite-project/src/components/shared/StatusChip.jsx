import { Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const StatusChip = ({ status }) => {
  // Create a configuration object to map statuses to colors and icons
  const statusConfig = {
    'Awaiting Agent': {
      icon: <SupportAgentIcon sx={{ fontSize: 14 }} />,
      backgroundColor: 'rgba(255, 184, 0, 0.5)',
      borderColor: '#FFB800',
    },
    'Awaiting User': {
      icon: <PersonOutlineIcon sx={{ fontSize: 14 }} />,
      backgroundColor: 'rgba(52, 152, 219, 0.5)',
      borderColor: '#3498db',
    },
    'Pending': {
      icon: <HourglassTopIcon sx={{ fontSize: 14 }} />,
      backgroundColor: 'rgba(155, 89, 182, 0.5)',
      borderColor: '#9b59b6',
    },
    'Resolved': {
      icon: <CheckCircleIcon sx={{ fontSize: 14 }} />,
      backgroundColor: 'rgba(52, 199, 89, 0.5)',
      borderColor: '#34C759',
    },
    // Default case for old "Open" and "Closed" statuses
    'Open': {
        icon: <SupportAgentIcon sx={{ fontSize: 14 }} />,
        backgroundColor: 'rgba(255, 184, 0, 0.5)',
        borderColor: '#FFB800',
    },
    'Closed': {
        icon: <CheckCircleIcon sx={{ fontSize: 14 }} />,
        backgroundColor: 'rgba(52, 199, 89, 0.5)',
        borderColor: '#34C759',
    }
  };

  const currentStatus = statusConfig[status] || statusConfig['Pending'];

    return (
    <Chip
      icon={currentStatus.icon}
      label={status}
      sx={{
        backgroundColor: currentStatus.backgroundColor,
        color: '#E2E8F0',
        border: `1px solid ${currentStatus.borderColor}`,
        fontWeight: 500,
        borderRadius: 2,
        px: 1,
        fontSize: '0.8rem',
        height: '24px',
        '& .MuiChip-icon': {
          color: '#E2E8F0',
          ml: '8px'
        },
      }}
    />
  );
};

export default StatusChip;
