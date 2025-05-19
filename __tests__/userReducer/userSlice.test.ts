import reducer, {
  initialState,
  setAuthChecked
} from '../../src/slices/userSlice';

describe('userSlice reducer', () => {
  it('should handle setAuthChecked', () => {
    const newState = reducer(initialState, setAuthChecked(true));

    expect(newState.isAuthChecked).toBe(true);
  });
});
