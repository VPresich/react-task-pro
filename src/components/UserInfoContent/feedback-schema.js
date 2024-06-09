import * as Yup from 'yup';

import { ERR_SHORT, ERR_LONG, ERR_EMAIL, ERR_PASSWORD } from './constants';

export const feedbackSchema = Yup.object().shape({
  name: Yup.string().min(3, ERR_SHORT).max(50, ERR_LONG),
  email: Yup.string().email(ERR_EMAIL),
  password: Yup.string().min(6, ERR_PASSWORD),
});
