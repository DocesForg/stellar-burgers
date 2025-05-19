import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchOrderBurger, resetOrderModalData } from '../../slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { resetConstructor } from '../../slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { bun, ingredients } = useAppSelector(
    (state) => state.burgerConstructor
  );
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  const { orderModalData, orderRequest } = useAppSelector(
    (state) => state.order
  );

  const constructorItems = {
    bun: bun ?? null,
    ingredients: ingredients ?? []
  };

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) {
      return;
    }

    if (!isAuthenticated) return navigate('/login');

    const order = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    await dispatch(fetchOrderBurger(order));
    dispatch(resetConstructor());
  };

  const closeOrderModal = () => {
    dispatch(resetOrderModalData());
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
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
