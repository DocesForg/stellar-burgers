import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { userDataSelector } from '../../services/slices/user-slice';
import { clearOrder } from '../../services/slices/new-order-slice';
import { resetConstructor } from '../../services/slices/constructor-slice';
import { createNewOrder } from '../../services/thunk/order-thunk';
import { getConstructorSelector } from '../../services/slices/constructor-slice';
import { getNewOrderSelector } from '../../services/slices/new-order-slice';
export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orderRequest, order } = useSelector(getNewOrderSelector);

  const { bun, ingredients } = useSelector(getConstructorSelector);
  const userIsAuth = useSelector(userDataSelector);

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = {
    bun,
    ingredients
  };

  const onOrderClick = () => {
    if (!userIsAuth) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const orderIngredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (ingredient: TConstructorIngredient) => ingredient._id
      ),
      constructorItems.bun._id
    ];
    dispatch(createNewOrder({ data: orderIngredients }));
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(resetConstructor());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
