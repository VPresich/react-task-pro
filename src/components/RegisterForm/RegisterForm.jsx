import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { Formik, Form } from 'formik';
import FormField from '../FormField/FormField';
import CustomButton from '../CustomButton/CustomButton';
import {
  INITIAL_REGISTER,
  CAPTION_REGISTER,
  LABEL_NAME,
  LABEL_EMAIL,
  LABEL_PASSWORD,
} from './constants';
import { feedbackSchema } from './feedback-schema';
import { errNotify, successNotify } from '../../notification/notification';
import { ERR_REGISTER, SUCCESS_REGISTER } from '../../notification/constants';

import styles from './RegisterForm.module.css';

export default function RegisterForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        successNotify(SUCCESS_REGISTER);
        actions.resetForm();
      })
      .catch(err => {
        errNotify(ERR_REGISTER + err.message);
      });
  };

  return (
    <Formik
      initialValues={INITIAL_REGISTER}
      onSubmit={handleSubmit}
      validationSchema={feedbackSchema}
    >
      <Form className={styles.form}>
        <div className={styles.info}>
          <FormField
            type="text"
            name="name"
            styles={styles}
            autoComplete="name"
          >
            {LABEL_NAME}
          </FormField>
          <FormField
            type="email"
            name="email"
            styles={styles}
            autoComplete="email"
          >
            {LABEL_EMAIL}
          </FormField>
          <FormField
            type="password"
            name="password"
            styles={styles}
            autoComplete="current-password"
          >
            {LABEL_PASSWORD}
          </FormField>
        </div>
        <CustomButton type="submit">{CAPTION_REGISTER}</CustomButton>
      </Form>
    </Formik>
  );
}

// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as yup from 'yup';
// import { FormRegisterStyles } from './SignUpForm.styled';
// import sprite from '../../assets/sprite.svg';

// const RegisterForm = ({ submitFunc }) => {
//   const registerSchema = yup.object({
//     email: yup.string().email().required(),
//     password: yup.string().min(6).max(64).required(),
//     repeatPassword: yup
//       .string()
//       .oneOf([yup.ref('password'), null], 'Passwords must match'),
//   });
//   const initialValues = {
//     email: '',
//     password: '',
//     repeatPassword: '',
//   };

//   function handleSubmit(values, actions) {
//     submitFunc({ email: values.email, password: values.password });
//     actions.resetForm();
//   }

//   function watchPassFunc(evt) {
//     const evtTarget = evt.target.closest('.watchPasswordIcon').previousSibling;
//     if (evtTarget.type === 'password') {
//       evtTarget.type = 'text';
//       evt.target.closest('SVG').firstChild.href.baseVal =
//         sprite + '#eye-opened';
//       return;
//     }
//     if (evtTarget.type === 'text') {
//       evtTarget.type = 'password';
//       evt.target.closest('SVG').firstChild.href.baseVal =
//         sprite + '#eye-closed';
//       return;
//     }
//   }

//   return (
//     <>
//       <FormRegisterStyles>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={registerSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ errors, touched }) => (
//             <Form className="form" autoComplete="off">
//               <label className="label" htmlFor="email">
//                 Enter your email
//                 <br />
//                 <div className="input-container">
//                   <Field
//                     className={
//                       !(touched.email && errors.email) ? 'input' : 'errorInput'
//                     }
//                     type="text"
//                     name="email"
//                     placeholder="Email"
//                   />
//                 </div>
//                 <ErrorMessage className="error" name="email" component="div" />
//               </label>
//               <br />

//               <label className="label" htmlFor="password">
//                 Enter your password
//                 <div className="input-container">
//                   <Field
//                     className={
//                       !(touched.email && errors.email) ? 'input' : 'errorInput'
//                     }
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                   />
//                   <svg
//                     className="watchPasswordIcon"
//                     onClick={watchPassFunc}
//                     width="16"
//                     height="14"
//                     stroke="#9ebbff"
//                     fill="none"
//                   >
//                     <use href={sprite + '#eye-closed'}></use>
//                   </svg>
//                 </div>
//                 <ErrorMessage
//                   className="error"
//                   name="password"
//                   component="div"
//                 />
//               </label>
//               <br />

//               <label className="label" htmlFor="repeatPassword">
//                 Repeat password
//                 <div className="input-container">
//                   <Field
//                     className="input"
//                     type="password"
//                     name="repeatPassword"
//                     placeholder="Repeat password"
//                   />
//                   <svg
//                     className="watchPasswordIcon"
//                     onClick={watchPassFunc}
//                     width="16"
//                     height="14"
//                     stroke="#9ebbff"
//                     fill="none"
//                   >
//                     <use href={sprite + '#eye-closed'}></use>
//                   </svg>
//                 </div>
//                 <ErrorMessage
//                   className="error"
//                   name="repeatPassword"
//                   component="div"
//                 />
//               </label>
//               <br />

//               <button className="buttonSignUp" type="submit">
//                 Sign Up
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </FormRegisterStyles>
//     </>
//   );
// };

// export default RegisterForm;
