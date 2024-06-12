import BoardList from '../BoardList/BoardList';
import CreateBoard from '../CreateBoard/CreateBoard';
import Logo from '../Logo/Logo';
import LogoutButton from '../UI/LogoutButton/LogoutButton';
import NeedHelp from '../UI/NeedHelp/NeedHelp';
import css from './SideBar.module.css'
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors';
import clsx from 'clsx';
import { useRef } from 'react';

export default function SideBar({isOpen, onClose}) {
  const theme = useSelector(selectTheme);
  // const theme = 'dark';
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      onClose();
    }
  };
  return (
    
    <div className={isOpen ? clsx(css.sidebarBackdrop, css.open): css.sidebarBackdrop} onClick={handleClickOutside}>
      <div className={clsx(css.sidebar, css[theme])} ref={sidebarRef}>
      <Logo />
      <p className={clsx(css.sidebarTitle, css[theme])}>My boards</p>
      <CreateBoard/>
      <BoardList />
      <NeedHelp />
      <LogoutButton />
      </div>
    </div>
  );
}
