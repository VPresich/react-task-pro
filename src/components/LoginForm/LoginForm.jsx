// import { useDispatch } from 'react-redux';
// import { logIn } from '../../redux/auth/operations';
// import { Formik, Form } from 'formik';
// import FormField from '../FormField/FormField';
// import CustomButton from '../CustomButton/CustomButton';
// import {
//   INITIAL_LOGIN,
//   CAPTION_LOGIN,
//   LABEL_EMAIL,
//   LABEL_PASSWORD,
// } from './constants';
// import { feedbackSchema } from './feedback-schema';
// import { errNotify, successNotify } from '../../notification/notification';
// import { ERR_LOGIN, SUCCESS_LOGIN } from '../../notification/constants';
// import css from './LoginForm.module.css';

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

// import { useDispatch } from 'react-redux';
// import { logIn } from '../../redux/auth/operations';
// import { Formik, Form } from 'formik';
// import Input from '../UI/Input/Input';
// import Button from '../UI/Button/Button';
// import { INITIAL_LOGIN } from './constants';
// import { feedbackSchema } from './feedback-schema';
// import { errNotify, successNotify } from '../../notification/notification';
// import { ERR_LOGIN, SUCCESS_LOGIN } from '../../notification/constants';
// import css from './LoginForm.module.css';

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
//     <div className={css.formContent}>
//       <Formik
//         initialValues={INITIAL_LOGIN}
//         onSubmit={handleSubmit}
//         validationSchema={feedbackSchema}
//       >
//         <Form className={css.form}>
//           <div className={css.buttonWrapper}>
//             <button className={css.btnResister}>REGISTRATION</button>
//             <button className={css.btnLogin}>LOG IN</button>
//           </div>
//           <div className={css.info}>
//             <Input type="email" name="email" onPlaceholder="Enter your Email" />
//             <Input
//               type="password"
//               name="password"
//               onPlaceholder="Enter your Password"
//               autoComplete="current-password"
//             />
//           </div>
//           <Button
//             text="Log in Now"
//             big={false}
//             type="submit"
//             onClick={() => {
//               console.log('clicked');
//             }}
//           />
//         </Form>
//       </Formik>
//     </div>
//   );
// }
// import AuthNavigation from '../../components/AuthNavigation/AuthNavigation';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { Formik, Form, Field } from 'formik'; // import Field отдельно
import Button from '../UI/Button/Button';
import { INITIAL_LOGIN, LABEL_EMAIL, LABEL_PASSWORD } from './constants';
import { feedbackSchema } from './feedback-schema';
import { errNotify, successNotify } from '../../notification/notification';
import { ERR_LOGIN, SUCCESS_LOGIN } from '../../notification/constants';
import css from './LoginForm.module.css';

function CustomField({ name, type, placeholder, className }) {
  // remove children from here. it's no longer needed as we have placeholder.
  return (
    <Field
      type={type}
      name={name}
      placeholder={placeholder}
      className={className}
    />
  );
}

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
            {/* <AuthNavigation /> */}
            <button className={css.registerBtn}>REGISTRATION</button>
            <button className={css.loginBtn}>LOG IN</button>
          </div>
          <div className={css.info}>
            <CustomField
              type="email" // changed type from text to email
              name="email"
              placeholder={LABEL_EMAIL} // use LABEL_EMAIL directly as placeholder
              className={css.linkEmail}
            />
            <CustomField
              type="password" // changed type from text to password
              name="password"
              placeholder={LABEL_PASSWORD}
              autoComplete="current-password"
              className={css.linkPassword}
            />
          </div>

          <Button
            text="Log in Now"
            big={false}
            type="submit"
            className={css.buttonLogin}
            onClick={() => {
              console.log('clicked');
            }}
          />
        </Form>
      </Formik>
    </div>
  );
}
