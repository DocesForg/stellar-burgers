import { createNewOrderSlice, initialState, clearOrder } from "./new-order-slice";
import { createNewOrder } from "../thunk/order-thunk";
import { TNewOrderResponse, } from "@api";
import { TOrder } from "@utils-types"; 

describe('Тестирование createNewOrderSlice', () => {
const {reducer} = createNewOrderSlice

const mockOrder: TOrder = {
    _id: '1',
  status: 'pending',
  name: 'Тестовый заказ',
  createdAt: '2025-04-10T12:00:00Z',
  updatedAt: '2025-04-10T12:00:00Z',
  number: 1,
  ingredients: ['1', '1'],
}

const mockOrderResponse: TNewOrderResponse = {
    order: mockOrder,
    name: "Тестовый заказ",
    success: true
}
describe('Тестирование экшена', () => {
    it('Должен обрабатывать clearOrder', () => {
        const stateWithOrder = {...initialState, order: mockOrder}
        const state = reducer(stateWithOrder, clearOrder())
        expect(state.order).toBeNull()
    })
})

describe('Тестирование createNewOrder', () => {
  it('Должен обрабатывать состояние pending', () => {
    const action = {
        type: createNewOrder.pending.type,
        meta: { requestId: 'test' }
    }
    const state = reducer(initialState, action)
    expect(state.orderRequest).toBe(true)
  })
    it('Должен обрабатывать состояние fullfiled', () => {
       const action = {
        type: createNewOrder.fulfilled.type,
        meta: { requestId: 'test' },
        payload: mockOrderResponse
      };

      const state = reducer(initialState, action);
      expect(state.orderRequest).toBe(false);
      expect(state.order).toEqual(mockOrder);
  })  
    it('Должен обрабатывать состояние pending', () => {
        const pendingState = { ...initialState, orderRequest: true };
      const action = {
        type: createNewOrder.rejected.type,
        meta: { requestId: 'test' },
        error: { message: 'Ошибка при создании заказа' }
      };

      const state = reducer(pendingState, action);
      expect(state.orderRequest).toBe(false);
  })  
})
})