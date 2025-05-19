import { getFeeds } from '../thunk/feed-thunk';
import { feedSlice, initialState } from './feed-slice';
import { TFeedsResponse } from '@api';

describe('Тестируем feedSlice', () => {
const {reducer} = feedSlice 
  const feedMock: TFeedsResponse = {
    success: true,
    orders: [],
    total: 150,
    totalToday: 15
  };

  describe('Тестирование getFeeds', () => {
    it('Должен обрабатывать состояние pending', () => {
        const action = {
            type: getFeeds.pending.type
        }
        const state = reducer(initialState, action)
        expect(state.isLoading).toBe(true)
        expect(state.error).toBeNull()
    })
     it('Должен обрабатывать состояние fulfilled', () => {
        const action = {
            type: getFeeds.fulfilled.type,
            payload: feedMock
        }
        const state = reducer(initialState, action)
        expect(state.isLoading).toBe(false)
        expect(state.orders).toEqual(feedMock.orders)
        expect(state.total).toBe(150)
        expect(state.totalToday).toBe(15)
        expect(state.error).toBeNull()
    })
     it('Должен обрабатывать состояние rejected', () => {
        const action = {
            type: getFeeds.rejected.type,
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
});
