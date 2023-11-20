import './Profile.css';
import React, { useEffect } from 'react';
import UserInfo from '../../components/user_info/UserInfo';
import FriendList from '../../components/friend_list/FriendList';
import { useNavigate } from "react-router-dom";


const Profile = ({ isUpdate }) => {
    const navigate = useNavigate();

    return (
        <div>
            <UserInfo />
            <FriendList isUpdate={isUpdate} />
        </div>
    );
};

export default Profile;