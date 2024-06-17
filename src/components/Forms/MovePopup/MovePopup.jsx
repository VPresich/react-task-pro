import { useState } from 'react';
import clsx from 'clsx';
import css from './MovePopup.module.css';
import spritePath from '../../../img/sprite.svg';
import { useSelector } from 'react-redux';
import { selectItems } from '../../../redux/columns/selectors';
import { selectTheme } from '../../../redux/auth/selectors';
import { useRef } from 'react';
import { selectAllTasks } from '../../../redux/tasks/selectors';

function PopUp({ onClick, cardId }) {
  const theme = useSelector(selectTheme);
  const tasks = useSelector(selectAllTasks);
  const columns = useSelector(selectItems);
  const wrapperRef = useRef(null);

  const activeTask = tasks.find((task) => task._id===cardId)
  const activeCol = columns.find((col) => col._id === activeTask.column);

  const [activeColumn, setActiveColumn] = useState(activeCol.title); 

  const handleClick = column => {
    setActiveColumn(column.title);
    onClick(column._id);
  };

  const availableColumns = columns.filter((col) => col._id !== activeCol._id);
  
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onClick();
    }
  };

  return (
    <div className={css.wrapper} onClick={handleClickOutside}>
      <div className={clsx(css.popupDiv, css[theme])} ref={wrapperRef}>
          <div className={css.columnContent}>
            <ul className={css.columnMenu}>
              {availableColumns.map(column => (
                <li
                  key={column._id}
                >
                  <button
                    className={css.columnBtn}
                    onClick={() => handleClick(column)}
                  >
                    <p className={activeColumn === column.title ? clsx(css.titleColumn, css[theme], css.active) : clsx(css.titleColumn, css[theme])}>{column.title}</p>{' '}
        
                    <svg
                      className={activeColumn === column.title ? clsx(css.arrow, css[theme], css.active) : clsx(css.arrow, css[theme])}
                      width="16"
                      height="16"
                      aria-label="btn icon"
                    >
                      <use href={`${spritePath}#icon-arrow`} />
                    </svg>
                  
                  </button>
                </li>
              ))}
            </ul>
          </div>
      </div>
    </div>
  );
}

export default PopUp;
