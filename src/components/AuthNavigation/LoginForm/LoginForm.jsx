import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { logIn } from '../../../redux/auth/operations';
import Button from '../../UI/Button/Button';

import { feedbackSchema } from './feedbackSchema';
import { errNotify, successNotify } from '../../../notification/notification';
import css from './LoginForm.module.css';
import { ERR_LOGIN, SUCCESS_LOGIN } from '../constants';
import Input from '../../UI/Input/Input';

export default function LoginForm() {
  const dispatch = useDispatch(SUCCESS_LOGIN);

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        successNotify();
        actions.resetForm();
      })
      .catch(() => {
        errNotify(ERR_LOGIN);
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
          <Input onName={'email'} onPlaceholder={'Enter your email'} color='rgba(255, 255, 255, 0.5)'/>
          <Input onName={'password'} onPlaceholder={'Confirm a password'} type='password' color='rgba(255, 255, 255, 0.5)'/>
        </div>
        <Button text="Log In Now" type="submit" />
      </Form>
    </Formik>
  );
}
