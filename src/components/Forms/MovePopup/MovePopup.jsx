import { useState, useEffect } from 'react';
import clsx from 'clsx';
import css from './MovePopup.module.css';
import spritePath from '../../../img/sprite.svg';
import { useSelector } from 'react-redux';
import { selectItems } from '../../../redux/columns/selectors';
import { selectTheme } from '../../../redux/auth/selectors';
import { useRef } from 'react';

function PopUp({ onClick }) {
  const [activeColumn, setActiveColumn] = useState('');
  const theme = useSelector(selectTheme);

  const handleClick = column => {
    setActiveColumn(column.title);
    onClick(column._id);
  };

  const columns = useSelector(selectItems);

  useEffect(() => {
    if (columns.length > 0) {
      setActiveColumn(columns[0].title);
    }
  }, [columns]);

  const wrapperRef = useRef(null);

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
            {columns.map(column => (
              <li
                key={column._id}
              // className={clsx({ [css.active]: activeColumn === column.title })}
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
