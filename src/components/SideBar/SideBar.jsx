import BoardList from '../BoardList/BoardList';
import CreateBoard from '../CreateBoard/CreateBoard';
import Logo from '../Logo/Logo';
import LogoutButton from '../UI/LogoutButton/LogoutButton';
import NeedHelp from '../UI/NeedHelp/NeedHelp';
import css from './SideBar.module.css'
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors';
import clsx from 'clsx';

export default function SideBar() {
  const theme = useSelector(selectTheme);
  // const theme = 'dark';
  return (
    <div className={clsx(css.sidebar, css[theme])}>
      <Logo />
      <p className={clsx(css.sidebarTitle, css[theme])}>My boards</p>
      <CreateBoard/>
      <BoardList />
      <NeedHelp />
      <LogoutButton />
      
    </div>
  );
}
