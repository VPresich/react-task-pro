import { useDispatch } from 'react-redux';
import { register } from '../../../redux/auth/operations';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../../UI/Button/Button';

import { feedbackSchema } from '../LoginForm/feedbackSchema';
import { errNotify, successNotify } from '../../../notification/notification';

import css from './RegisterForm.module.css';

export default function RegisterForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(register(values))
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
          <div>
            <Field
              type="text"
              name="name"
              placeholder="Enter your name"
              className={css.field}
            />
            <ErrorMessage name="name" component="span" className={css.error} />
          </div>

          <div>
            <Field
              type="email"
              name="email"
              placeholder="Enter your email"
              className={css.field}
            />
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>

          <div className={css.fieldContainer}>
            <Field
              type="password"
              name="password"
              placeholder="Create password"
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

        <Button text="Reegister Now" />
      </Form>
    </Formik>
  );
}
