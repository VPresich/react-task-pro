import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBoards } from '../../redux/boards/operations';
import DocumentTitle from '../../components/DocumentTitle';

import Layout from '../../components/Layout/Layout';
import BoardNotSelected from '../../components/BoardNotSelected/BoardNotSelected';
import { setActiveBoard } from '../../redux/boards/slice';



export default function HomePage() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { id } = useParams();

  useEffect(() => {
      dispatch(setActiveBoard(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchBoards())
      .unwrap()
      .then((boards) => {
        toast.success('fetchBoards fulfilled');
        if (boards[0]) {
          navigation(`/home/${boards[0]._id}`);
        }
      })
      .catch(() => {
        toast.error('fetchTasks rejected');
      });
  }, [dispatch, navigation]);

  return (
    <Layout>
      <DocumentTitle>Home Page</DocumentTitle>
      <BoardNotSelected />
    </Layout>
  );
}
