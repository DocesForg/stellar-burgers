import { getIngredients } from "../thunk/ingredients-thunk";
import { ingredientsSlice, initialState } from "./ingredients-slice";
import { TIngredient } from "@utils-types";

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
]

describe('Тестирование  ingredientsSlice', () => {
    const {reducer, actions} = ingredientsSlice
    
    describe('Тестирование getIngredients', () => {
        it('Должен обрабатывать состояние pending', () => {
            const action = {
                type: getIngredients.pending.type,
                meta: { requestId: 'test' }
            }

            const state = reducer(initialState, action)
            expect(state.isLoading).toBe(true)
            expect(state.error).toBeNull()
        })
        it('Должен обрабатывать состояние fulfilled', () => {
            const action = {
                type: getIngredients.fulfilled.type,
                meta: { requestId: 'test' },
                payload: mockIngredients

            }

            const state = reducer(initialState, action)
            expect(state.isLoading).toBe(false)
            expect(state.ingredients).toEqual(mockIngredients)
            expect(state.error).toBeNull()
        })
        it('Должен обрабатывать состояние rejected', () => {
            const action = {
                type: getIngredients.rejected.type,
                meta: { requestId: 'test' },
                error: {
                    message: 'Ошибка при получении ингредиентов'
                },
                payload: 'Ошибка при получении ингредиентов'
            }

            const state = reducer(initialState, action)
            expect(state.isLoading).toBe(false)
            expect(state.error).toBe('Ошибка при получении ингредиентов')
        })
    })
})
