import { userSlice, initialState } from './user-slice';
import { TUserResponse } from '@api';
import {
  getUserData,
  loginUser,
  registerUser,
  resetPassword,
  forgotPassword,
  updateUserProfile,
  logoutUser
} from '../thunk/user-thunk';

describe('Тестируем userSlice', () => {
  const { reducer, actions } = userSlice;

  const mockUser = {
    email: 'test@example.com',
    name: 'User'
  };

  const mockResponse: TUserResponse = {
    success: true,
    user: mockUser
  };

  describe('Тесты для синхронных экшенов', () => {
    it('isAuthChecked должен быть в положении true', () => {
      const state = reducer(initialState, actions.authChecked());
      expect(state.isAuthChecked).toBe(true);
    });

    it('userLogout должен сбрасывать состояние пользователя при выходе', () => {
      const stateUser = {
        ...initialState,
        user: mockUser,
        isAuthChecked: true
      };

      const state = reducer(stateUser, actions.userLogout());
      expect(state.user).toBeNull();
      expect(state.isAuthChecked).toBe(false);
    });
  });

  describe('Тесты для асинхронных экшенов', () => {
    describe('Тестирование getUserData', () => {
      it('Должен обрабатывать состояние pending', () => {
        const action = {
          type: getUserData.pending.type,
          meta: { requestId: 'test' }
        };
        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
      });

      it('Должен обрабатывать состояние fulfilled', () => {
        const action = {
          type: getUserData.fulfilled.type,
          payload: mockResponse,
          meta: { requestId: 'test' }
        };
        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.user).toEqual(mockUser);
        expect(state.isAuthChecked).toBe(true);
      });
      it('Должен обрабатывать состояние rejected', () => {
        const action = {
          type: getUserData.rejected.type,
          error: {
            message: 'Ошибка регистрации'
          },
          meta: { requestId: 'test' },
          payload: 'Ошибка регистрации'
        };
        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe('Ошибка регистрации');
      });
    });
    describe('Тестирование registerUser', () => {
      it('Должен обрабатывать состояние pending', () => {
        const action = {
          type: registerUser.pending.type,
          meta: { requestId: 'test' }
        };
        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
      });

      it('Должен обрабатывать состояние fulfilled', () => {
        const action = {
          type: registerUser.fulfilled.type,
          payload: mockResponse,
          meta: { requestId: 'test' }
        };

        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.user).toEqual(mockUser);
      });

      it('Должен обрабатывать состояние rejected', () => {
        const action = {
          type: registerUser.rejected.type,
          error: {
            message: 'Ошибка регистрации'
          },
          meta: { requestId: 'test' },
          payload: 'Ошибка регистрации'
        };
        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe('Ошибка регистрации');
      });
    });
    describe('Тестирование loginUser', () => {
      it('Должен обрабатывать состояние pending', () => {
        const action = {
          type: loginUser.pending.type,
          meta: { requestId: 'test' }
        };
        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
      });

      it('Должен обрабатывать состояние fulfilled', () => {
        const action = {
          type: loginUser.fulfilled.type,
          meta: { requestId: 'test' },
          payload: mockResponse
        };

        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.user).toEqual(mockUser);
        expect(state.error).toBeNull();
      });
      it('Должен обрабатывать состояние rejected', () => {
        const action = {
          type: registerUser.rejected.type,
          error: {
            message: 'Ошибка входа'
          },
          meta: { requestId: 'test' },
          payload: 'Ошибка входа'
        };
        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe('Ошибка входа');
      });
    });
    describe('Тестирование resetPassword', () => {
      it('Должен обрабатывать состояние pending', () => {
        const action = {
          type: resetPassword.pending.type,
          meta: { requestId: 'test' }
        };
        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
      });

      it('Должен обрабатывать состояние fulfilled', () => {
        const action = {
          type: resetPassword.fulfilled.type,
          meta: { requestId: 'test' },
          payload: { success: true }
        };

        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();
      });
      it('Должен обрабатывать состояние rejected', () => {
        const action = {
          type: resetPassword.rejected.type,
          error: {
            message: 'Ошибка сброса пароля'
          },
          meta: { requestId: 'test' },
          payload: 'Ошибка сброса пароля'
        };
        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe('Ошибка сброса пароля');
      });
    });
    describe('Тестирование forgotPassword', () => {
      it('Должен обрабатывать состояние pending', () => {
        const action = {
          type: forgotPassword.pending.type,
          meta: { requestId: 'test' }
        };
        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
      });

      it('Должен обрабатывать состояние fulfilled', () => {
        const action = {
          type: forgotPassword.fulfilled.type,
          meta: { requestId: 'test' },
          payload: { success: true }
        };

        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();
      });
      it('Должен обрабатывать состояние rejected', () => {
        const action = {
          type: forgotPassword.rejected.type,
          error: {
            message: 'Ошибка смены пароля'
          },
          meta: { requestId: 'test' },
          payload: 'Ошибка смены пароля'
        };
        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe('Ошибка смены пароля');
      });
    });
    describe('Тестирование logoutUser', () => {
      it('Должен обрабатывать состояние pending', () => {
        const action = {
          type: logoutUser.pending.type,
          meta: { requestId: 'test' }
        };
        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
      });

      it('Должен обрабатывать состояние fulfilled', () => {
        const stateWithUser = { ...initialState, user: mockUser };
        const action = {
          type: logoutUser.fulfilled.type,
          meta: { requestId: 'test' },
          payload: { success: true }
        };

        const state = reducer(stateWithUser, action);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();
      });
      it('Должен обрабатывать состояние rejected', () => {
        const stateWithUser = { ...initialState, user: mockUser };
        const action = {
          type: logoutUser.rejected.type,
          error: {
            message: 'Ошибка выхода'
          },
          meta: { requestId: 'test' },
          payload: 'Ошибка выхода'
        };
        const state = reducer(stateWithUser, action);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe('Ошибка выхода');
      });
    });
    describe('Тестирование updateUserProfile', () => {
      it('Должен обрабатывать состояние pending', () => {
        const action = {
          type: updateUserProfile.pending.type,
          meta: { requestId: 'test' }
        };
        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
      });

      it('Должен обрабатывать состояние fulfilled', () => {
        const action = {
          type: updateUserProfile.fulfilled.type,
          meta: { requestId: 'test' },
          payload: mockResponse
        };

        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.user).toEqual(mockUser);
        expect(state.error).toBeNull();
      });
      it('Должен обрабатывать состояние rejected', () => {
        const action = {
          type: updateUserProfile.rejected.type,
          error: {
            message: 'Ошибка обновления профиля'
          },
          meta: { requestId: 'test' },
          payload: 'Ошибка обновления профиля'
        };
        const state = reducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe('Ошибка обновления профиля');
      });
    });
  });
});
