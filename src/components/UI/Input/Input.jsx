import { Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import { fieldInput, error } from './Input.module.css';

export default function Input({ onName, onPlaceholder }) {
  const userNameId = useId();
  return (
    <div>
      <Field
        name={onName}
        id={userNameId}
        className={fieldInput}
        placeholder={onPlaceholder}
      />
      <ErrorMessage name={onName} component="span" className={error} />
    </div>
  );
}