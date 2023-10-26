import './Navbar.css';
import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function Navbar() {
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

    return (
        <nav className="nav">
            <Link to="/" className="site-title">Leet Social</Link>
            <ul>
                <CustomLink to="/profile">{firstName + " " + lastName}</CustomLink>
            </ul>
        </nav>
    );
};

function CustomLink ({ to, children, ...props} ) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}