import AddColumnBtn from '../AddColumnBtn/AddColumnBtn';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import ColumnModal from '../ColumnModal/ColumnModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectActiveBoard } from '../../redux/boards/selectors';

export default function Board() {
  const [isModalOpen, setIsModalOpen] = useState(false);
const activeBoardId = useSelector(selectActiveBoard);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      Board
      <AddColumnBtn openModal={openModal} />
      {isModalOpen && (
        <ModalWrapper onClose={closeModal}>
          <ColumnModal modalType={'add'} activeBoardId={activeBoardId} />
        </ModalWrapper>
      )}
    </div>
  );
}
