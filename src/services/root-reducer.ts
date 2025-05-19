import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './slices/user-slice';
import { constructorSlice } from './slices/constructor-slice';
import { ingredientsSlice } from './slices/ingredients-slice';
import { feedSlice } from './slices/feed-slice';
import { orderSlice } from './slices/order-slice';
import { createNewOrderSlice } from './slices/new-order-slice';

export const RootReducer = combineReducers({
  ['user']: userSlice.reducer,
  ['constructorSlice']: constructorSlice.reducer,
  ['ingredients']: ingredientsSlice.reducer,
  ['feed']: feedSlice.reducer,
  ['order']: orderSlice.reducer,
  ['createNewOrder']: createNewOrderSlice.reducer
});
