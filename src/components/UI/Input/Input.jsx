import { Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import css from './Input.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/auth/selectors';
import clsx from 'clsx';

export default function Input({ onName, onPlaceholder }) {
  const theme = useSelector(selectTheme);
  const userNameId = useId();
  return (
    <div>
      <Field
        name={onName}
        id={userNameId}
        className={clsx(css.fieldInput, css[theme])}
        placeholder={onPlaceholder}
      />
      <ErrorMessage name={onName} component="span" className={clsx(css.error, css[theme])} />
    </div>
  );
}
