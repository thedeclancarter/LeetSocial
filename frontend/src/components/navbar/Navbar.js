import './Navbar.css';
import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import Logo from '../logo/Logo'

export default function Navbar(props) {
    var _ud = sessionStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

    const { isLogin, setLogin, setHome } = props;
    // Populate navbar with title and links to profile and add friend
    return (
        <nav className={isLogin ? 'nav show': 'nav hide'}>
            <Link
                to="/home"
                className="site-title"
                onClick={() => setHome(true)}
            >
                LeetSocial
            </Link>
            <ul>
                <CustomLink
                    to="/home"
                    onClick={() => setHome(true)}
                    style={{ color: '#FFFFFF', textDecoration: 'none' }}
                >
                    Home
                </CustomLink>
                <CustomLink
                    to="/addfriend"
                    onClick={() => setHome(false)}
                    style={{ color: '#FFFFFF', textDecoration: 'none' }}
                >
                    Add Friend
                </CustomLink>
                <CustomLink
                    to="/profile"
                    onClick={() => setHome(false)}
                    style={{ color: '#FFFFFF', textDecoration: 'none' }}
                >
                    Profile
                </CustomLink>
                <CustomLink
                    to="/"
                    onClick={() => {
                        setHome(true);
                        setLogin(false);
                        sessionStorage.clear();
                    }}
                    style={{ color: '#FFFFFF', textDecoration: 'none' }}
                >
                    Logout
                </CustomLink>
            </ul>
        </nav>
    );
};

function CustomLink({ to, children, ...props }) {
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