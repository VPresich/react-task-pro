import { useSelector } from 'react-redux';
import css from './Button.module.css';
import { selectTheme } from '../../../redux/auth/selectors';
import clsx from 'clsx';
import spritePath from '../../../img/sprite.svg';
export default function Button({ icon, text, big, onClick }) {
  const theme = useSelector(selectTheme);
  return (
      <button
          className={clsx(css.btn, css[theme], { [css.big]: big })}
          onClick={onClick}>
      {icon && (
        <div className={clsx(css.iconContainer, css[theme])}>
          <svg
            className={clsx(css.icon, css[theme])}
            width="14"
            height="14"
            aria-label="btn icon"
          >
            <use href={`${spritePath}#${icon}`} />
          </svg>
        </div>
          )}
      {text && <span className={css.text}>{text}</span>}
    </button>
  );
}

//Usage example
//  <Button icon='icon-plus' text='my text here' />  => height = 49px
//  <Button icon='icon-plus' text='my text here' big={true} onClick={()=>{console.log('clicked')}} />  => height = 56px