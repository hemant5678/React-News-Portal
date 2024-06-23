import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const pageSize = 16;
export const fetchArticles = createAsyncThunk(
  'news/fetchArticles',
  async ({ category, page,query='' }) => {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=4d344b7f568a49eab60de699e6e23e4a&category=${category}&pageSize=${pageSize}&page=${page}&q=${query}`
    );
    return response.data;
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    totalResults: 0,
    status: 'idle',
    currentPage: 1,
    error: null,
  },
  reducers: {setCurrentPage: (state, action) => {
    state.currentPage = action.payload;
  },
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = newsSlice.actions;

export default newsSlice.reducer;
