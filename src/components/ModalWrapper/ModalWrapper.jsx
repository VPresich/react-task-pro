import { useRef } from 'react';
import css from './ModalWrapper.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors';
import clsx from 'clsx';
import spritePath from '../../img/sprite.svg';

const ModalWrapper = ({ children, onClose }) => {
  const theme = useSelector(selectTheme);
  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div className={css.modalWrapper} onClick={handleClickOutside}>
      <div className={clsx(css.modal, css[theme])} ref={wrapperRef}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg
            className={clsx(css.icon, css[theme])}
            width="18"
            height="18"
            aria-label="close button"
          >
            <use href={`${spritePath}#icon-x-close`} />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;

// GUIDE
// const [isModalOpen, setIsModalOpen] = useState(false);
// 
// const openModal = () => {
//   setIsModalOpen(true);
// };
// 
// const closeModal = () => {
//   setIsModalOpen(false);
// };
// 
// <button onClick={openModal}>Open Modal</button>
// 
// {isModalOpen && (
//   <ModalWrapper onClose={closeModal}>
//     <шосьшосьшось>
//   </ModalWrapper>
// )}