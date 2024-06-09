import { useState } from 'react';
import UserInfoContent from '../UserInfoContent/UserInfoContent';
import ModalWindow from '../../components/UI/ModalWindow/ModalWindow';

export const UserInfo = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <img src={user.photo} alt="User" width="67" onClick={handleEditProfile} />
      <p>{user.name}</p>
      {isModalOpen && (
        <ModalWindow onClose={() => setIsModalOpen(false)}>
          <UserInfoContent />
        </ModalWindow>
      )}
    </div>
  );
};
