import { useSelector, useDispatch } from 'react-redux';
import { updateAvatar } from '../../redux/auth/operations';
import { Formik, Form } from 'formik';
import { selectUser } from '../../redux/auth/selectors';
import FormField from '../FormField/FormField';
import CustomButton from '../CustomButton/CustomButton';
import { LABEL_NAME, LABEL_EMAIL, LABEL_PASSWORD } from './constants';
import { feedbackSchema } from './feedback-schema';
import styles from './UserInfoContent.module.css';
import { useRef } from 'react';

export default function UserInfoContent() {
  const userInfo = useSelector(selectUser);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleEditAvatar = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async values => {
    console.log('Form values:', values);
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      dispatch(updateAvatar(file));
    }
  };

  return (
    <Formik
      initialValues={{
        name: userInfo.name,
        email: userInfo.email,
        password: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={feedbackSchema}
    >
      <Form className={styles.form}>
        <div className={styles.info}>
          <img
            src={userInfo.avatarURL}
            width="67"
            alt="Avatar"
            className={styles.avatar}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={handleEditAvatar}
            className={styles.editAvatarButton}
          >
            +
          </button>
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
        <CustomButton type="submit">Change</CustomButton>
      </Form>
    </Formik>
  );
}
