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

import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import CustomButton from '../CustomButton/CustomButton';

import styles from './RegisterForm.module.css';

const RegisterForm = () => {
  const dispatch = useDispatch();

  const registerSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  });

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = values => {
    dispatch(register(values));
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {formik => (
          <Form className={styles.form}>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" />

            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />

            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" />

            <CustomButton type="submit">Register Now</CustomButton>

            {formik.status && formik.status.errors && (
              <div className={styles.errors}>{formik.status.errors}</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
