import css from './Logo.module.css';
import spritePath from "../../img/sprite.svg";
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors';

export default function Logo() {
  const theme = useSelector(selectTheme);
  // const theme = 'dark';

  return (
    <div className={css.logoContainer}>
      <div className={clsx(css.iconContainer, css[theme])}>
        <svg
            className={clsx(css.icon, css[theme])}
            width="12"
            height="16"
            aria-label="logo icon"
          >
            <use href={`${spritePath}#icon-lightning-logo`} />
          </svg>
      </div>
      <p className={clsx(css.logoText, css[theme])}>TaskPro</p>
    </div>
  );
}
