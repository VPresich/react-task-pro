import { useDispatch, useSelector } from 'react-redux';
import { selectItems, selectActiveBoardId } from '../../redux/boards/selectors';
import { setActiveBoard } from '../../redux/boards/slice';
import css from './BoardList.module.css';
import BoardListItem from '../BoardListItem/BoardListItem';

const BoardsList = () => {
  const activeBoardState = useSelector(selectActiveBoardId);
  const boards = useSelector(selectItems);
  
  const dispatch = useDispatch();

  const handleActiveBoard = (id) => {
    dispatch(setActiveBoard(id));
  }

  return (
    <ul className={css.list}>
      {boards.map(board => (
        <li className={css.item} key={board._id}>
          <BoardListItem
            key={board._id}
            board={board}
            isActive={board._id === activeBoardState}
            setActiveBoard={handleActiveBoard}
          />
        </li>
      ))}
    </ul>
  );
};

export default BoardsList;
