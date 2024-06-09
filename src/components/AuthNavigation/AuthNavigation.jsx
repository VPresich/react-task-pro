import { useParams, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const showLogin = useParams().param === 'login';
  console.log(useParams);

  const navigate = useNavigate();
  const handleRegistrationClick = () => {
    navigate('/auth/register');
  };

  const handleLoginClick = () => {
    navigate('/auth/login');
  };

  const cssLogin = clsx(css.btn, !showLogin && css.btnActive);
  const cssRegister = clsx(css.btn, showLogin && css.btnActive);

  return (
    <div className={css.container}>
      <div className={css.btnContainer}>
        <button className={cssRegister} onClick={handleRegistrationClick}>
          Registration
        </button>

        <button className={cssLogin} onClick={handleLoginClick}>
          Log In
        </button>
      </div>
      {showLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
