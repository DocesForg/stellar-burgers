import { orderSlice, initialState } from './order-slice';
import { TFeedsResponse } from '@api';
import { getUserOrders } from '../thunk/order-thunk';

const mockResponse: TFeedsResponse = {
  success: true,
  orders: [
    {
      _id: '1',
      name: 'Тестовый заказ',
      status: 'done',
      createdAt: '2024-05-20T12:00:00.000Z',
      updatedAt: '2024-05-20T12:00:00.000Z',
      number: 1,
      ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c7']
    }
  ],
  total: 130,
  totalToday: 15
};

describe('Тестирование orderSlice', () => {
  const { reducer } = orderSlice;
  describe('Тестирование getUserOrders', () => {
    it('Должен обрабатывать состояние pending', () => {
      const action = {
        type: getUserOrders.pending.type,
        meta: { requestId: 'test' }
      };

      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.userOrder).toEqual([]);
    });

    it('Должен обрабатывать состояние fulfilled', () => {
      const action = {
        type: getUserOrders.fulfilled.type,
        meta: { requestId: 'test' },
        payload: mockResponse.orders
      };

      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.userOrder).toEqual(mockResponse.orders);
    });

    it('Должен обрабатывать состояние rejected', () => {
      const pendingState = { ...initialState, isLoading: true };
      const action = {
        type: getUserOrders.rejected.type,
        meta: { requestId: 'test' },
        error: { message: 'Ошибка при получении заказов' }
      };

      const state = reducer(pendingState, action);
      expect(state.isLoading).toBe(false);
      expect(state.userOrder).toEqual([]);
    });
  });
});
