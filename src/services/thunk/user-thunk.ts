import { deleteCookie, setCookie } from '../../utils/cookie';
import {
  getUserApi,
  TRegisterData,
  updateUserApi,
  registerUserApi,
  TLoginData,
  loginUserApi,
  logoutApi,
  TUserResponse,
  TAuthResponse,
  forgotPasswordApi,
  resetPasswordApi
} from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userLogout } from '../slices/user-slice';

const saveTokens = (accessToken: string, refreshToken: string) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const getUserData = createAsyncThunk<TUserResponse, void>(
  'user/getUserData',
  async () => await getUserApi()
);

export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'user/registerUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      localStorage.setItem('refreshToken', response.refreshToken);
      saveTokens(response.accessToken, response.refreshToken);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'user/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(loginData);
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const forgotPassword = createAsyncThunk<void, { email: string }>(
  'user/forgotPassword',
  async (emailData, { rejectWithValue }) => {
    try {
      await forgotPasswordApi(emailData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk<
  void,
  { password: string; token: string }
>('user/resetPassword', async (dataPassword, { rejectWithValue }) => {
  try {
    await resetPasswordApi(dataPassword);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateUserProfile = createAsyncThunk<
  TUserResponse,
  Partial<TRegisterData>
>('user/updateUser', async (data, { rejectWithValue }) => {
  try {
    const res = await updateUserApi(data);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      rejectWithValue(userLogout());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
