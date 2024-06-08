import React from 'react';

import spritePath from '../../../img/sprite.svg';
import styles from './Card.module.css';
import { deleteTask } from '../../../redux/tasks/operations';
import { useDispatch } from 'react-redux';
// import { selectAllTasks } from "../../redux/tasks/selectors";

export default function Card({ title, description, id, priority, deadline }) {
  const isDeadlineSoon = deadline => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const timeDifference = deadlineDate - now;
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    return hoursDifference <= 24;
  };
  // const tasks = useSelector(selectAllTasks);
  const dispatch = useDispatch();
  const handleCard = () => {
    dispatch(deleteTask(id));
  };
  return (
    <div className={styles.card} 
       style={{ border: "none", borderLeft: "4px solid #8FA1D0" }} 
       id={`card-${id}`}
  >
      <div className={styles.leftBar}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <div className={styles.containerCard}>
        <p className={styles.cardDescription}>{description}</p>
      </div>

      <div className={styles.cardLine}></div>
      <div className={styles.cardInfo}>
      <div className={styles.priorityContainer}>
        <svg
          className={styles.ellipse}
          width="16"
          height="16"
          aria-label="btn icon"
          style={{ position: "absolute", left: "3px", top:"14px",stroke:" #ccc",
            fill: "#8fa1d0" }} 
        >
          <use href={`${spritePath}#icon-Ellipse`} />
        </svg>
        <p className={styles.cardPriority}>
          <strong className={styles.strongPriority}>Priority:</strong>{' '}
          {priority}
        </p>
      </div>
        
        <p className={styles.cardDeadline}>
          <strong className={styles.strongDeadline}>Deadline:</strong>{' '}
          {deadline}
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
          className={styles.color}
          width="16"
          height="16"
          aria-label="btn icon"
        >
          <use href={`${spritePath}#icon-arrow`} />
        </svg>
        <svg
          className={styles.color}
          width="16"
          height="16"
          aria-label="btn icon"
        >
          <use href={`${spritePath}#icon-pencil-01`} />
        </svg>

        <svg
          className={styles.color}
          width="16"
          height="16"
          aria-label="btn icon"
        >
          <use href={`${spritePath}#icon-trash-04`} onClick={handleCard} />
        </svg>
      </div>
      </div> 
    </div>
    
  );
}
