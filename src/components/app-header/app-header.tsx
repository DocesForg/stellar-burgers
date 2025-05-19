import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserSelector } from '../../services/slices/user-slice';

export const AppHeader: FC = () => {
  const userState = useSelector(getUserSelector);
  return <AppHeaderUI userName={userState.user?.name} />;
};
