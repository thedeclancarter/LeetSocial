import './Home.css';
import React, { useState } from 'react';
import Login from '../../components/login/Login';
import Logo from '../../components/logo/Logo';
import Leaderboard from '../../components/leaderboard/Leaderboard';

export default function Home(props) {
    const { isLogin, setLogin } = props;

    return (
        <div className="">
            {!isLogin && (<Logo />)}
            <Login isLogin={isLogin} setLogin={setLogin} />
            <Leaderboard isLogin={isLogin} />
        </div>   
    );
}