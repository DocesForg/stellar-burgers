import { expect, test, describe, jest } from '@jest/globals';
import reducer, {
  initialState,
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  getUserThunk,
  updateUserThunk,
  getOrdersThunk
} from './userSlice';
import { MOCK_INGREDIENTS, MOCK_USER, MOCK_ORDER } from '../../utils/constant';

test('user reducer - должен вернуть начальное состояние', () => {
  const state = reducer(undefined, { type: '' });
  expect(state).toEqual(initialState);
});

describe('проверка - loginUserThunk', () => {
  test('проверка - loginUserThunk.pending', () => {
    const action = { type: loginUserThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  test('проверка - loginUserThunk.fulfilled', () => {
    const action = { type: loginUserThunk.fulfilled.type, payload: MOCK_USER };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      user: MOCK_USER,
      isLoading: false,
      isAuth: true
    });
  });
  test('проверка - loginUserThunk.rejected', () => {
    const action = {
      type: loginUserThunk.rejected.type,
      error: { message: 'Test' }
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Test'
    });
  });
});
describe('проверка - registerUserThunk', () => {
  test('проверка - registerUserThunk.pending', () => {
    const action = { type: getUserThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isAuth: false,
      isLoading: true
    });
  });
  test('проверка - registerUserThunk.fulfilled', () => {
    const action = {
      type: registerUserThunk.fulfilled.type,
      payload: MOCK_USER
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      user: MOCK_USER,
      isAuth: true,
      isLoading: false
    });
  });
  test('проверка - registerUserThunk.rejected', () => {
    const action = {
      type: registerUserThunk.rejected.type,
      error: { message: 'Test' }
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isAuth: false,
      isLoading: false,
      error: 'Test'
    });
  });
});
describe('проверка - logoutUserThunk', () => {
  test('проверка - logoutUserThunk.pending', () => {
    const action = {
      type: logoutUserThunk.pending.type,
      payload: {
        user: null
      }
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      user: null,
      isLoading: false,
      isAuth: false
    });
  });
});
describe('проверка - getUserThunk', () => {
  test('проверка - getUserThunk.pending', () => {
    const action = { type: getUserThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isAuth: false,
      isLoading: true
    });
  });
  test('проверка - getUserThunk.fulfilled', () => {
    const action = {
      type: getUserThunk.fulfilled.type,
      payload: {
        user: MOCK_USER
      }
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      user: MOCK_USER,
      isAuth: true,
      isLoading: false
    });
  });
  test('проверка - getUserThunk.rejected', () => {
    const action = {
      type: getUserThunk.rejected.type,
      payload: null,
      error: { message: 'Test' }
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      user: null,
      isLoading: false,
      error: 'Test'
    });
  });
});

describe('проверка - updateUserThunk', () => {
  test('проверка - updateUserThunk.pending', () => {
    const action = { type: updateUserThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  test('проверка - updateUserThunk.fulfilled', () => {
    const action = {
      type: updateUserThunk.fulfilled.type,
      payload: {
        user: MOCK_USER
      }
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      user: MOCK_USER,
      isAuth: true,
      isLoading: false
    });
  });
  test('проверка - updateUserThunk.rejected', () => {
    const action = {
      type: updateUserThunk.rejected.type,
      error: { message: 'Test' }
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Test'
    });
  });
});
describe('проверка - getOrdersThunk', () => {
  test('проверка - getOrdersThunk.pending', () => {
    const action = { type: getOrdersThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  test('проверка - getOrdersThunk.fulfilled', () => {
    const action = {
      type: getOrdersThunk.fulfilled.type,
      payload: [MOCK_ORDER]
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      orders: [MOCK_ORDER],
      isLoading: false
    });
  });
  test('проверка - getOrdersThunk.rejected', () => {
    const action = {
      type: updateUserThunk.rejected.type,
      error: { message: 'Test' }
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Test'
    });
  });
});
