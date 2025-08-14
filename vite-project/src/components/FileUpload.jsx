import { Box, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
// highlight-start
import UploadFileIcon from '@mui/icons-material/UploadFile'; // Use an icon from MUI
// highlight-end

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

export default FileUpload;