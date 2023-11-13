import './UserInfo.css';
import React from 'react';


export default function UserInfo() {
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var login = ud.login;
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;


    return (
        <div className="user">
            <div className="userInfo">
                <div className="loginClass"> 
                <span id="login">User Information </span><br></br><br></br>
                </div>
                <div className="info">
                    <span id="firstName">First Name: {firstName}</span><br></br><br></br>
                    <span id="lastName">Last Name: {lastName}</span><br></br><br></br>
                    <span id="email">Email: </span>          
                </div> 
            </div>
            <div className="userStats">   
            {/* determine the stats */}         
            </div>
        </div>
    );
};