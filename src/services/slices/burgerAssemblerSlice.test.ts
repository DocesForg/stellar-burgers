import { expect, test, describe, jest } from '@jest/globals';
import { MOCK_INGREDIENTS } from '../../utils/constant';
import reducer, {
  initialState,
  addIngredient,
  upIngredient,
  downIngredient,
  removeIngredient,
  clearburgerAssembler,
  burgerAssemblerSelector,
  TBurgerAssemblerState
} from './burgetAssemblerSlice';

describe('burgetAssemblerSlice reducer', () => {
  test('должно вернуть начальное состояние', () => {
    const state = reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
});

test('проверка добавления ингредиента - addIngredient', () => {
  const prevState = {
    ...initialState,
    burgerAssembler: {
      ingredients: []
    }
  };

  const newState = {
    ...prevState,
    burgerAssembler: {
      ...prevState.burgerAssembler,
      ingredients: [{ MOCK_INGREDIENTS }]
    }
  };
  expect(newState.burgerAssembler.ingredients.length).toBe(1);
}),
  test('проверка перемещения ингредиентов - upIngredient', () => {
    const prevState = {
      ...initialState,
      burgerAssembler: {
        bun: null,
        ingredients: [MOCK_INGREDIENTS[1], MOCK_INGREDIENTS[2]]
      },
      error: null
    };

    const action = upIngredient(1);
    const newState = reducer(prevState, action);

    expect(newState.burgerAssembler.ingredients).toEqual([
      MOCK_INGREDIENTS[2],
      MOCK_INGREDIENTS[1]
    ]);
  }),
  test('проверка перемещения ингредиентов - downIngredient', () => {
    const prevState = {
      ...initialState,
      burgerAssembler: {
        bun: null,
        ingredients: [MOCK_INGREDIENTS[1], MOCK_INGREDIENTS[2]]
      },
      error: null
    };

    const action = downIngredient(0);
    const newState = reducer(prevState, action);

    expect(newState.burgerAssembler.ingredients).toEqual([
      MOCK_INGREDIENTS[2],
      MOCK_INGREDIENTS[1]
    ]);
  }),
  test('проверка удаления ингредиентов - removeIngredient', () => {
    const prevState = {
      ...initialState,
      burgerAssembler: {
        bun: null,
        ingredients: [MOCK_INGREDIENTS[1]]
      }
    };
    const action = removeIngredient(MOCK_INGREDIENTS[1]);
    const newState = reducer(prevState, action);

    expect(newState.burgerAssembler.ingredients).toEqual([]);
  });

test('прокерка очистки сборщика бургеров - clearburgerAssembler', () => {
  const prevState = {
    ...initialState,
    burgerAssembler: {
      bun: MOCK_INGREDIENTS[0],
      ingredients: [MOCK_INGREDIENTS[1], MOCK_INGREDIENTS[2]]
    }
  };

  const action = clearburgerAssembler();
  const newState = reducer(prevState, action);

  expect(newState.burgerAssembler.bun).toBeNull();
  expect(newState.burgerAssembler.ingredients).toEqual([]);
});
