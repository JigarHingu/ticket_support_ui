import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for FETCHING FAQs
export const fetchFaqs = createAsyncThunk(
  'faqs/fetchFaqs',
  async (_, thunkAPI) => {
    try {
      // No token needed for public fetching
      const response = await fetch('http://localhost:5000/api/faqs');
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for CREATING an FAQ
export const createFaqAPI = createAsyncThunk(
  'faqs/createFaq',
  async (faqData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await fetch('http://localhost:5000/api/faqs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(faqData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for UPDATING an FAQ
export const updateFaqAPI = createAsyncThunk(
  'faqs/updateFaq',
  async ({ id, faqData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await fetch(`http://localhost:5000/api/faqs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(faqData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for DELETING an FAQ
export const deleteFaqAPI = createAsyncThunk(
  'faqs/deleteFaq',
  async (faqId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await fetch(`http://localhost:5000/api/faqs/${faqId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return faqId; // Return the ID of the deleted FAQ
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
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
      // Cases for fetching FAQs
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
      })
      // Case for creating an FAQ
      .addCase(createFaqAPI.fulfilled, (state, action) => {
        state.faqs.push(action.payload);
      })
      // Case for updating an FAQ
      .addCase(updateFaqAPI.fulfilled, (state, action) => {
        const index = state.faqs.findIndex(faq => faq._id === action.payload._id);
        if (index !== -1) {
          state.faqs[index] = action.payload;
        }
      })
      // Case for deleting an FAQ
      .addCase(deleteFaqAPI.fulfilled, (state, action) => {
        state.faqs = state.faqs.filter(faq => faq._id !== action.payload);
      });
  },
});

export default faqSlice.reducer;
