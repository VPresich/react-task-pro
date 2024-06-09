import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { Formik, Form } from 'formik';
import FormField from '../FormField/FormField';

import Button from '../UI/Button/Button';
import { INITIAL_LOGIN, LABEL_EMAIL, LABEL_PASSWORD } from './constants';
import { feedbackSchema } from './feedback-schema';
import { errNotify, successNotify } from '../../notification/notification';
import { ERR_LOGIN, SUCCESS_LOGIN } from '../../notification/constants';
import css from './LoginForm.module.css';

export default function LoginForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        successNotify(SUCCESS_LOGIN);
        actions.resetForm();
      })
      .catch(err => {
        errNotify(ERR_LOGIN + err.message);
      });
  };

  return (
    <div className={css.formContent}>
      <Formik
        initialValues={INITIAL_LOGIN}
        onSubmit={handleSubmit}
        validationSchema={feedbackSchema}
      >
        <Form className={css.form}>
          <div className={css.buttonWrapper}>
            <button className={css.btnResistr}>REGISTRATION</button>
            <button className={css.btnLogin}>LOG IN</button>
          </div>

          <div className={css.info}>
            <FormField type="email" name="email" styles={css}>
              {LABEL_EMAIL}
            </FormField>
            <FormField
              type="password"
              name="password"
              styles={css}
              autoComplete="current-password"
            >
              {LABEL_PASSWORD}
            </FormField>
          </div>

          <Button
            text="Log in Now"
            big={false}
            type="submit"
            onClick={() => {
              console.log('clicked');
            }}
          />
        </Form>
      </Formik>
    </div>
  );
}

// export default function LoginForm() {
//   const dispatch = useDispatch();
//   const handleSubmit = (values, actions) => {
//     dispatch(logIn(values))
//       .unwrap()
//       .then(() => {
//         successNotify(SUCCESS_LOGIN);
//         actions.resetForm();
//       })
//       .catch(err => {
//         errNotify(ERR_LOGIN + err.message);
//       });
//   };

//   return (
//     <Formik
//       initialValues={INITIAL_LOGIN}
//       onSubmit={handleSubmit}
//       validationSchema={feedbackSchema}
//     >
//       <Form className={css.form}>
//         <div className={css.info}>
//           <FormField type="email" name="email" styles={css}>
//             {LABEL_EMAIL}
//           </FormField>
//           <FormField
//             type="password"
//             name="password"
//             styles={css}
//             autoComplete="current-password"
//           >
//             {LABEL_PASSWORD}
//           </FormField>
//         </div>
//         <CustomButton type="submit">{CAPTION_LOGIN}</CustomButton>
//       </Form>
//     </Formik>
//   );
// }
