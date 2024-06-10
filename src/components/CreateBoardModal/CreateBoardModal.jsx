import ModalWrapper from '../ModalWrapper/ModalWrapper';
import CreateEditBoardForm from '../Forms/CreateEditBoardForm/CreateEditBoardForm';
import { addBoard } from '../../redux/boards/operations';
import { useDispatch } from 'react-redux';

export default function CreateBoardModal({ onClose }) {
    const dispatch = useDispatch();
    const onSubmitForm = (values) => {
        console.log('Create board', values);
        dispatch(addBoard(values));
        onClose();
    }
  return (
    <div>
      <ModalWrapper onClose={onClose}>
            <CreateEditBoardForm title="New board" initialValues={{ title: '', icon: 'icon-circles', background: 'theme00'}} onSubmitForm={onSubmitForm} buttonText="Create" />
      </ModalWrapper>
    </div>
  );
}
