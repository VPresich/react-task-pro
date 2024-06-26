import React from 'react';
import css from './CreateEditBoardForm.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/auth/selectors';
import clsx from 'clsx';
import { Formik, Form, Field } from 'formik';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import * as Yup from 'yup';
import spritePath from '../../../img/sprite.svg';
// import imgsURL from '../../../img/listUrls';
import { selectBackGrounds } from '../../../redux/backgrounds/selectors';

const icons = [
  'icon-circles',
  'icon-star',
  'icon-loading',
  'icon-puzzle-piece',
  'icon-container',
  'icon-lightning',
  'icon-colors',
  'icon-hexagon',
];

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Title is too short - should be 2 chars minimum.')
    .max(50, 'Title is too long - should be 50 chars maximum.'),
  // Add other fields and their validations here
});

export default function CreateEditBoardForm({
  title,
  initialValues,
  onSubmitForm,
  buttonText,
}) {
  const theme = useSelector(selectTheme);
  const imgsURL = useSelector(selectBackGrounds);
  
  return (
    <div>
      <p className={clsx(css.title, css[theme])}>{title}</p>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitForm}
        validationSchema={validationSchema}
      >
        <Form className={css.form}>
          <div className={css.formInputs}>
            <Input onName="title" onPlaceholder="Title" />
            <div className={css.iconsContainer}>
              <div id="my-radio-group" className={clsx(css.titles, css[theme])}>
                Icons
              </div>
              <div className={css.radioGroup}>
                {icons.map(icon => (
                  <React.Fragment key={icon}>
                    <Field
                      type="radio"
                      name="icon"
                      value={icon}
                      className={css.radioInput}
                      id={icon}
                    />
                    <label htmlFor={icon} className={css.radioLabel}>
                      <svg
                        className={clsx(css.icon, css[theme])}
                        width="18"
                        height="18"
                        aria-label="btn icon"
                      >
                        <use href={`${spritePath}#${icon}`} />
                      </svg>
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className={css.backgroundsContainer}>
              <div
                id="background-radio-group"
                className={clsx(css.titles, css[theme])}
              >
                Background
              </div>
              <div className={css.backgrounds}>
                <React.Fragment key={'no-img'}>
                  <Field
                    type="radio"
                    name="background"
                    value={'no-img'}
                    className={css.radioInput}
                    id={'no-img'}
                  />
                  <label htmlFor={'no-img'} className={css.radioLabelBgr}>
                    <div className={clsx(css.noImg, css[theme])}>
                      <svg
                        className={clsx(css.noBgrIcon, css[theme])}
                        width="18"
                        height="18"
                        aria-label="btn icon"
                      >
                        <use href={`${spritePath}#icon-no-bgr`} />
                      </svg>
                    </div>
                  </label>
                </React.Fragment>
                {imgsURL.map((bgr, index) => (
                  <React.Fragment key={bgr._id || index}>
                    <Field
                      type="radio"
                      name="background"
                      value={bgr._id}
                      className={css.radioInput}
                      id={bgr._id}
                    />
                    <label htmlFor={bgr._id} className={css.radioLabelBgr}>
                      <img src={bgr.label} alt={bgr} width={28} height={28} />
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <Button icon="icon-plus" text={buttonText} type="submit" />
        </Form>
      </Formik>
    </div>
  );
}
