import AppBar from '../../components/AppBar/AppBar';
import SideBar from '../../components/SideBar/SideBar';
import css from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={css.page}>
      <SideBar />
      <div className={css.normalWidth}>
        <AppBar />
        {children}
      </div>
    </div>
  );
}
