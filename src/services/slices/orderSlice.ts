import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type TOrderState = {
  order: TOrder | null;
  isOrderLoading: boolean;
  error: string | null | undefined;
};

export const initialState: TOrderState = {
  order: null,
  isOrderLoading: false,
  error: null
};

export const orderBurgerThunk = createAsyncThunk(
  'orders/postOrderBurger',
  async (order: string[]) => await orderBurgerApi(order)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.isOrderLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(orderBurgerThunk.pending, (state) => {
      state.isOrderLoading = true;
    });
    builder.addCase(orderBurgerThunk.fulfilled, (state, action) => {
      state.isOrderLoading = false;
      state.order = action.payload.order;
    });
    builder.addCase(orderBurgerThunk.rejected, (state, action) => {
      state.isOrderLoading = false;
      state.error = action.error.message;
    });
  }
});

export const { clearOrder } = orderSlice.actions;

export const isOrderLoadingSelector = (state: RootState) =>
  state.order.isOrderLoading;
export const orderSelector = (state: RootState) => state.order.order;

export default orderSlice.reducer;
