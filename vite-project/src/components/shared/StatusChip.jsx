import { Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

const StatusChip = ({ status, onClick }) => {
  const isClosed = status === 'Closed';

  return (
    <Chip
      icon={
        isClosed
          ? <CheckCircleIcon sx={{ fontSize: 13 }} />
          : <HourglassTopIcon sx={{ fontSize: 13 }} />
      }
      label={status}
      onClick={onClick} //
      sx={{
        backgroundColor: isClosed ? 'rgba(52, 199, 89, 0.5)' : 'rgba(255, 184, 0, 0.5)',
        color: '#E2E8F0',
        border: `1px solid ${isClosed ? '#34C759' : '#FFB800'}`,
        fontWeight: 500,
        borderRadius: 2,
        px: 2,
        py: 0,
        fontSize: '0.8rem',
        height: '20px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: isClosed
            ? 'rgba(52, 199, 89, 0.6)'
            : 'rgba(255, 184, 0, 0.6)',
        },
        '& .MuiChip-icon': {
          color: '#E2E8F0',
        },
      }}
    />
  );
};

export default StatusChip;
