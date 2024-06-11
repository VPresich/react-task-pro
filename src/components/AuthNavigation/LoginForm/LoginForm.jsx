import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { logIn } from '../../../redux/auth/operations';
import Button from '../../UI/Button/Button';

import { feedbackSchema } from './feedbackSchema';
import { errNotify, successNotify } from '../../../notification/notification';
import css from './LoginForm.module.css';

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        successNotify();
        actions.resetForm();
      })
      .catch(err => {
        errNotify(err.message);
      });
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={feedbackSchema}
    >
      <Form className={css.form}>
        <div className={css.info}>
          <div className={css.fieldContainer}>
            <Field
              type="text"
              name="email"
              placeholder="Enter your email"
              autocomplete="email"
              className={css.field}
            />
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>
          <div className={css.fieldContainer}>
            <Field
              type="password"
              name="password"
              placeholder="Confirm a password"
              autoComplete="current-password"
              className={css.field}
            />

            <ErrorMessage
              name="password"
              component="span"
              className={css.error}
            />
          </div>
        </div>
        <Button text="Log In Now" type="submit" />
      </Form>
    </Formik>
  );
}
