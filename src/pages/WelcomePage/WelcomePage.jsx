import DocumentTitle from '../../components/DocumentTitle';
import css from './WelcomePage.module.css';
`import '../../css/utils/fonts.css';`;
import CustomButton from '../../components/CustomButton/CustomButton';
import { Link } from 'react-router-dom';
import mainDesktop1x from '../../img/main-avatar/main_desktop@1x.jpg';
import mainDesktop2x from '../../img/main-avatar/main_desktop@2x.jpg';
import icon from '../../img/main-icon/app-icon.svg';

export default function WelcomePage() {
  return (
    <>
      <DocumentTitle>Welcome</DocumentTitle>
      <div className={css.welcomeContainer}>
        <div className={css.welcomeWrapper}>
          <img
            src={mainDesktop1x}
            srcSet={`${mainDesktop1x} 1x, ${mainDesktop2x} 2x`}
            alt="Task Pro"
            className={css.mainImage}
          />
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
              <br /> Pro - Don`t wait, start achieving your goals now!
            </p>

            <div className={css.linkWrapperRegister}>
              <Link to="/register">
                <CustomButton className={css.button1}>
                  Registration
                </CustomButton>
              </Link>
            </div>
            <div className={css.linkWrapperLogin}>
              <Link to="/login">
                <CustomButton className={css.button2}>Log In</CustomButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
