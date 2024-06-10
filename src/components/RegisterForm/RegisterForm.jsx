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

// import { useDispatch } from 'react-redux';
// import { registration } from '../../redux/auth/operations';
// import { useId, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import clsx from 'clsx';
// import css from './RegisterForm.module.css';

// const RegisterSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Required'),
//   password: Yup.string().min(6, 'Too short!').required('Required'),
//   repeatPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match')
//     .required('Required'),
// });

// const initialValues = {
//   email: '',
//   password: '',
//   repeatPassword: '',
// };

// const RegisterForm = () => {
//   const dispatch = useDispatch();

//   const [showPassword, setShowPassword] = useState(false);
//   const [isFieldActivated, setIsFieldActivated] = useState({
//     email: false,
//     password: false,
//     repeatPassword: false,
//   });

//   const emailFieldId = useId();
//   const passwordFieldId = useId();
//   const repeatPasswordFieldId = useId();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     getValues,
//   } = useForm({
//     resolver: yupResolver(RegisterSchema),
//     defaultValues: initialValues,
//     mode: 'onChange',
//   });

//   const onSubmit = values => {
//     dispatch(
//       registration({
//         email: values.email,
//         password: values.password,
//       })
//     );
//     reset();
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleActivate = field => {
//     setIsFieldActivated({ ...isFieldActivated, [field]: !!getValues(field) });
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className={css.registerFields}>
//       <div className={css.registerFormInput}>
//         <label htmlFor={emailFieldId} className={css.fieldText}>
//           Email
//         </label>
//         <input
//           type="text"
//           id={emailFieldId}
//           placeholder="Enter your email"
//           className={clsx(css.inputField, {
//             [css.inputFieldError]: errors.email,
//             [css.inputFieldActivated]: isFieldActivated.email,
//           })}
//           {...register('email')}
//           onBlur={() => handleActivate('email')}
//         />
//         {errors.email && (
//           <span className={css.errMessage}>{errors.email.message}</span>
//         )}
//       </div>
//       <div className={css.signUpFormInput}>
//         <label htmlFor={passwordFieldId} className={css.fieldText}>
//           Password
//         </label>
//         <input
//           type={showPassword ? 'text' : 'password'}
//           id={passwordFieldId}
//           placeholder="Enter your password"
//           className={clsx(css.inputField, {
//             [css.inputFieldError]: errors.password,
//             [css.inputFieldActivated]: isFieldActivated.password,
//           })}
//           {...register('password')}
//           onBlur={() => handleActivate('password')}
//         />
//         <button
//           type="button"
//           className={css.togglePasswordBtn}
//           onClick={togglePasswordVisibility}
//         >
//           <svg className={css.eyeIcon} width="20" height="20">
//             <use
//               href={`/svg/sprite.svg#${
//                 showPassword ? 'icon-eye' : 'icon-eye-off'
//               }`}
//             ></use>
//           </svg>
//         </button>
//         {errors.password && (
//           <span className={css.errMessage}>{errors.password.message}</span>
//         )}
//       </div>
//       <div className={css.signUpFormInput}>
//         <label htmlFor={repeatPasswordFieldId} className={css.fieldText}>
//           Repeat password
//         </label>
//         <input
//           type={showPassword ? 'text' : 'password'}
//           id={repeatPasswordFieldId}
//           placeholder="Repeat password"
//           className={clsx(css.inputField, {
//             [css.inputFieldError]: errors.repeatPassword,
//             [css.inputFieldActivated]: isFieldActivated.repeatPassword,
//           })}
//           {...register('repeatPassword')}
//           onBlur={() => handleActivate('repeatPassword')}
//         />
//         <button
//           type="button"
//           className={css.togglePasswordBtn}
//           onClick={togglePasswordVisibility}
//         >
//           <svg className={css.eyeIcon} width="20" height="20">
//             <use
//               href={`/svg/sprite.svg#${
//                 showPassword ? 'icon-eye' : 'icon-eye-off'
//               }`}
//             ></use>
//           </svg>
//         </button>
//         {errors.repeatPassword && (
//           <span className={css.errMessage}>
//             {errors.repeatPassword.message}
//           </span>
//         )}
//       </div>
//       <button type="submit" className={css.registerBtn}>
//         Registration
//       </button>
//     </form>
//   );
// };

// export default RegisterForm;

// import { useDispatch } from 'react-redux';
// import { register } from '../../redux/auth/operations';
// import { Formik, Form } from 'formik';
// import FormField from '../FormField/FormField';
// import CustomButton from '../CustomButton/CustomButton';
// import {
//   INITIAL_REGISTER,
//   CAPTION_REGISTER,
//   LABEL_NAME,
//   LABEL_EMAIL,
//   LABEL_PASSWORD,
// } from './constants';
// import { feedbackSchema } from './feedback-schema';
// import { errNotify, successNotify } from '../../notification/notification';
// import { ERR_REGISTER, SUCCESS_REGISTER } from '../../notification/constants';

// import styles from './RegisterForm.module.css';

// export default function RegisterForm() {
//   const dispatch = useDispatch();
//   const handleSubmit = (values, actions) => {
//     dispatch(register(values))
//       .unwrap()
//       .then(() => {
//         successNotify(SUCCESS_REGISTER);
//         actions.resetForm();
//       })
//       .catch(err => {
//         errNotify(ERR_REGISTER + err.message);
//       });
//   };

//   return (
//     <Formik
//       initialValues={INITIAL_REGISTER}
//       onSubmit={handleSubmit}
//       validationSchema={feedbackSchema}
//     >
//       <Form className={styles.form}>
//         <div className={styles.info}>
//           <FormField
//             type="text"
//             name="name"
//             styles={styles}
//             autoComplete="name"
//           >
//             {LABEL_NAME}
//           </FormField>
//           <FormField
//             type="email"
//             name="email"
//             styles={styles}
//             autoComplete="email"
//           >
//             {LABEL_EMAIL}
//           </FormField>
//           <FormField
//             type="password"
//             name="password"
//             styles={styles}
//             autoComplete="current-password"
//           >
//             {LABEL_PASSWORD}
//           </FormField>
//         </div>
//         <CustomButton type="submit">{CAPTION_REGISTER}</CustomButton>
//       </Form>
//     </Formik>
//   );
// }
