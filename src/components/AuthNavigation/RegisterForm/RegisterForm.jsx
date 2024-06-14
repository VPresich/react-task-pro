import { useDispatch } from 'react-redux';
import { register } from '../../../redux/auth/operations';
import { Formik, Form } from 'formik';
import Button from '../../UI/Button/Button';

import { feedbackSchema } from '../LoginForm/feedbackSchema';
import { errNotify, successNotify } from '../../../notification/notification';
import { ERR_REGISTRATION, SUCCESS_REGISTRATION } from '../constants';
import Input from '../../UI/Input/Input';
import css from './RegisterForm.module.css';

export default function RegisterForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        successNotify(SUCCESS_REGISTRATION);
        actions.resetForm();
      })
      .catch(() => {
        errNotify(ERR_REGISTRATION);
      });
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={feedbackSchema}
    >
      <Form className={css.form}>
        <div className={css.info}>
          <Input onName={'name'} onPlaceholder={'Enter your name'} color='rgba(255, 255, 255, 0.5)'/>
          <Input onName={'email'} onPlaceholder={'Enter your email'} color='rgba(255, 255, 255, 0.5)'/>
          <Input onName={'password'} onPlaceholder={'Confirm a password'} type='password' color='rgba(255, 255, 255, 0.5)'/>
        </div>

        <Button text="Register Now" type="submit" />
      </Form>
    </Formik>
  );
}
