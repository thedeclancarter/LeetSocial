import React from 'react';
import './Profile.css';
import Navbar from '../../components/navbar/Navbar';
import UserInfo from '../../components/user_info/UserInfo';
import FriendList from '../../components/friend_list/FriendList';


const Profile = () =>
{
    return(
        <div>
            <div className="userTitle">
            <span id="userT">Profile Info and Friend List</span>
            </div>
            <UserInfo />
            <FriendList />
        </div>
    );
};
export default Profile;