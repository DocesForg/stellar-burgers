import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

const ProtectedRoute = ({ children, onlyUnAuth }: ProtectedRouteProps) => {
  const location = useLocation();
  const { user, isAuthChecked } = useAppSelector((state) => state.user);
  const background = location.state?.background;

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth) {
    if (user) {
      const from = location.state?.from || { pathname: '/' };
      return (
        <Navigate
          replace
          to={from}
          state={{ background: location.state?.from?.background }}
        />
      );
    }
    return children;
  }

  if (!user) {
    return (
      <Navigate
        replace
        to='/login'
        state={{
          from: location,
          background
        }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
