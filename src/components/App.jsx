// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { useAuth } from '../hooks';
// import { refreshUser } from '../redux/auth/operations';
// import AppRouter from './AppRouter';
// import AppContainer from './AppContainer/AppContainer';

// export default function App() {
//   const dispatch = useDispatch();
//   const { isRefreshing } = useAuth();

//   useEffect(() => {
//     dispatch(refreshUser());
//   }, [dispatch]);

//   return isRefreshing ? (
//     <b>Refreshing user... </b>
//   ) : (
//     <AppContainer>
//       <AppRouter />
//     </AppContainer>
//   );
// }

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useAuth } from '../hooks';
import { refreshUser } from '../redux/auth/operations';
import AppRouter from './AppRouter';
import AppContainer from './AppContainer/AppContainer';
import { useLocation } from 'react-router-dom';

export default function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();
  const location = useLocation();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    // Save the current path to local storage before the component unmounts
    return () => {
      localStorage.setItem('lastPath', location.pathname);
    };
  }, [location.pathname]);

  return isRefreshing ? (
    <b>Refreshing user... </b>
  ) : (
    <AppContainer>
      <AppRouter />
    </AppContainer>
  );
}
