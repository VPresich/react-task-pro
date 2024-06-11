import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import spritePath from '../../img/sprite.svg';
import { selectTheme } from '../../redux/auth/selectors';
import Button from '../UI/Button/Button';
import css from './ColumnItem.module.css';
import {
  deleteColumnById,
  updateColumnById,
} from '../../redux/columns/operations';

import { errNotify, successNotify } from '../../notification/notification';
import { SUCCESS_DELETE, ERR_DELETE } from '../../notification/constants';
import { selectAllTasks } from '../../redux/tasks/selectors';
import Card from '../UI/Card/Card';

const ColumnItem = ({ column, setActiveColumn }) => {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  const { _id, title } = column;
  console.log(column);

  const handleUpdate = id => {
    dispatch(updateColumnById(id))
      .unwrap()
      .then(() => {
        successNotify(SUCCESS_DELETE);
      })
      .catch(err => {
        errNotify(ERR_DELETE + err.message);
      });
  };

  const handleDelete = id => {
    dispatch(deleteColumnById(id))
      .unwrap()
      .then(() => {
        successNotify(SUCCESS_DELETE);
      })
      .catch(err => {
        errNotify(ERR_DELETE + err.message);
      });
  };

  return (
    <div className={css.container} onClick={() => setActiveColumn(_id)}>
      <div className={clsx(css.colTitle, css[theme])}>
        <p>{title}</p>
        <div className={css.iconsWrap}>
          <button className={css.btn} onClick={() => handleUpdate(_id)}>
            <svg
              className={clsx(css.icon, css[theme])}
              width="16"
              height="16"
              aria-label="btn icon"
            >
              <use href={`${spritePath}#icon-pencil`} />
            </svg>
          </button>
          <button className={css.btn} onClick={() => handleDelete(_id)}>
            <svg
              className={clsx(css.icon, css[theme])}
              width="16"
              height="16"
              aria-label="btn icon"
            >
              <use href={`${spritePath}#icon-trash`} />
            </svg>
          </button>
        </div>
      </div>
      <div>
        {/* <ul className={css.list}>
          {tasks.map(task => (
            <li className={css.item} key={task.id}>
              <Card key={task.id} item={task} />
            </li>
          ))}
        </ul> */}
      </div>
      <div>
        <Button
          icon="icon-plus"
          text="Add another card"
          type="submit"
          big={true}
          // onClick={openModal}
        />
      </div>
    </div>
  );
};
export default ColumnItem;
