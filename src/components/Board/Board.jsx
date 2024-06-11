import React, { useEffect, useState } from 'react';
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

const backgrounds = [
  'theme00',
  'theme01',
  'theme02',
  'theme03',
  'theme04',
  'theme05',
  'theme06',
  'theme07',
  'theme08',
  'theme09',
  'theme10',
  'theme11',
  'theme12',
  'theme13',
  'theme14',
  'theme15',
];

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

function getBackgroundImage(theme) {
  const deviceType = getDeviceType();
  const resolution = getResolution();
  let basePath = '';

  switch (deviceType) {
    case 'desktop':
      basePath = './src/img/bgr-desktop';
      break;
    case 'tablet':
      basePath = './src/img/bgr-tablet';
      break;
    case 'mobile':
      basePath = './src/img/bgr-mobile';
      break;
    default:
      break;
    //  switch (deviceType) {
    //   case 'desktop':
    //     basePath = 'http://localhost:5173/src/img/bgr-desktop';
    //     break;
    //   case 'tablet':
    //     basePath = 'http://localhost:5173/src/img/bgr-tablet';
    //     break;
    //   case 'mobile':
    //     basePath = 'http://localhost:5173/src/img/bgr-mobile';
    //     break;
    //   default:
    //     break;
  }

  const imagePath = `${basePath}/${theme}_${deviceType}@${resolution}.jpg`;
  console.log('Background Image Path:', imagePath);
  return imagePath;
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

  console.log('active: ', activeBoard);

  const theme = activeBoard ? activeBoard.background : 'theme00';

  console.log(theme);

  const [backgroundImage, setBackgroundImage] = useState(
    getBackgroundImage(theme)
  );
  console.log(theme);
  console.log(backgroundImage);

  useEffect(() => {
    const handleResize = () => {
      setBackgroundImage(getBackgroundImage(theme));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Include activeBoard and theme in the dependencies

  useEffect(() => {
    setBackgroundImage(getBackgroundImage(theme));
  }, [activeBoard, theme]); // Include activeBoard and theme in the dependencies

  return (
    <div
      className={css.boardContainer}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      Board
      <AddColumnBtn openModal={openModal} />
      <ColumnList activeBoardId={activeBoardId} />
      {isModalOpen && (
        <ModalWrapper onClose={closeModal}>
          <ColumnModal modalType={'add'} activeBoardId={activeBoardId} />
        </ModalWrapper>
      )}
    </div>
  );
}
