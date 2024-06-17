import { useEffect, useState } from 'react';
import css from './Board.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors.js';
import clsx from 'clsx';
import { selectActiveBoard } from '../../redux/boards/selectors';
import Filters from '../Filters/Filters.jsx';
import AddColumnBtn from '../AddColumnBtn/AddColumnBtn';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import ColumnModal from '../ColumnModal/ColumnModal';
import ColumnList from '../ColumnList/ColumnList';
import BoardNotSelected from '../BoardNotSelected/BoardNotSelected.jsx';
// import imgsURL from '../../img/listUrls.js';
import { selectBackGrounds } from '../../redux/backgrounds/selectors.js';

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

  const themeData = imgsURL.find(img => img._id === theme);

  if (!themeData) return '';

  const key = `imgUrl_${deviceType}_${resolution}`;
  return themeData[key] || '';
}

export default function Board() {
  const imgsURL = useSelector(selectBackGrounds);
  const theme = useSelector(selectTheme);
  const activeBoard = useSelector(selectActiveBoard);
  
  const background = activeBoard ? activeBoard.background : '';
  const [backgroundImage, setBackgroundImage] = useState(
    getBackgroundImage(background, imgsURL)
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setBackgroundImage(getBackgroundImage(background, imgsURL));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [background]); // Include theme in the dependencies

  useEffect(() => {
    setBackgroundImage(getBackgroundImage(background, imgsURL));
  }, [background, activeBoard]); // Include theme and activeBoard in the dependencies

  return activeBoard ? (
    <div
      className={clsx(css.boardContainer, css[theme])}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={css.top}>
        <p className={clsx(css.title, css[theme])}>{activeBoard.title}</p>
        <Filters />
      </div>
      <div className={clsx(css.contents, css[theme])}>
        <div className={css.columnsWrapper}>
          <ColumnList activeBoardId={activeBoard._id} />
          <AddColumnBtn openModal={openModal} />
        </div>
        {isModalOpen && (
          <ModalWrapper onClose={closeModal}>
            <ColumnModal
              modalType={'add'}
              activeBoardId={activeBoard._id}
              onClose={closeModal}
            />
          </ModalWrapper>
        )}
      </div>
    </div>
  ) : (
    <BoardNotSelected />
  );
}
