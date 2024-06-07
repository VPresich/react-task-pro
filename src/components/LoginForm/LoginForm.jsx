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
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { FormLoginStyles } from './SignInForm.styled';
import sprite from '../../assets/sprite.svg';

const LoginForm = ({ submitFunc }) => {
  const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(64).required(),
  });
  const initialValues = {
    email: '',
    password: '',
  };
  function handleSubmit(values, actions) {
    submitFunc(values);
    actions.resetForm();
  }
  function watchPassFunc(evt) {
    const evtTarget = evt.target.closest('.watchPasswordIcon').previousSibling;
    if (evtTarget.type === 'password') {
      evtTarget.type = 'text';
      evt.target.closest('SVG').firstChild.href.baseVal =
        sprite + '#eye-opened';
      return;
    }
    if (evtTarget.type === 'text') {
      evtTarget.type = 'password';
      evt.target.closest('SVG').firstChild.href.baseVal =
        sprite + '#eye-closed';
      return;
    }
  }

  return (
    <>
      <FormLoginStyles>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="form" autoComplete="off">
              <label className="label" htmlFor="email">
                Enter your email
                <br />
                <div className="input-container">
                  <Field
                    type="text"
                    name="email"
                    placeholder="Email"
                    className={
                      !(touched.email && errors.email) ? 'input' : 'errorInput'
                    }
                  />
                </div>
                <ErrorMessage className="error" name="email" component="div" />
              </label>
              <br />

              <label className="label" htmlFor="password">
                Enter your password
                <div className="input-container">
                  <Field
                    className={
                      !(touched.email && errors.email) ? 'input' : 'errorInput'
                    }
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <svg
                    className="watchPasswordIcon"
                    onClick={watchPassFunc}
                    width="16"
                    height="14"
                    stroke="#9ebbff"
                    fill="none"
                  >
                    <use href={sprite + '#eye-closed'}></use>
                  </svg>
                </div>
                <ErrorMessage
                  className="error"
                  name="password"
                  component="div"
                />
              </label>
              <br />
              <button className="buttonSignUp" type="submit">
                Sign In
              </button>
            </Form>
          )}
        </Formik>
      </FormLoginStyles>
    </>
  );
};

export default LoginForm;
