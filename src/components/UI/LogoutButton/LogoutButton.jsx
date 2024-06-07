import React from 'react'
import css from './LogoutButton.module.css'
import spritePath from "../../../img/sprite.svg";
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/auth/operations';

export default function LogoutButton() {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        className={css.btn}
        onClick={() => dispatch(logOut())}
      >
        <span className={css.span}>
          <svg
                className={css.icon}
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
