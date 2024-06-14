// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

// const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
//   const { isLoggedIn, isRefreshing } = useAuth();
//   const shouldRedirect = !isLoggedIn && !isRefreshing;

//   return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
// };

// export default PrivateRoute;

import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  // const location = useLocation();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  if (shouldRedirect) {
    return <Navigate to={redirectTo} />;
  }

  return Component;
};

export default PrivateRoute;

// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

// // PrivateRoute component
// const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
//   const { isLoggedIn, isRefreshing } = useAuth();
//   const location = useLocation();
//   const shouldRedirect = !isLoggedIn && !isRefreshing;

//   return shouldRedirect ? (
//     <Navigate to={redirectTo} state={{ from: location }} />
//   ) : (
//     Component
//   );
// };

// export default PrivateRoute;