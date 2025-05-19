import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

type FeedType = {
  isLoading: boolean;
  error: string | null;
  orders: TOrdersData;
};

const initialState: FeedType = {
  isLoading: true,
  error: null,
  orders: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const fetchFeed = createAsyncThunk(
  'feed',
  async (_, { rejectWithValue }) => {
    try {
      return await getFeedsApi();
    } catch (error) {
      return rejectWithValue(error || 'Ошибка загрузки ленты');
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default feedSlice.reducer;
