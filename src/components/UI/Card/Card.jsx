import { useState } from 'react';
import { useSelector } from 'react-redux';
import spritePath from '../../../img/sprite.svg';
import styles from './Card.module.css';
import { deleteTask } from '../../../redux/tasks/operations';
import { useDispatch } from 'react-redux';
import { selectTheme } from '../../../redux/auth/selectors';
import clsx from 'clsx';
import { isDeadlineSoon, getPriorityClasses } from './utils';
import EditCardModal from '../../EditCardModal/EditCardModal';
import MoveCardModal from '../../MoveCardModal/MoveCradModal';

export default function Card({
  title,
  description,
  id,
  priority,
  deadline,
  column,
}) {
  const dispatch = useDispatch();
  const priorityClass = getPriorityClasses(priority);
  const theme = useSelector(selectTheme);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForMove, setModalForMove] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMove = () => {
    setModalForMove(true);
    openModal();
  };

  const handleEdit = () => {
    setModalForMove(false);
    openModal();
  };

  const handleDelete = () => {
    dispatch(deleteTask(id));
  };

  return (
    <div
      className={clsx(styles.card, styles[theme], styles[priorityClass])}
      id={`card-${id}`}
    >
      <h2 className={clsx(styles.cardTitle, styles[theme])}>{title}</h2>

      <p
        className={clsx(
          styles.containerCard,
          styles.cardDescription,
          styles[theme]
        )}
      >
        {description}
      </p>

      <div className={clsx(styles.cardLine, styles[theme])}></div>
      <div className={styles.cardInfo}>
        <div className={styles.priorityContainer}>
          <div className={clsx(styles.cardPriority, styles[theme])}>
            <strong>Priority:</strong>{' '}
            <div
              className={clsx(
                styles.circle,
                styles[theme],
                styles[priorityClass]
              )}
            ></div>
            <span className={clsx(styles.strongPriority, styles[theme])}>
              {}
            </span>
          </div>
        </div>

        <p className={clsx(styles.cardDeadline, styles[theme])}>
          <strong>Deadline:</strong>{' '}
          <span className={clsx(styles.strongDeadline, styles[theme])}>
            {deadline}
          </span>
        </p>
      </div>

      <div className={styles.icon}>
        {isDeadlineSoon(deadline) && (
          <svg
            className={styles.bell}
            width="16"
            height="16"
            aria-label="btn icon"
          >
            <use href={`${spritePath}#icon-bell-01`} />
          </svg>
        )}

        <svg
          className={clsx(styles.color, styles[theme])}
          width="16"
          height="16"
          aria-label="btn icon"
          onClick={handleMove}
        >
          <use href={`${spritePath}#icon-arrow`} />
        </svg>

        <svg
          className={clsx(styles.color, styles[theme])}
          width="16"
          height="16"
          aria-label="btn icon"
          onClick={handleEdit}
        >
          <use href={`${spritePath}#icon-pencil`} />
        </svg>

        <svg
          className={clsx(styles.color, styles[theme])}
          width="16"
          height="16"
          aria-label="btn icon"
        >
          <use href={`${spritePath}#icon-trash`} onClick={handleDelete} />
        </svg>
      </div>

      {isModalOpen && !modalForMove && (
        <EditCardModal
          onClose={closeModal}
          card={{ title, description, id, priority, deadline }}
          column={column}
        />
      )}

      {isModalOpen && modalForMove && (
        <MoveCardModal onClose={closeModal} cardId={id} />
      )}
    </div>
  );
}
