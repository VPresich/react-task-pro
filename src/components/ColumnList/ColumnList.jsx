import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { selectColumnsForBoard } from '../../redux/columns/selectors';
import { setActiveColumn } from '../../redux/columns/slice';
import ColumnItem from '../Column/ColumnItem';
import { fetchColumnsForBoard } from '../../redux/columns/operations';

const ColumnList = ({ activeBoardId }) => {
  const dispatch = useDispatch();
  const columns = useSelector(state =>
    selectColumnsForBoard(state, activeBoardId)
  );
  console.log(columns);
  const fetchColumnsForBoardMemoized = useMemo(() => fetchColumnsForBoard, []);
  useEffect(() => {
    if (activeBoardId) {
      dispatch(fetchColumnsForBoard(activeBoardId));
    }
  }, [dispatch, activeBoardId, fetchColumnsForBoardMemoized]);

  const handleActiveColumn = id => {
    dispatch(setActiveColumn(id));
  };

  return (
    <ul>
      {columns &&
        columns.length > 0 &&
        columns.map(column => (
          <li key={column._id}>
            <ColumnItem
              key={column._id}
              column={column}
              setActivecolumn={handleActiveColumn}
            />
          </li>
        ))}
    </ul>
  );
};

export default ColumnList;
