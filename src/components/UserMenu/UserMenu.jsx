import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { useAuth } from '../../hooks/useAuth';
import css from './UserMenu.module.css';
import UserInfoContent from '../UserInfoContent/UserInfoContent';
import ModalWindow from '../UI/ModalWindow/ModalWindow';

export default function UserMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useAuth();

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
      <p className={css.username}>{user.name}</p>
      <img src={user.avatarURL} alt="User" onClick={handleEditProfile} />
      <button type="button" onClick={() => dispatch(logOut())}>
        Logout
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
