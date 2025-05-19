import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { ingredientsSelector } from '../../services/slices/ingredients-slice';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
export const IngredientDetails: FC = () => {
  const ingredients = useSelector(ingredientsSelector);
  const { id } = useParams<{ id: string }>();

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
