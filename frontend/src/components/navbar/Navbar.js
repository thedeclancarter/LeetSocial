import './Navbar.css';
import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function Navbar(props) {
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

    const { setHome } = props;

    return (
        <nav className="nav">
            <Link
                to="/home"
                className="site-title"
                onClick={() => setHome(true)}
            >
                Leet Social
            </Link>
            <ul>
                <CustomLink
                    to="/profile"
                    onClick={() => setHome(false)}
                >
                    {firstName + " " + lastName}
                </CustomLink>
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