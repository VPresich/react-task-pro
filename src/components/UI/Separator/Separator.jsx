import { useSelector } from 'react-redux';
import css from './Separator.module.css'
import { selectTheme } from '../../../redux/auth/selectors';

import clsx from 'clsx'
export default function Separator() {
    // const theme = useSelector(selectTheme);
  const theme = 'dark';
  return (
    <div className={clsx(css.separator, css[theme])}></div>
  )
}
