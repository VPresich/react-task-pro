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
import { fetchBackGrounds } from '../../redux/backgrounds/operations';

export default function ScreensPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

   useEffect(() => {
    dispatch(fetchBackGrounds())
      .unwrap()
      .catch(() => {
        toast.error('Error fetching backgrounds');
      });
   }, [dispatch]);
  
  useEffect(() => {
    dispatch(setActiveBoard(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!id) return;

    dispatch(fetchBoards())
      .unwrap()
      .then(() => {
        
      })
      .catch(() => {
        toast.error('Error fetching tasks');
      });
    
    dispatch(fetchColumnsForBoard(id))
      .unwrap()
      .then(() => {
        
      })
      .catch(() => {
        toast.error('Error fetching columns');
      });

    dispatch(fetchTasksForBoard(id))
      .unwrap()
      .then(() => {
        
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



