import { useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const cssLogin = clsx(css.btn, !showLoginForm && css.btnActive);
  const cssRegister = clsx(css.btn, showLoginForm && css.btnActive);

  const handleRegistrationClick = () => {
    navigate('/auth/register');
    setShowLoginForm(false);
  };

  const handleLoginClick = () => {
    navigate('/auth/login');
    setShowLoginForm(true);
  };

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
      {showLoginForm ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
