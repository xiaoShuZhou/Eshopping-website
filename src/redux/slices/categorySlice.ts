import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { CategoryState } from '../../types/category';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

// Define the initial state
const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Async thunk for fetching all categories
export const getCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue('An unexpected error occurred fetching categories');
      }
    }
  }
);



// Create the slice
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong fetching categories';
    });

  },
});

export default categorySlice.reducer;
