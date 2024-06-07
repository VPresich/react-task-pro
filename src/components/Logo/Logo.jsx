import css from './Logo.module.css';
import appIcon from '../../img/main-icon/app-icon-logo.svg';

export default function Logo() {
  return (
    <div className={css.logoContainer}>
      <img src={appIcon} alt="" width='32' height='32'/>
      <p className={css.logoText}>TaskPro</p>
    </div>
  );
}
