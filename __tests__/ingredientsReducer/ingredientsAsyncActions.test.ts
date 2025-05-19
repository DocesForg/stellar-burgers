import ingredientsReducer, {
  fetchIngredients
} from '../../src/slices/ingredientSlice'; // путь поправь
import { TIngredient } from '../../src/utils/types';

const mockIngredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

describe('ingredients reducer', () => {
  it('обрабатывает fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(undefined, action);
    expect(state).toEqual({
      ingredients: [],
      isLoading: true,
      error: null
    });
  });

  it('обрабатывает fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: [mockIngredient]
    };
    const state = ingredientsReducer(undefined, action);
    expect(state).toEqual({
      ingredients: [mockIngredient],
      isLoading: false,
      error: null
    });
  });

  it('обрабатывает fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      payload: 'Ошибка загрузки ингредиентов'
    };
    const state = ingredientsReducer(undefined, action);
    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      error: 'Ошибка загрузки ингредиентов'
    });
  });
});
