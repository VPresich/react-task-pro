import ModalWrapper from '../ModalWrapper/ModalWrapper';
import CreateEditBoardForm from '../Forms/CreateEditBoardForm/CreateEditBoardForm';
import { updateBoard } from '../../redux/boards/operations';
import { useDispatch } from 'react-redux';

export default function EditBoardModal({ board, onClose }) {
    const dispatch = useDispatch();

    const onSubmitForm = (values) => {
        console.log('Edit board', values, board._id);
        dispatch(updateBoard({ id: board._id, data: values }));
        onClose();
    }
  return (
    <div>
        <ModalWrapper onClose={onClose}>
            <CreateEditBoardForm title="Edit board" initialValues={{ title: board.title, icon: board.icon, background: board.background}} onSubmitForm={onSubmitForm} buttonText="Edit" />
        </ModalWrapper>
    </div>
  );
}
