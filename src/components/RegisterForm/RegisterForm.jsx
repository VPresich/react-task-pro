// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import { useDispatch } from 'react-redux';
// import { FiEyeOff, FiEye } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
// import css from './RegisterForm.module.css';
// import { register as userRegister } from '../../redux/auth/operations';
// import toast from 'react-hot-toast';

// const registrationValidationSchema = Yup.object({
//   email: Yup.string()
//     .required('Email is required')
//     .email('Invalid email address'),
//   password: Yup.string()
//     .required('Password is required')
//     .min(7, 'Password must be at least 7 characters long')
//     .matches(
//       /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
//       'Password must contain at least one letter and one number, only Latin letters are allowed'
//     ),
//   repeatPassword: Yup.string()
//     .oneOf([Yup.ref('password')], 'Passwords must match')
//     .required('Please confirm your password'),
// });

// export default function RegistrationForm() {
//   const dispatch = useDispatch();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showRepeatPassword, setShowRepeatPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(registrationValidationSchema),
//   });

//   const onSubmit = data => {
//     const name = data.email.split('@')[0];
//     const email = data.email;
//     const password = data.password;
//     dispatch(userRegister({ name, email, password }))
//       .unwrap()
//       .then(() => {
//         toast.success('Registration successful! Welcome aboard! 🎉', {
//           duration: 2000,
//         });
//         reset();
//       })
//       .catch(error => {
//         toast.error('Oops!Failed to registration', { duration: 4000 });
//       });
//   };

//   return (
//     <div className={css.container}>
//       <div className={css.section}>
//         <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
//           <div className={css.field}>
//             <label className={css.email}>Name</label>
//             <input
//               className={errors.email ? css.errorInput : css.firstInput}
//               type="text"
//               placeholder="Enter your name"
//               {...register('name')}
//             />
//             {errors.email && (
//               <p className={css.error}>{errors.email.message}</p>
//             )}
//           </div>

//           <div className={css.field}>
//             <label className={css.email}>Email</label>
//             <input
//               className={errors.email ? css.errorInput : css.firstInput}
//               type="text"
//               placeholder="Enter your email"
//               {...register('email')}
//             />
//             {errors.email && (
//               <p className={css.error}>{errors.email.message}</p>
//             )}
//           </div>
//           <div className={css.field}>
//             <label className={css.password}>Password</label>
//             <div className={css.toggle}>
//               <input
//                 className={errors.password ? css.errorIn : css.secondInput}
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Enter your password"
//                 {...register('password')}
//               />
//               <div
//                 onClick={() => setShowPassword(!showPassword)}
//                 className={css.iconOne}
//               >
//                 {showPassword ? <FiEye size={14} /> : <FiEyeOff size={14} />}
//               </div>
//             </div>
//             {errors.password && (
//               <p className={css.error}>{errors.password.message}</p>
//             )}
//           </div>
//           <div className={css.field}>
//             <label className={css.repeat}>Repeat Password</label>
//             <div className={css.toggle}>
//               <input
//                 className={errors.repeatPassword ? css.errorIn : css.thirdInput}
//                 type={showRepeatPassword ? 'text' : 'password'}
//                 placeholder="Repeat password"
//                 {...register('repeatPassword')}
//               />
//               <div
//                 onClick={() => setShowRepeatPassword(!showRepeatPassword)}
//                 className={css.iconTwo}
//               >
//                 {showRepeatPassword ? (
//                   <FiEye size={20} />
//                 ) : (
//                   <FiEyeOff size={20} />
//                 )}
//               </div>
//             </div>
//             {errors.repeatPassword && (
//               <p className={css.error}>{errors.repeatPassword.message}</p>
//             )}
//           </div>
//           <button type="submit" className={css.button}>
//             Registration
//           </button>
//           <p className={css.text}>
//             Already have an account?
//             <Link to="/auth/login" className={css.link}>
//               Log In
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

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
