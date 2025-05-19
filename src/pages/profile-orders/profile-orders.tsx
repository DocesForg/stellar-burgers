import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchOrders } from '../../slices/orderSlice';

export const ProfileOrders: FC = () => {
  const { userOrders, userOrdersLoading } = useAppSelector(
    (state) => state.order
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return userOrdersLoading ? (
    <Preloader />
  ) : (
    <ProfileOrdersUI orders={userOrders} />
  );
};
