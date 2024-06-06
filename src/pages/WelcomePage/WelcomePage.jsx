import DocumentTitle from '../../components/DocumentTitle';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import css from './WelcomePage.module.css';

import Logo from '../../components/Logo/Logo';

import mainDesktop1x from '../../img/main-avatar/main_desktop@1x.jpg';
import mainDesktop2x from '../../img/main-avatar/main_desktop@2x.jpg';

export default function WelcomePage() {
  return (
    <>
      <DocumentTitle>Welcome</DocumentTitle>

      <div className={css.welcomeWrapper}>
        <img
          src={mainDesktop1x}
          srcSet={`${mainDesktop1x} 1x, ${mainDesktop2x} 2x`}
          alt="Task Pro"
          className={css.mainImage}
        />
        <div className={css.welcomeContent}>
          <div className={css.logoPage}>
            <Logo />
            <h1 className={css.mainTitle}>Task Pro</h1>
          </div>
          <p className={css.text}>
            Supercharge your productivity and take control of your tasks with
            Task
            <br /> Pro - Don`t wait, start achieving your goals now!
          </p>
          <div className={css.linkWrapper}>
            <RegisterForm
              to="/registration"
              className={css.linkRegistration}
              Registration
            />
            <LoginForm to="/login" className={css.linkLogIn} Log In />
          </div>
        </div>
      </div>
    </>
  );
}
