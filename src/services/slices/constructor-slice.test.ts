import { constructorSlice, initialState } from './constructor-slice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

describe('Проверка работы конструктора бургера', () => {
  const { actions, reducer } = constructorSlice;

  const mockBun: TIngredient = {
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

  const mockIngredients: TIngredient[] = [
    {
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
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    }
  ];

  const constructorIngredients: TConstructorIngredient[] = mockIngredients.map(
    (ing) => ({
      ...ing,
      id: `mock-id-${ing._id}` // Добавляем обязательное поле id
    })
  );

  it('Проверка начального состояния конструктора', () => {
    const state = reducer(undefined, { type: '' });
    expect(state).toEqual({
      bun: null,
      ingredients: []
    });
  });

  describe('Добавление ингредиентов', () => {
    it('Проверка на добавление булок', () => {
      const state = reducer(undefined, actions.addIngredient(mockBun));
      expect(state.bun).toEqual({
        ...mockBun,
        id: expect.any(String) // Делаем проверку что добавился id
      });
      expect(state.ingredients).toEqual([]);
    });

    it('Проверка на добавление начинки', () => {
      const state = reducer(
        undefined,
        actions.addIngredient(mockIngredients[0])
      );
      expect(state.ingredients).toEqual([
        {
          ...mockIngredients[0],
          id: expect.any(String) // Делаем проверку что добавился id
        }
      ]);
    });

    it('Должен добавлять несколько одинаковых ингредиентов', () => {
        let state = reducer(undefined, actions.addIngredient(mockIngredients[0]));
        state = reducer(state, actions.addIngredient(mockIngredients[0]));
        expect(state.ingredients).toHaveLength(2);
      });      
  });

  describe('Удаление ингредиентов', () => {
    it('Проверяем что начинки бургера были удаленны', () => {
      const initState = {
        ...initialState,
        ingredients: [...constructorIngredients]
      };
      const state = reducer(
        initState,
        actions.removeIngredient(constructorIngredients[1])
      );
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(constructorIngredients[0]);
      expect(state.ingredients).not.toContainEqual(constructorIngredients[1]); 
    });
  });
  describe('Перемещение ингредиентов', () => {
    it('Ингредиент должен подняться вверх', () => {
      const initState = {
        ...initialState,
        ingredients: [...constructorIngredients]
      };
      const state = reducer(
        initState,
        actions.moveToConstructor({ index: 1, move: 'up' })
      );
      expect(state.ingredients[0]).toEqual(constructorIngredients[1]);
      expect(state.ingredients[1]).toEqual(constructorIngredients[0]);
    });

    it('Ингредиент должен опуститься вниз', () => {
      const initState = {
        ...initialState,
        ingredients: [...constructorIngredients]
      };
      const state = reducer(
        initState,
        actions.moveToConstructor({ index: 0, move: 'down' })
      );
      expect(state.ingredients[0]).toEqual(constructorIngredients[1]);
      expect(state.ingredients[1]).toEqual(constructorIngredients[0]);
    });
  });
});
