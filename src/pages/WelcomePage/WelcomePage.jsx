import DocumentTitle from '../../components/DocumentTitle';
//import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
// import css from './WelcomePage.module.css';

import Logo from '../../components/Logo/Logo';

export default function WelcomePage() {
  return (
    <>
      <DocumentTitle>Welcome</DocumentTitle>

      <Logo />
      <div className={css.welcomeWrapper}>
        <div className={css.welcomeContent}>
          <img
            src={WelcomeAvatar}
            alt="avatar"
            width="420"
            height="420"
            className={avatar}
            loading="lazy"
          />
          <h1 className={css.mainTitle}>Task Pro</h1>
          <p className={css.text}>
            Supercharge your productivity and take control of your tasks with
            Task Pro - Don't wait, start achieving your goals now!
          </p>
          <div className={css.linkWrapper}>
            <RegisterForm
              to="/registration"
              className={css.linkRegistration}
              Registration
            />
            <RegisterForm to="/login" className={css.linkLogIn} Log In />
          </div>
        </div>
      </div>
    </>
  );
}
