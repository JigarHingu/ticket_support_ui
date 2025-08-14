import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching FAQs
export const fetchFaqs = createAsyncThunk(
  'faqs/fetchFaqs',
  async () => {
    const response = await fetch('http://localhost:5000/api/faqs');
    const data = await response.json();
    return data;
  }
);

const initialState = {
  faqs: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const faqSlice = createSlice({
  name: 'faqs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.faqs = action.payload;
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default faqSlice.reducer;
