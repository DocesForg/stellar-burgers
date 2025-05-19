import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getUserOrders } from '../thunk/order-thunk';

type TOrderState = {
  isLoading: boolean;
  userOrder: TOrder[];
};

export const initialState: TOrderState = {
  isLoading: false,
  userOrder: []
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    userOrderSelector: (state) => state.userOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.userOrder = action.payload;
        }
      )
      .addCase(getUserOrders.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { userOrderSelector } = orderSlice.selectors;
