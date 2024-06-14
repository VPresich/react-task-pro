import { useParams } from 'react-router-dom';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors';
import { selectActiveColumndId } from '../../redux/columns/selectors';
import * as Yup from 'yup';
import clsx from 'clsx';
import css from './ColumnModal.module.css';
import { addColumnForBoard } from '../../redux/columns/operations';
import { updateColumnById } from '../../redux/columns/operations';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const ColumnModal = ({ modalType, onClose }) => {
  const theme = useSelector(selectTheme);
  const columnId = useSelector(selectActiveColumndId);
  const dispatch = useDispatch();

  const { id } = useParams();
  if (!id) return;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

  const handleSubmit = (values, actions) => {
    const { title } = values;

    if (modalType === 'add') {
      if (id) {
        dispatch(addColumnForBoard({ id, title }))
          .unwrap()
          .then(() => {
            toast.success('fetchColumn fulfilled');
            actions.resetForm();
            onClose();
          })
          .catch(() => {
            toast.error('fetchColumn rejected');
            onClose();
          });
      }
    } else if (modalType === 'edit') {
      if (!columnId) return;
      dispatch(updateColumnById({ id: columnId, title }))
        .unwrap()
        .then(() => {
          toast.success('fetchColumn fulfilled');
          actions.resetForm();
          onClose();
        })
        .catch(() => {
          toast.error('fetchColumn rejected');
          onClose();
        });
    }
  };

  return (
    <>
      <Formik
        initialValues={{ title: '' }}
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
          <Button icon="icon-plus" text="Add" type="submit" />
        </Form>
      </Formik>
    </>
  );
};
export default ColumnModal;
