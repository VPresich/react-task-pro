import React from 'react'
import css from './CreateEditBoardForm.module.css'
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/auth/selectors';
import clsx from 'clsx';
import { Formik, Form, Field } from 'formik';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import * as Yup from 'yup';
import spritePath from '../../../img/sprite.svg';

const bgrIconsPath = new URL('../../../img/bgr-png', import.meta.url).pathname;
const icons = ['icon-circles', 'icon-star', 'icon-loading', 'icon-puzzle-piece', 'icon-container', 'icon-lightning', 'icon-colors', 'icon-hexagon'];
const backgrounds = [
  "theme00",
  "theme01",
  "theme02",
  "theme03",
  "theme04",
  "theme05",
  "theme06",
  "theme07",
  "theme08",
  "theme09",
  "theme10",
  "theme11",
  "theme12",
  "theme13",
  "theme14",
  "theme15"
];

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Title is too short - should be 2 chars minimum.')
    .max(50, 'Title is too long - should be 50 chars maximum.'),
  // Add other fields and their validations here
});

export default function CreateEditBoardForm({title, initialValues, onSubmitForm, buttonText}) {
     const theme = useSelector(selectTheme);
  return (
    <div>
      <p className={css.title}>{ title }</p>
        <Formik initialValues={initialValues} onSubmit={onSubmitForm} validationSchema={validationSchema}>
            <Form className={css.form}>
                <div className={css.formInputs}>
                    <Input onName="title" onPlaceholder="Title" />
                    <div className={css.iconsContainer}>
                        <div id="my-radio-group">Icons</div>
                        <div className={css.radioGroup}>
                            {icons.map((icon) => (
                                <React.Fragment key={icon}>
                                    <Field type="radio" name="icon" value={icon} className={css.radioInput} id={icon} />
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
                        <div id="background-radio-group">Background</div>
                        <div className={css.backgrounds}>
                            {backgrounds.map((bgr) => (
                            bgr === "theme00" ? (
                                <React.Fragment key={bgr}>
                                <Field type="radio" name="background" value={bgr} className={css.radioInput} id={bgr} />
                                <label htmlFor={bgr} className={css.radioLabelBgr}>
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
                            ) : (
                                <React.Fragment key={bgr}>
                                <Field type="radio" name="background" value={bgr} className={css.radioInput} id={bgr} />
                                <label htmlFor={bgr} className={css.radioLabelBgr}>
                                    <img src={`${bgrIconsPath}/${bgr}.png`} alt={bgr} />
                                </label>
                                </React.Fragment>
                            )
                            ))}
                        </div>
                    </div>
                </div>
              <Button icon="icon-plus" text={buttonText} type="submit" />
            </Form>
        </Formik>
    </div>
  )
}
