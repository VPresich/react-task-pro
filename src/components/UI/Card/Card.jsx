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
import PopUp from '../../PopUp/PopUp';
import LinesEllipsis from 'react-lines-ellipsis';
import EllipsisText from "react-ellipsis-text";

export default function Card({
  title,
  description,
  id,
  priority,
  deadline,
  column,
}) {
  // const { title, description, id, priority, deadline } = item;
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const handleCard = () => {
    dispatch(deleteTask(id));
  };
  const priorityClass = getPriorityClasses(priority);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [modalOpenArrow, setModalOpenArrow] = useState(false);

  const openModalArrow = () => {
    console.log('create Arrow modal');
    setModalOpenArrow(true);
  };

  const closeModalArrow = () => {
    setModalOpenArrow(false);
  };
  return (
    <div
      className={clsx(styles.card, styles[theme], styles[priorityClass])}
      id={`card-${id}`}
    >
      <EllipsisText text={title} length={50}  className={clsx(styles.cardTitle, styles[theme])}/>
  
      <LinesEllipsis
        text={description}
        maxLine='2'
        ellipsis='...'
        trimRight
        basedOn='letters'
        component='p'
         className={clsx(
          styles.containerCard,
          styles.cardDescription,
          styles[theme]
        )}
      />

      <div className={clsx(styles.cardLine, styles[theme])}></div>
      <div className={styles.cardBottom}>
        
        <div className={styles.cardInfo}>
          <div className={styles.priorityContainer}>
            <div className={clsx(styles.cardPriority, styles[theme])}>
              <strong>Priority:</strong>{' '}
              <div className={styles.priority}>
              <div
                className={clsx(
                  styles.circle,
                  styles[theme],
                  styles[priorityClass]
                )}
              ></div>
              <p className={clsx(styles.strongPriority, styles[theme])}>
                {priority}
                </p>
                </div>
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
              onClick={openModalArrow}
            >
              <use href={`${spritePath}#icon-arrow`} />
            </svg>

            <svg
              className={clsx(styles.color, styles[theme])}
              width="16"
              height="16"
              aria-label="btn icon"
              onClick={openModal}
            >
              <use href={`${spritePath}#icon-pencil`} />
            </svg>

            <svg
              className={clsx(styles.color, styles[theme])}
              width="16"
              height="16"
              aria-label="btn icon"
              onClick={handleCard}
            >
              <use href={`${spritePath}#icon-trash`}  />
            </svg>
          </div>
        </div>

      {isModalOpen && (
        <EditCardModal
          onClose={closeModal}
          card={{ title, description, id, priority, deadline }}
          column={column}
        />
      )}

      {modalOpenArrow && ( 
          <PopUp/>
      )}
    </div>
  );
}
