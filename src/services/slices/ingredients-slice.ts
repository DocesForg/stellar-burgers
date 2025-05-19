import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from '../thunk/ingredients-thunk';

type TIngredientsState = {
  isLoading: boolean;
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  error: string | null;
};

export const initialState: TIngredientsState = {
  isLoading: false,
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    bunsSelector: (state) => state.buns,
    mainsSelector: (state) => state.mains,
    saucesSelector: (state) => state.sauces
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.error.message!);
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;

        state.buns = action.payload.filter(
          (ingredient) => ingredient.type === 'bun'
        );
        state.mains = action.payload.filter(
          (ingredient) => ingredient.type === 'main'
        );
        state.sauces = action.payload.filter(
          (ingredient) => ingredient.type === 'sauce'
        );
      });
  }
});

export const {
  ingredientsSelector,
  bunsSelector,
  saucesSelector,
  mainsSelector
} = ingredientsSlice.selectors;
