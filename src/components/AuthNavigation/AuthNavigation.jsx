import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const showLogin = useParams().id === 'login';

  const cssLogin = clsx(css.link, showLogin && css.linkActive);
  const cssRegister = clsx(css.link, !showLogin && css.linkActive);

  const containerHeight = clsx(css.container, showLogin && css.loginContainer);

  return (
    <div className={containerHeight}>
      <div className={css.linkContainer}>
        <div className={cssRegister}>
          <Link to="/auth/register" className={cssRegister}>
            Registration
          </Link>
        </div>

        <div className={cssRegister}>
          <Link to="/auth/login" className={cssLogin}>
            Log In
          </Link>
        </div>
      </div>

      {useParams().id === 'login' ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
