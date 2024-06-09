import { useParams, Link } from 'react-router-dom';
import DocumentTitle from '../../components/DocumentTitle';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import css from './AuthPage.module.css';
import AuthNavigation from '../../components/AuthNavigation/AuthNavigation';

export default function AuthPage() {
  const { id } = useParams();
  const isRegister = id === 'register';

  return (
    <div>
      <DocumentTitle>AuthPage</DocumentTitle>
      <AuthNavigation />

      {isRegister ? <RegisterForm /> : <LoginForm />}
      <Link
        to={`/auth/${isRegister ? 'login' : 'register'}`}
        className={css.button}
      ></Link>
    </div>
  );
}

// import { useState } from 'react';
// import DocumentTitle from '../../components/DocumentTitle';
// import RegisterForm from '../../components/RegisterForm/RegisterForm';
// import LoginForm from '../../components/LoginForm/LoginForm';
// import css from './AuthPage.module.css';

// export default function AuthPage() {
//   const [isRegister, setIsRegister] = useState(false);

//   return (
//     <div>
//       <DocumentTitle>AuthPage</DocumentTitle>

//       {isRegister ? <RegisterForm /> : <LoginForm />}

//       <button onClick={() => setIsRegister(!isRegister)} className={css.button}>
//         {isRegister ? 'LogIn' : 'Registration'}
//       </button>
//     </div>
//   );
// }
