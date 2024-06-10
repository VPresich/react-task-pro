import clsx from 'clsx';
import { useSelector } from 'react-redux';
import spritePath from '../../img/sprite.svg';
import { selectTheme } from '../../redux/auth/selectors';
import css from './AddColumnBtn.module.css';

const AddColumnBtn = ({openModal}) => {
  const theme = useSelector(selectTheme);
  return (
    <>
      <button className={clsx(css.btn, css[theme])} onClick={openModal} type='submit'>
        <span className={clsx(css.iconSpan, css[theme])}>
          <svg
            className={clsx(css.icon, css[theme.toLowerCase()])}
            width="14"
            height="14"
            aria-label="icon plus"
          >
            <use href={`${spritePath}#icon-plus`} />
          </svg>
        </span>
        Add another column
      </button>
 
    </>
  );
};
export default AddColumnBtn;
