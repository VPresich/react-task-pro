import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAvatar, updateProfile } from '../../redux/auth/operations';
import { Formik, Form } from 'formik';
import { selectUser } from '../../redux/auth/selectors';
import Button from '../UI/Button/Button';
import { feedbackSchema } from './feedback-schema';
import css from './UserInfoContent.module.css';
import { useRef } from 'react';
import { successNotify, errNotify } from '../../notification/notification';
import Input from '../UI/Input/Input';
import { selectTheme } from '../../redux/auth/selectors';
import clsx from 'clsx';
// import spritePath from '../../img/sprite.svg';

export default function UserInfoContent() {
  const theme = useSelector(selectTheme);
  const userInfo = useSelector(selectUser);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleEditAvatar = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async values => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    if (values.password) {
      formData.append('password', values.password);
    }

    dispatch(updateProfile(formData))
      .unwrap()
      .then(() => {
        successNotify();
      })
      .catch(err => {
        errNotify(err.message);
      });
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
        password: userInfo.password,
      }}
      onSubmit={handleSubmit}
      validationSchema={feedbackSchema}
    >
      <Form className={css.form}>
        <p className={clsx(css.title, css[theme])}>Edit profile</p>
        
        <div className={clsx(css.userImgContainer, css[theme])}>
          <img
            src={userInfo.avatarURL}
            width="68"
            alt="Avatar"
            className={css.avatar}
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
            className={clsx(css.editAvatarButton, css[theme])}
          >+
          </button>
        </div>
        <div className={clsx(css.inputs, css[theme])}>
          <Input
            onName="name"
            onPlaceholder={"Name"}
          />
          <Input
            onName="email"
            onPlaceholder={"Email address"}
          />
          <Input
            onName="password"
            onPlaceholder={"Password"}
            type="password"
          />
        </div>
        <Button text="Send" type="submit"/>
      </Form>
    </Formik>
  );
}