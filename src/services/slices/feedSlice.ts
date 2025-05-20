import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type TFeedsState = {
  orders: TOrder[];
  order: TOrder | null;
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null | undefined;
};

export const initialState: TFeedsState = {
  orders: [],
  order: null,
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const getAllFeedsThunk = createAsyncThunk('feed/getAll', getFeedsApi);

export const getOrderByNumberThunk = createAsyncThunk(
  'orders/getOrder',
  async (number: number) => {
    const responce = await getOrderByNumberApi(number);
    return responce;
  }
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllFeedsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFeedsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.error = null;
      })
      .addCase(getAllFeedsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  }
});

export const ordersSelector = (state: RootState) => state.feeds.orders;
export const orderSelector = (state: RootState) => state.feeds.order;
export const isLoadingSelector = (state: RootState) => state.feeds.isLoading;
export const totalSelector = (state: RootState) => state.feeds.total;
export const totalTodaySelector = (state: RootState) => state.feeds.totalToday;
export const orderNumberSelector = (state: RootState) =>
  state.feeds.order?.number;

export default feedsSlice.reducer;
