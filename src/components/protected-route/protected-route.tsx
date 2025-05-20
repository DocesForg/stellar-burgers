import { FC } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useSelector } from '../../services/store';
import {
  isAuthCheckedSelector,
  isLoadingSelector
} from '../../services/slices/userSlice';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const loadingSelector = useSelector(isLoadingSelector);
  const location = useLocation();

  if (!isAuthChecked && loadingSelector) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthChecked) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} state={location} />;
  }
  return children;
};
