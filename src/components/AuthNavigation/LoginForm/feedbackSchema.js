import * as Yup from 'yup';

import {
  ERR_EMAIL,
  ERR_PASSWORD,
  ERR_EMAIL_REQUIRED,
  ERR_PASSWORD_REQUIRED,
} from '../constants';

export const feedbackSchema = Yup.object().shape({
  email: Yup.string().email(ERR_EMAIL).required(ERR_EMAIL_REQUIRED),
  password: Yup.string().min(6, ERR_PASSWORD).required(ERR_PASSWORD_REQUIRED),
});
