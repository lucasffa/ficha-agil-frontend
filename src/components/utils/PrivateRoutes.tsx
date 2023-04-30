import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = (props?: boolean) => {
  return props === true && localStorage.getItem('token') ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
