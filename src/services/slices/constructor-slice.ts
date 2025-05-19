import {
  createSelector,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;

        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.ingredients.push(ingredient);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: nanoid()
        }
      })
    },

    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },

    moveToConstructor: (
      state,
      action: PayloadAction<{ index: number; move: 'up' | 'down' }>
    ) => {
      const { index, move } = action.payload;
      const newIndex = move === 'up' ? index - 1 : index + 1;

      if (newIndex >= 0 && newIndex < state.ingredients.length) {
        [state.ingredients[index], state.ingredients[newIndex]] = [
          state.ingredients[newIndex],
          state.ingredients[index]
        ];
      }
    },

    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getConstructorSelector: createSelector(
      [(state: TConstructorState) => state],
      (state) => ({
        bun: state.bun,
        ingredients: state.ingredients
      })
    ),

    getIngredientsQuantitySelector: createSelector(
      [(state: TConstructorState) => state],
      (state) => {
        const { bun, ingredients } = state;
        const quantities = ingredients.reduce(
          (acc, ingredient) => {
            acc[ingredient._id] = (acc[ingredient._id] || 0) + 1;
            return acc;
          },
          {} as { [key: string]: number }
        );
        if (bun) {
          quantities[bun._id] = (quantities[bun._id] || 0) + 2;
        }
        return quantities;
      }
    )
  }
});

export const { getConstructorSelector, getIngredientsQuantitySelector } =
  constructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  moveToConstructor,
  resetConstructor
} = constructorSlice.actions;
