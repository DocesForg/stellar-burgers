import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TOrderResponse,
  TFeedsResponse,
  TNewOrderResponse
} from '@api';
import { TOrder } from '@utils-types';

export const createNewOrder = createAsyncThunk<
  TNewOrderResponse,
  { data: string[] }
>('order/createNewOrder', async ({ data }, { rejectWithValue }) => {
  try {
    return await orderBurgerApi(data);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getOrderByNumber = createAsyncThunk<TOrderResponse, number>(
  'order/getOrderByNumber',
  async (orderNumber: number, { rejectWithValue }) => {
    try {
      return await getOrderByNumberApi(orderNumber);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserOrders = createAsyncThunk<TOrder[], void>(
  'order/userOrdersData',
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersApi();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
