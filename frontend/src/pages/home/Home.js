import './Home.css';
import React, { useEffect } from 'react';
import Leaderboard from '../../components/leaderboard/Leaderboard';
import Logo from '../../components/logo/Logo';
import ACTable from '../../components/acTable/ACTable';

export default function Home(props) {
    const { isLogin, setLogin, isUpdate } = props;

    useEffect(() => {
        setTimeout(() => setLogin(true), 500);
    }, []);

    return (
        <div className='homePage'>
            <div className='logoContainer hide'>
                <Logo />
            </div>
            <div className='homeContainer'>
                <Leaderboard isLogin={isLogin} isUpdate={isUpdate} />
                <ACTable isUpdate={isUpdate} />
            </div>
        </div>
    );
}