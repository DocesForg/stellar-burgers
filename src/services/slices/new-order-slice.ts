import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNewOrder } from '../thunk/order-thunk';
import { TOrder } from '@utils-types';
import { TNewOrderResponse } from '@api';

type TCreateOrderState = {
  order: TOrder | null;
  orderRequest: boolean;
};

export const initialState: TCreateOrderState = {
  order: null,
  orderRequest: false
};

export const createNewOrderSlice = createSlice({
  name: 'createNewOrder',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  selectors: {
    getNewOrderSelector: createSelector(
      [(state: TCreateOrderState) => state],
      (state) => ({
        order: state.order,
        orderRequest: state.orderRequest
      })
    )
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.orderRequest = true;
      })

      .addCase(
        createNewOrder.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.orderRequest = false;
          state.order = action.payload.order;
        }
      )
      .addCase(createNewOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const { getNewOrderSelector } = createNewOrderSlice.selectors;
export const { clearOrder } = createNewOrderSlice.actions;
