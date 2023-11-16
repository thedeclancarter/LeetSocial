import './Login.css';
import React from 'react';
import Register from '../../components/register/Register';
import Logo from '../../components/logo/Logo';
import Leaderboard from '../../components/leaderboard/Leaderboard';

export default function Login(props) {
    const { isLogin, setLogin } = props;

    return (
        <div className="grid-background">
            {!isLogin && (<Logo />)}
            <Register isLogin={isLogin} setLogin={setLogin} />
            {/* <Leaderboard isLogin={isLogin} /> */}
        </div>
    );
}