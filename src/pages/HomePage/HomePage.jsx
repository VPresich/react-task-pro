import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectIsLoading, selectError } from '../../redux/boards/selectors';
import { fetchBoards } from '../../redux/boards/operations';
import DocumentTitle from '../../components/DocumentTitle';
import Layout from '../../components/Layout/Layout';
import { selectTheme } from '../../redux/auth/selectors';
import clsx from 'clsx';
import css from './HomePage.module.css';

export default function HomePage() {
  const theme = useSelector(selectTheme);
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
    <Layout>
      <DocumentTitle>Home Page</DocumentTitle>
      <div className={clsx(css.page, css[theme])}>
        <p className={css.text}>
          Before starting your project, it is essential{' '}
          <span className={clsx(css.accent, css[theme])}>
            to create a board
          </span>{' '}
          to visualize and track all the necessary tasks and milestones. This
          board serves as a powerful tool to organize the workflow and ensure
          effective collaboration among team members.
        </p>

        {isLoading && <p>Loading boads...</p>}
        {error && <p>{error}</p>}
      </div>
    </Layout>
  );
}
