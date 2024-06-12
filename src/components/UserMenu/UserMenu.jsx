import { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import css from './UserMenu.module.css';
import UserInfoContent from '../UserInfoContent/UserInfoContent';
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import ModalWindow from '../UI/ModalWindow/ModalWindow';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors';
import spritePath from '../../img/sprite.svg';
import clsx from 'clsx';

export default function UserMenu({handleSidebar}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const theme = useSelector(selectTheme);

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.wrapper}>
      <button className={clsx(css.burgerButton, css[theme])} onClick={handleSidebar} >
        <svg
          className={clsx(css.icon, css[theme])}
          aria-label="burger"
        >
          <use href={`${spritePath}#icon-burger`} />
        </svg>
      </button>
      <ThemeSelector />
      <button onClick={handleEditProfile} className={css.wrapperIcon}>
        <p className={clsx(css.username, css[theme])}>{user.name}</p>
        <img src={user.avatarURL} alt="User" className={css.avatar} />
      </button>

      <ModalWindow visible={isModalOpen} setVisible={setIsModalOpen}>
        <div className={css.modalContent}>
          <button className={css.closeButton} onClick={handleCloseModal}>
            &times;
          </button>
          <UserInfoContent />
        </div>
      </ModalWindow>
    </div>
  );
}