import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../src/utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { newOrder, TOrder } from '@utils-types';

type OrderType = {
  userOrders: TOrder[];
  isLoading: boolean;
  error: string | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  userOrdersLoading: boolean;
};

export const initialState: OrderType = {
  userOrders: [],
  userOrdersLoading: false,
  isLoading: false,
  error: null,
  orderModalData: null,
  orderRequest: false
};

export const fetchOrders = createAsyncThunk(
  'userOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersApi();
    } catch (error) {
      return rejectWithValue(error || 'Ошибка загрузки заказов пользователя');
    }
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'orderByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const result = await getOrderByNumberApi(number);
      return result.orders[0];
    } catch (error) {
      return rejectWithValue(error || 'Ошибка загрузки данных заказа');
    }
  }
);

export const fetchOrderBurger = createAsyncThunk(
  'orderBurger',
  async (data: string[], { rejectWithValue }) => {
    try {
      const result: newOrder = await orderBurgerApi(data);
      return result;
    } catch (error) {
      return rejectWithValue(error || 'Ошибка загрузки данных заказа');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderModalData(state) {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderModalData = action.payload;
        state.orderRequest = false;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.userOrdersLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.userOrdersLoading = false;
        state.error = null;
        state.userOrders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.userOrdersLoading = false;
        state.error = action.error as string;
      })
      .addCase(fetchOrderBurger.pending, (state) => {
        state.isLoading = true;
        state.orderRequest = true;
      })
      .addCase(fetchOrderBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(fetchOrderBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default orderSlice.reducer;

export const { resetOrderModalData } = orderSlice.actions;
