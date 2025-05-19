import {
  TRegisterData,
  registerUserApi,
  TLoginData,
  loginUserApi,
  logoutApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  refreshToken
} from '../utils/burger-api';
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

type UserStateType = {
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  user: TUser | null;
  isLoading: boolean;
  error?: SerializedError;
};

export const initialState: UserStateType = {
  isAuthenticated: false,
  isAuthChecked: false,
  isLoading: false,
  user: null
};

const isPendingAction = (action: PayloadAction) =>
  action.type.endsWith('/pending');

export const fetchRegisterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const result = await registerUserApi(data);

      setCookie('accessToken', result.accessToken);
      setCookie('refreshToken', result.refreshToken);
      return result.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCheckAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const refreshTokenCookie = getCookie('refreshToken');

      if (!refreshTokenCookie) {
        dispatch(fetchUser());
        return rejectWithValue('Не получен refresh-token');
      }

      let accessToken = getCookie('accessToken');

      if (!accessToken) {
        const refreshData = await refreshToken();
        if (!refreshData.success) {
          throw new Error('Ошибка при получении рефреш-токена');
        }
        accessToken = refreshData.accessToken;
      }

      const response = await getUserApi(accessToken);

      if (!response.success) {
        throw new Error('Ошибка при получении данных пользователя');
      }

      return response.user;
    } catch (error) {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      return rejectWithValue(error);
    }
  }
);

export const fetchLoginUser = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(loginData);

      setCookie('accessToken', response.accessToken);
      setCookie('refreshToken', response.refreshToken);

      return response.user;
    } catch (error) {
      return rejectWithValue(error || 'Ошибка при входе');
    }
  }
);

export const fetchLogoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = getCookie('refreshToken');
      if (!refreshToken) {
        throw new Error('Не найден refresh-token');
      }

      await logoutApi(refreshToken);

      deleteCookie('accessToken');
      deleteCookie('refreshToken');

      return true;
    } catch (error) {
      return rejectWithValue(error || 'Ошибка при выходе');
    }
  }
);

export const fetchForgotPass = createAsyncThunk(
  'user/forgotPass',
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      await forgotPasswordApi(data);
    } catch (error) {
      return rejectWithValue(error || 'Ошибка при запросе смены пароля');
    }
  }
);

export const fetchResetPass = createAsyncThunk(
  'user/resetPass',
  async (data: { password: string; token: string }, { rejectWithValue }) => {
    try {
      await resetPasswordApi(data);
    } catch (error) {
      return rejectWithValue(error || 'Ошибка при запросе сброса пароля');
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    // убрал accessToken из параметров
    try {
      const token = getCookie('accessToken');
      if (!token) {
        throw new Error('Нет accessToken');
      }

      const result = await getUserApi(token);
      if (!result.success) {
        throw new Error('Ошибка получения данных пользователя');
      }

      return result.user;
    } catch (error) {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      return rejectWithValue('Ошибка при загрузке пользователя');
    }
  }
);

export const fetchUpdateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const result = await updateUserApi(user);
      return result.user;
    } catch (error) {
      return rejectWithValue(
        error || 'Ошибка при обновлении данных пользователя'
      );
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = undefined;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = undefined;
      })
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isAuthChecked = true;
        state.error = undefined;
      })
      .addCase(fetchCheckAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = undefined;
      })
      .addCase(fetchCheckAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isAuthChecked = true;
        state.error = action.meta.rejectedWithValue
          ? (action.payload as SerializedError)
          : action.error;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = undefined;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = undefined;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.error = action.meta.rejectedWithValue
          ? (action.payload as SerializedError)
          : action.error;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.error = action.meta.rejectedWithValue
          ? (action.payload as SerializedError)
          : action.error;
      })
      .addCase(fetchLogoutUser.rejected, (state, action) => {
        state.error = action.meta.rejectedWithValue
          ? (action.payload as SerializedError)
          : action.error;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.meta.rejectedWithValue
          ? (action.payload as SerializedError)
          : action.error;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.error = action.meta.rejectedWithValue
          ? (action.payload as SerializedError)
          : action.error;
      })
      .addMatcher(isPendingAction, (state) => {
        state.isLoading = true;
        state.error = undefined;
      });
  }
});
export const { setAuthChecked } = userSlice.actions;
export default userSlice.reducer;
