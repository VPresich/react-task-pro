import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { resetRefreshState } from '../redux/auth/slice';
import { useEffect } from 'react';
import { useAuth } from '../hooks';
import { refreshUser } from '../redux/auth/operations';
import AppRouter from './AppRouter';
import AppContainer from './AppContainer/AppContainer';

export default function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser())
      .unwrap()
      .then(() => {
      })
      .catch(() => {
      })
      .finally(() => {
        dispatch(resetRefreshState());
      });
  }, [dispatch]);

  return (
    <>
      {isRefreshing ? (
        <b>Refreshing user... </b>
      ) : (
        <AppContainer>
          <AppRouter />
        </AppContainer>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
