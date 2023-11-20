import './Login.css';
import React from 'react';
import Register from '../../components/register/Register';
import Logo from '../../components/logo/Logo';
import Leaderboard from '../../components/leaderboard/Leaderboard';

export default function Login(props) {
    const { isLogin, isUpdate } = props;

    return (
        <div className='loginPage'>
            <div className='logoContainer'>
                <Logo />
            </div>
            <div className='registerContainer'>
                <Leaderboard isLogin={isLogin} isUpdate={isUpdate} />
                <Register />
            </div>
        </div>
    );
}