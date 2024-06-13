import ModalWrapper from '../ModalWrapper/ModalWrapper.jsx';
import AddEditCardForm from '../Forms/AddEditCardForm/AddEditCardForm.jsx';
import { useDispatch } from 'react-redux';
import { editTask } from '../../redux/tasks/operations.js';

export default function EditCardModal({ onClose, card }) {
  const dispatch = useDispatch();

  const onSubmitForm = values => {
    console.log('Edit card');
    dispatch(editTask({ id: card._id, data: values }));
    onClose();
  };

  return (
    <div>
      <ModalWrapper onClose={onClose}>
        <AddEditCardForm
          title="Edit card"
          initialValues={{
            title: card.title,
            description: card.description,
            priority: card.priority,
          }}
          onSubmitForm={onSubmitForm}
          buttonText="Edit"
        />
      </ModalWrapper>
    </div>
  );
}
