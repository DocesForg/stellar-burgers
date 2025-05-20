import { expect, test, describe, jest } from '@jest/globals';
import reducer, {
  initialState,
  getOrderByNumberThunk,
  getAllFeedsThunk
} from './feedSlice';
import { MOCK_INGREDIENTS } from '../../utils/constant';

test('feed reducer - должно вернуть начальное состояние', () => {
  const state = reducer(undefined, { type: '' });
  expect(state).toEqual(initialState);
});

describe('проверка - getOrderByNumberThunk', () => {
  test('проверка - getOrderByNumberThunk.pending', () => {
    const action = { type: getOrderByNumberThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  test('проверка - getOrderByNumberThunk.fulfilled', () => {
    const action = {
      type: getOrderByNumberThunk.fulfilled.type,
      payload: {
        orders: [MOCK_INGREDIENTS[0]]
      }
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      order: MOCK_INGREDIENTS[0]
    });
  });
  test('проверка - getOrderByNumberThunk.rejected', () => {
    const action = {
      type: getOrderByNumberThunk.rejected.type,
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

describe('проверка - getAllFeedsThunk', () => {
  test('проверка - getAllFeedsThunk.pending', () => {
    const action = { type: getAllFeedsThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  test('проверка - getAllFeedsThunk.fulfilled', () => {
    const action = {
      type: getAllFeedsThunk.fulfilled.type,
      payload: {
        orders: [MOCK_INGREDIENTS],
        total: MOCK_INGREDIENTS.length,
        totalToday: 5
      }
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      orders: [MOCK_INGREDIENTS],
      total: MOCK_INGREDIENTS.length,
      totalToday: 5
    });
  });
  test('проверка - getAllFeedsThunk.rejected', () => {
    const action = {
      type: getAllFeedsThunk.rejected.type,
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
