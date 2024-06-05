import { Link } from 'react-router-dom';
import DocumentTitle from '../../components/DocumentTitle';
// import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <>
      <DocumentTitle>NotFound Page</DocumentTitle>
      <h2>NotFound Page</h2>
      <Link to="/welcome">Back to Welcome</Link>
    </>
  );
};
export default NotFoundPage;
