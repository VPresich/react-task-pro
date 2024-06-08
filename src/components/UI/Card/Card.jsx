import React from 'react';
import { useSelector } from 'react-redux';
import spritePath from '../../../img/sprite.svg';
import styles from './Card.module.css';
import { deleteTask } from '../../../redux/tasks/operations';
import { useDispatch } from 'react-redux';
import { selectTheme } from '../../../redux/auth/selectors';
import clsx from 'clsx';

export default function Card({ title, description, id, priority, deadline }) {
  const theme = useSelector(selectTheme);
  const isDeadlineSoon = deadline => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const timeDifference = deadlineDate - now;
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    return hoursDifference <= 24;
  };
  const dispatch = useDispatch();
  const handleCard = () => {
    dispatch(deleteTask(id));
  };
  return (
    <div
      className={clsx(styles.card, styles[theme])}
      style={{ border: 'none', borderLeft: '4px solid #8FA1D0' }}
      id={`card-${id}`}
    >
        <h2 className={clsx(styles.cardTitle,styles[theme])}>{title}</h2>
        <div className={styles.containerCard}>
          <p className={clsx(styles.cardDescription,styles[theme])}>{description}</p>
        </div>

        <div className={clsx(styles.cardLine,styles[theme])}></div>
        <div className={styles.cardInfo}>
          <div className={styles.priorityContainer}>
            <svg
              className={styles.ellipse}
              width="16"
              height="16"
              aria-label="btn icon"
              style={{
                position: 'absolute',
                left: '3px',
                top: '14px',
                fill: '#8FA1D0',
              }}
            >
              <use href={`${spritePath}#icon-Ellipse`} />
            </svg>
            <p className={clsx(styles.cardPriority,styles[theme])}>
              <strong >Priority:</strong>{' '}
             <span className={clsx(styles.strongPriority,styles[theme])}>{priority} </span> 
            </p>
          </div>

          <p className={clsx(styles.cardDeadline,styles[theme])}>
            <strong >Deadline:</strong>{' '}
            <span className={clsx(styles.strongDeadline,styles[theme])}>{deadline}</span>
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
            className={clsx(styles.color,styles[theme])}
            width="16"
            height="16"
            aria-label="btn icon"
          >
            <use href={`${spritePath}#icon-arrow`} />
          </svg>
          <svg
            className={clsx(styles.color,styles[theme])}
            width="16"
            height="16"
            aria-label="btn icon"
          >
            <use href={`${spritePath}#icon-pencil`} />
          </svg>

          <svg
            className={clsx(styles.color,styles[theme])}
            width="16"
            height="16"
            aria-label="btn icon"
          >
            <use href={`${spritePath}#icon-trash`} onClick={handleCard} />
          </svg>
        </div>
      
    </div>
  );
}
