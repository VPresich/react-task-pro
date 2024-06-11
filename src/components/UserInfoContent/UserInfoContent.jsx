import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAvatar, updateProfile } from '../../redux/auth/operations';
import { Formik, Form, Field } from 'formik';
import { selectTheme, selectUser } from '../../redux/auth/selectors';
import Button from '../UI/Button/Button';
import { feedbackSchema } from './feedback-schema';
import css from './UserInfoContent.module.css';
import { successNotify, errNotify } from '../../notification/notification';
import clsx from 'clsx';

export default function UserInfoContent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const theme = useSelector(selectTheme);
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

    // dispatch(updateProfile(formData)) //TODO FIXED ON SERVER
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
      <Form className={css.form}>
        <div className={css.info}>
          <div className={clsx(css.avatarContainer, css[theme])}>
            <img
              src={userInfo.avatarURL}
              width="64"
              alt="Avatar"
              className={css.avatar}
            />
            <button
              type="button"
              onClick={handleEditAvatar}
              className={clsx(css.editAvatarButton, css[theme])}
            >+</button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <Field
            type="text"
            name="name"
            className={clsx(css.input, css[theme])}
            autoComplete="name"
          />
          <Field
            type="email"
            name="email"
            className={clsx(css.input, css[theme])}
            autoComplete="email"
          />
          <Field
            type="password"
            name="password"
            className={clsx(css.input, css[theme])}
            autoComplete="current-password"
          />
        </div>
        <Button text='Send' big={true} type='submit' />
      </Form>
    </Formik>
  );
}
