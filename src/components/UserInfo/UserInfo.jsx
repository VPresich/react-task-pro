import { useState } from 'react';
import ModalWindow from '../UI/ModalWindow/ModalWindow';
import UserInfoContent from '../UserInfoContent/UserInfoContent';

const UserInfo = ({ user }) => {
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

export default UserInfo;
