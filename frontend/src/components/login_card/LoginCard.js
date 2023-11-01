import React, { useEffect } from 'react';
import './LoginCard.css';
import Login from '../login/Login';
import Logo from '../logo/Logo';

export default function LoginCard() {

    return (
        <div className="grid-background">
            <Login />
            <Logo />
        </div>
    );
}