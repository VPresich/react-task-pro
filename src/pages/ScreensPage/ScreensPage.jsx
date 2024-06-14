import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchBoards } from '../../redux/boards/operations';
import { fetchColumnsForBoard } from '../../redux/columns/operations';
import { fetchTasksForBoard } from '../../redux/tasks/operations';
import DocumentTitle from '../../components/DocumentTitle';
import Board from '../../components/Board/Board';
import { setActiveBoard } from '../../redux/boards/slice';
import Layout from '../../components/Layout/Layout';

export default function ScreensPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setActiveBoard(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!id) return;

    dispatch(fetchBoards())
      .unwrap()
      .then(() => {
        toast.success('fetchTasks fulfilled');
      })
      .catch(() => {
        toast.error('fetchTasks rejected');
      });
    
    dispatch(fetchColumnsForBoard(id))
      .unwrap()
      .then(() => {
        toast.success('fetchColumnsForBoard fulfilled');
      })
      .catch(() => {
        toast.error('fetchColumnsForBoard rejected');
      });

    dispatch(fetchTasksForBoard(id))
      .unwrap()
      .then(() => {
        toast.success('fetchTasksForBoard fulfilled');
      })
      .catch(() => {
        toast.error('fetchTasksForBoard rejected');
      });
   }, [dispatch, id]);

  return (
    <Layout>
      <DocumentTitle>ScreensPage</DocumentTitle>
      <Board />
    </Layout>
  );
}



