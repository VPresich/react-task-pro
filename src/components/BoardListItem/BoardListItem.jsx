import css from './BoardListItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors';
import spritePath from '../../img/sprite.svg';
import clsx from 'clsx';
import { deleteBoard } from '../../redux/boards/operations';
import { errNotify, successNotify } from '../../notification/notification';
import { ERR_BOARD_DELETE, SUCCESS_BOARD_DELETE } from '../../notification/constants';

const BoardListItem = ({ board, isActive, setActiveBoard }) => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const { _id, title } = board;
    
    const handleDelete = (id) => {
        dispatch(deleteBoard(id))
            .unwrap()
            .then(() => {
                successNotify(SUCCESS_BOARD_DELETE);
            })
            .catch(err => {
                errNotify(ERR_BOARD_DELETE + err.message);
            });
    }

    const handleEdit = (id) => {
        console.log('edit board', id)
        // open edit modal
    }
  return (
    <div className={css.container} onClick={() => setActiveBoard(_id)}>
      <div className={css.titleContainer}>
        <svg
          className={isActive ? clsx(css.icon, css.active) : css.icon}
          width="18"
          height="18"
          aria-label="btn icon"
        >
          <use href={`${spritePath}#icon-colors`} />
        </svg>
        <p className={isActive ? clsx(css.title, css.active) : css.title}>{title}</p>
      </div>
      
      <div className={isActive ? clsx(css.controls, css.active) : css.controls}>
              <button
                  className={css.btn}
                  onClick={() => handleEdit(_id)}
              >
          <svg
            className={css.icon}
            width="16"
            height="16"
            aria-label="btn icon"
          >
            <use href={`${spritePath}#icon-pencil`} />
          </svg>
        </button>
              <button
                  className={css.btn}
                  onClick={() => handleDelete(_id)}
              >
          <svg
            className={css.icon}
            width="16"
            height="16"
            aria-label="btn icon"
          >
            <use href={`${spritePath}#icon-trash`} />
          </svg>
        </button>
      </div>
      <div className={isActive ? clsx(css.border, css.active) : css.border}></div>
    </div>
  );
};

export default BoardListItem;