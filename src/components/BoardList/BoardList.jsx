import { useSelector } from 'react-redux';
import { selectItems } from '../../redux/boards/selectors';
import css from './BoardList.module.css';
import BoardListItem from '../BoardListItem/BoardListItem';

const BoardsList = () => {
  const boards = useSelector(selectItems);

  return (
    <ul className={css.list}>
      {/* <li className={css.item} key='111'>
        <BoardListItem title='test board' iconName='icon-lightning'/>
      </li>
      <li className={css.item} key='111'>
        <BoardListItem title='test board 2' iconName='icon-lightning' isActive={true}/>
      </li> */}
      {boards.map(board => (
        <li className={css.item} key={board.id}>
          <BoardListItem title={ board.title } />
        </li>
      ))}
    </ul>
  );
};

export default BoardsList;
