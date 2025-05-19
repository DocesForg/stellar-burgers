import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type modalStateType = {
  title: string;
  isOpen: boolean;
};

const initialState: modalStateType = {
  title: '',
  isOpen: false
};

const modalSlice = createSlice({
  name: 'Modal',
  initialState,
  reducers: {
    closeModal: (state, action: PayloadAction<string>) => {
      state.isOpen = false;
      state.title = action.payload;
    },
    openModal: (state) => {
      state.isOpen = true;
      state.title = '';
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
