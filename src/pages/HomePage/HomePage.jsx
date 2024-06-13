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
import SideBar from '../../components/SideBar/SideBar';
import ScreensPage from '../ScreensPage/ScreensPage';
import AppBar from '../../components/AppBar/AppBar';

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
    // <Layout>
    <div className={css.page}>
      <DocumentTitle>Home Page</DocumentTitle>
       <SideBar />
      <div className={css.normalWidth}> 
        <AppBar /> 
        <ScreensPage />
      
       {isLoading && <p>Loading boads...</p>}
        {error && <p>{error}</p>} 
      </div> 
      </div>
    // </Layout>
  );
}

{/* <Card title="test 1" description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime optio, 
explicabo maiores enim odio ab cupiditate sit consequuntur, dolore quas voluptatibus sed iusto necessitatibus 
at reprehenderit veniam magni aliquam cumque" priority="low" deadline="08.06.2024" />*/}