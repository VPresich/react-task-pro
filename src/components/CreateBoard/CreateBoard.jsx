import css from './CreateBoard.module.css'
import spritePath from '../../img/sprite.svg';
import { useSelector } from 'react-redux';
import Separator from '../UI/Separator/Separator';
import { selectTheme } from '../../redux/auth/selectors';
import clsx from 'clsx';

export default function CreateBoard() {
  const theme = useSelector(selectTheme);
  // const theme = 'violet';
  const handleCreate = () => {
    console.log('create board modal')
    // open create modal
  }
  return (
    <div className={css.container}>
      <Separator />
        <div className={css.contents}>
          <p className={clsx(css.text, css[theme])}>Create a new board</p>
        <button
          className={clsx(css.btn, css[theme])}
          onClick={handleCreate}
        >
            <span className={css.iconContainer}>
              <svg
                  className={clsx(css.icon, css[theme.toLowerCase()])}
                  width="20"
                  height="20"
                  aria-label="btn icon"
                >
                  <use href={`${spritePath}#icon-plus`} />
              </svg>
            </span>
          </button>
        </div>
      <Separator/>
    </div>
  )
}
