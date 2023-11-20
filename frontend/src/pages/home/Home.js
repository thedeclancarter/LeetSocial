import Leaderboard from '../../components/leaderboard/Leaderboard';
import './Home.css';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Home(props) {
    const { isLogin, isUpdate } = props;
    const navigate = useNavigate();

    return (
        <div className='homeContainer'>
            <Leaderboard isLogin={isLogin} isUpdate={isUpdate} />
        </div>
    );
}