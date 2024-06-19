import ModalWrapper from '../ModalWrapper/ModalWrapper.jsx';
import AddEditCardForm from '../Forms/AddEditCardForm/AddEditCardForm.jsx';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/tasks/operations.js';
import { formatDate } from '../NewCalendar/utils';  // Ensure this path is correct

export default function AddCardModal({ onClose, column }) {
  const dispatch = useDispatch();

  const onSubmitForm = values => {
    dispatch(addTask({ columnId: column._id, newTask: values }));
    onClose();
  };

  return (
    <div>
      <ModalWrapper onClose={onClose}>
        <AddEditCardForm
          title="Add card"
          initialValues={{
            title: '',
            description: '',
            priority: 'Without priority',
            deadline: formatDate(new Date()),  // Formatting the initial deadline if required
          }}
          onSubmitForm={onSubmitForm}
          buttonText="Add"
        />
      </ModalWrapper>
    </div>
  );
}
