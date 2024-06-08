// import { useState } from 'react';
import DocumentTitle from '../../components/DocumentTitle';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
// import RegisterForm from '../../components/RegisterForm/RegisterForm';
// import LoginForm from '../../components/LoginForm/LoginForm';
// import css from './AuthPage.module.css';

export default function AuthPage() {
  // const [isRegister, setIsRegister] = useState(false);

  return (
    <div>
      <DocumentTitle>AuthPage</DocumentTitle>

      {/* {isRegister ? <RegisterForm /> : <LoginForm />}

      <button onClick={() => setIsRegister(!isRegister)} className={css.button}>
        {isRegister ? 'LogIn' : 'Registration'}
      </button> */}
      <AuthNavigation />
    </div>
  );
}
