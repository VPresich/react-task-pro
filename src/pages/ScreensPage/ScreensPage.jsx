import DocumentTitle from '../../components/DocumentTitle';
import Board from '../../components/Board/Board';
// import Card from '../../components/UI/Card/Card';
// import Filters from '../../components/Filters/Filters';
import { useParams } from 'react-router-dom';
import BoardNotSelected from '../../components/BoardNotSelected/BoardNotSelected';

export default function ScreensPage() {
  const { boardId } = useParams();
  console.log(boardId);

  return (
    <>
      <DocumentTitle>ScreensPage</DocumentTitle>
      {/* <Filters/> */}
      {boardId ? 
        (<Board id={boardId} />)
        :
        (<BoardNotSelected/>)
      }
    </>
  );
}
