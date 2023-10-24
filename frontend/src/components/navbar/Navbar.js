import React from 'react';
import './Navbar.css';


export default function Navbar() 
{
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

    return <nav className="nav">
        <a href="/" className="site-title">Leet Social</a>
        <ul>
            <li>
                <span id="userName">Logged In As {firstName} {lastName}</span><br />
            </li>
        </ul>
    </nav>
}