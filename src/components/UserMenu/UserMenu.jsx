import { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import css from './UserMenu.module.css';
import UserInfoContent from '../UserInfoContent/UserInfoContent';
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import ModalWindow from '../UI/ModalWindow/ModalWindow';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors';
import clsx from 'clsx';

export default function UserMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const theme = useSelector(selectTheme);

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  <img
    src={user.avatarURL}
    alt="User"
    width="32"
    onClick={handleEditProfile}
  />;

  return (
    <div className={css.wrapper}>
      <ThemeSelector />
      <div className={css.wrapperIcon}>
        <p className={clsx(css.username, css[theme])}>{user.name}</p>
        <img src={user.avatarURL} alt="User" className={css.avatar} onClick={handleEditProfile} />
      </div>

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
