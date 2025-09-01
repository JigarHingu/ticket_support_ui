import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import UploadFileIcon from '@mui/icons-material/UploadFile'; 

const FileUpload = ({ onUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'application/pdf': ['.pdf'],
    },
    onDrop: (acceptedFiles) => onUpload(acceptedFiles),
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed #334155',
        borderRadius: 2,
        p: 4,
        textAlign: 'center',
        backgroundColor: '#0F172A',
        cursor: 'pointer',
        color: 'text.secondary',
        '&:hover': {
          borderColor: 'primary.main',
        },
      }}
    >
      <input {...getInputProps()} />
      {/* highlight-start */}
      {/* Replaced the missing SVG with the MUI icon */}
      <UploadFileIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
      {/* highlight-end */}
      <Typography variant="body1">
        Drag & drop files or <span style={{ color: '#a259ff', textDecoration: 'underline', fontWeight: 'bold' }}>Browse</span>
      </Typography>
      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
        Supported formats: PNG, PDF
      </Typography>
    </Box>
  );
};

// Add the prop validation block
FileUpload.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default FileUpload;