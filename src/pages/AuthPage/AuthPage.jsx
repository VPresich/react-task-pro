import DocumentTitle from '../../components/DocumentTitle';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
//import LoginForm from '../../components/LoginForm/LoginForm';
// import css from './AuthPage.module.css';

export default function AuthPage() {
  return (
    <div>
      <DocumentTitle>AuthPage</DocumentTitle>
      <h2>Auth Page</h2>
      {/* {isRegister ? <RegisterForm /> : <LoginForm />} */}
      <RegisterForm />
    </div>
  );
}
