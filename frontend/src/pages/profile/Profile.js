import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import UserInfo from '../../components/user_info/UserInfo';
import FriendList from '../../components/friend_list/FriendList';


const Profile = () =>
{
    return(
        <div>
            <UserInfo />
            <FriendList />
        </div>
    );
};
export default Profile;