import DocumentTitle from '../../components/DocumentTitle';
import AuthNavigation from '../../components/AuthNavigation/AuthNavigation';
import css from './AuthPage.module.css';

export default function AuthPage() {
  return (
    <>
      <DocumentTitle>AuthPage</DocumentTitle>
      <div className={css.authContainer}>
        <AuthNavigation />
      </div>
    </>
  );
}
