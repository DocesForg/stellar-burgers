import { TIngredient } from '@utils-types';

export type IngredientDetailsUIProps = {
  ingredientData: TIngredient;
  onImageLoad: () => void;
  title?: string;
  isModalOpen?: boolean;
};
