import { useSelector } from 'react-redux';
import css from './Button.module.css';
import { selectTheme } from '../../../redux/auth/selectors';
import { clsx } from 'clsx';

export default function Button({ icon, text }) {
  const theme = useSelector(selectTheme);
//   const theme = 'Violet';
  return (
    <button className={clsx(css.btn, css[theme.toLowerCase()])}>
          {icon &&
              <div className={clsx(css.iconContainer, css[theme.toLowerCase()])}>
                  <svg
                        className={clsx(css.icon, css[theme.toLowerCase()])}
                        width="14"
                        height="14"
                        aria-label="btn icon"
                        stroke='red'
                    >
                        <use href={`./img/icons/icons.svg#${icon}`} />
                  </svg>
              </div>
          }
      {text && <span className={css.text}>{text}</span>}
    </button>
  );
}


//Usage example
//  <Button icon='icon-plus' text='my text here' />