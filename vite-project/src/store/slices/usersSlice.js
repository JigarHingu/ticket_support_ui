import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// FETCH all users
export const fetchUsersAPI = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const res = await fetch("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// SOFT DELETE user
export const deleteUserAPI = createAsyncThunk(
  "users/deleteUser",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const res = await fetch(
        `http://localhost:5000/api/users/delete/${userId}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// FETCH archived users
export const fetchArchivedUsersAPI = createAsyncThunk(
  "users/fetchArchived",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const res = await fetch("http://localhost:5000/api/users/archived", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// RESTORE user
export const restoreUserAPI = createAsyncThunk(
  "users/restoreUser",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const res = await fetch(
        `http://localhost:5000/api/users/restore/${userId}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  users: [],
  archivedUsers: [],
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // active users
      .addCase(fetchUsersAPI.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      // soft delete → remove from active
      .addCase(deleteUserAPI.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (u) => u._id !== action.payload.userId
        );
      })
      // archived
      .addCase(fetchArchivedUsersAPI.fulfilled, (state, action) => {
        state.archivedUsers = action.payload;
      })
      // restore
      .addCase(restoreUserAPI.fulfilled, (state, action) => {
        state.users.unshift(action.payload);
        state.archivedUsers = state.archivedUsers.filter(
          (u) => u._id !== action.payload._id
        );
      });
  },
});

export default usersSlice.reducer;
