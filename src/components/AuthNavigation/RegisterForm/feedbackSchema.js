import * as Yup from 'yup';

import {
  ERR_SHORT,
  ERR_LONG,
  ERR_REQUIRED,
  ERR_EMAIL,
  ERR_EMAIL_REQUIRED,
  ERR_PASSWORD,
  ERR_PASSWORD_REQUIRED,
} from './constants';

export const feedbackSchema = Yup.object().shape({
  name: Yup.string().min(3, ERR_SHORT).max(50, ERR_LONG).required(ERR_REQUIRED),
  email: Yup.string().email(ERR_EMAIL).required(ERR_EMAIL_REQUIRED),
  password: Yup.string().min(6, ERR_PASSWORD).required(ERR_PASSWORD_REQUIRED),
});
