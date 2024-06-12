import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import spritePath from '../../../img/sprite.svg';
import styles from './Card.module.css';
import { deleteTask } from '../../../redux/tasks/operations';
import { useDispatch } from 'react-redux';
import { selectTheme } from '../../../redux/auth/selectors';
import clsx from 'clsx';
import { isDeadlineSoon, getPriorityClasses } from './utils';

// import ModalWindow from 'ModalWindow';
// import ModalWindow1 from 'ModalWindow';

export default function Card({ title, description, id, priority, deadline }) {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const handleCard = () => {
    dispatch(deleteTask(id));
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenArrow, setModalOpenArrow] = useState(false);
  const openModal = () => {
    console.log('create  modal');
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const openModalArrow = () => {
    console.log('create Arrow modal');
    setModalOpenArrow(true);
  };

  const closeModalArrow = () => {
    setModalOpenArrow(false);
  };
  return (
    <div
      className={clsx(styles.card, styles[theme], getPriorityClasses())}
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
                getPriorityClasses()
              )}
            ></div>
            <span className={clsx(styles.strongPriority, styles[theme])}>
              {priority}
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
        >
          <use href={`${spritePath}#icon-trash`} onClick={handleCard} />
        </svg>
      </div>

      {/* {modalOpen && <ModalWindow isOpen={modalOpen} closeModal={closeModal} />} */}
      {/* {modalOpenArrow && ( */}
      {/* // <ModalWindow2 isOpen={modalOpenArrow} closeModal={closeModalArrow} /> */}
      {/* )} */}
    </div>
  );
}
