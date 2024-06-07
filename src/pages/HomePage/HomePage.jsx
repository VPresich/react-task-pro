import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { selectIsLoading, selectError } from '../../redux/boards/selectors';
import { fetchBoards } from '../../redux/boards/operations';
import BoardsList from '../../components/BoardList/BoardList';

import DocumentTitle from '../../components/DocumentTitle';
import AppBar from '../../components/AppBar/AppBar';
import Card from '../../components/UI/Card/Card';
// import css from './HomePage.module.css';

export default function HomePage() {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchBoards())
      .unwrap()
      .then(() => {
        toast.success('fetchTasks fulfilled');
      })
      .catch(() => {
        toast.error('fetchTasks rejected');
      });
  }, [dispatch]);

  return (
    <>
      <DocumentTitle>Home Page</DocumentTitle>

      <AppBar></AppBar>

      <h2>Home Page</h2>
      <Card/>
      {isLoading && <p>Loading boads...</p>}
      {error && <p>{error}</p>}
      <BoardsList />
    </>
  );
}
