import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  selectActiveColumndId,
  selectColumnsForBoard,
} from '../../redux/columns/selectors';
import { setActiveColumn } from '../../redux/columns/slice';
import ColumnItem from '../Column/ColumnItem';
import { fetchColumnsForBoard } from '../../redux/columns/operations';
import css from './ColumnList.module.css';

const ColumnList = ({ activeBoardId }) => {
  const dispatch = useDispatch();
  const columns = useSelector(state =>
    selectColumnsForBoard(state, activeBoardId)
  );
  const activeColumn = useSelector(selectActiveColumndId);

  useEffect(() => {
    if (activeBoardId) {
      dispatch(fetchColumnsForBoard(activeBoardId));
    }
  }, [dispatch, activeBoardId]);

  const handleActiveColumn = id => {
    dispatch(setActiveColumn(id));
  };

  return (
    <ul className={css.list}>
      {columns &&
        columns.length > 0 &&
        columns.map(column => (
          <li className={css.item} key={column._id}>
            <ColumnItem
              key={column._id}
              column={column}
              isActive={column._id === activeColumn}
              setActiveColumn={() => {
                handleActiveColumn(column._id);
              }}
            />
          </li>
        ))}
    </ul>
  );
};

export default ColumnList;
