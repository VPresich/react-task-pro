import DocumentTitle from '../../components/DocumentTitle';
//import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
// import css from './WelcomePage.module.css';

export default function WelcomePage() {
  return (
    <>
      <DocumentTitle>Welcome</DocumentTitle>
      <h2>Welcome page</h2>
      <RegisterForm />
    </>
  );
}
