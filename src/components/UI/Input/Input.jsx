import { Field, ErrorMessage } from 'formik';
import { useId, useState } from 'react';
import css from './Input.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/auth/selectors';
import clsx from 'clsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Input({ onName, onPlaceholder, type, color }) {
  const theme = useSelector(selectTheme);
  const userNameId = useId();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={css.inputWrapper}>
      <Field
        name={onName}
        id={userNameId}
        className={clsx(css.fieldInput, css[theme])}
        placeholder={onPlaceholder}
        type={inputType}
        style={color && { color }}
      />
      {type === 'password' && (
        <span onClick={handleTogglePasswordVisibility} className={css.eyeIcon}>
          {showPassword ? (
            <FaEye
              className={clsx(css.icon, css[theme])}
              style={color && { fill: color }}
            />
          ) : (
            <FaEyeSlash
              className={clsx(css.icon, css[theme])}
              style={color && { fill: color }}
            />
          )}
        </span>
      )}
      <ErrorMessage
        name={onName}
        component="span"
        className={clsx(css.error, css[theme])}
        style={color && { color }}
      />
    </div>
  );
}
