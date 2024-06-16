import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import MovePopUp from '../../components/Forms/MovePopup/MovePopup';
import { updateTaskColumn } from '../../redux/tasks/operations';

export default function MoveCardModal({ onClose, cardId }) {
  const dispatch = useDispatch();

  const handleColumnSelect = newColumnId => {
    console.log('Move', cardId);
    dispatch(updateTaskColumn({ id: cardId, column: newColumnId }))
      .unwrap()
      .then(() => {
        toast.success('Move successful');
      })
      .catch(() => {
        toast.error('Error in move');
      });

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
