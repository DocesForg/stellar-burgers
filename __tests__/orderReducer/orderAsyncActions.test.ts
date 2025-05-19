import reducer, {
  fetchOrders,
  fetchOrderByNumber,
  fetchOrderBurger,
  initialState
} from '../../src/slices/orderSlice';
import { newOrder } from '../../src/utils/types';

const exampleOrder = {
  _id: '681aea45e8e61d001cec6993',
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa093c'
  ],
  status: 'done',
  name: 'Краторный био-марсианский люминесцентный бургер',
  createdAt: '2025-05-07T05:06:13.338Z',
  updatedAt: '2025-05-07T05:06:14.057Z',
  number: 76420
};

describe('orderReducer: асинхронные экшены', () => {
  it('fetchOrderByNumber.fulfilled сохраняет orderModalData', () => {
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: exampleOrder
    };

    const nextState = reducer(initialState, action);

    expect(nextState.orderModalData).toEqual(exampleOrder);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.orderRequest).toBe(false);
  });

  it('fetchOrders.fulfilled сохраняет userOrders', () => {
    const action = {
      type: fetchOrders.fulfilled.type,
      payload: [exampleOrder]
    };

    const nextState = reducer(initialState, action);

    expect(nextState.userOrders).toEqual([exampleOrder]);
    expect(nextState.userOrdersLoading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('fetchOrderBurger.fulfilled сохраняет orderModalData', () => {
    const action = {
      type: fetchOrderBurger.fulfilled.type,
      payload: { order: exampleOrder }
    };

    const nextState = reducer(initialState, action);

    expect(nextState.orderModalData).toEqual(exampleOrder);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.orderRequest).toBe(false);
  });
});
