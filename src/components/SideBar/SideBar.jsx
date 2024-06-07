import BoardList from '../BoardList/BoardList';
import CreateBoard from '../CreateBoard/CreateBoard';
import Logo from '../Logo/Logo';
import LogoutButton from '../UI/LogoutButton/LogoutButton';
import NeedHelp from '../UI/NeedHelp/NeedHelp';
import css from './SideBar.module.css'

export default function SideBar() {
  return (
    <div className={css.sidebar}>
      <Logo />
      <p className={css.sidebarTitle}>My boards</p>
      <CreateBoard/>
      <BoardList />
      <NeedHelp />
      <LogoutButton/>
    </div>
  );
}
