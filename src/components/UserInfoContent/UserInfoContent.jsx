import { useState } from 'react';
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
import { successNotify, errNotify } from '../../notification/notification';

export default function UserInfoContent() {
  const [selectedFile, setSelectedFile] = useState(null);

  const userInfo = useSelector(selectUser);

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleEditAvatar = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (values, actions) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    if (values.password) {
      formData.append('password', values.password);
    }
    if (selectedFile) {
      formData.append('avatar', selectedFile);
    }

    // dispatch(updateAvatar(formData))
    //   .unwrap()
    //   .then(() => {
    //     successNotify();
    //   })
    //   .catch(err => {
    //     errNotify(err.message);
    //   });

    actions.resetForm();
    setSelectedFile(null);
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      dispatch(updateAvatar(file))
        .unwrap()
        .then(() => {
          successNotify();
        })
        .catch(err => {
          errNotify(err.message);
        });
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
