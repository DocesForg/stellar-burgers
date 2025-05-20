import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi,
  TLoginData,
  TRegisterData,
  refreshToken,
  TAuthResponse
} from '../../utils/burger-api';
import { TOrder, TUser } from '../../utils/types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  isAuth: boolean;
  isLoading: boolean;
  user: TUser | null;
  orders: TOrder[];
  error: string | null | undefined;
};

export const initialState: TUserState = {
  isAuth: false,
  isLoading: false,
  user: null,
  orders: [],
  error: null
};

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const responce = await loginUserApi({ email, password });
    const { refreshToken, accessToken, user }: TAuthResponse = responce;

    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  }
);

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async ({ email, password, name }: TRegisterData) => {
    const responce = await registerUserApi({ email, password, name });
    const { refreshToken, accessToken, user }: TAuthResponse = responce;

    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  }
);

export const logoutUserThunk = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const getUserThunk = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (userData: TRegisterData) => {
    const updateUser = await updateUserApi(userData);
    return updateUser;
  }
);

export const getOrdersThunk = createAsyncThunk(
  'user/getOrders',
  async () => await getOrdersApi()
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.isAuth = false;
        state.isLoading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isAuth = false;
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUserThunk.pending, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isAuth = false;
      })
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getOrdersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  }
});

export const { clearErrors } = userSlice.actions;

export const isAuthCheckedSelector = (state: RootState) => state.user.isAuth;
export const isLoadingSelector = (state: RootState) => state.user.isLoading;
export const userDataSelector = (state: RootState) => state.user.user;
export const userNameSelector = (state: RootState) => state.user.user?.name;
export const userEmailSelector = (state: RootState) => state.user.user?.email;
export const userOrdersSelector = (state: RootState) => state.user.orders;
export const errorSelector = (state: RootState) => state.user.error;

export default userSlice.reducer;
