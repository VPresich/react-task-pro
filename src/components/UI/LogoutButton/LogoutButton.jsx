import css from './LogoutButton.module.css'
import spritePath from "../../../img/sprite.svg";
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/auth/operations';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/auth/selectors';
import clsx from 'clsx';

export default function LogoutButton() {
  const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
  // const theme = 'dark';
  return (
    <div>
      <button
        className={clsx(css.btn, css[theme])}
        onClick={() => dispatch(logOut())}
      >
        <span className={css.span}>
          <svg
                className={clsx(css.icon, css[theme])}
                width="32"
                height="32"
                aria-label="question mark"
              >
                <use href={`${spritePath}#icon-logout`} />
          </svg>
        </span>
        <span className={css.span}>Log out</span> 
      </button>
    </div>
  )
}
