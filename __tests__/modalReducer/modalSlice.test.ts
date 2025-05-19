import modalReducer, {
  openModal,
  closeModal
} from '../../src/slices/modalSlice';

describe('modalReducer', () => {
  const initialState = {
    title: '',
    isOpen: false
  };

  it('должен открыть модальное окно', () => {
    const action = openModal();
    const state = modalReducer(initialState, action);

    expect(state.isOpen).toBe(true);
    expect(state.title).toBe('');
  });

  it('должен закрыть модальное окно с переданным title', () => {
    const action = closeModal('Test Title');
    const state = modalReducer(initialState, action);

    expect(state.isOpen).toBe(false);
    expect(state.title).toBe('Test Title');
  });
});
