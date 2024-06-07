import { useRef } from 'react';
import css from './ModalWrapper.module.css';

const ModalWrapper = ({ children, onClose }) => {
  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div className={css.modalWrapper} onClick={handleClickOutside}>
      <div className={css.modal} ref={wrapperRef}>
        <button className={css.closeBtn} onClick={onClose}>X</button>
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