import css from './AddEditCardForm.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/auth/selectors';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import TextareaForm from '../../UI/TextareaForm/TextareaForm';
import { useState } from 'react';
import CalendarHeaderComponent from '../../NewCalendar/NewCalendar';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Title is too short - should be 2 chars minimum.')
    .max(50, 'Title is too long - should be 50 chars maximum.'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description is too short - should be 10 chars minimum.')
    .max(100, 'Description is too long - should be 100 chars maximum.'),
});

export default function AddEditCardForm({
  title,
  buttonText,
  initialValues,
  onSubmitForm,
}) {
  const theme = useSelector(selectTheme);

  const [initialDate, setInitialDate] = useState(initialValues.deadline);

  const handleDataChange = date => {
    setInitialDate(date);
  };

  return (
    <div>
      <p className={clsx(css.title, css[theme])}>{title}</p>
      <Formik
        initialValues={initialValues}
        onSubmit={values => onSubmitForm({ ...values, deadline: initialDate })}
        validationSchema={validationSchema}
      >
        <Form className={css.form}>
          <div className={css['input-wrapper']}>
            <Input onName="title" onPlaceholder="Title" />
            <TextareaForm
              onName="description"
              onPlaceholder="Description"
              height="154"
            />
          </div>
          <p className={clsx(css['radio-btn-title'], css[theme])}>
            Label color
          </p>
          <div className={css['radio-btn-wrapper']}>
            <label
              className={clsx(
                css['radio-btn'],
                css[theme],
                css['blue-radio-btn']
              )}
            >
              <Field type="radio" name="priority" value="Low" />
            </label>
            <label
              className={clsx(
                css['radio-btn'],
                css[theme],
                css['red-radio-btn']
              )}
            >
              <Field type="radio" name="priority" value="Medium" />
            </label>
            <label
              className={clsx(
                css['radio-btn'],
                css[theme],
                css['green-radio-btn']
              )}
            >
              <Field type="radio" name="priority" value="High" />
            </label>
            <label
              className={clsx(
                css['radio-btn'],
                css[theme],
                css['gray-radio-btn']
              )}
            >
              <Field type="radio" name="priority" value="Without priority" />
            </label>
          </div>
          <p className={clsx(css['deadline-text'], css[theme])}>Deadline</p>
          <CalendarHeaderComponent onDateChange={handleDataChange} />
          <Button icon="icon-plus" text={buttonText} type="submit" />
        </Form>
      </Formik>
    </div>
  );
}
