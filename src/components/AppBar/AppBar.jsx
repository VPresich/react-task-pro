import { useSelector } from 'react-redux';
import UserMenu from '../../components/UserMenu/UserMenu';
import { selectTheme } from '../../redux/auth/selectors';
import css from './AppBar.module.css';
import clsx from 'clsx';

export default function AppBar() {

  const theme = useSelector(selectTheme);

  return (
    <header className={clsx(css.header, css[theme])}>
      <UserMenu />
    </header>
  );
}
