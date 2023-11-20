import React from 'react';
import './Profile.css';
import UserInfo from '../../components/user_info/UserInfo';
import FriendList from '../../components/friend_list/FriendList';

const Profile = ({ isUpdate}) => {
  return (
    <div>
      <UserInfo />
      <FriendList isUpdate={isUpdate} />
    </div>
  );
};

export default Profile;