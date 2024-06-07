import BoardList from '../BoardList/BoardList';
import css from './SideBar.module.css'

export default function SideBar() {
  return (
    <div className={css.sidebar}>
      <BoardList/>
    </div>
  );
}
