import './UserInfo.css';
import React, { useEffect } from 'react';

export default function UserInfo() {
    var firstName;
    var lastName;
    var username;
    var problemsSolved;
    var topLanguage;

    // ADD IN WHEN API IS READY :)

    // useEffect(() => {
    //   const fetchData = async () => {
    //     var _ud = localStorage.getItem('userInfo');
    //     var ud = JSON.parse(_ud);
    //     var id = ud.id;
    //     var obj = { id: id.value };
    //     var js = JSON.stringify(obj);

    //     try {
    //       const response = await fetch('INSERTLINK', {
    //         method: 'POST',
    //         body: js,
    //         headers: { 'Content-Type': 'application/json' },
    //       });

    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }

    //       const res = await response.json();
    //       console.log(res);

    //       var user = { firstName: res.firstName, lastName: res.lastName, username: res.username, problemsSolved: res.problemsSolved, topLanguage: res.topLanguage};
    //       firstName = res.firstName;
    //       lastName = res.lastName;
    //       username = res.username;
    //       problemsSolved = res.problemsSolved;
    //       topLanguage = res.topLanguage;
    //       sessionStorage.setItem('userInfo', JSON.stringify(user));
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //       alert(error.toString());
    //     }
    //   };

    //   fetchData(); // Call the asynchronous function when the component mounts
    // }, []); // The empty dependency array ensures that this effect runs once after the initial render

    return (
        <div className="user">
            <div className="userInfo">
                <div className="info">
                    <br></br>
                    <span id="firstName">First Name: {firstName}</span>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <span id="lastName">Last Name: {lastName}</span>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <span id="email">Email: </span>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <span id="lcUsername">LeetCode Username: </span>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <span id="problemsSolved">Problems Solved: </span>
                </div>
            </div>
        </div>
    );
}