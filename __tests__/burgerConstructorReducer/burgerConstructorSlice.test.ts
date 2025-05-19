import reducer, {
  initialState,
  setBun,
  addIngredient,
  removeIngredient,
  resetConstructor
} from '../../src/slices/burgerConstructorSlice';
import { TIngredient, TConstructorIngredient } from '../../src/utils/types';

// Моковые данные
const bunMockData: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const ingredientMockData: TConstructorIngredient = {
  id: '1234567890',
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
};

describe('burgerConstructorSlice', () => {
  describe('Работа с булками', () => {
    test('Установка булки через setBun', () => {
      const state = reducer(initialState, setBun(bunMockData));

      // Проверка, что булка установлена в состояние
      expect(state.bun).toEqual(bunMockData);
      // Остальные ингредиенты не изменились при добавлении только булки
      expect(state.ingredients).toHaveLength(0);
    });
  });

  describe('Работа с ингредиентами', () => {
    test('Добавление ингредиента', () => {
      const state = reducer(initialState, addIngredient(ingredientMockData));

      // У конструктора появился новый ингредиент
      expect(state.ingredients).toHaveLength(1);

      const updatedObject = { ...state.ingredients[0] } as Record<string, any>;
      delete updatedObject['id'];

      const initialObject = { ...ingredientMockData } as Record<string, any>;
      delete initialObject['id'];

      expect(updatedObject).toEqual(initialObject);

      expect(state.bun).toBeNull();
    });

    test('Удаление ингредиента', () => {
      const _initialState = {
        bun: null,
        ingredients: [ingredientMockData]
      };

      const state = reducer(
        _initialState,
        removeIngredient(ingredientMockData)
      );

      expect(state.ingredients).toHaveLength(0);

      expect(state.bun).toBeNull();
    });
  });

  describe('Сброс конструктора', () => {
    test('Очистка конструктора', () => {
      const _initialState = {
        bun: bunMockData,
        ingredients: [ingredientMockData]
      };

      const state = reducer(_initialState, resetConstructor());

      expect(state.ingredients).toHaveLength(0);
      expect(state.bun).toBeNull();
    });
  });
});
