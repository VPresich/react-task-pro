import css from './Filters.module.css';
import spritePath from '../../img/sprite.svg';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors';
import { useState } from 'react';
import ModalWindow from '../UI/ModalWindow/ModalWindow';
import { useDispatch } from 'react-redux';
import { filterByPriority } from '../../redux/filter/slice';
import { Formik, Field, Form } from 'formik';

const Filters = () => {
  const theme = useSelector(selectTheme);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priority, setPriority] = useState('all');
  const dispatch = useDispatch();

  const handlePriorityChange = e => {
    const newPriority = e.target.value;

    if (newPriority === priority) {
      return;
    }

    console.log(newPriority);

    setPriority(newPriority);
    dispatch(filterByPriority(newPriority));
  };

  const handleEditFilters = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className={clsx(css['filters-btn'], css[theme])}
        onClick={handleEditFilters}
      >
        <svg
          className={clsx(css.icon, css[theme])}
          width="13.33"
          height="12"
          aria-label="filters icon"
        >
          <use href={`${spritePath}#icon-filters`} />
        </svg>
        Filters
      </button>
      <ModalWindow visible={isModalOpen} setVisible={setIsModalOpen}>
        <div className={css.modal}>
          <button
            className={clsx(css['close-btn'], css[theme])}
            onClick={handleCloseModal}
          >
            &times;
          </button>
          <h3 className={clsx(css.title, css[theme])}>Filters</h3>
          <div className={css.wrapper}>
            <p className={clsx(css['choosing-text'], css[theme])}>
              Label color
            </p>
            <button
              className={clsx(css['show-all-btn'], css[theme])}
              onClick={() => {
                dispatch(filterByPriority('all'));
              }}
            >
              Show all
            </button>
          </div>
          <Formik initialValues={{ priority: 'all' }}>
            <Form className={css.form}>
              <div className={css['radio-btn-wrappper']}>
                <label
                  className={clsx(
                    css['radio-btn'],
                    css[theme],
                    css['gray-radio-btn']
                  )}
                >
                  <Field
                    type="radio"
                    name="priority"
                    value="Without priority"
                    onClick={handlePriorityChange}
                  />
                  <span>Without priority</span>
                </label>
                <label
                  className={clsx(
                    css['radio-btn'],
                    css[theme],
                    css['blue-radio-btn']
                  )}
                >
                  <Field
                    type="radio"
                    name="priority"
                    value="Low"
                    onClick={handlePriorityChange}
                  />
                  <span>Low</span>
                </label>
                <label
                  className={clsx(
                    css['radio-btn'],
                    css[theme],
                    css['red-radio-btn']
                  )}
                >
                  <Field
                    type="radio"
                    name="priority"
                    value="Medium"
                    onClick={handlePriorityChange}
                  />
                  <span>Medium</span>
                </label>
                <label
                  className={clsx(
                    css['radio-btn'],
                    css[theme],
                    css['green-radio-btn']
                  )}
                >
                  <Field
                    type="radio"
                    name="priority"
                    value="High"
                    onClick={handlePriorityChange}
                  />
                  <span>High</span>
                </label>
              </div>
            </Form>
          </Formik>
        </div>
      </ModalWindow>
    </>
  );
};

export default Filters;
