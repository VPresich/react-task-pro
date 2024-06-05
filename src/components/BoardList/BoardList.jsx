import { useSelector } from 'react-redux';
import { selectItems } from '../../redux/boards/selectors';
import css from './BoardList.module.css';

const BoardsList = () => {
  const boards = useSelector(selectItems);

  return (
    <ul className={css.list}>
      {boards.map(board => (
        <li className={css.item} key={board.id}>
          <p>{board.title}</p>
        </li>
      ))}
    </ul>
  );
};

export default BoardsList;
