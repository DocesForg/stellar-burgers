import {
  fetchRegisterUser,
  fetchLoginUser,
  fetchLogoutUser,
  fetchCheckAuth,
  fetchUser,
  fetchUpdateUser
} from '../../src/slices/userSlice';

import reducer, { initialState } from '../../src/slices/userSlice';

const userMockData = {
  email: 'example@example.mail',
  name: 'Example'
};

const registerMockData = {
  email: 'example@example.mail',
  name: 'Example',
  password: 'Example'
};

const loginMockData = {
  email: 'example@example.mail',
  password: 'Example'
};

describe('Тестирование редьюсера userSlice', () => {
  // Регистрация
  describe('Асинхронная функция для регистрации: fetchRegisterUser', () => {
    test('Начало запроса: fetchRegisterUser.pending', () => {
      const state = reducer(
        initialState,
        fetchRegisterUser.pending('pending', registerMockData)
      );

      expect(state.error).toBeUndefined();
      expect(state.isLoading).toBe(true);
    });

    test('Результат запроса: fetchRegisterUser.fulfilled', () => {
      const state = reducer(
        initialState,
        fetchRegisterUser.fulfilled(userMockData, 'fulfilled', registerMockData)
      );

      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(userMockData);
      expect(state.error).toBeUndefined();
    });

    test('Ошибка запроса: fetchRegisterUser.rejected', () => {
      const error = 'Ошибка при регистрации';

      const state = reducer(
        initialState,
        fetchRegisterUser.rejected(
          new Error(error),
          'rejected',
          registerMockData
        )
      );

      expect(state.error?.message).toEqual(error);
    });
  });

  // Логин
  describe('Асинхронная функция для входа в аккаунт: fetchLoginUser', () => {
    test('Начало запроса: fetchLoginUser.pending', () => {
      const state = reducer(
        initialState,
        fetchLoginUser.pending('pending', loginMockData)
      );

      expect(state.error).toBeUndefined();
      expect(state.isLoading).toBe(true);
    });

    test('Результат запроса: fetchLoginUser.fulfilled', () => {
      const state = reducer(
        initialState,
        fetchLoginUser.fulfilled(userMockData, 'fulfilled', loginMockData)
      );

      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(userMockData);
      expect(state.error).toBeUndefined();
    });

    test('Ошибка запроса: fetchLoginUser.rejected', () => {
      const error = 'Ошибка при входе';

      const state = reducer(
        initialState,
        fetchLoginUser.rejected(new Error(error), 'rejected', loginMockData)
      );

      expect(state.error?.message).toEqual(error);
    });
  });

  // Выход
  describe('Асинхронная функция выхода из аккаунта: fetchLogoutUser', () => {
    test('Результат запроса: fetchLogoutUser.fulfilled', () => {
      const state = reducer(
        initialState,
        fetchLogoutUser.fulfilled(true, 'fulfilled')
      );

      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(state.error).toBeUndefined();
    });
  });

  // Проверка авторизации
  describe('Асинхронная функция проверки авторизации: fetchCheckAuth', () => {
    test('Результат запроса: fetchCheckAuth.fulfilled', () => {
      const state = reducer(
        initialState,
        fetchCheckAuth.fulfilled(userMockData, 'fulfilled')
      );

      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(userMockData);
      expect(state.error).toBeUndefined();
    });

    test('Ошибка запроса: fetchCheckAuth.rejected', () => {
      const error = 'Ошибка аутентификации';

      const state = reducer(
        initialState,
        fetchCheckAuth.rejected(new Error(error), 'rejected')
      );

      expect(state.error?.message).toEqual(error);
    });
  });

  // Получение данных пользователя
  describe('Асинхронная функция получения данных пользователя: fetchUser', () => {
    test('Результат запроса: fetchUser.fulfilled', () => {
      const state = reducer(
        initialState,
        fetchUser.fulfilled(userMockData, 'fulfilled')
      );

      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(userMockData);
      expect(state.error).toBeUndefined();
    });

    test('Ошибка запроса: fetchUser.rejected', () => {
      const error = 'Ошибка при загрузке пользователя';

      const state = reducer(
        initialState,
        fetchUser.rejected(new Error(error), 'rejected')
      );

      expect(state.error?.message).toEqual(error);
    });
  });

  // Обновление информации о пользователе
  describe('Асинхронная функция редактирования информации пользователя: fetchUpdateUser', () => {
    test('Результат запроса: fetchUpdateUser.fulfilled', () => {
      const state = reducer(
        initialState,
        fetchUpdateUser.fulfilled(userMockData, 'fulfilled', userMockData)
      );

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(userMockData);
      expect(state.error).toBeUndefined();
    });
  });
});
