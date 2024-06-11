import { useDispatch } from 'react-redux';
// import { PopUp } from '../../redux/auth/operations';
import { Formik, Form, Field } from 'formik';

import css from './PopUpForm.module.css';
import { Link } from 'react-router-dom';

return (
  <div className={css.formContent}>
    <Formik>
      <Form className={css.form}>
        <div className={css.buttonWrapper}>
          <Link to="/auth/inprogress" className={css.link}>
            In progress
          </Link>
          <Link to="/auth/done" className={css.link}>
            Done
          </Link>
        </div>
      </Form>
    </Formik>
  </div>
);
