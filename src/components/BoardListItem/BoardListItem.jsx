import css from './BoardListItem.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors';
import spritePath from '../../img/sprite.svg';
import clsx from 'clsx';

export default function BoardListItem({ title, iconName, isActive }) {
   const theme = useSelector(selectTheme);
  return (
      <div className={css.container}>
          <div className={css.titleContainer}>
              <svg
                    className={isActive ? clsx(css.icon, css.active): css.icon}
                    width="18"
                    height="18"
                    aria-label="btn icon"
                >
                    <use href={`${spritePath}#${iconName}`} />
              </svg>
              <p className={isActive ? clsx(css.title, css.active): css.title}>{title}</p>
          </div>
          
          <div className={css.controls}>
            <button className={css.btn}>
                <svg
                    className={css.icon}
                    width="16"
                    height="16"
                    aria-label="btn icon"
                >
                    <use href={`${spritePath}#icon-pencil`} />
                </svg>
              </button>
            <button className={css.btn}>
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
          <div className={css.border}></div>
    </div>
  )
}
