// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Async thunk for FETCHING articles
// export const fetchArticles = createAsyncThunk(
//   'articles/fetchArticles',
//   async (_, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       const response = await fetch('http://localhost:5000/api/articles', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Async thunk for CREATING an article
// export const createArticleAPI = createAsyncThunk(
//   'articles/createArticle',
//   async (articleData, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       const response = await fetch('http://localhost:5000/api/articles', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(articleData),
//       });
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Async thunk for UPDATING an article
// export const updateArticleAPI = createAsyncThunk(
//   'articles/updateArticle',
//   async ({ id, articleData }, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       const response = await fetch(`http://localhost:5000/api/articles/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(articleData),
//       });
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );


// // Async thunk for DELETING an article
// export const deleteArticleAPI = createAsyncThunk(
//   'articles/deleteArticle',
//   async (articleId, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       await fetch(`http://localhost:5000/api/articles/${articleId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       return articleId; // Return the ID of the deleted article
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );


// const initialState = {
//   articles: [],
//   status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null,
// };

// const articleSlice = createSlice({
//   name: 'articles',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Cases for fetching articles
//       .addCase(fetchArticles.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchArticles.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.articles = action.payload;
//       })
//       .addCase(fetchArticles.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       // Case for creating an article
//       .addCase(createArticleAPI.fulfilled, (state, action) => {
//         state.articles.unshift(action.payload);
//       })
//       // Case for updating an article
//       .addCase(updateArticleAPI.fulfilled, (state, action) => {
//         const index = state.articles.findIndex(article => article._id === action.payload._id);
//         if (index !== -1) {
//           state.articles[index] = action.payload;
//         }
//       })
//       // Case for deleting an article
//       .addCase(deleteArticleAPI.fulfilled, (state, action) => {
//         state.articles = state.articles.filter(article => article._id !== action.payload);
//       });
//   },
// });

// export default articleSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for FETCHING articles
export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await fetch('http://localhost:5000/api/articles', {
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

// You can add async thunks for create, update, and delete here later

const initialState = {
  articles: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default articleSlice.reducer;
