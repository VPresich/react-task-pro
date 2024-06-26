import ModalWrapper from '../ModalWrapper/ModalWrapper';
import CreateEditBoardForm from '../Forms/CreateEditBoardForm/CreateEditBoardForm';
import { addBoard } from '../../redux/boards/operations';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveBoard } from '../../redux/boards/slice';

export default function CreateBoardModal({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmitForm = values => {
    dispatch(addBoard(values))
      .unwrap()
      .then(result => {
        dispatch(setActiveBoard(result._id));
        navigate(`/home/${result._id}`);
      });
    onClose();
  };
  return (
    <div>
      <ModalWrapper onClose={onClose}>
        <CreateEditBoardForm
          title="New board"
          initialValues={{
            title: '',
            icon: 'icon-circles',
            background: 'no-img',
          }}
          onSubmitForm={onSubmitForm}
          buttonText="Create"
        />
      </ModalWrapper>
    </div>
  );
}
