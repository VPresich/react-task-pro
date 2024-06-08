import { useState } from 'react';
import DocumentTitle from '../../components/DocumentTitle';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import css from './AuthPage.module.css';
import { useParams } from 'react-router-dom';

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const id = useParams();
  if (id === 'login') {
    setIsRegister(false);
  }
  else if (id === 'register') {
    setIsRegister(true);
  }

  return (
    <div>
      <DocumentTitle>AuthPage</DocumentTitle>

      {isRegister ? <RegisterForm /> : <LoginForm />}

      <button onClick={() => setIsRegister(!isRegister)} className={css.button}>
        {isRegister ? 'LogIn' : 'Registration'}
      </button>
    </div>
  );
}
