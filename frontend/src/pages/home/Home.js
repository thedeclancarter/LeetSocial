import Leaderboard from '../../components/leaderboard/Leaderboard';
import './Home.css';
import React from 'react';

export default function Home(props) {
    const { isLogin, isUpdate } = props;

    return (
        <div className='homeContainer'>
            <Leaderboard isLogin={isLogin} isUpdate={isUpdate} />
        </div>
    );
}