import React from 'react';
import { RxPencil1 } from 'react-icons/rx';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { HiOutlineBell } from 'react-icons/hi2';
import { HiMiniArrowRightOnRectangle } from 'react-icons/hi2';

import styles from './Card.module.css';

export default function Card({ title, description, id, priority, deadline }) {
  return (
    <div className={styles.card} id={`card-${id}`}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardDescription}>{description}</p>
      <div className={styles.cardLine}></div>
      <div className={styles.cardInfo}>
        <p className={styles.cardPriority}>
          <strong>Priority:</strong> {priority}
        </p>
        <p className={styles.cardDeadline}>
          <strong>Deadline:</strong> {deadline}
        </p>
      </div>
      <div className={styles.icon}>
        <HiOutlineBell />
        <HiMiniArrowRightOnRectangle />
        <RxPencil1 />
        <RiDeleteBin7Line />
      </div>
    </div>
  );
}
