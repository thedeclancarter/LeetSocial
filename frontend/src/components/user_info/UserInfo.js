import './UserInfo.css';
import React, { useEffect, useState } from 'react';

export default function UserInfo() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        problemsSolved: '',
        topLanguage: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const _ud = sessionStorage.getItem('user_data');
                const ud = JSON.parse(_ud);
                const id = ud.id;
                const obj = { userId: id };
                const js = JSON.stringify(obj);

                const response = await fetch('https://leet-social-2e5f98883d68.herokuapp.com/api/viewProfile', {
                    method: 'POST',
                    body: js,
                    headers: { 'Content-Type': 'application/json' },
                });

                console.log(response);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const res = await response.json();
                console.log(res);

                const user = {
                    firstName: res.firstName,
                    lastName: res.lastName,
                    username: res.leetCodeUsername,
                    problemsSolved: res.solvedCount.all,
                    topLanguage: res.topLanguage,
                };

                setUserData(user);
                sessionStorage.setItem('userInfo', JSON.stringify(user));
            } catch (error) {
                console.error('Error fetching data:', error);
                alert(error.toString());
            }
        };

        fetchData(); // Call the asynchronous function when the component mounts
    }, []); // The empty dependency array ensures that this effect runs once after the initial render

    return (
        <div className="user">
            <div className="userInfo">
                <div className="info">
                    {/* <br></br> */}
                    <span id="firstName" style={{fontStyle:'italic'}}>First Name: </span>
                    <span style={{fontWeight:'bold'}}>{userData.firstName}</span>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <span id="lastName" style={{fontStyle:'italic'}}>Last Name: </span>
                    <span style={{fontWeight:'bold'}}>{userData.lastName}</span>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <span id="leetCode" style={{fontStyle:'italic'}}>LeetCode Username: </span>
                    <span style={{fontWeight:'bold'}}>{userData.username}</span>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <span id="topLanguage" style={{fontStyle:'italic'}}>Top Language: </span>
                    <span style={{fontWeight:'bold'}}>{userData.topLanguage} - {userData.problemsSolved} Problem(s) Solved</span>
                    <br></br>
                    <br></br>
                </div>
            </div>
        </div>
    );
}
