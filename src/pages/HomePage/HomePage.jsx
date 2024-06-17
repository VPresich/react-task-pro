import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBoards } from '../../redux/boards/operations';
import { fetchBackGrounds } from '../../redux/backgrounds/operations';
import DocumentTitle from '../../components/DocumentTitle';

import Layout from '../../components/Layout/Layout';
import BoardNotSelected from '../../components/BoardNotSelected/BoardNotSelected';
import { setActiveBoard } from '../../redux/boards/slice';

export default function HomePage() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
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
    dispatch(fetchBoards())
      .unwrap()
      .then(boards => {
        if (boards[0]) {
          navigation(`/home/${boards[0]._id}`);
        }
      })
      .catch(() => {
        toast.error('Error fetching boards');
      });
  }, [dispatch, navigation]);

  return (
    <Layout>
      <DocumentTitle>Home Page</DocumentTitle>
      <BoardNotSelected />
    </Layout>
  );
}
