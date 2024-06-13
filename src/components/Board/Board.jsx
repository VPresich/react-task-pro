import { useEffect, useState } from 'react';
import css from './Board.module.css';
import { useSelector } from 'react-redux';
import {
  selectActiveBoard,
  selectActiveBoardId,
} from '../../redux/boards/selectors';
import AddColumnBtn from '../AddColumnBtn/AddColumnBtn';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import ColumnModal from '../ColumnModal/ColumnModal';
import ColumnList from '../ColumnList/ColumnList';

import imgsURL from '../../img/listUrls.js';
import Button from '../UI/Button/Button.jsx';
import AddCardModal from '../AddCardModal/AddCardModal.jsx';

function getDeviceType() {
  if (window.innerWidth >= 1024) {
    return 'desktop';
  } else if (window.innerWidth >= 768) {
    return 'tablet';
  } else {
    return 'mobile';
  }
}

function getResolution() {
  return window.devicePixelRatio > 1 ? '2x' : '1x';
}

function getBackgroundImage(theme, imgsURL) {
  const deviceType = getDeviceType();
  const resolution = getResolution();
  console.log(theme);
  const themeData = imgsURL.find(img => img._id === theme);
  console.log(themeData);
  if (!themeData) return '';

  const key = `imgUrl_${deviceType}_${resolution}`;
  return themeData[key] || '';
}

export default function Board() {
  const activeBoard = useSelector(selectActiveBoard);
  const activeBoardId = useSelector(selectActiveBoardId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const theme = activeBoard
   
    ? activeBoard.background
   
    : '665dab40d37019ad00137c09';
  console.log(theme);;
  const [backgroundImage, setBackgroundImage] = useState(
    
    getBackgroundImage(theme, imgsURL)
  
  );

  useEffect(() => {
    const handleResize = () => {
      setBackgroundImage(getBackgroundImage(theme, imgsURL));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]); // Include theme in the dependencies

  useEffect(() => {
    setBackgroundImage(getBackgroundImage(theme, imgsURL));
  }, [theme, activeBoard]); // Include theme and activeBoard in the dependencies

  console.log(theme, backgroundImage);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCard = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={css.boardContainer}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        Board
      </div>
      <Button
        icon={'icon-plus'}
        text={'Add another card'}
        big={false}
        onClick={handleAddCard}
      />
      {isModalOpen && <AddCardModal onClose={handleCloseModal} />}
    </>
    <div
      className={css.boardContainer}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      Board
      <div className={css.columnsWrapper}>
        <ColumnList activeBoardId={activeBoardId} />
        <AddColumnBtn openModal={openModal} />
      </div>
      {isModalOpen && (
        <ModalWrapper onClose={closeModal}>
          <ColumnModal
            modalType={'add'}
            activeBoardId={activeBoardId}
            onClose={closeModal}
          />
        </ModalWrapper>
      )}
    </div>
  );
}
