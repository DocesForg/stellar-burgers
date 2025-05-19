import { getOrdersApi } from '@api';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { fetchFeed } from '../../slices/feedSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const Feed: FC = () => {
  const { orders, isLoading } = useAppSelector((state) => state.feed);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <FeedUI orders={orders.orders} handleGetFeeds={handleGetFeeds} />
  );
};
