import { Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import css from './TextareaForm.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/auth/selectors';
import clsx from 'clsx';

export default function TextareaForm({ onName, onPlaceholder }) {
  const theme = useSelector(selectTheme);
  const userTextareaId = useId();
  return (
    <div>
      <Field
        as="textarea"
        name={onName}
        id={userTextareaId}
        // rows="5"
        className={clsx(css.fieldTextarea, css[theme])}
        placeholder={onPlaceholder}
      />
      <ErrorMessage name={onName} component="span" className={clsx(css.error, css[theme])} />
    </div>
  );
}
