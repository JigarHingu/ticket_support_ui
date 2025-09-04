import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  message: '',
  severity: 'info', // Can be 'success', 'error', 'warning', or 'info'
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // Action to show a notification
    showNotification: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || 'info';
    },
    // Action to hide the current notification
    hideNotification: (state) => {
      state.open = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
