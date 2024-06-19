import DocumentTitle from '../../components/DocumentTitle';
import { useNavigate } from 'react-router-dom';

import icon from '../../img/main-icon/app-icon.svg';
import css from './WelcomePage.module.css';
import imgPath from '../../img/png/avatar-w.png';
import GoogleBtn from '../../components/UI/GoogleBtn/GoogleBtn';

export default function WelcomePage() {
  const navigate = useNavigate();
  return (
    <>
      <DocumentTitle>Welcome</DocumentTitle>
      <div className={css.welcomeContainer}>
        <div className={css.welcomeWrapper}>
          <img src={imgPath} alt="avatar-w" className={ css.avatar} />

          <div className={css.welcomeContent}>
            <div className={css.logoPage}>
              <img src={icon} alt="logo" className={ css.iconHome} />
              {/* <svg className={css.iconHome} >
                <image href={icon} />
              </svg> */}
              <p className={css.mainTitle}>Task Pro</p>
            </div>

            <p className={css.text}>
              Supercharge your productivity and take control of your tasks with
              Task Pro - Don &apos;t wait, start achieving your goals now!
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
              <GoogleBtn />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
