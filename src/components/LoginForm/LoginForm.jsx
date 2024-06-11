// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import { useDispatch } from 'react-redux';
// import { FiEyeOff, FiEye } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
// import css from './LoginForm.module.css';
// import { logIn } from '../../redux/auth/operations';
// import toast from 'react-hot-toast';

// const loginValidationSchema = Yup.object().shape({
//   email: Yup.string()
//     .email('Invalid email address')
//     .required('Email is required'),
//   password: Yup.string()
//     .min(7, 'Password must be at least 7 characters long')
//     .required('Password is required')
//     .matches(
//       /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
//       'Password must contain at least one letter and one number, only Latin letters are allowed'
//     ),
// });

// export default function LoginForm() {
//   const dispatch = useDispatch();
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(loginValidationSchema),
//   });

//   const onSubmit = data => {
//     dispatch(logIn(data))
//       .unwrap()
//       .then(() => {
//         toast.success('Welcome back!', {
//           duration: 2000,
//         });
//       })
//       .catch(error => {
//         toast.error(
//           "It's time to drink water, but your email or password is incorrect🙈",
//           {
//             duration: 4000,
//           }
//         );
//       });
//   };

//   return (
//     <div className={css.container}>
//       <div className={css.section}>
//         <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
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
//                 {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
//               </div>
//             </div>
//             {errors.password && (
//               <p className={css.error}>{errors.password.message}</p>
//             )}
//           </div>

//           <button type="submit" className={css.button}>
//             Log In
//           </button>
//           <p className={css.text}>
//             Don`t have an account?
//             <Link to="/auth/register" className={css.link}>
//               Registration
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { Formik, Form, Field } from 'formik';
import Button from '../UI/Button/Button';
import { INITIAL_LOGIN, LABEL_EMAIL, LABEL_PASSWORD } from './constants';
import { feedbackSchema } from './feedback-schema';
import { errNotify, successNotify } from '../../notification/notification';
import { ERR_LOGIN, SUCCESS_LOGIN } from '../../notification/constants';
import css from './LoginForm.module.css';
import { Link } from 'react-router-dom';

function CustomField({ name, type, placeholder, className }) {
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
            <Link to="/auth/register" className={css.link}>
              Registration
            </Link>
            <Link to="/auth/login" className={css.link}>
              Log In
            </Link>
            {/* <button className={css.registerBtn}>Registration</button>
            <button className={css.loginBtn}>Log In</button> */}
          </div>
          <div className={css.info}>
            <CustomField
              type="email"
              name="email"
              placeholder={LABEL_EMAIL}
              className={css.linkEmail}
            />
            <CustomField
              type="password"
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
