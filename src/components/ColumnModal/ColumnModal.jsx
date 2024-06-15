import { useParams } from 'react-router-dom';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors';

import * as Yup from 'yup';
import clsx from 'clsx';
import css from './ColumnModal.module.css';
import { addColumnForBoard } from '../../redux/columns/operations';
import { updateColumnById } from '../../redux/columns/operations';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';

const ColumnModal = ({ modalType, onClose, column }) => {
  const theme = useSelector(selectTheme);

  const dispatch = useDispatch();

  const { id } = useParams();
  if (!id) return;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });
  const initialValues = {
    title: modalType === 'edit' ? column.title : '',
  };

  const handleSubmit = (values, actions) => {
    const { title } = values;

    if (modalType === 'add') {
      if (id) {
        dispatch(addColumnForBoard({ id, title }))
          .unwrap()
          .then(() => {
            actions.resetForm();
            onClose();
          })
          .catch(() => {
            onClose();
          });
      }
    } else if (modalType === 'edit') {
      const { _id: columnId } = column;
      if (!columnId) return;
      dispatch(updateColumnById({ id: columnId, title }))
        .unwrap()
        .then(() => {
          actions.resetForm();
          onClose();
        })
        .catch(() => {
          onClose();
        });
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={css.form}>
          {modalType === 'add' ? (
            <p className={clsx(css.text, css[theme])}>Add column</p>
          ) : (
            <p className={clsx(css.text, css[theme])}>Edit column</p>
          )}
          <Input onName="title" onPlaceholder="Title" />
          <Button
            icon="icon-plus"
            text={modalType === 'add' ? 'Add' : 'Edit'}
            type="submit"
          />
        </Form>
      </Formik>
    </>
  );
};
export default ColumnModal;
