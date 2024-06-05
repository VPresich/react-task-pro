import AppNav from '../../components/Logo/Logo';
import UserMenu from '../../components/UserMenu/UserMenu';
import css from './AppBar.module.css';

export default function AppBar() {
  return (
    <header className={css.header}>
      <AppNav />
      <UserMenu />
    </header>
  );
}
