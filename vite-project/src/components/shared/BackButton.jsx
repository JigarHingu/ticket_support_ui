import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  // This function tells the router to go back one step in the history
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={handleGoBack}
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        borderColor: '#334155',
        color: 'text.primary',
        mb: 2.5,
        px: 2.5, // Add some margin below the button
      }}
    >
      Back
    </Button>
  );
};

export default BackButton;
