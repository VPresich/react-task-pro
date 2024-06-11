import css from './SupportForm.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/auth/selectors';
import clsx from 'clsx';
import { Formik, Form } from 'formik';
import Input from '../../UI/Input/Input';
import TextareaForm from '../../UI/TextareaForm/TextareaForm';
import Button from '../../UI/Button/Button';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  comment: Yup.string()
    .required('Please leave comment how we can help you!')
    .min(5, 'Comment is too short - should be 5 chars minimum.')
    .max(200, 'Comment is too long - should be 200 chars maximum.'),
  // Add other fields and their validations here
});

export default function SupportForm({onSubmitForm}) {
     const theme = useSelector(selectTheme);
  return (
    <div>
      <p className={clsx(css.title, css[theme])}>Need help</p>
        <Formik initialValues={{email: '', comment: ''}} onSubmit={onSubmitForm} validationSchema={validationSchema}>
            <Form className={css.form}>
                <div className={css.formInputs}>
                    <Input onName="email" onPlaceholder="Email address" />
                    <TextareaForm onName="comment" onPlaceholder="Comment" height={120} />
                </div>
              <Button text={'Send'} type="submit" />
            </Form>
        </Formik>
    </div>
  )
}
