import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { hideNotification } from '../../store/slices/notificationsSlice';

const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  // Get the notification state from the Redux store
  const { open, message, severity } = useSelector((state) => state.notifications);

  const handleClose = (event, reason) => {
    // Prevent closing on click away
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000} // Hide after 5 seconds
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      {/* The Alert component provides the styling (color, icon) */}
      <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
