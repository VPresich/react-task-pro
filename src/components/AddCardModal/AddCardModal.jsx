import ModalWrapper from '../ModalWrapper/ModalWrapper.jsx';
import AddEditCardForm from '../Forms/AddEditCardForm/AddEditCardForm.jsx';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/tasks/operations.js';

export default function AddCardModal({ onClose }) {
  const dispatch = useDispatch();

  const onSubmitForm = values => {
    console.log('Add card');
    dispatch(addTask(values));
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
          }}
          onSubmitForm={onSubmitForm}
          buttonText="Add"
        />
      </ModalWrapper>
    </div>
  );
}
