import feedReducer, { fetchFeed } from '../../src/slices/feedSlice'; // поправь путь

const mockFeedData = {
  orders: [
    {
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
    }
  ],
  total: 12345,
  totalToday: 67
};

describe('feedReducer', () => {
  it('обрабатывает fetchFeed.pending', () => {
    const action = { type: fetchFeed.pending.type };
    const state = feedReducer(undefined, action);
    expect(state).toEqual({
      isLoading: true,
      error: null,
      orders: {
        orders: [],
        total: 0,
        totalToday: 0
      }
    });
  });

  it('обрабатывает fetchFeed.fulfilled', () => {
    const action = {
      type: fetchFeed.fulfilled.type,
      payload: mockFeedData
    };
    const state = feedReducer(undefined, action);
    expect(state).toEqual({
      isLoading: false,
      error: null,
      orders: mockFeedData
    });
  });

  it('обрабатывает fetchFeed.rejected', () => {
    const action = {
      type: fetchFeed.rejected.type,
      payload: 'Ошибка загрузки ленты'
    };
    const state = feedReducer(undefined, action);
    expect(state).toEqual({
      isLoading: false,
      error: 'Ошибка загрузки ленты',
      orders: {
        orders: [],
        total: 0,
        totalToday: 0
      }
    });
  });
});
