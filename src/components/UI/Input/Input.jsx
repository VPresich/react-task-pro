// import { Field, ErrorMessage } from 'formik';
// import { useId } from 'react';
// import css from './Input.module.css';
// import { useSelector } from 'react-redux';
// import { selectTheme } from '../../../redux/auth/selectors';
// import clsx from 'clsx';

// export default function Input({ onName, onPlaceholder }) {
//   const theme = useSelector(selectTheme);
//   const userNameId = useId();
//   return (
//     <div>
//       <Field
//         name={onName}
//         id={userNameId}
//         className={clsx(css.fieldInput, css[theme])}
//         placeholder={onPlaceholder}
//       />
//       <ErrorMessage name={onName} component="span" className={clsx(css.error, css[theme])} />
//     </div>
//   );
// }

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
        style={color && { color } }
      />
      {type === 'password' && (
        <span onClick={handleTogglePasswordVisibility} className={css.eyeIcon}>
          {showPassword ? <FaEye className={clsx(css.icon, css[theme])} /> : <FaEyeSlash className={ clsx(css.icon, css[theme])}/>}
        </span>
      )}
      <ErrorMessage name={onName} component="span" className={clsx(css.error, css[theme])} />
    </div>
  );
}
