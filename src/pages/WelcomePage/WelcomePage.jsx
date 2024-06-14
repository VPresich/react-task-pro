import DocumentTitle from '../../components/DocumentTitle';
import { useNavigate } from 'react-router-dom';

import icon from '../../img/main-icon/app-icon.svg';
import css from './WelcomePage.module.css';
import imgPath from '../../img/png/avatar-w.png';

export default function WelcomePage() {
  const navigate = useNavigate();
  return (
    <>
      <DocumentTitle>Welcome</DocumentTitle>
      <div className={css.welcomeContainer}>
        <div className={css.welcomeWrapper}>
          <img src={imgPath} alt="avatar-w" />

          <div className={css.welcomeContent}>
            <div className={css.logoPage}>
              <svg className="iconHome" width="48px" height="48px">
                <image href={icon} width="48px" height="48px" />
              </svg>
              <h1 className={css.mainTitle}>Task Pro</h1>
            </div>

            <p className={css.text}>
              Supercharge your productivity and take control of your tasks with
              Task
              <br /> Pro - Don &apos;t wait, start achieving your goals now!
            </p>

            <div className={css.btnWrapper}>
              <button
                className={css.btnRegister}
                onClick={() => navigate('/auth/register')}
              >
                Register
              </button>

              <button
                className={css.btnLogin}
                onClick={() => navigate('/auth/login')}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
