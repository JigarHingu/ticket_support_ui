import { Box, Chip } from '@mui/material';

const TicketTags = ({ tags }) => {
  return (
    <Box sx={{ mt: 1 }}>
      {tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          size="small"
          sx={{
            mr: 1,
            backgroundColor: index === 0 ? 'primary.light' : '#334155',
            color: index === 0 ? 'primary.contrastText' : 'white',
            opacity: index === 0 ? 1 : 0.7,
            fontSize: '0.75rem',
          }}
        />
      ))}
    </Box>
  );
};

export default TicketTags;
