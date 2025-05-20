import { expect, test, describe, jest } from '@jest/globals';
import reducer, { initialState, orderBurgerThunk } from '../slices/orderSlice';
import { MOCK_INGREDIENTS } from '../../utils/constant';

test('order reducer - должно вернуть начальное состояние', () => {
  const state = reducer(undefined, { type: '' });
  expect(state).toEqual(initialState);
});

describe('проверка - orderBurgerThunk', () => {
  test('проверка - orderBurgerThunk.pending', () => {
    const action = { type: orderBurgerThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isOrderLoading: true
    });
  });
  test('проверка - orderBurgerThunk.fulfilled', () => {
    const action = {
      type: orderBurgerThunk.fulfilled.type,
      payload: {
        order: MOCK_INGREDIENTS
      }
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isOrderLoading: false,
      order: MOCK_INGREDIENTS
    });
  });
  test('проверка - orderBurgerThunk.rejected', () => {
    const action = {
      type: orderBurgerThunk.rejected.type,
      error: { message: 'Test' }
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isOrderLoading: false,
      error: 'Test'
    });
  });
});
