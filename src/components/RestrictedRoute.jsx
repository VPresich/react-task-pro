// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

// const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
//   const { isLoggedIn } = useAuth();

//   // const lastPath = localStorage.getItem('lastPath');
//   // if (isLoggedIn && lastPath && lastPath !== location.pathname) {
//   //   return <Navigate to={lastPath} />;
//   // }

//   return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
// };
// export default RestrictedRoute;

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (isLoggedIn) {
    const lastPath = localStorage.getItem('lastPath');
    if (lastPath && lastPath !== location.pathname) {
      return <Navigate to={lastPath} />;
    }
    return <Navigate to={redirectTo} />;
  }

  return Component;
};

export default RestrictedRoute;

// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';


// // RestrictedRoute component
// const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
//   const { isLoggedIn } = useAuth();
//   const location = useLocation();

//   return isLoggedIn ? (
//     <Navigate to={redirectTo} state={{ from: location }} />
//   ) : (
//     Component
//   );
// };

// export default RestrictedRoute;