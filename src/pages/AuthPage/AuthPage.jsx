import DocumentTitle from '../../components/DocumentTitle';
import AuthNavigation from '../../components/AuthNavigation/AuthNavigation';
import css from './AuthPage.module.css';

export default function AuthPage() {
  return (
    <div className={css.container}>
      <DocumentTitle>AuthPage</DocumentTitle>
      <AuthNavigation />
    </div>
  );
}
