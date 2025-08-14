import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import AttachmentIcon from '@mui/icons-material/Attachment';

// This component now takes an onUpload function as a prop
const UploadedFile = ({ onUpload }) => {
  // We use a ref to access the hidden file input element
  const fileInputRef = useRef(null);

  const handleBoxClick = () => {
    // Trigger a click on the hidden input when the box is clicked
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    // Pass the selected files up to the parent component
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      onUpload(files);
    }
  };

  return (
    <>
      {/* This is the hidden file input that does the actual work */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        multiple 
      />
      {/* This is the visible, styled component that the user clicks */}
      <Box
        onClick={handleBoxClick}
        sx={{
          border: "1px solid",
          borderColor: "#34C759",
          p: 1,
          borderRadius: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "background.default",
          },
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Click to upload a file...
        </Typography>
        <AttachmentIcon
          sx={{ color: "text.secondary", transform: "rotate(135deg)" }}
        />
      </Box>
    </>
  );
};

export default UploadedFile;
