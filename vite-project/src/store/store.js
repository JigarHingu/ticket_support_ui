import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from './slices/ticketsSlice';
import authReducer from './slices/authSlice'; 
import faqReducer from './slices/faqSlice';
import guideReducer from './slices/guideSlice';

// The store is the single source of truth for our app's state.
// We combine all our different slices here.
export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    auth: authReducer,
    faqs: faqReducer,
    guides: guideReducer,
  },
});
