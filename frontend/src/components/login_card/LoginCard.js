import React, { useEffect } from 'react';
import './LoginCard.css';
import Login from '../login/Login';
import Logo from '../logo/Logo';

export default function LoginCard() {

    return (
        <div className="grid-background">
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"></link>
            <Login />
            <Logo />
        </div>
    );
}