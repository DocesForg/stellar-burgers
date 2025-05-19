import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, TFeedsResponse } from '@api';

export const getFeeds = createAsyncThunk<TFeedsResponse, void>(
  'orders/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      if (!response) {
        throw new Error('Failed to fetch feeds');
      }
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
