import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  removeIngredient,
  moveToConstructor
} from '../../services/slices/constructor-slice';
import { useDispatch } from '../../services/store';
export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveToConstructor({ index: index, move: 'down' }));
    };

    const handleMoveUp = () => {
      dispatch(moveToConstructor({ index: index, move: 'up' }));
    };

    const handleRemoveIngredient = () => {
      dispatch(removeIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleRemoveIngredient}
      />
    );
  }
);
