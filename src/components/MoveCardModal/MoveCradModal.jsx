import { useDispatch } from 'react-redux';
import MovePopUp from '../../components/Forms/MovePopup/MovePopup';
import { updateTaskColumn } from '../../redux/tasks/operations';

export default function MoveCardModal({ onClose, cardId }) {
  const dispatch = useDispatch();

  const handleColumnSelect = newColumnId => {
    console.log('Move', cardId);
    dispatch(updateTaskColumn({ id: cardId, column: newColumnId }))
      .unwrap()
      .then(() => {
      })
      .catch(() => {});

    onClose();
  };
  return (
    <div>
        <MovePopUp
          title=""
          initialValues={{}}
          onClick={handleColumnSelect}
          onClose={onClose}
        />
    </div>
  );
}
