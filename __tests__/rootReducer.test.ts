import store, { rootReducer } from '../src/services/store';

describe('rootReducer', () => {
  it('должен возвращать корректное начальное состояние при неизвестном экшене', () => {
    const initialState = store.getState();

    const nextState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(nextState).toEqual(initialState);
  });
});
