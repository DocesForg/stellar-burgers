import reducer, {
  initialState,
  resetOrderModalData
} from '../../src/slices/orderSlice';

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

describe('orderReducer: обычные редьюсеры', () => {
  test('resetOrderModalData должен очищать orderModalData', () => {
    const stateWithOrder = {
      ...initialState,
      orderModalData: exampleOrder
    };

    const nextState = reducer(stateWithOrder, resetOrderModalData());

    expect(nextState.orderModalData).toBeNull();
  });
});
