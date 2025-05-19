import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import {
  addIngredient,
  getIngredientsQuantitySelector
} from '../../services/slices/constructor-slice';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useSelector } from '../../services/store';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const quantities = useSelector(getIngredientsQuantitySelector);
    const count = quantities[ingredient._id];

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
