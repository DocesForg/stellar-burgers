import { expect, test, describe, jest } from '@jest/globals';
import reducer, { initialState, getIngredientsThunk } from './ingredientsSlice';
import { MOCK_INGREDIENTS } from '../../utils/constant';

test('ingredients reducer - должно вернуть начальное состояние', () => {
  const state = reducer(undefined, { type: '' });
  expect(state).toEqual(initialState);
});

describe('проверка -  getIngredientsThunk', () => {
  test('проверка - getIngredientsThunk.pending', () => {
    const action = { type: getIngredientsThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      ingredientsLoading: true
    });
  });
  test('проверка - getIngredientsThunk.fulfilled', () => {
    const action = {
      type: getIngredientsThunk.fulfilled.type,
      payload: MOCK_INGREDIENTS
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      ingredientsLoading: false,
      ingredients: MOCK_INGREDIENTS
    });
  });
  test('проверка - getIngredientsThunk.rejected', () => {
    const action = {
      type: getIngredientsThunk.rejected.type,
      error: { message: 'Test' }
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      ingredientsLoading: false,
      error: 'Test'
    });
  });
});
