import './Login.css';
import React from 'react';
import Register from '../../components/register/Register';
import Logo from '../../components/logo/Logo';

export default function Login(props) {
    const { isLogin, setLogin } = props;

    return (
        <div className='grid-background loginPage'>
            <div className='logoContainer'>
                <Logo />
            </div>
            <div className='registerContainer'>
                <Register isLogin={isLogin} setLogin={setLogin} />
            </div>
        </div>
    );
}