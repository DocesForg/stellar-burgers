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

const mockState = {
  order: {
    orderModalData: exampleOrder,
    isLoading: true,
    userOrdersLoading: false,
    error: null,
    userOrders: [],
    orderRequest: false
  }
};

describe('orderReducer: селекторы', () => {
  it('селектор orderModalData возвращает правильные данные', () => {
    const orderData = mockState.order.orderModalData;
    expect(orderData).toEqual(exampleOrder);
  });

  it('селектор isLoading возвращает правильное значение', () => {
    const isLoading = mockState.order.isLoading;
    expect(isLoading).toBe(true);
  });
});
