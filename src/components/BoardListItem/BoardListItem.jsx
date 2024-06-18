import css from './BoardListItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors';
import spritePath from '../../img/sprite.svg';
import clsx from 'clsx';
import { deleteBoard } from '../../redux/boards/operations';
import { errNotify, successNotify } from '../../notification/notification';
import {
  ERR_BOARD_DELETE,
  SUCCESS_BOARD_DELETE,
} from '../../notification/constants';
import { useState, useEffect } from 'react';
import EditBoardModal from '../EditBoardModal/EditBoardModal';
import EllipsisText from 'react-ellipsis-text';
import { useNavigate } from 'react-router-dom';
import { setActiveBoard } from '../../redux/boards/slice';

const BoardListItem = ({ board, isActive, handleActiveBoard }) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const { _id, title, icon } = board;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 375);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleResize = () => {
    setIsDesktop(window.innerWidth > 375);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDelete = id => {
    dispatch(deleteBoard(id))
      .unwrap()
      .then(() => {
        successNotify(SUCCESS_BOARD_DELETE);
        dispatch(setActiveBoard(null));
        navigation('/');
      })
      .catch(err => {
        errNotify(ERR_BOARD_DELETE + err.message);
      });
  };

  const handleEdit = () => {
    openModal();
  };

  const getLength = () => {
    if (isDesktop) {
      return isActive ? 17 : 25;
    }
    return isActive ? 13 : 20;
  };

  return (
    <div
      className={
        isActive
          ? clsx(css.container, css[theme], css.active)
          : clsx(css.container, css[theme])
      }
      onClick={() => handleActiveBoard(_id)}
    >
      <div className={css.titleContainer}>
        <svg
          className={
            isActive
              ? clsx(css.icon, css[theme], css.active)
              : clsx(css.icon, css[theme])
          }
          width="18"
          height="18"
          aria-label="btn icon"
        >
          <use href={`${spritePath}#${icon}`} />
        </svg>
        <EllipsisText
          text={title}
          length={getLength()}
          className={
            isActive
              ? clsx(css.title, css[theme], css.active)
              : clsx(css.title, css[theme])
          }
        />
      </div>

      <div
        className={
          isActive
            ? clsx(css.controls, css[theme], css.active)
            : clsx(css.controls, css[theme])
        }
      >
        <button className={css.btn} onClick={handleEdit}>
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
      <div
        className={
          isActive
            ? clsx(css.border, css[theme], css.active)
            : clsx(css.border, css[theme])
        }
      ></div>
      {isModalOpen && <EditBoardModal board={board} onClose={closeModal} />}
    </div>
  );
};

export default BoardListItem;
