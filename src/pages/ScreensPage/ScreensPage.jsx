import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchColumnsForBoard } from '../../redux/columns/operations';
import { fetchTasksForBoard } from '../../redux/tasks/operations';
import DocumentTitle from '../../components/DocumentTitle';
import Board from '../../components/Board/Board';
import BoardNotSelected from '../../components/BoardNotSelected/BoardNotSelected';
import { selectActiveBoardId } from '../../redux/boards/selectors';

export default function ScreensPage() {
  // const { id } = useParams();
  const id = useSelector(selectActiveBoardId);
  const dispatch = useDispatch();
  console.log(id);
  useEffect(() => {
    if (!id) return;

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
    <>
      <DocumentTitle>ScreensPage</DocumentTitle>
      {/* <Filters/> */}
      {id ?
        (<Board/>)
        :
        (<BoardNotSelected />)
      }
    </>
  )
}

// export default function ScreenPage() {
  // const dispatch = useDispatch();
  // const { id } = useParams();

  // useEffect(() => {
  //   if (!id) return;

  //   dispatch(fetchColumnsForBoard(id))
  //     .unwrap()
  //     .then(() => {
  //       toast.success('fetchColumnsForBoard fulfilled');
  //     })
  //     .catch(() => {
  //       toast.error('fetchColumnsForBoard rejected');
  //     });

  //   dispatch(fetchTasksForBoard(id))
  //     .unwrap()
  //     .then(() => {
  //       toast.success('fetchTasksForBoard fulfilled');
  //     })
  //     .catch(() => {
  //       toast.error('fetchTasksForBoard rejected');
  //     });
  // }, [dispatch, id]);

//   return (
//     <Layout>
//       <DocumentTitle>Screen Page</DocumentTitle>
//       <Filters />
//       <Board />
//     </Layout>
// >>>>>>> main
//   );
// }
