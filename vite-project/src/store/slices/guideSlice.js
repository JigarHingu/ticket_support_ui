import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching guides
export const fetchGuides = createAsyncThunk(
  'guides/fetchGuides',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await fetch('http://localhost:5000/api/guides', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  guides: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const guideSlice = createSlice({
  name: 'guides',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuides.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGuides.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.guides = action.payload;
      })
      .addCase(fetchGuides.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default guideSlice.reducer;
