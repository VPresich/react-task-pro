import React from 'react';
import css from './CreateBoardModal.module.css';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import Input from '../UI/Input/Input';
import { Formik, Form, Field } from 'formik';
import Button from '../UI/Button/Button';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors';
import clsx from 'clsx';
import spritePath from '../../img/sprite.svg';
// import bgrIconsPath from '../../img/bgr-png';
const bgrIconsPath = new URL('../../img/bgr-png', import.meta.url).pathname;
const icons = ['icon-circles', 'icon-star', 'icon-loading', 'icon-puzzle-piece', 'icon-container', 'icon-lightning', 'icon-colors', 'icon-hexagon'];
const backgrounds = [
  "Vector-1",
  "Vector-2",
  "Vector-3",
  "Vector-4",
  "Vector-5",
  "Vector-6",
  "Vector-7",
  "Vector-8",
  "Vector-9",
  "Vector-10",
  "Vector-11",
  "Vector-12",
  "Vector-13",
  "Vector-14",
  "Vector-15"
];

export default function CreateBoardModal() {
    const theme = useSelector(selectTheme);
  return (
    <div>
      <ModalWrapper onClose={() => { console.log('close modal') }}>
        <h3>New board</h3>
        <Formik initialValues={{ title: '', icons: '', backgrounds: '' }} onSubmit={() => { console.log('create/edit board') }}>
            <Form className={css.form}>
                <Input onName="title" onPlaceholder="Title" />
                <div className={css.iconsContainer}>
                    <div id="my-radio-group">Icons</div>
                    <div className={css.radioGroup}>
                        {icons.map((icon) => (
                            <React.Fragment key={icon}>
                                <Field type="radio" name="icons" value={icon} className={css.radioInput} id={icon} />
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
                {/* <div className={css.backgroundsContainer}>
                    <p>Background</p>
                    <div className={css.backgrounds}>
                        {backgrounds.map((bgr) => (
                        <div className={css.bgrBorder} key={bgr}>
                            <img src={`${bgrIconsPath}/${bgr}.png`} alt={bgr} />
                        </div>
                        ))}
                    </div>
                </div> */}
                       <div className={css.backgroundsContainer}>
                          <div id="background-radio-group">Background</div>
                          
                          <div className={css.backgrounds}>
                            <React.Fragment key="no-img">
                                <Field type="radio" name="backgrounds" value="no-img" className={css.radioInput} id="no-img" />
                                <label htmlFor="no-img" className={css.radioLabelBgr}>
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
                            {backgrounds.map((bgr) => (
                                <React.Fragment key={bgr}>
                                <Field type="radio" name="backgrounds" value={bgr} className={css.radioInput} id={bgr} />
                                <label htmlFor={bgr} className={css.radioLabelBgr}>
                                    <img src={`${bgrIconsPath}/${bgr}.png`} alt={bgr}/>
                                </label>
                                </React.Fragment>
                            ))}
                            </div>
                        </div>
 
              <Button icon="icon-plus" text="Create" type="submit" />
            </Form>
        </Formik>
      </ModalWrapper>
    </div>
  );
}
