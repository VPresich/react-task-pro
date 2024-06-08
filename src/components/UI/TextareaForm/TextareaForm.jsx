import { Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import { fieldTextarea, error } from './TextareaForm.module.css';

export default function TextareaForm({ onName, onPlaceholder }) {
  const userTextareaId = useId();
  return (
    <div>
      <Field
        as="textarea"
        name={onName}
        id={userTextareaId}
        // rows="5"
        className={fieldTextarea}
        placeholder={onPlaceholder}
      />
      <ErrorMessage name={onName} component="span" className={error} />
    </div>
  );
}
