import './Login.css';
import React from 'react';
import Register from '../../components/register/Register';
import Logo from '../../components/logo/Logo';
import Leaderboard from '../../components/leaderboard/Leaderboard';

export default function Login(props) {
    const { isLogin, setLogin, isUpdate } = props;

    return (
        <div className='loginPage'>
            <div className={isLogin ? 'logoContainer hide': 'logoContainer show'}>
                <Logo />
            </div>
            <div className='registerContainer'>
                <Leaderboard isLogin={isLogin} isUpdate={isUpdate} />
                <Register isLogin={isLogin} setLogin={setLogin} />
            </div>
        </div>
    );
}