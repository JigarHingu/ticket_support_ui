import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for FETCHING tickets
export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async (_, thunkAPI) => {
    // Use underscore for unused first argument
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await fetch("http://localhost:5000/api/tickets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for CREATING a ticket
export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (newTicketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await fetch("http://localhost:5000/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTicketData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for UPDATING a ticket's status
export const updateTicketAPI = createAsyncThunk(
  "tickets/updateTicketStatus",
  async ({ id, newStatus }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await fetch(`http://localhost:5000/api/tickets/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Define the new async thunk for ADDING a reply
export const addTicketReplyAPI = createAsyncThunk(
  "tickets/addReply",
  async ({ ticketId, replyData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await fetch(
        `http://localhost:5000/api/tickets/${ticketId}/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(replyData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTicketAPI = createAsyncThunk(
  "tickets/deleteTicket",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await fetch(`http://localhost:5000/api/tickets/${ticketId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return ticketId; // Return the ID of the deleted ticket
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  tickets: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    // Synchronous reducers can be added here if needed
  },
  extraReducers: (builder) => {
    builder
      // Cases for fetching tickets
      .addCase(fetchTickets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Cases for creating a ticket
      .addCase(createTicket.fulfilled, (state, action) => {
        state.tickets.unshift(action.payload);
      })
      // Cases for updating a ticket
      .addCase(updateTicketAPI.fulfilled, (state, action) => {
        const index = state.tickets.findIndex(
          (ticket) => ticket._id === action.payload._id
        );
        if (index !== -1) {
          state.tickets[index] = action.payload;
        }
      })
      // Add case for adding a reply
      .addCase(addTicketReplyAPI.fulfilled, (state, action) => {
        const index = state.tickets.findIndex(
          (ticket) => ticket._id === action.payload._id
        );
        if (index !== -1) {
          // Replace the old ticket with the updated one (which now has the new reply)
          state.tickets[index] = action.payload;
        }
      })
      //  Add case for deleting a ticket
      .addCase(deleteTicketAPI.fulfilled, (state, action) => {
        // Remove the deleted ticket from the array
        state.tickets = state.tickets.filter(
          (ticket) => ticket._id !== action.payload
        );
      });
  },
});

export default ticketsSlice.reducer;
