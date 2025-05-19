import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientSlice';
import burgerConstructorReducer from '../slices/burgerConstructorSlice';
import feedReducer from '../slices/feedSlice';
import orderReducer from '../slices/orderSlice';
import userReducer from '../slices/userSlice';
import modalReducer from '../slices/modalSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  feed: feedReducer,
  order: orderReducer,
  user: userReducer,
  modal: modalReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
